export interface AIConversationSummaryProps {
  conversationId: string | undefined;
  summary:
    | {
        summary: string;
        keyPoints: string[];
        actionItems: string[];
        nextSteps: string[];
      }
    | undefined;
}

export interface AIMatchingProps {
  showLockIcon: boolean;
  totalGoals: number;
  selectedCommunityId: string;
}
