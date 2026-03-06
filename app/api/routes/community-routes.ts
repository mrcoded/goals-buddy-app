import z from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";

import db from "@/config/db";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { authMiddleware } from "./auth-middleware";
import { validateBody } from "./learning-goals-routes";
import { communities, communityMembers, learningGoals } from "@/config/schema";

interface Variables {
  userId: string;
}

// create community schema
const createCommunitySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string(),
});

const communityRoutes = new Hono<{ Variables: Variables }>()
  .use("/*", authMiddleware)
  .get("/c/all", async (c) => {
    const allCommunities = await db.select().from(communities);
    return c.json(allCommunities);
  })
  .get("/c", async (c) => {
    const user = c.get("user");

    const userCommunities = await db
      .select({
        id: communityMembers.id,
        userId: communityMembers.userId,
        communityId: communityMembers.communityId,
        joinedAt: communityMembers.joinedAt,
        community: communities,
      })
      .from(communityMembers)
      .innerJoin(communities, eq(communityMembers.communityId, communities.id))
      .where(eq(communityMembers?.userId, user?.id));

    return c.json(userCommunities);
  })
  .get(`/c/:communityId/goals`, async (c) => {
    const user = c.get("user");
    const communityId = c.req.param("communityId");

    const goals = await db
      .select()
      .from(learningGoals)
      .where(
        and(
          eq(learningGoals.userId, user.id),
          eq(learningGoals.communityId, communityId),
        ),
      );

    return c.json(goals);
  })
  .get(`/c/:communityId`, async (c) => {
    const user = c.get("user");
    const communityId = c.req.param("communityId");

    if (!communityId) {
      throw new HTTPException(401, {
        message: "Invalid Community ID!",
      });
    }

    const [community] = await db
      .select()
      .from(communities)
      .where(
        and(
          eq(communities.createdById, user.id),
          eq(communities.id, communityId),
        ),
      );

    return c.json(community);
  })
  .post(`/c/:communityId/join`, async (c) => {
    const user = c.get("user");
    const communityId = c.req.param("communityId");

    //if user is already a member of the community
    const [existingMember] = await db
      .select()
      .from(communityMembers)
      .where(
        and(
          eq(communityMembers.userId, user.id),
          eq(communityMembers.communityId, communityId),
        ),
      );

    if (existingMember) {
      throw new HTTPException(401, {
        message: "User is already a member of the community!",
      });
    }

    const [community] = await db
      .select()
      .from(communities)
      .where(eq(communities.id, communityId));

    if (!community) {
      throw new HTTPException(401, { message: "Community not Found!" });
    }

    await db.insert(communityMembers).values({
      userId: user.id,
      communityId: communityId,
    });

    return c.json({ message: "Joined Community successfully" });
  })
  .post(`/c/create`, async (c) => {
    const { has } = await auth();
    const isPro = has({ plan: "pro_plan" });

    const user = c.get("user");
    const body = await validateBody(c, createCommunitySchema);

    if (!isPro) {
      throw new HTTPException(401, {
        message: "You need to be a pro user to create a community!",
      });
    }

    const [community] = await db
      .insert(communities)
      .values({
        name: body.name,
        description: body.description,
        createdById: user.id,
      })
      .returning();

    await db
      .insert(communityMembers)
      .values({
        userId: user.id,
        communityId: community.id,
      })
      .onConflictDoNothing();

    return c.json(community);
  })
  .put(
    `/c/:communityId/edit`,
    zValidator("json", createCommunitySchema),
    async (c) => {
      const user = c.get("user");
      const communityId = c.req.param("communityId");
      const body = c.req.valid("json");

      const [community] = await db
        .update(communities)
        .set({
          name: body.name,
          description: body.description,
        })
        .where(
          and(
            eq(communities.id, communityId),
            eq(communities.createdById, user.id),
          ),
        )
        .returning();

      return c.json(community);
    },
  );

export { communityRoutes };
