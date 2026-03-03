import React from "react";
import {
  AlarmClockCheck,
  Cable,
  MessageSquareMore,
  NotebookPen,
  Users,
  Zap,
} from "lucide-react";

import SectionHeading from "../section-heading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeatureSection = () => {
  return (
    <section className="section-container">
      <div className="section-padding">
        <SectionHeading
          title="Everything You Need to Learn Together"
          description="Powerful features designed to help you find, connect and learn
      with the right buddies"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            return (
              <Card
                key={i}
                className="border-2 hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="feature-icon mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

const FEATURES = [
  {
    title: "Matching that works",
    description: `We look at your goals, skilled level and what
    you want to learn and match you with the right fit. 
    No swiping, no guessing`,
    icon: <Cable className="size-6" />,
  },
  {
    title: "Built-in Chat",
    description: `Message your buddies directly in the app, Plan sessions,
    share resources, and just check in on each other's progress.`,
    icon: <MessageSquareMore className="size-6" />,
  },
  {
    title: "Auto summaries",
    description: `After each session, get a quick summary of your discussion
    and what you can learn from it.`,
    icon: <NotebookPen className="size-6" />,
  },
  {
    title: "Track your goals",
    description: `Write down whatt you are learning and where you're at.
    Update it as you go. Single goal tracking that doesn't get in your way`,
    icon: <AlarmClockCheck className="size-6" />,
  },
  {
    title: "Join communities",
    description: `Find groups of people who share your passion, learning the same things.
    Whether it is coding, writing, or anything in between, there is a community for you`,
    icon: <Users className="size-6" />,
  },
  {
    title: "Quick setup",
    description: `Sign up, fill out your profile, and you're ready to get matched.
    Takes only a few minutes. `,
    icon: <Zap className="size-6" />,
  },
];
