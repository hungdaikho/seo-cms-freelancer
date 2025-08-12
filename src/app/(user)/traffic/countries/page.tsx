"use client";

import React from "react";
import HeroCountries from "./components/hero_countries";
import CountriesTracking from "./components/countries_tracking";
import styles from "./page.module.scss";

const CountriesPage: React.FC = () => {
  return (
    <div className={styles.countriesPage}>
      <HeroCountries />
      <CountriesTracking />
    </div>
  );
};

export default CountriesPage;
