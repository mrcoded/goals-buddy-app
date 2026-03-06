import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const StatsCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-center sm:justify-start">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;
