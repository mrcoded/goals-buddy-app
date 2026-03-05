import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "@clerk/nextjs/server";
import { HTTPException } from "hono/http-exception";

import { usersRoutes } from "../routes/users-routes";
import { matchesRoutes } from "../routes/matches-routes";
import { communityRoutes } from "../routes/community-routes";
import { conversationsRoutes } from "../routes/conversations-routes";
import { learningGoalsRoutes } from "../routes/learning-goals-routes";

interface Variables {
  userId: string;
}

const app = new Hono<{ Variables: Variables }>().basePath("/api");

//error handler
app.onError((err, c) => {
  console.error("API error", err);

  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }

  if (err instanceof Error) {
    if (
      err.message.includes("violates") ||
      err.message.includes("constraint")
    ) {
      return c.json({ error: "Invalid data input" }, 400);
    }
  }

  if (err.message.includes("not found")) {
    return c.json({ error: err.message }, 404);
  }

  return c.json({ error: "Internal server error" }, 500);
});

//middleware
//auth
app.use("/*", async (c, next) => {
  const publicRoutes = ["/api/communities/all"];
  if (publicRoutes.includes(c.req.path)) return await next();

  const session = await auth();
  if (!session.userId) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  c.set("userId", session.userId);
  return await next();
});

const routes = app
  .route("/communities", communityRoutes)
  .route("/communities", learningGoalsRoutes)
  .route("/matches", matchesRoutes)
  .route("/users", usersRoutes)
  .route("/conversations", conversationsRoutes);

export type AppType = typeof routes;
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
