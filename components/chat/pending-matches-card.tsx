"use client";

import React from "react";

import UserAvatar from "@/components/ui/user-avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchProps } from "@/types/matches.types";

const PendingMatchesCard = ({
  acceptMatch,
  pendingMatchesToShow,
  acceptMatchPending,
}: {
  acceptMatch: any;
  pendingMatchesToShow: MatchProps[];
  acceptMatchPending: boolean;
}) => {
  return (
    <div className="flex gap-4 overflow-x-scroll">
      {pendingMatchesToShow?.map((match) => {
        const buddy = {
          id: match.buddy.id || "",
          name: match.buddy.name || "Buddy",
          imageUrl: match.buddy.imageUrl ?? undefined,
        };

        return (
          <Card
            key={match.id}
            className="flex flex-col max-h-125 max-w-87.5 min-w-87.5"
          >
            <CardHeader className="shrink-0">
              <div className="flex items-center gap-3 mb-2">
                <UserAvatar imageUrl={buddy.imageUrl} name={buddy.name} />

                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">
                    {buddy.name}
                  </CardTitle>
                  {match.community && (
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {match.community.name}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 space-y-2 min-h-0 overflow-hidden">
              <div className="flex-1 space-y-2">
                {match.filteredBuddyGoals &&
                  match.filteredBuddyGoals.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        Their learning Goals:
                      </p>
                      <div className="space-y-2">
                        {match.filteredBuddyGoals.map((goal) => (
                          <Badge
                            key={goal.id}
                            variant="secondary"
                            className="text-xs"
                          >
                            {goal.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              <Button
                className="w-full shrink-0 mt-2"
                disabled={acceptMatchPending}
                onClick={() => acceptMatch(match.id)}
              >
                {acceptMatchPending
                  ? "Accepting..."
                  : "Accept & Start Chatting"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PendingMatchesCard;
