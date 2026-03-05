import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import db from "@/config/db";
import { and, eq } from "drizzle-orm";

import { authMiddleware } from "./auth-middleware";
import { communities, communityMembers, learningGoals } from "@/config/schema";

interface Variables {
  userId: string;
}

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
    console.log("GOALS", goals);
    return c.json(goals);
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
  });

export { communityRoutes };
