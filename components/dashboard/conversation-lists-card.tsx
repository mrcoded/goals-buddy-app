import React from "react";
import Link from "next/link";
import { MessageCircleIcon, User2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/ui/user-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MatchProps } from "@/types/matches.types";

const ConversationListsCard = ({
  matches,
}: {
  matches: MatchProps[] | undefined;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <MessageCircleIcon className="size-4 mr-2 text-primary" />
            Recent Chat
          </CardTitle>
          <Link href="/chat">
            <Button variant="outline" size="sm">
              <User2Icon className="size-4" /> View all
            </Button>
          </Link>
        </div>
        <CardDescription>Conversations you&apros;re part of</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3">
          {matches?.slice(0, 4)?.map((match) => {
            return (
              <Link href={`/chat/${match.id}`} key={match.id}>
                <Card className="shadow-none">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <UserAvatar
                        size="sm"
                        name={match.buddy.name}
                        imageUrl={match.buddy.imageUrl ?? undefined}
                      />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="font-normal">
                          {match.buddy.name}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground mt-1">
                          <span>
                            {match?.userGoals?.map((g) => g.title).join(", ")}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationListsCard;
