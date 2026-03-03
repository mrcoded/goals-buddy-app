import React from "react";
import { RocketIcon, SparkleIcon, ZapIcon } from "lucide-react";

import { HeroGradient } from "../background-gradient";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-div";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <HeroGradient />
      <div className="relative section-container section-padding">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            Powered by AI <SparkleIcon className="size-4 inline-block ml-2" />
          </Badge>
          <h1 className="capitalize">
            Find Your perfect{" "}
            <span className="block gradient-text">AI learning buddy</span>
          </h1>
          <p className="hero-subheading">
            Join communities, set your learning goals, and get matched with
            partners who share your passion. Chat, collaborate, and grow togther
            with AI-powered insights.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth/sign-up">
                <Button
                  className="link-button hero-button-outline group"
                  size="lg"
                >
                  <span className="hero-button-content">
                    <RocketIcon className="hero-button-icon-primary group-hover:rotate-12 group-hover:text-primary" />{" "}
                    Get Started for Free
                  </span>
                </Button>
              </Link>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/#pricing">
                <Button
                  className="link-button hero-button-outline group"
                  size="lg"
                >
                  <span className="hero-button-content">
                    <ZapIcon className="hero-button-icon-primary group-hover:scale-125 group-hover:rotate-12" />
                    Buy a Plan
                  </span>
                </Button>
              </Link>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
