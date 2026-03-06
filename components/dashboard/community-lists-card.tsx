import React from "react";
import Link from "next/link";
import { UserIcon, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCommunityProps } from "@/types/matches.types";

const CommunityListsCard = ({
  userCommunities,
}: {
  userCommunities: UserCommunityProps[] | undefined;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <UserIcon className="size-4 mr-2 text-primary" />
            Communities
          </CardTitle>
          <Link href="/communities">
            <Button variant="outline" size="sm">
              <Users className="size-4" /> Manage
            </Button>
          </Link>
        </div>
        <CardDescription>Communities you`re part of</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {userCommunities?.slice(0, 4)?.map((c) => {
            return (
              <Card className="shadow-none" key={c.community?.id}>
                <CardHeader className="text-sm">
                  <CardTitle>{c.community?.name}</CardTitle>
                  <CardDescription>{c.community?.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityListsCard;
