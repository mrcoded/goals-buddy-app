"use client";

import React from "react";
import { BotIcon } from "lucide-react";

import AiMatching from "./ai-matching";
import AddLearningGoal from "./add-learning-goal";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCommunityGoals } from "@/hooks/use-communities";

const LearningGoalsCard = ({
  showLockIcon,
  selectedCommunity,
}: {
  showLockIcon: boolean;
  selectedCommunity: string;
}) => {
  const [activeTab, setActiveTab] = React.useState<"goals" | "matches">(
    "goals",
  );

  const {
    data: communityGoals,
    isLoading: isLoadingCommunityGoals,
    error: errorCommunityGoals,
  } = useCommunityGoals(selectedCommunity);

  if (isLoadingCommunityGoals) return <div>Loading...</div>;
  if (errorCommunityGoals) return <div>User Community Error</div>;

  return (
    <Card className="lg:col-span-2 ">
      <CardHeader>
        <div className="flex gap-2 mb-4">
          <Button
            onClick={() => setActiveTab("goals")}
            variant={activeTab === "goals" ? "default" : "outline"}
          >
            My Goals
          </Button>
          <Button
            onClick={() => setActiveTab("matches")}
            // disabled={showLockIcon}
            variant={activeTab === "matches" ? "default" : "outline"}
          >
            <BotIcon className="size-4" />
            Find Buddies with AI
          </Button>
        </div>
        <CardTitle>
          {activeTab === "goals" ? "Learning Goals" : "Find Buddies with AI"}
        </CardTitle>
        <CardDescription>
          {activeTab === "goals"
            ? `${communityGoals?.length ?? 0} ${communityGoals?.length === 1 ? "goal" : "goals"} 
                 in this community`
            : "Members with similar learning goals"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activeTab === "goals" ? (
          <div className="space-y-2">
            {communityGoals?.map((goal) => (
              <Card key={goal.id} className="cursor-pointer shadow-none">
                <CardHeader>
                  <CardTitle>{goal.title}</CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
            <AddLearningGoal
              showLockIcon={showLockIcon}
              selectedCommunityId={selectedCommunity!}
            />
          </div>
        ) : (
          <AiMatching
            showLockIcon={showLockIcon}
            totalGoals={communityGoals?.length || 0}
            selectedCommunityId={selectedCommunity!}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LearningGoalsCard;
