"use client";

import React from "react";
import Link from "next/link";
import Loading from "@/app/loading";

import { useUser } from "@clerk/clerk-react";
import { useGetAllGoals } from "@/hooks/use-goals";
import { useAllMatches } from "@/hooks/use-ai-buddy";
import { useCommunities } from "@/hooks/use-communities";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ApiErrorState from "@/components/api-error";
import StatsCard from "@/components/dashboard/stats-card";
import CommunityListsCard from "@/components/dashboard/community-lists-card";
import ConversationListsCard from "@/components/dashboard/conversation-lists-card";

const DashboardPage = () => {
  const user = useUser();
  //get all communities
  const {
    data: userCommunities,
    isLoading: isLoadingUserCommunities,
    error: errorUserCommunities,
  } = useCommunities();

  const {
    data: allMatches,
    isLoading: isLoadingMatches,
    error: errorMatches,
  } = useAllMatches();

  //get all learning goals
  const { data: learningGoals } = useGetAllGoals();

  //get pending matches
  const pendingMatches = allMatches?.filter(
    (match) => match.status === "pending",
  );
  //get activeMatches matches
  const activeMatches = allMatches?.filter(
    (match) => match.status === "accepted",
  );
  //loading spinner
  if (isLoadingUserCommunities || isLoadingMatches) return <Loading />;

  //API error
  const apiError = errorUserCommunities || errorMatches;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.user?.firstName || "User"}
        </p>
      </div>

      <Card className="border-primary">
        <CardHeader>
          <CardTitle>
            🎉 You have {pendingMatches?.length || 0} new{" "}
            {pendingMatches?.length === 1 ? "match" : "matches"}
          </CardTitle>
          <CardDescription>
            Review and accept your matches to start chatting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/chat">
            <Button>Review Matches</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Your Communities"
          value={userCommunities?.length || 0}
        />
        <StatsCard title="Learning Goals" value={learningGoals?.length || 0} />
        <StatsCard title="Active Matches" value={activeMatches?.length || 0} />
        <StatsCard
          title="Pending Matches"
          value={pendingMatches?.length || 0}
        />
      </div>

      {apiError ? (
        <ApiErrorState />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {/* conversations list card */}
          <ConversationListsCard matches={allMatches} />

          {/* users communities info card */}
          <CommunityListsCard userCommunities={userCommunities} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
