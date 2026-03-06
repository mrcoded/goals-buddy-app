import React from "react";
import { BotIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AIMatchingProps } from "@/types/ai-actions.types";

import { useCreateAiMatches } from "@/hooks/use-ai-buddy";

const AiMatching = ({
  totalGoals,
  showLockIcon,
  selectedCommunityId,
}: AIMatchingProps) => {
  //create AI matches mutation
  const { mutateAsync: aiMatches, isPending } = useCreateAiMatches();

  //handle find ai matches function
  const handleFindAiMatches = async () => {
    try {
      await aiMatches({ communityId: selectedCommunityId });
    } catch (error) {
      console.log("Error matching ai partner", error);
    }
  };

  return (
    <div className="text-center py-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          <BotIcon className="size-6 inline-block mr-2" />
          AI Powered Matching
        </h3>
        <p>
          Our AI will analyze your learning goals and automatically match you
          with the most compatible learning buddies in this community.
        </p>
      </div>
      <Button
        size="lg"
        disabled={totalGoals === 0 || isPending || showLockIcon}
        onClick={handleFindAiMatches}
      >
        <BotIcon className="size-4 text-center mr-2" /> Find Buddies with AI
      </Button>
      {totalGoals > 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          You have {totalGoals} learning goals set for this community
        </p>
      )}
      {totalGoals === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          Add learning goals to enable AI matching
        </p>
      )}
    </div>
  );
};

export default AiMatching;
