import { Hono } from "hono";
import { authMiddleware } from "./auth-middleware";

import { aiMatchUsers } from "@/lib/actions/ai-actions";
import {
  findMatchesByUserId,
  getBuddiesUserId,
  getGoalsByUsersAndCommunity,
  getUserByIds,
  getUserMatches,
} from "@/lib/query-helper";
import {
  communities,
  conversations,
  learningGoals,
  matches,
  users,
} from "@/config/schema";
import db from "@/config/db";
import { eq, inArray } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

interface Variables {
  userId: string;
}

const matchesRoutes = new Hono<{ Variables: Variables }>()
  .use("/*", authMiddleware)
  .post(`/c/:communityId/ai/match`, async (c) => {
    const user = c.get("user");
    const communityId = c.req.param("communityId");

    const aiMatch = await aiMatchUsers(user, communityId);

    return c.json(aiMatch);
  })
  .get(`/c/:communityId/matches`, async (c) => {
    const user = c.get("user");
    const communityId = c.req.param("communityId");

    const potentialMatches = await findMatchesByUserId(user.id, communityId);

    const populatedMatches = await Promise.all(
      potentialMatches.map(async (match) => {
        const [matchUser] = await db
          .select()
          .from(users)
          .where(eq(users.id, match.userId));

        return {
          ...match,
          name: matchUser?.name || "Unknown",
          imageUrl: matchUser?.imageUrl,
        };
      }),
    );

    return c.json(populatedMatches);
  })
  .get(`/c/all`, async (c) => {
    const user = c.get("user");

    //get my matches
    const myMatches = await getUserMatches(user.id);

    //get matches all buddies user and their goals
    const buddyIds = myMatches.map((match) => getBuddiesUserId(match, user.id));

    //if matches in multiple communities, fetch goals for each community
    const communitySet = new Set<string>(
      myMatches.map((match) => match.communityId),
    );

    const communityIdsArray = Array.from(communitySet);

    const [buddiesMap, communitiesMap, ...allGoalsMaps] = await Promise.all([
      getUserByIds(buddyIds),

      //fetch all communities
      (async () => {
        if (communityIdsArray.length === 0) return new Map();

        const allCommunitiesList = await db
          .select()
          .from(communities)
          .where(inArray(communities.id, communityIdsArray));

        return new Map(
          allCommunitiesList.map((community) => [community.id, community]),
        );
      })(),

      //fetch partner goals for each community
      ...communityIdsArray.map((communityId) =>
        getGoalsByUsersAndCommunity(buddyIds, communityId),
      ),

      //fetch my goals for each community
      ...communityIdsArray.map((id) =>
        getGoalsByUsersAndCommunity([user.id], id),
      ),
    ]);

    //merge all buddies goals into one map
    const mergedBuddiesGoalMap = new Map<
      string,
      (typeof learningGoals.$inferSelect)[]
    >();

    const buddiesGoalMaps = allGoalsMaps.slice(
      0,
      communityIdsArray.length,
    ) as Map<string, (typeof learningGoals.$inferSelect)[]>[];

    for (const goalsMap of buddiesGoalMaps) {
      for (const [userId, goals] of goalsMap.entries()) {
        if (!mergedBuddiesGoalMap.has(userId)) {
          mergedBuddiesGoalMap.set(userId, []);
        }
        mergedBuddiesGoalMap.get(userId)!.push(...goals);
      }
    }

    //get users own goal in the community
    const userGoalsMaps = allGoalsMaps.slice(communityIdsArray.length) as Map<
      string,
      (typeof learningGoals.$inferSelect)[]
    >[];

    const userGoalsByCommunity = new Map<
      string,
      (typeof learningGoals.$inferSelect)[]
    >();

    for (let i = 0; i < communityIdsArray.length; i++) {
      const communityId = communityIdsArray[i];
      const goalsMap = userGoalsMaps[i];

      const goals = goalsMap?.get(user.id) || [];

      userGoalsByCommunity.set(communityId, goals);
    }

    //populate matches with buddies info, community info and goals
    const populatedMatches = myMatches.map((match) => {
      const buddyId = getBuddiesUserId(match, user.id);
      const buddy = buddiesMap.get(buddyId);
      const community = communitiesMap.get(match.communityId);
      const allBuddyGoals = mergedBuddiesGoalMap.get(buddyId) || [];
      const userGoals = userGoalsByCommunity.get(match.communityId) || [];

      //filter goals for this specific community
      const filteredBuddyGoals = allBuddyGoals
        .filter((goal) => goal.communityId === match.communityId)
        .map((goal) => ({
          id: goal.id,
          title: goal.title,
          description: goal.description,
        }));

      const filteredUserGoalsPerMatch = userGoals.map((goal) => ({
        id: goal.id,
        title: goal.title,
        description: goal.description,
      }));

      return {
        ...match,
        buddy: {
          id: buddy?.id || buddyId,
          name: buddy?.name || "Unknown User",
          imageUrl: buddy?.imageUrl || null,
        },
        community: community
          ? {
              id: community.id,
              name: community.name,
              imageUrl: community.imageUrl,
              description: community.description,
            }
          : null,
        filteredBuddyGoals,
        userGoals: filteredUserGoalsPerMatch,
      };
    });

    return c.json(populatedMatches);
  })
  .put(`/c/:matchId/accept`, async (c) => {
    const matchId = c.req.param("matchId");

    //update match status
    const [match] = await db
      .update(matches)
      .set({
        status: "accepted",
      })
      .where(eq(matches.id, matchId))
      .returning();

    //check if no match exists
    if (!match) {
      throw new HTTPException(404, { message: "Match not found!" });
    }

    await db.insert(conversations).values({
      matchId: match.id,
    });

    return c.json(match);
  })
  .get(`/c/:matchId/conversation`, async (c) => {
    const user = c.get("user");
    const matchId = c.req.param("matchId");

    //update match status
    const [match] = await db
      .select()
      .from(matches)
      .where(eq(matches.id, matchId));

    //check if no match exists
    if (!match) {
      throw new HTTPException(404, { message: "Match not found!" });
    }

    //get other user ID
    const otherUserId =
      match.user1Id === user.id ? match.user2Id : match.user1Id;

    //get other users details
    const [otherUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, otherUserId));

    //check if no other user exists
    if (!otherUser) {
      throw new HTTPException(404, { message: "User not found!" });
    }

    let [conversation] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.matchId, matchId));

    if (!conversation) {
      [conversation] = await db
        .insert(conversations)
        .values({
          matchId: matchId,
        })
        .returning();
    }

    return c.json({
      ...conversation,
      status: match.status,
      currentUserId: user.id,
      otherUser: {
        id: otherUser.id,
        name: otherUser.name,
        imageUrl: otherUser.imageUrl,
      },
    });
  });

export { matchesRoutes };
