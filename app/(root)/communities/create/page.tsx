"use client";

import React from "react";

import { useCreateCommunity } from "@/hooks/use-communities";
import CommunityInputForm from "@/components/communities/community-input-form";

const CreateCommunityPage = () => {
  //create Community mutation function
  const { mutateAsync: createCommunity, isPending: createCommunityPending } =
    useCreateCommunity();

  return (
    <div className="flex flex-col gap-4 justify-start">
      <CommunityInputForm
        mutationFn={createCommunity}
        isPending={createCommunityPending}
      />
    </div>
  );
};

export default CreateCommunityPage;
