"use client";

import AiHero from "./components/ai-hero";
import AiInsights from "./components/ai-insights";
import AiSteps from "./components/ai-steps";
import AiFeatures from "./components/ai-features";
import AiFaq from "./components/ai-faq";
import AiCta from "./components/ai-cta";

export default function AiPage() {
  return (
    <>
      <AiHero />
      <AiInsights />
      <AiSteps />
      <AiFeatures />
      <AiFaq />
      <AiCta />
    </>
  );
}
