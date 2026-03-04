import React from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const StatsCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">Recent Chat</CardTitle>
          <Link href="/chat">
            <Button variant="outline" size="sm">
              View all
            </Button>
          </Link>
        </div>
        <CardDescription>Communities you&apros;re part of</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;
