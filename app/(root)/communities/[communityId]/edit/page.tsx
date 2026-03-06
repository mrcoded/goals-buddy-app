"use client";

import React, { use } from "react";

import { useEditCommunity, useGetCommunityById } from "@/hooks/use-communities";
import CommunityInputForm from "@/components/communities/community-input-form";

const CommunityEditPage = ({
  params,
}: {
  params: Promise<{ communityId: string }>;
}) => {
  const resolvedParams = use(params);
  const communityId = resolvedParams.communityId;

  //get community by Id
  const { data: community } = useGetCommunityById(communityId);

  //edit community mutation function
  const { mutateAsync: editCommunity, isPending: editCommunityPending } =
    useEditCommunity(communityId);

  return (
    <div className="flex flex-col gap-4 justify-start">
      <CommunityInputForm
        isEditing={true}
        mutationFn={editCommunity}
        initialData={community}
        isPending={editCommunityPending}
      />
    </div>
  );
};

export default CommunityEditPage;
