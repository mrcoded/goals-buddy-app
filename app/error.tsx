"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an external service like Sentry
    console.error("GoalsBuddy Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2 border-destructive/20 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="size-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">System Error</CardTitle>
          <CardDescription className="text-base mt-2">
            Oops! We hit a snag in the pipeline, We are sorry about this
            experience and working on fixing it.
          </CardDescription>
        </CardHeader>

        <CardContent className="bg-muted/50 rounded-lg m-6 p-4 border border-border">
          <div className="flex items-center justify-start gap-3">
            <AlertTriangle className="size-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm font-mono break-all opacity-80">
              {error.digest ? `Digest: ${error.digest}` : error.message}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={() => reset()}
            variant="default"
            className="w-auto gap-2"
          >
            <RefreshCcw className="size-4" />
            Try Again
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-auto gap-2"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="size-4" />
            Back Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
