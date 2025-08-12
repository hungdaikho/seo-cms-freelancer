"use client";

import React, { useState } from "react";
import { Input, Button, Select } from "antd";
import { FaFlag } from "react-icons/fa";
import styles from "./hero-section.module.scss";

const { Option } = Select;

const HeroSection = () => {
  const [keywords, setKeywords] = useState("");
  const [country, setCountry] = useState("US (Desktop)");

  return (
    <div className={styles.heroSection}>
      <h1 className={styles.title}>SEO Content Template</h1>
      <p className={styles.subtitle}>
        Generate actionable briefs for SEO friendly content with just a few
        clicks.
      </p>

      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <Input
            size="large"
            placeholder="Enter your target keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className={styles.keywordInput}
          />
          <Select
            size="large"
            value={country}
            onChange={setCountry}
            className={styles.countrySelect}
            suffixIcon={<FaFlag />}
          >
            <Option value="US (Desktop)">🇺🇸 US (Desktop)</Option>
            <Option value="UK (Desktop)">🇬🇧 UK (Desktop)</Option>
            <Option value="CA (Desktop)">🇨🇦 CA (Desktop)</Option>
          </Select>
          <Button type="primary" size="large" className={styles.generateButton}>
            Create content template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
