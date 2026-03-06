import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CommunitiesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communities</h1>
          <p className="text-muted-foreground">
            Manage your learning goals and find learning buddies
          </p>
        </div>
        <div>
          <Link href="/communities/all">
            <Button>+ Join More Communities</Button>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CommunitiesLayout;
