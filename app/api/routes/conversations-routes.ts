import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import db from "@/config/db";
import { asc, desc, eq } from "drizzle-orm";

import { authMiddleware } from "./auth-middleware";
import { conversations, messages } from "@/config/schema";
import { generateAISummaries } from "@/lib/actions/generate-ai-summary";
import { generateConversationSummary } from "@/lib/actions/ai-conversation";

interface Variables {
  userId: string;
}

const conversationsRoutes = new Hono<{ Variables: Variables }>()
  .use("/*", authMiddleware)
  .get("/m/:conversationId/messages", async (c) => {
    const converstionId = c.req.param("conversationId");

    //if conversation id is not valid
    if (!converstionId) {
      throw new HTTPException(400, { message: "Conversation ID is required" });
    }

    const messagesData = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, converstionId))
      .orderBy(asc(messages.createdAt));

    return c.json(messagesData);
  })
  .post(
    `/m/:conversationId/messages`,
    zValidator("json", z.object({ content: z.string() })),
    async (c) => {
      const user = c.get("user");
      const { content } = await c.req.json();
      const conversationId = c.req.param("conversationId");

      //create message
      const [message] = await db
        .insert(messages)
        .values({
          content,
          conversationId,
          senderId: user.id,
        })
        .returning();

      //update lastMessage time
      await db
        .update(conversations)
        .set({
          lastMessageAt: new Date(),
        })
        .where(eq(conversations.id, conversationId));

      return c.json(message);
    },
  )
  .post(`/m/:conversationId/summarize`, async (c) => {
    const conversationId = c.req.param("conversationId");

    //get conversation messages
    const conversationMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.createdAt));

    //if no conversation messages found
    if (!conversationMessages.length) {
      throw new HTTPException(400, { message: "No messages found" });
    }

    const generateSummary = await generateAISummaries(
      conversationId,
      conversationMessages,
    );

    return c.json(generateSummary);
  })
  .get("/m/:conversationId/summarize", async (c) => {
    const conversationId = c.req.param("conversationId");

    //get conversation messages
    const conversationMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.createdAt));

    //if conversation messages is not found
    if (!conversationMessages) {
      throw new HTTPException(400, { message: "Conversation ID is required" });
    }

    const generateSummary = await generateConversationSummary(conversationId);

    return c.json(generateSummary);
  });

export { conversationsRoutes };
