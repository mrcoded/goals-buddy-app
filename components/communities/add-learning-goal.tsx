"use client";

import React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateLearningGoal } from "@/hooks/use-goals";

const AddLearningGoal = ({
  selectedCommunityId,
}: {
  selectedCommunityId: string;
}) => {
  const { mutateAsync: createLearningGoal, isPending } =
    useCreateLearningGoal();
  const [newGoal, setNewGoal] = React.useState("");
  const [showTextArea, setShowTextArea] = React.useState(false);

  const handleCreateGoal = async () => {
    try {
      await createLearningGoal({
        communityId: selectedCommunityId,
        title: newGoal.slice(0, 100),
        description: newGoal,
        tags: [],
      });

      setNewGoal("");
      setShowTextArea(false);
    } catch (error) {
      console.log("Error creating learning goal", error);
    }
  };

  return (
    <div>
      {showTextArea ? (
        <div className="flex flex-col space-y-3 pt-3 border-t">
          <Textarea
            placeholder="Write your learning goal here..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="flex gap-2 w-full">
            <Button
              className="w-auto"
              size="sm"
              onClick={handleCreateGoal}
              disabled={isPending}
            >
              Add Goal
            </Button>
            <Button
              className="w-auto"
              size="sm"
              variant="outline"
              onClick={() => setShowTextArea(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setShowTextArea(true)}
        >
          <PlusIcon className="size-3" /> Add Learning Goal
        </Button>
      )}
    </div>
  );
};

export default AddLearningGoal;
