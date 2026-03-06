"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { CheckIcon, ChevronLeftIcon, LockIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ApiErrorState from "@/components/api-error";

import {
  useAllCommunities,
  useCommunities,
  useJoinCommunity,
} from "@/hooks/use-communities";
import { useCurrentUser } from "@/hooks/use-users";

const AllCommunitiesPage = () => {
  const { data: user } = useCurrentUser();
  const { mutateAsync: joinCommunity, isPending } = useJoinCommunity();

  const { data: userCommunities, error: errorUserCommunities } =
    useCommunities();

  const {
    data: allCommunities,
    isLoading,
    error: errorAllCommunities,
  } = useAllCommunities();

  //check if user is pro User
  const isPro = user?.isPro || false;

  // check if user is already joined
  const isJoined = (communityId: string) => {
    return userCommunities?.some((c) => c.community.id === communityId);
  };

  // get number of communities bby the current user
  const numberOfCommunity = userCommunities?.length ?? 0;

  // if user is free user show lock icon on join button if they already joined more that 3 communities
  const showLockIcon = numberOfCommunity >= 3 && !isPro;

  //api errors
  const apiError =
    errorUserCommunities?.message || errorAllCommunities?.message;

  if (isLoading) return <Loading />;

  // handle join community
  const handleJoinCommunity = async (communityId: string) => {
    await joinCommunity(communityId);
    toast.success("Joined community successfully");
  };

  return (
    <div>
      <Link href="/communities">
        <Button variant={"outline"}>
          <ChevronLeftIcon className="size-4" />
          Back to Communities
        </Button>
      </Link>
      <div className="space-y-4 mt-4">
        <h2 className="text-2xl font-bold">Browse Communities</h2>
        {apiError ? (
          <ApiErrorState />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allCommunities?.map((community) => (
              <Card key={community.id} className="p-4">
                <CardTitle>{community.name}</CardTitle>
                <CardDescription>{community.description}</CardDescription>
                <CardFooter className="px-0 mt-2">
                  <Button
                    className="w-full"
                    disabled={
                      isJoined(community.id) || isPending || showLockIcon
                    }
                    onClick={() => handleJoinCommunity(community.id)}
                  >
                    {showLockIcon && (
                      <LockIcon className="size-4 teext-muted-foreground" />
                    )}{" "}
                    {isJoined(community.id) ? (
                      <>
                        <CheckIcon className="size-4" />
                        Joined
                      </>
                    ) : (
                      "Join Community"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCommunitiesPage;
