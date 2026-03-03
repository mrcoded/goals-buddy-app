import React from "react";
import SectionHeading from "../section-heading";
import { PricingTable } from "@clerk/nextjs";

const PricingSection = () => {
  return (
    <section className="section-container section-padding" id="pricing">
      <SectionHeading
        title="Simple, Transparent Pricing"
        description="Choose the plan that works best for you. Start free 
        and upgrade as you grow"
      />
      <div className="max-w-full mx-auto">
        <PricingTable />
      </div>
    </section>
  );
};

export default PricingSection;
