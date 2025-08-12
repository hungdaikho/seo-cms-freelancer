import React from "react";
import Header from "./components/header";
import CategoryScores from "./components/category-scores";
import VolatilityChart from "./components/volatility-chart";
import FeaturesOccurrence from "./components/features-occurrence";
import styles from "./page.module.scss";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Header />
        <CategoryScores />
        <VolatilityChart />
        <FeaturesOccurrence />
      </div>
    </div>
  );
};

export default Page;
