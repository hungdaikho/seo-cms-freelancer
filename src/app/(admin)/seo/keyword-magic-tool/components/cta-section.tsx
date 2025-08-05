"use client";

import { Button, Input, Select } from "antd";
import { getSortedCountries } from "@/utils/countries";
import styles from "./cta-section.module.scss";

const { Option } = Select;

const CTASection = () => {
  // Get sorted countries list
  const sortedCountries = getSortedCountries();

  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
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
                showSearch
                placeholder="Select country"
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {sortedCountries.map((country) => (
                  <Option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </Option>
                ))}
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

          <div className={styles.additionalInfo}>
            <p>
              Alternatively, you can enter a keyword and your website's URL and
              let our AI-powered algorithms
              <br />
              determine which keywords you should target.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
