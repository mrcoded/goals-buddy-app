import db from "@/config/db";
import { desc, eq } from "drizzle-orm";
import { conversationSummaries } from "@/config/schema";

export const generateConversationSummary = async (conversationId: string) => {
  try {
    const [summary] = await db
      .select()
      .from(conversationSummaries)
      .where(eq(conversationSummaries.conversationId, conversationId))
      .orderBy(desc(conversationSummaries.generatedAt))
      .limit(1);

    return summary || null;
  } catch (error) {
    console.error("Error generating conversation summary", error);
    throw new Error("Error generating conversation summary");
  }
};
