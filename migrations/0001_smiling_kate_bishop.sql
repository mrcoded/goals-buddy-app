ALTER TABLE "communities" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "community_members" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "conversation_summaries" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "conversations" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "learning_goals" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "matches" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "messages" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "communities" DROP CONSTRAINT "communities_created_by_id_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "community_members" DROP CONSTRAINT "community_members_user_id_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "community_members" DROP CONSTRAINT "community_members_community_id_communities_uuid_fk";
--> statement-breakpoint
ALTER TABLE "conversation_summaries" DROP CONSTRAINT "conversation_summaries_conversation_id_conversations_uuid_fk";
--> statement-breakpoint
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_match_id_matches_uuid_fk";
--> statement-breakpoint
ALTER TABLE "learning_goals" DROP CONSTRAINT "learning_goals_user_id_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "learning_goals" DROP CONSTRAINT "learning_goals_community_id_communities_uuid_fk";
--> statement-breakpoint
ALTER TABLE "matches" DROP CONSTRAINT "matches_user_id_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "matches" DROP CONSTRAINT "matches_user2_id_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "matches" DROP CONSTRAINT "matches_community_id_communities_uuid_fk";
--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_conversation_id_conversations_uuid_fk";
--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_id_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "communities" ADD CONSTRAINT "communities_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_members" ADD CONSTRAINT "community_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_members" ADD CONSTRAINT "community_members_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation_summaries" ADD CONSTRAINT "conversation_summaries_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_goals" ADD CONSTRAINT "learning_goals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_goals" ADD CONSTRAINT "learning_goals_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_user2_id_users_id_fk" FOREIGN KEY ("user2_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;