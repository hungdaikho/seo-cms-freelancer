import React from "react";
import HeroAiTraffic from "./components/hero_ai_traffic";
import AiPatternsSection from "./components/ai_patterns_section";
import styles from "./page.module.scss";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div className={styles.aiTrafficPage}>
      <HeroAiTraffic />
      <AiPatternsSection />
    </div>
  );
};

export default Page;
