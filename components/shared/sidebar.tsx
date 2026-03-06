"use client";

import { Menu, Sparkles, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { navItems } from "@/constant/nav-item";

const SidebarNav = () => {
  return (
    <div className="md:hidden flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 border-transparent"
          >
            <Menu className="size-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          aria-describedby={undefined}
          className="w-[300px] sm:w-[400px] p-0 flex flex-col"
        >
          <SheetHeader className="p-6 text-left border-b">
            <SheetTitle className="flex items-center gap-2">
              <div className="bg-primary p-1 rounded-md">
                <Sparkles className="size-4 text-primary-foreground" />
              </div>
              GoalsBuddy
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-2">
              {navItems.map((item) => (
                <SheetClose asChild key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.badge ? (
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="size-4 text-muted-foreground/50" />
                    )}
                  </a>
                </SheetClose>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarNav;
