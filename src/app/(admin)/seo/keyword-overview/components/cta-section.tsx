"use client";

import { Button, Input, Select } from "antd";
import { AiOutlineRight } from "react-icons/ai";
import styles from "./cta-section.module.scss";

const { Option } = Select;

const CTASection = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <h2>Get all the keyword research you need</h2>

          <div className={styles.demoForm}>
            <div className={styles.formHeader}>
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

            <div className={styles.formFields}>
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
    </div>
  );
};

export default CTASection;
