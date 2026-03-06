"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import db from "@/config/db";
import { getUserByIds } from "@/lib/db-query-helper";
import { conversationSummaries, messages } from "@/config/schema";

export const generateAISummaries = async (
  conversationId: string,
  conversationMessages: (typeof messages.$inferSelect)[],
) => {
  //GET User details
  const userIds = [
    ...new Set(conversationMessages.map((message) => message.senderId)),
  ];

  const usersMap = await getUserByIds(userIds);

  //create conversation text
  const formattedMessages = conversationMessages.map((message) => {
    const user = usersMap.get(message.senderId);

    return `${user?.name}: ${message.content}`;
  });

  const conversationText = formattedMessages.join("\n");

  //prompt for the AI to generate a summary of the conversation
  const prompt = `You are a helpful AI assistant that summarizes learning conversations between matched learing buddies.

  Analyze the following conversation and provide:
  1. A concise summary of what was discussed in the conversation
  2. Key points and insights shared.
  3. Action items mentioned in the conversation
  4. Next steps for the leearning buddies

  Conversation:
  ${conversationText}

  Please format your response as JSON with this structure:
  {
  "summary" : "A 2-3 sentence summary overview",
  "keyPoints" : ["point 1", "point 2", ...]
  "actionItems" : ["action item 1", "action item 2", ...],
  "nextSteps" : ["step 1", "step 2", ...],
  }`;

  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    //parse the response
    let jsonText = text.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText
        .replace(/^"```json\s*\*\n/, "")
        .replace(/\n```\s*$/, "")
        .replace(/```json\n/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText
        .replace(/^"```\s*\*\n/, "")
        .replace(/\n```\s*$/, "")
        .replace(/```/g, "");
    }

    // console.log("JSON TEXT: ", jsonText);
    const parsedSummary = JSON.parse(jsonText);

    //create a new summary record in the db
    const [summary] = await db
      .insert(conversationSummaries)
      .values({
        conversationId,
        summary: parsedSummary.summary || "",
        keyPoints: parsedSummary.keyPoints || [],
        actionItems: parsedSummary.actionItems || [],
        nextSteps: parsedSummary.nextSteps || [],
      })
      .returning();

    return summary;
  } catch (error) {
    console.error("Error generating AI Summary", error);
    throw new Error("Error generating AI Summary");
  }
};
