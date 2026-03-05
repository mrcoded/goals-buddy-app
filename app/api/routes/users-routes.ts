import { Hono } from "hono";
import { auth } from "@clerk/nextjs/server";
import { HTTPException } from "hono/http-exception";

import { authMiddleware } from "./auth-middleware";
import { getOrCreateUserByClerkId } from "@/lib/user-utils";

interface AuthVariables {
  userId: string;
  user: NonNullable<Awaited<ReturnType<typeof getOrCreateUserByClerkId>>>;
}

const usersRoutes = new Hono<{ Variables: AuthVariables }>()
  .use("/*", authMiddleware)
  .get("/me", async (c) => {
    const user = c.get("user");

    if (!user) throw new HTTPException(401, { message: "User not Found!" });

    const { has } = await auth();
    const isPro = has({ plan: "pro_plan" });

    return c.json({ ...user, isPro });
  });

export { usersRoutes };
