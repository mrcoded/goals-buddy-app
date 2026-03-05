import { client } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateLearningGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goal: {
      communityId: string;
      title: string;
      description: string;
      tags: string[];
    }) => {
      const res = await client.api.communities.c.goals.$post({
        param: {},
        json: {
          title: goal.title,
          description: goal.description,
          tags: goal.tags,
          communityId: goal.communityId,
        },
      });

      //if response fails
      if (!res.ok) throw new Error("Failed to create learning goal");

      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["learning-goals", variables.communityId],
      });
    },
    onError(error) {
      console.error("Error creating learning goal", error);
    },
  });
};

export const useGetAllGoals = () => {
  return useQuery({
    queryKey: ["learning-goals"],
    queryFn: async () => {
      const res = await client.api.matches.c.all.$get();
      //if response fails
      if (!res.ok) throw new Error("Failed to fetch all learning goals");

      return await res.json();
    },
  });
};
