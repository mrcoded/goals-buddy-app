import { relations } from "drizzle-orm";
import { uuid, pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  name: text().notNull(),
  imageUrl: text("image_url"),
  email: text().notNull().unique(),
  subscriptionTier: text("subscription_tier").default("free").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const communities = pgTable("communities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text("image_url"),
  createdById: uuid("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const communityMembers = pgTable("community_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  communityId: uuid("community_id")
    .references(() => communities.id)
    .notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const learningGoals = pgTable("learning_goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  communityId: uuid("community_id")
    .references(() => communities.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description"),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const matches = pgTable("matches", {
  id: uuid("id").defaultRandom().primaryKey(),
  user1Id: uuid("user1_id")
    .references(() => users.id)
    .notNull(),
  user2Id: uuid("user2_id")
    .references(() => users.id)
    .notNull(),
  communityId: uuid("community_id")
    .references(() => communities.id)
    .notNull(),
  title: text("title"),
  description: text("description"),
  status: text("status").default("pending").notNull(), // pending, accepted, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  matchId: uuid("match_id")
    .references(() => matches.id)
    .notNull(),
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  senderId: uuid("sender_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversationSummaries = pgTable("conversation_summaries", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  summary: text("summary").notNull(),
  actionItems: jsonb("action_items").$type<string[]>().default([]).notNull(),
  nextSteps: jsonb("next_steps").$type<string[]>().default([]).notNull(),
  keyPoints: jsonb("key_points").$type<string[]>().default([]).notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});

//Relations
export const usersRelations = relations(users, ({ many }) => ({
  learningGoals: many(learningGoals),
  communityMembership: many(communityMembers),
  sentMessages: many(messages),
}));

export const communitiesRelations = relations(communities, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [communities.createdById],
    references: [users.id],
  }),
  members: many(communityMembers),
  learningGoals: many(learningGoals),
  matches: many(matches),
}));

export const learningGoalsRelations = relations(learningGoals, ({ one }) => ({
  user: one(users, {
    fields: [learningGoals.userId],
    references: [users.id],
  }),
  community: one(communities, {
    fields: [learningGoals.communityId],
    references: [communities.id],
  }),
}));

export const matchesRelations = relations(matches, ({ one, many }) => ({
  user1: one(users, {
    fields: [matches.user1Id],
    references: [users.id],
  }),
  user2: one(users, {
    fields: [matches.user2Id],
    references: [users.id],
  }),
  community: one(communities, {
    fields: [matches.communityId],
    references: [communities.id],
  }),
  conversations: many(conversations),
}));

export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    match: one(matches, {
      fields: [conversations.matchId],
      references: [matches.id],
    }),
    messages: many(messages),
    summaries: many(conversationSummaries),
  }),
);

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

export const conversationSummariesRelations = relations(
  conversationSummaries,
  ({ one }) => ({
    conversation: one(conversations, {
      fields: [conversationSummaries.conversationId],
      references: [conversations.id],
    }),
  }),
);
