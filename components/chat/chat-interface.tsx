"use client";

import React from "react";
import Loading from "@/app/loading";
import { AlertTriangle } from "lucide-react";

import {
  useGenerateLatestSummary,
  useMatchedConversations,
} from "@/hooks/use-conversations";

import AIConversationSummary from "./ai-summary";
import ConversationInterface from "./conversation-interface";

const ChatInterface = ({ matchId }: { matchId: string }) => {
  const {
    data: matchedConversations,
    isLoading: isLoadingMatchedConversations,
    error: errorMatchedConversations,
  } = useMatchedConversations(matchId);

  //get latest AI Summary
  const { data: summary, error: errorSummary } = useGenerateLatestSummary(
    matchedConversations?.id ?? "",
  );

  //loading spinner
  if (isLoadingMatchedConversations) return <Loading />;

  //API Error
  const apiError = errorMatchedConversations || errorSummary;

  return (
    <>
      {apiError ? (
        <p className="flex items-center gap-2 mt-10 text-red-500 font-medium text-lg">
          <AlertTriangle className="size-6" />
          Something went wrong, please reload the page or try again later
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ConversationInterface
            matchId={matchId}
            matchedConversations={matchedConversations}
          />

          {/* AI Summary */}
          <AIConversationSummary
            summary={summary}
            conversationId={matchedConversations?.id}
          />
        </div>
      )}
    </>
  );
};

export default ChatInterface;
