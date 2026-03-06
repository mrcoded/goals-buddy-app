import React from "react";
import Loading from "@/app/loading";
import { LockIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { JoinedCommunityCardProps } from "@/types/communities.types";

const JoinedCommunityCard = ({
  showLockIcon,
  userCommunities,
  selectedCommunity,
  setSelectedCommunity,
  isLoadingUserCommunities,
}: JoinedCommunityCardProps) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          {showLockIcon && (
            <LockIcon className="size-4 teext-muted-foreground" />
          )}{" "}
          Communities
        </CardTitle>
        <CardDescription>{userCommunities?.length} joined</CardDescription>{" "}
      </CardHeader>
      {isLoadingUserCommunities ? (
        <Loading />
      ) : (
        <CardContent className="space-y-2">
          {userCommunities?.map((c, idx) => {
            return (
              <Button
                key={idx}
                className="w-full justify-start"
                onClick={() => setSelectedCommunity(c.community.id)}
                variant={
                  selectedCommunity === c.community.id ? "default" : "outline"
                }
              >
                {c.community.name}
              </Button>
            );
          })}
        </CardContent>
      )}
    </Card>
  );
};

export default JoinedCommunityCard;
