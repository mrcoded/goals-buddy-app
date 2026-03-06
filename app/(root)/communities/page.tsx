"use client";

import React, { startTransition, useEffect } from "react";
import Loading from "@/app/loading";

import { useCurrentUser } from "@/hooks/use-users";
import { useCommunities } from "@/hooks/use-communities";

import ApiErrorState from "@/components/api-error";
import LearningGoalsCard from "@/components/communities/learning-goals-card";
import JoinedCommunityCard from "@/components/communities/joined-community-card";

const CommunityPage = () => {
  const { data: user } = useCurrentUser();
  const [selectedCommunity, setSelectedCommunity] = React.useState<
    string | null
  >(null);

  const {
    data: userCommunities,
    isLoading: isLoadingUserCommunities,
    error: errorUserCommunities,
  } = useCommunities();

  //check if user is pro User
  const isPro = user?.isPro || false;

  useEffect(() => {
    if (userCommunities && userCommunities.length > 0 && !selectedCommunity) {
      startTransition(() => {
        setSelectedCommunity(userCommunities[0].community.id);
      });
    }
  }, [userCommunities, selectedCommunity]);

  if (isLoadingUserCommunities) return <Loading />;

  // get number of communities by the current user
  const numberOfCommunity = userCommunities?.length ?? 0;
  const showLockIcon = numberOfCommunity >= 3 && !isPro;

  return (
    <div className="space-y-4">
      {errorUserCommunities ? (
        <ApiErrorState />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* show user joined communities card */}
          <JoinedCommunityCard
            showLockIcon={showLockIcon}
            userCommunities={userCommunities ?? []}
            selectedCommunity={selectedCommunity ?? ""}
            setSelectedCommunity={setSelectedCommunity}
          />

          {/* user learning goals card */}
          <LearningGoalsCard
            showLockIcon={showLockIcon}
            selectedCommunity={selectedCommunity ?? ""}
          />
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
