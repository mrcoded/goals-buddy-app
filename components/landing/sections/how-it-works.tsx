import React from "react";

import SectionHeading from "../section-heading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HowItWorksSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeading
          title="How It Works"
          description="Get matched with your ideal learning buddies in four simple
          steps."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => {
            return (
              <Card
                key={i}
                className="p-3 hover:scale-105 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="step-number">{step.number}</div>
                  </div>
                </CardHeader>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

const STEPS = [
  {
    number: 1,
    title: "Pick a community",
    description: `Browse communities and join those that match your goals, skill level, and learning style.`,
  },
  {
    number: 2,
    title: "Add your goals",
    description: `Tell us about what you're learning and where you're at. We'll match you with the right buddies.`,
  },
  {
    number: 3,
    title: "Get matches",
    description: `We will find you the right buddies based on your goals, and pair you up for accountability.`,
  },
  {
    number: 3,
    title: "Start learning",
    description: `Message your match, set up sessions, and help each other stay on track`,
  },
];
