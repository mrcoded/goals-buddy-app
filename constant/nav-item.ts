import { Home, MessageSquare, Sparkles, Users } from "lucide-react";

export const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Communities", icon: Users, href: "/communities" },
  { name: "My Matches", icon: Sparkles, href: "/chat", badge: "AI" },
  { name: "Active Chats", icon: MessageSquare, href: "/chat" },
];
