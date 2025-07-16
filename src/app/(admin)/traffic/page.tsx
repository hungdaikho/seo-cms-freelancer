import React from "react";
import HeroSection from "./components/hero_section";
import FeaturesSection from "./components/features_section";
import TrendsApiSection from "./components/trends_api_section";
import styles from "./page.module.scss";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div className={styles.trafficPage}>
      <HeroSection />
      <FeaturesSection />
      <TrendsApiSection />
    </div>
  );
};

export default Page;
