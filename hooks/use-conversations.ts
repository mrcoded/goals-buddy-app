import { toast } from "sonner";
import { client } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMatchedConversations = (matchId: string) => {
  return useQuery({
    queryKey: ["conversation", matchId],
    queryFn: async () => {
      const res = await client.api.matches.c[":matchId"].conversation.$get({
        param: {
          matchId,
        },
      });

      //if response fails
      if (!res.ok) throw new Error("Failed to fetch conversation");

      return await res.json();
    },
    enabled: !!matchId,
  });
};

export const useGenerateLatestSummary = (conversationId: string) => {
  return useQuery({
    queryKey: ["ai-summary", conversationId],
    queryFn: async () => {
      const res = await client.api.conversations.m[
        ":conversationId"
      ].summarize.$get({
        param: {
          conversationId,
        },
      });

      //if response fails
      if (!res.ok)
        throw new Error("Failed to generate latest conversation summary");

      return await res.json();
    },
    enabled: !!conversationId,
  });
};

export const useConversations = (conversationId: string) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const res = await client.api.conversations.m[
        ":conversationId"
      ].messages.$get({
        param: {
          conversationId,
        },
      });

      //if response fails
      if (!res.ok) throw new Error("Failed to fetch messages");

      return await res.json();
    },
    enabled: !!conversationId,
    refetchInterval: 5000,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageProps: {
      conversationId: string;
      message: string;
    }) => {
      const res = await client.api.conversations.m[
        ":conversationId"
      ].messages.$post({
        param: {
          conversationId: messageProps.conversationId,
        },
        json: {
          content: messageProps.message,
        },
      });

      //if response fails
      if (!res.ok) throw new Error("Failed to create message");

      return res.json();
    },
    onSuccess: (_, variables) => {
      toast.success("Message sent");
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });
    },
    onError(error) {
      toast.error("Failed to send Message");
      console.error("Error creating message", error);
    },
  });
};

export const useGenerateConversationSummary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string) => {
      const res = await client.api.conversations.m[
        ":conversationId"
      ].summarize.$post({
        param: {
          conversationId,
        },
      });

      //if response fails
      if (!res.ok) throw new Error("Failed to generate summary message");

      return res.json();
    },
    onSuccess: (data) => {
      toast.success("Conversation Summary Generated successfully");
      queryClient.invalidateQueries({
        queryKey: ["ai-summary", data.conversationId],
      });
    },
    onError(error) {
      toast.error("Unable to Summarize Conversation! Try again");
      console.error("Error generating summary message", error);
    },
  });
};
