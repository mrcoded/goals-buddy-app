import { toast } from "sonner";
import { client } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCommunities = () => {
  return useQuery({
    queryKey: ["communities"],
    queryFn: async () => {
      const res = await client.api.communities.c.$get();
      //if response fails
      if (!res.ok) throw new Error("Failed to fetch communities");

      return await res.json();
    },
  });
};

export const useAllCommunities = () => {
  return useQuery({
    queryKey: ["all-communities"],
    queryFn: async () => {
      const res = await client.api.communities.c.all.$get();
      //if response fails
      if (!res.ok) throw new Error("Failed to fetch all communities");

      return res.json();
    },
  });
};

export const useCommunityGoals = (communityId: string | null) => {
  return useQuery({
    queryKey: ["community-goals", communityId],
    queryFn: async () => {
      const res = await client.api.communities.c[":communityId"].goals.$get({
        param: {
          communityId: communityId!,
        },
      });
      //if response fails
      if (!res.ok) throw new Error("Failed to fetch community goals");

      return await res.json();
    },
    enabled: !!communityId,
  });
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (communityId: string) => {
      const res = await client.api.communities.c[":communityId"].join.$post({
        param: {
          communityId: communityId,
        },
      });
      //if response fails
      if (!res.ok) throw new Error("Failed to join community");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
    onError(error) {
      console.error("Error joining community", error);
      toast.error("Failed to join community! Try again");
    },
  });
};
