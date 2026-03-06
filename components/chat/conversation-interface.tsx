"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { useUser } from "@clerk/nextjs";

import { ConversationProps } from "@/types/chat.types";

import { useAllMatches } from "@/hooks/use-ai-buddy";
import { useConversations, useSendMessage } from "@/hooks/use-conversations";

import { Button } from "@/components/ui/button";
import ApiErrorState from "@/components/api-error";
import UserAvatar from "@/components/ui/user-avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ConversationInterface = ({
  matchId,
  matchedConversations,
}: ConversationProps) => {
  const { user: clerkUser } = useUser();
  const [message, setMessage] = React.useState<string>("");

  const { mutate: sendMessage, isPending: sendMessagePending } =
    useSendMessage();

  //get all matches
  const {
    data: match,
    isLoading: isLoadingMatches,
    error: errorMatches,
  } = useAllMatches();

  //get all messages
  const {
    data: messages = [],
    isLoading: isLoadingMessages,
    error: errorMessages,
  } = useConversations(matchedConversations?.id || "");

  //loading spinner
  if (isLoadingMatches || isLoadingMessages) return <Loading />;

  //api errors
  const apiError = errorMessages?.message || errorMatches?.message;

  //Find match
  const getMatch = match?.find((m) => m.id === matchId)?.buddy;

  //GET other user
  const otherUser = {
    id: getMatch?.id || "",
    name: getMatch?.name || "Buddy",
    imageUrl: getMatch?.imageUrl ?? undefined,
  };

  //GET current user
  const currentUser = {
    id: clerkUser?.id || "",
    name: (clerkUser?.firstName + " " + clerkUser?.lastName).trim() ?? "You",
    imageUrl: clerkUser?.imageUrl ?? undefined,
  };

  // handle send message function
  const handleSendMessage = async (message: string) => {
    if (!matchedConversations?.id) {
      return;
    }

    sendMessage({
      conversationId: matchedConversations.id,
      message: message,
    });
    setMessage("");
  };

  return (
    <div className="col-span-2">
      {apiError ? (
        <ApiErrorState />
      ) : (
        <Card className="h-150 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <UserAvatar name={otherUser.name} imageUrl={otherUser.imageUrl} />
              <CardTitle>{otherUser.name}</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              //check if message sender is current user
              const isCurrentUser =
                message.senderId === matchedConversations?.currentUserId;

              return (
                <div className="space-y-4" key={message.id}>
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isCurrentUser ? "justify-end" : "justify-start",
                    )}
                  >
                    {!isCurrentUser && (
                      <UserAvatar
                        size="xs"
                        name={otherUser.name}
                        imageUrl={otherUser?.imageUrl}
                      />
                    )}

                    <div
                      className={cn(
                        "w-full sm:max-w-[70%] rounded-lg px-3 pt-2 sm:p-3",
                        isCurrentUser
                          ? "bg-primary/10 text-primary-foreground"
                          : "bg-muted",
                      )}
                    >
                      <p className="text-wrap text-sm text-foreground mb-1 sm:mb-1.5">
                        {message.content}
                      </p>
                      <p className="text-xs opacity-70 text-foreground mb-1">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {isCurrentUser && (
                      <UserAvatar
                        size="xs"
                        name={currentUser.name ?? "You"}
                        imageUrl={currentUser.imageUrl ?? undefined}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full gap-2 items-center">
              <Textarea
                rows={2}
                value={message}
                className="resize-none"
                placeholder="Type your message"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    console.log("Enter pressed");
                  }
                }}
              />
              <Button
                disabled={!matchedConversations?.id || sendMessagePending}
                onClick={() => handleSendMessage(message)}
              >
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ConversationInterface;
