"use client";

import Link from "next/link";

import {
  // SignInButton,
  // SignUpButton,
  // SignedIn,
  // SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon, TrophyIcon, UserIcon } from "lucide-react";

const Header = ({ isPro }: { isPro: boolean }) => {
  const { isSignedIn } = useUser();

  return (
    <header>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl space-x-2">
            GoalsBuddy
          </Link>

          {isSignedIn && (
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard">
                <Button variant="ghost" size={"sm"}>
                  <UserIcon className="size-4 text-primary" />
                  Dashboard
                </Button>
              </Link>

              <Link href="/communities">
                <Button variant="ghost" size={"sm"}>
                  Communities
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="ghost" size={"sm"}>
                  <MessageCircleIcon className="size-4 text-primary" />
                  Chat
                </Button>
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              {isPro ? (
                <Badge variant="outline">
                  <TrophyIcon className="size-3 text-primary" /> Pro
                </Badge>
              ) : (
                <>Free</>
              )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "size-9",
                  },
                }}
              />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/sign-in">
                <Button size="sm" variant="ghost">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
