"use client";

import { toast } from "sonner";
import { client } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateAiMatches = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ communityId }: { communityId: string }) => {
      const res = await client.api.matches.c[":communityId"].ai.match.$post({
        param: {
          communityId,
        },
      });

      //if response fails
      if (!res.ok) throw new Error("Failed to match ai buddy");

      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ai-match", variables.communityId],
      });
    },
    onError(error) {
      toast.error("Failed to match learning buddy! Try again");
      console.error("Error matching ai buddy", error);
    },
  });
};

export const useAcceptMatchMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (matchId: string) => {
      const res = await client.api.matches.c[":matchId"].accept.$put({
        param: {
          matchId,
        },
      });

      //if response fails
      if (!res.ok) throw new Error("Failed to match ai buddy");

      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["accept-match", "all-matches"],
      });
      toast.success("Accepted match successfully");
      router.push(`/chat/${data.id}`);
    },
    onError(error) {
      toast.error("Failed to accept match! Try again");
      console.error("Error accepting matching ai buddy", error);
    },
  });
};

export const useAllMatches = () => {
  return useQuery({
    queryKey: ["all-matches"],
    queryFn: async () => {
      const res = await client.api.matches.c.all.$get();

      //if response fails
      if (!res.ok) throw new Error("Failed to fetch communities");

      return await res.json();
    },
  });
};

// export const usePotentialMatches = () => {
//   return useQuery({
//     queryKey: ["ai-match"],
//     queryFn: async (communityId: string) => {
//       const res = await client.api.matches.c[":communityId"].matches.$get({
//         param: {
//           communityId,
//         },
//       });

//       //if response fails
//       if (!res.ok) throw new Error("Failed to fetch potential matches");

//       return res.json();
//     },
//   });
// };
