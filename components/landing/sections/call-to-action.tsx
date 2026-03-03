import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const CallToActionSection = () => {
  return (
    <section className="section-padding section-container">
      <div className="border rounded-lg p-8 sm:p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2>Stop learning alone</h2>
          <p>
            Get matched with someone who&apos;s learning the same thing. Hold
            each other accountable and make real progress.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg">Try it free</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
