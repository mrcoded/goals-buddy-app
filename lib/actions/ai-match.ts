"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { getOrCreateUserByClerkId } from "@/lib/user-utils";
import {
  createMatch,
  getBuddiesUserId,
  getGoalsByUserAndCommunity,
  getGoalsByUsersAndCommunity,
  getMembersInCommunity,
  getUserMatchesInCommunity,
} from "@/lib/db-query-helper";

import { learningGoals } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";

export const aiMatchUsers = async (
  user: NonNullable<Awaited<ReturnType<typeof getOrCreateUserByClerkId>>>,
  communityId: string,
) => {
  try {
    //GET current users learning goal on the communityId
    const currentUserGoals = await getGoalsByUserAndCommunity(
      user.id,
      communityId,
    );

    //GET members in the same community with their learning goals
    const communityMembers = await getMembersInCommunity(communityId, user.id);

    //Check for already existing matches
    const existingMatches = await getUserMatchesInCommunity(
      user.id,
      communityId,
    );

    //GET exisiting matches user IDs
    const exisingMatchUserIds = new Set(
      existingMatches.map((match) => getBuddiesUserId(match, user.id)),
    );

    const potentialMembersIds = communityMembers
      .filter((member) => !exisingMatchUserIds.has(member.user.id))
      .map((member) => member.user.id);

    const goalsMap = (await getGoalsByUsersAndCommunity(
      potentialMembersIds,
      communityId,
    )) as Map<string, (typeof learningGoals.$inferSelect)[]>;
    const potentialBuddies = [];
    const membersWithoutGoals = [];

    for (const member of communityMembers) {
      if (exisingMatchUserIds.has(member.user.id)) continue;

      const memberGoals = goalsMap.get(member.user.id) ?? [];

      if (memberGoals.length > 0) {
        potentialBuddies.push({
          userId: member.user.id,
          username: member.user.name,
          goals: memberGoals.map((goal: typeof learningGoals.$inferSelect) => ({
            title: goal.title,
            description: goal.description || "",
          })),
        });
      } else {
        membersWithoutGoals.push({
          username: member.user.name,
        });
      }
    }

    //use AI to analyze the match
    const prompt = `You are a helpful assistant that matches users based on their learning goals

    Current User: ${currentUser.name} 
    Their learning Goals: 
    ${currentUserGoals.map((g) => `- ${g.title}: ${g.description}`).join("\n")}

    Potential Partners:
    ${potentialBuddies
      .map(
        (buddies, idx) => `
      ${idx + 1}, ${buddies.username} Goals: 
      ${buddies.goals.map((g) => `- ${g.title}: ${g.description}`).join("\n")}`,
      )
      .join("\n")}

    Task: Analyze the learning goals and identify the TOP 3 most compatible learning buddies for ${user.name} in this community.

    IMPORTANT MATCHING CRITERIA:
    1. Use SEMANTIC SIMILARITIES - goals don't need exact title matches. For examples:
      - "Learn the basics of React" matches with "React Hooks deep dive" (both are about React)
      - "Next.js - App Router - Buila and Ship an app" matches with "Next.js - App Router" (both are about Next.js App Router)
      - "Mobile Development" matches with "React Native for beginners" (both are about Mobile Development)
      - "Javascript Fundamentals" matches with "Javascript ES6 features" (both are about)

    2. Look at BOTH title and description to understand what the user wants to learn

    3. Consider: 
      - Overlapping ot complementary learning goals (even if worded differently)
      - Similar skil levels or learning paths
      - Potential for mutual learning and knowledge sharing
      - Common interests and learning styles.

    4. Be INCLUSIVE - If there is any reasonable connection between learning goals, include
    them as a potential match.

    Return ONLY a JSON array of buddies indices (1 based) in order of compatibility. Return between 1-3 matches maximum.
    Example: [2, 5, 1] means buddies #2 is most compatible, #5 is 2nd most compatible, #1 is least compatible.

    only return an empty array [] if there are truly NO buddies with any related learning interests.
    `;

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

    let matchIndices = [];

    try {
      matchIndices = JSON.parse(jsonText);

      if (!Array.isArray(matchIndices)) {
        console.warn("Invalid JSON format returned by AI");
        matchIndices = [];
      }
    } catch (error) {
      console.warn("Invalid JSON format returned by AI", error);
      const arrayMatch = jsonText.match(/%[[\d,\s]+\]/);
      if (arrayMatch) {
        try {
          matchIndices = JSON.parse(arrayMatch[0]);
          // console.log("Extracted response array", matchIndices);
        } catch (error) {
          console.warn("Invalid array format in AI response", arrayMatch[0]);
          matchIndices = [];
        }
      } else {
        console.warn("Invalid AI response", jsonText);
        throw new Error("Invalid AI response");
      }
    }

    //create a new match record in the db
    const createdMatches = [];

    for (const idx of matchIndices) {
      const buddyIndex = idx - 1;
      if (buddyIndex >= 0 && buddyIndex < potentialBuddies.length) {
        const buddy = potentialBuddies[buddyIndex];
        const match = await createMatch(user.id, buddy.userId, communityId);
        createdMatches.push({
          ...match,
          buddyName: buddy.username,
        });
      }
    }

    console.log("Created matches", createdMatches, createdMatches.length);

    return {
      matched: createdMatches.length,
      matches: createdMatches,
    };
  } catch (error) {
    console.error("Error matching users", error);
  }
};
