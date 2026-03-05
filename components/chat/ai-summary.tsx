"use client";

import React from "react";
import { BotIcon } from "lucide-react";

import { AIConversationSummaryProps } from "@/types/ai-actions.types";
import { useGenerateConversationSummary } from "@/hooks/use-conversations";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AIConversationSummary = ({
  conversationId,
  summary,
}: AIConversationSummaryProps) => {
  const {
    mutate: generateSummaryMutation,
    isPending: generatingSummaryPending,
  } = useGenerateConversationSummary();

  // handle cpnversation generate summary
  const handleConversationSummary = async (conversationId: string) => {
    generateSummaryMutation(conversationId);
  };

  return (
    <div className="col-span-1">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Conversation Summary</CardTitle>
            <Button
              size="sm"
              disabled={generatingSummaryPending}
              onClick={() => handleConversationSummary(conversationId || "")}
            >
              Generate
            </Button>
          </div>
        </CardHeader>
        {generatingSummaryPending ? (
          <div className="min-h-40 mb-4 translate-y-1/2">
            <div className="flex items-center justify-center gap-2 font-medium">
              <BotIcon className="size-6" /> AI Generating...{" "}
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-400"></div>
            </div>
          </div>
        ) : (
          <CardContent className="space-y-4">
            {summary ? (
              <>
                <div>
                  <h4 className="font-medium mb-2">Summary</h4>
                  <p className="text-muted-foreground text-sm">
                    {summary.summary}
                  </p>
                </div>
                {summary.keyPoints && summary.keyPoints.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Key Points</h4>
                    <ul className="space-y-1">
                      {summary.keyPoints.map((point, index) => (
                        <li
                          key={index}
                          className="text-muted-foreground text-sm"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {summary.actionItems && summary.actionItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Action Items</h4>
                    <div className="space-y-1">
                      {summary.actionItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <ul className="flex-1 list-disc list-inside">
                            <li className="text-sm">{item}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {summary.nextSteps && summary.nextSteps.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Next Steps</h4>
                    <div className="space-y-1">
                      {summary.nextSteps.map((step, index) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No summary generated yet. Click &quot;Generate&quot; to create
                one.
              </p>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AIConversationSummary;
