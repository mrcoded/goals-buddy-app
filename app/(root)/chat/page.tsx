"use client";

import React from "react";

import { useCurrentUser } from "@/hooks/use-users";
import { useAcceptMatchMutation, useAllMatches } from "@/hooks/use-ai-buddy";

import ActiveChatsCard from "@/components/chat/active-matches-card";
import PendingMatchesCard from "@/components/chat/pending-matches-card";
import Loading from "@/app/loading";
import { AlertTriangle } from "lucide-react";

const ChatPage = () => {
  const { data: user } = useCurrentUser();

  //accept match mutattion function
  const { mutate: acceptMatch, isPending: acceptMatchPending } =
    useAcceptMatchMutation();

  //get all matches
  const {
    data: allMatches,
    isLoading: allMatchesLoading,
    error: allMatchesError,
  } = useAllMatches();

  //loading spinner
  if (allMatchesLoading || acceptMatchPending) return <Loading />;

  //get activeMatches matches
  const acceptedMatches = allMatches?.filter(
    (match) => match.status === "accepted",
  );

  //get pending matches
  const pendingMatches = allMatches?.filter(
    (match) => match.status === "pending",
  );

  //check if user is pro User
  const isPro = user?.isPro || false;

  let pendingMatchesToShow = [];
  //if user is pro show all pending matches
  if (!isPro) {
    pendingMatchesToShow = pendingMatches?.slice(0, 3) || [];
  } else {
    pendingMatchesToShow = pendingMatches || [];
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Pending Matches ({pendingMatchesToShow?.length ?? 0})
      </h2>

      {pendingMatchesToShow && pendingMatchesToShow.length > 0 ? (
        <PendingMatchesCard
          acceptMatch={acceptMatch}
          acceptMatchPending={acceptMatchPending}
          pendingMatchesToShow={pendingMatchesToShow}
        />
      ) : (
        <p className="text-base font-medium">
          You currently have No pending matches
        </p>
      )}

      <h2 className="text-2xl font-semibold">
        Active Chats ({acceptedMatches?.length ?? 0})
      </h2>
      {allMatchesError ? (
        <p className="flex items-center gap-2 mt-10 text-red-500 font-medium text-lg">
          <AlertTriangle className="size-6" />
          Something went wrong, please reload the page or try again later
        </p>
      ) : acceptedMatches && acceptedMatches.length > 0 ? (
        <ActiveChatsCard acceptedMatches={acceptedMatches} />
      ) : (
        <p className="text-base font-medium">
          You currently have No active chats
        </p>
      )}
    </div>
  );
};

export default ChatPage;
