"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { MatchProps } from "@/types/matches.types";

import UserAvatar from "@/components/ui/user-avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const ActiveMatchesCard: React.FC<{ acceptedMatches: MatchProps[] }> = ({
  acceptedMatches,
}) => {
  const router = useRouter();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-scroll flex-col">
      {acceptedMatches?.map((match) => {
        const buddy = {
          id: match.buddy.id || "",
          name: match.buddy.name || "Buddy",
          imageUrl: match.buddy.imageUrl ?? undefined,
        };

        return (
          <Card
            key={match.id}
            className="flex w-full py-0 sm:py-1.5 cursor-pointer hover:bg-accent transition-colors duration-200"
            onClick={() => router.push(`/chat/${match.id}`)}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <UserAvatar
                size="sm"
                imageUrl={buddy.imageUrl}
                name={buddy.name}
              />
              <div className="flex-1">
                <CardTitle className="text-lg truncate capitalize">
                  {buddy.name}
                </CardTitle>
                {match.community && (
                  <p className="text-sm text-muted-foreground truncate font-medium">
                    {match.community.name}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-1">
                  {match.userGoals && (
                    <span className="text-xs font-medium text-muted-foreground">
                      *Your Goals:{" "}
                      {match.userGoals.map((goal) => goal.title).join(", ")}
                    </span>
                  )}
                  {match.filteredBuddyGoals &&
                    match.filteredBuddyGoals.length > 0 && (
                      <span className="text-xs font-medium text-muted-foreground">
                        *Their Goals:{" "}
                        {match.filteredBuddyGoals
                          .map((goal) => goal.title)
                          .join(", ")}
                      </span>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ActiveMatchesCard;
