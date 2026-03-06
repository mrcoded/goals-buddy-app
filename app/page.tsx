"use client";

import { MotionDiv } from "@/components/ui/motion-div";
import HeroSection from "@/components/landing/sections/hero";
import PricingSection from "@/components/landing/sections/pricing";
import FeatureSection from "@/components/landing/sections/features";
import HowItWorksSection from "@/components/landing/sections/how-it-works";
import { BackgroundGradient } from "@/components/landing/background-gradient";
import CallToActionSection from "@/components/landing/sections/call-to-action";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <BackgroundGradient />
      <div className="relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FeatureSection />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HowItWorksSection />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PricingSection />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CallToActionSection />
        </MotionDiv>
      </div>
    </div>
  );
}
