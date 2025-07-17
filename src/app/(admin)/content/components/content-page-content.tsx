"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ContentHeroSection from "./content_hero_section";
import SeoContentSection from "./seo_content_section";
import AiWritingSection from "./ai_writing_section";
import ChromeExtensionSection from "./chrome_extension_section";
import styles from "../page.module.scss";

export default function ContentPageContent() {
  const searchParams = useSearchParams();
  const topicFinderRef = useRef<HTMLDivElement>(null);
  const seoBriefRef = useRef<HTMLDivElement>(null);
  const aiArticleRef = useRef<HTMLDivElement>(null);
  const contentOptimizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const queryParam =
      searchParams.get("topic-finder") !== null
        ? "topic-finder"
        : searchParams.get("seo-brief-generator") !== null
        ? "seo-brief-generator"
        : searchParams.get("ai-article-generator") !== null
        ? "ai-article-generator"
        : searchParams.get("content-optimizer") !== null
        ? "content-optimizer"
        : searchParams.get("my-content") !== null
        ? "my-content"
        : null;

    if (queryParam) {
      setTimeout(() => {
        switch (queryParam) {
          case "topic-finder":
            topicFinderRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            break;
          case "seo-brief-generator":
            seoBriefRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            break;
          case "ai-article-generator":
            aiArticleRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            break;
          case "content-optimizer":
            contentOptimizerRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            break;
          case "my-content":
            window.scrollTo({ top: 0, behavior: "smooth" });
            break;
        }
      }, 100);
    }
  }, [searchParams]);

  return (
    <div className={styles.content_page}>
      <div ref={topicFinderRef}>
        <ContentHeroSection />
      </div>
      <div ref={seoBriefRef}>
        <SeoContentSection />
      </div>
      <div ref={aiArticleRef}>
        <AiWritingSection />
      </div>
      <div ref={contentOptimizerRef}>
        <ChromeExtensionSection />
      </div>
    </div>
  );
}
