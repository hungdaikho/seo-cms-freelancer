"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import SocialHero from "./social-hero";
import SocialTracker from "./social-tracker";
import SocialContent from "./social-content";
import SocialProduction from "./social-production";
import SocialInsights from "./social-insights";
import SocialPricing from "./social-pricing";
import SocialRoles from "./social-roles";
import SocialTestimonials from "./social-testimonials";
import styles from "../page.module.scss";

export default function SocialPageContent() {
  const searchParams = useSearchParams();
  const heroRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToSection = () => {
      // Check for query parameters and scroll to corresponding section
      if (searchParams.has("media-tracker") && trackerRef.current) {
        trackerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (searchParams.has("media-poster") && posterRef.current) {
        posterRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (searchParams.has("analytics") && analyticsRef.current) {
        analyticsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // Add a small delay to ensure components are rendered
    const timer = setTimeout(scrollToSection, 100);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className={styles.socialPage}>
      <div ref={heroRef}>
        <SocialHero />
      </div>
      <div ref={trackerRef} id="media-tracker">
        <SocialTracker />
      </div>
      <div ref={posterRef} id="media-poster">
        <SocialContent />
        <SocialProduction />
      </div>
      <div ref={analyticsRef} id="analytics">
        <SocialInsights />
      </div>
      <SocialPricing />
      <SocialRoles />
      <SocialTestimonials />
    </div>
  );
}
