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

export const useGetCommunityById = (communityId: string) => {
  return useQuery({
    queryKey: ["communities", communityId],
    queryFn: async () => {
      const res = await client.api.communities.c[":communityId"].$get({
        param: {
          communityId: communityId,
        },
      });
      //if response fails
      if (!res.ok) throw new Error("Failed to fetch a community");

      return await res.json();
    },
    enabled: !!communityId,
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
    queryKey: ["learning-goals", communityId],
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

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: { name: string; description: string }) => {
      const res = await client.api.communities.c.create.$post({
        json: {
          name: formData.name,
          description: formData.description,
        },
      });
      //if response fails
      if (!res.ok) throw new Error("Failed to create community");

      return res.json();
    },
    onSuccess: () => {
      toast.success("Successfully created community");
      queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
    onError(error) {
      console.error("Error creating community", error);
      toast.error("Failed to create community! Try again");
    },
  });
};

export const useEditCommunity = (communityId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: { name: string; description: string }) => {
      const res = await client.api.communities.c[":communityId"].edit.$put({
        param: { communityId },
        json: {
          name: formData.name,
          description: formData.description,
        },
      });
      //if response fails
      if (!res.ok) throw new Error("Failed to update community");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      toast.success("Successfully updated community");
    },
    onError(error) {
      console.error("Error updating community", error);
      toast.error("Failed to update community! Try again");
    },
  });
};
