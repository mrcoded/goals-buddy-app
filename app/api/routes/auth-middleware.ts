import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { getOrCreateUserByClerkId } from "@/lib/user-utils";

type AuthVariables = {
  userId: string;
  user: NonNullable<Awaited<ReturnType<typeof getOrCreateUserByClerkId>>>;
};

export const authMiddleware = async (
  c: Context<{ Variables: AuthVariables }>,
  next: Next,
) => {
  const clerkId = c.get("userId") as string;
  const user = await getOrCreateUserByClerkId(clerkId);

  if (!user) {
    throw new HTTPException(401, { message: "User not Found!" });
  }

  c.set("user", user);

  return next();
};
