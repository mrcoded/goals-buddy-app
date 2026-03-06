export interface ConversationProps {
  matchedConversations: MatchedConversationProps | undefined;
  matchId: string;
}
type MatchedConversationProps = {
  id: string;
  currentUserId: string;
  otherUser: { id: string; name: string; imageUrl: string | null };
};
