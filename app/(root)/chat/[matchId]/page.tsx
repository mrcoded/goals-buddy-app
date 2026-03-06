import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/chat/chat-interface";

const ConversationPage = async ({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) => {
  const { matchId } = await params;

  return (
    <div className="space-y-4">
      <div>
        <Link href="/chat">
          <Button variant="outline">
            <ArrowLeft className="size-4" />
            Back to Conversations
          </Button>
        </Link>
      </div>

      <ChatInterface matchId={matchId} />
    </div>
  );
};

export default ConversationPage;
