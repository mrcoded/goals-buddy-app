import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";

const UserAvatar = ({
  name,
  size,
  imageUrl,
}: {
  name: string;
  imageUrl?: string;
  size?: "xs" | "sm" | "md";
}) => {
  const initials = name?.[0]?.toUpperCase() || "U";
  const originalName = name || "User";

  return (
    <Avatar
      className={cn(
        "size-10",
        size === "sm"
          ? "size-8"
          : size === "md"
            ? "size-10"
            : size === "xs"
              ? "size-4"
              : "size-12",
      )}
    >
      {imageUrl && <AvatarImage src={imageUrl} alt={originalName} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
