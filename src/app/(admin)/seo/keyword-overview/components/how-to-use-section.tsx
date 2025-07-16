"use client";

import { Input, Button, Select } from "antd";
import styles from "./how-to-use-section.module.scss";

const { Option } = Select;

const HowToUseSection = () => {
  return (
    <div className={styles.howToUseSection}>
      <div className={styles.sectionHeader}>
        <h2>How to Use Our Keyword Checker</h2>
        <p>
          Keyword Overview is easy to use to check keyword difficulty, monthly
          search volume,
          <br />
          search intent, and many other important metrics. Just follow these
          steps:
        </p>
      </div>

      <div className={styles.stepsContainer}>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3>Enter your target keyword into the text field.</h3>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3>Click the "Search" button.</h3>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3>
                View the keyword overview results, including the keyword
                difficulty score, search volume, competitive density, and
                related keyword insights.
              </h3>
            </div>
          </div>
        </div>

        <div className={styles.demoSection}>
          <div className={styles.demoHeader}>
            <div className={styles.keywordTips}>
              <span className={styles.tipsLabel}>Keyword tips</span>
            </div>
            <div className={styles.examples}>
              <span>Examples:</span>
              <a href="#">loans</a>
              <a href="#">movies</a>
              <a href="#">how to buy audible books</a>
            </div>
          </div>

          <div className={styles.demoForm}>
            <Input
              placeholder="Enter keyword"
              className={styles.keywordInput}
            />

            <div className={styles.formRow}>
              <Input
                placeholder="🔮 Enter domain for personalized data"
                className={styles.domainInput}
              />
              <div className={styles.aiFeature}>AI-powered feature</div>

              <Select
                defaultValue="US"
                className={styles.countrySelect}
                suffixIcon={<span>🇺🇸</span>}
              >
                <Option value="US">🇺🇸 US</Option>
                <Option value="UK">🇬🇧 UK</Option>
                <Option value="CA">🇨🇦 CA</Option>
              </Select>

              <Select
                placeholder="📍 Select location"
                className={styles.locationSelect}
              >
                <Option value="nationwide">Nationwide</Option>
                <Option value="local">Local</Option>
              </Select>

              <Button
                type="primary"
                size="large"
                className={styles.searchButton}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUseSection;
