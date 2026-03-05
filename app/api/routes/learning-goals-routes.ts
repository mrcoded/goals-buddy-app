import { eq } from "drizzle-orm";
import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import z, { ZodType } from "zod";
import { authMiddleware } from "./auth-middleware";

import db from "@/config/db";
import { communities, learningGoals } from "@/config/schema";

interface Variables {
  userId: string;
}

// validate json body
export const validateBody = async <T>(
  c: Context,
  schema: ZodType<T>,
): Promise<T> => {
  const body = await c.req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    throw new HTTPException(400, {
      message:
        errors.length === 1
          ? errors[0].message
          : `Validation failed: ${errors.map((e) => e.message).join(".")}`,
    });
  }

  return result.data;
};

// create learning goal schema
const createGoalSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  communityId: z.string().min(1, { message: "Community ID is required" }),
});

const learningGoalsRoutes = new Hono<{ Variables: Variables }>()
  .use("/*", authMiddleware)
  .post(`/c/goals`, async (c) => {
    const body = await validateBody(c, createGoalSchema);

    const user = c.get("user");

    const [community] = await db
      .select()
      .from(communities)
      .where(eq(communities.id, body.communityId));

    if (!community) {
      throw new HTTPException(401, { message: "Community not Found!" });
    }

    const [goal] = await db
      .insert(learningGoals)
      .values({
        userId: user.id,
        communityId: body.communityId,
        title: body.title,
        description: body.description,
        tags: body.tags || [],
      })
      .returning();

    return c.json(goal);
  })
  .get(`/c/all`, async (c) => {
    const user = c.get("user");

    const goals = await db
      .select()
      .from(learningGoals)
      .where(eq(learningGoals.userId, user.id));

    return c.json(goals);
  });

export { learningGoalsRoutes };
