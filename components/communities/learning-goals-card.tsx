"use client";

import React from "react";
import Loading from "@/app/loading";

import { useCommunityGoals } from "@/hooks/use-communities";

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
import ApiErrorState from "@/components/api-error";

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

  //get all learning goals
  const {
    data: communityGoals,
    isLoading: isLoadingCommunityGoals,
    error: errorCommunityGoals,
  } = useCommunityGoals(selectedCommunity);

  return (
    <Card className="lg:col-span-2 ">
      <CardHeader>
        <div className="flex gap-2 mb-4">
          <Button
            size="sm"
            onClick={() => setActiveTab("goals")}
            variant={activeTab === "goals" ? "default" : "outline"}
          >
            My Goals
          </Button>
          <Button
            size="sm"
            onClick={() => setActiveTab("matches")}
            variant={activeTab === "matches" ? "default" : "outline"}
          >
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
      {isLoadingCommunityGoals ? (
        <Loading />
      ) : errorCommunityGoals ? (
        <ApiErrorState />
      ) : (
        <CardContent>
          {activeTab === "goals" ? (
            <div className="space-y-2">
              <div className="grid sm:grid-cols-2 gap-2">
                {communityGoals?.map((goal) => (
                  <Card key={goal.id} className="cursor-pointer shadow-none">
                    <CardHeader>
                      <CardTitle>{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
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
      )}
    </Card>
  );
};

export default LearningGoalsCard;
