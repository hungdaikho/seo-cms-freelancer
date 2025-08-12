import React from "react";
import HeroSection from "./components/hero-section";
import ContentBriefs from "./components/content-briefs";
import EmpowerWriters from "./components/empower-writers";
import Benefits from "./components/benefits";
import styles from "./page.module.scss";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <HeroSection />
        <ContentBriefs />
        <EmpowerWriters />
        <Benefits />
      </div>
    </div>
  );
};

export default Page;
