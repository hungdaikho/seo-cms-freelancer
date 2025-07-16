import React from "react";
import HeroDailyTrends from "./components/hero_daily_trends";
import ReactFastSection from "./components/react_fast_section";
import styles from "./page.module.scss";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div className={styles.dailyTrendsPage}>
      <HeroDailyTrends />
      <ReactFastSection />
    </div>
  );
};

export default Page;
