"use client";

import { Input, Button, Select } from "antd";
import { getSortedCountries } from "@/utils/countries";
import styles from "./hero-section.module.scss";

const { TextArea } = Input;
const { Option } = Select;

const HeroSection = () => {
  const handleCreate = () => {
    console.log("Creating keyword strategy...");
  };

  // Get sorted countries list
  const sortedCountries = getSortedCountries();

  return (
    <div className={styles.heroSection}>
      <div className={styles.header}>
        <h1>Keyword Strategy Builder</h1>
        <p>
          Drive more traffic with a ready-made keyword strategy, complete
          <br />
          with pillar pages and subpages to structure your website.
        </p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.inputGroup}>
          <div className={styles.inputHeader}>
            <span className={styles.inputLabel}>Enter seed keywords</span>
            <span className={styles.counter}>0/5</span>
          </div>

          <div className={styles.textareaWrapper}>
            <TextArea
              placeholder="1. books for elementary grades"
              className={styles.keywordTextarea}
              rows={6}
            />
            <div className={styles.aiFeature}>AI-powered feature</div>
          </div>
        </div>

        <div className={styles.formActions}>
          <div className={styles.actionButtons}>
            <Button className={styles.sampleButton}>View sample</Button>

            <div className={styles.createGroup}>
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
                className={styles.createButton}
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </div>

          <div className={styles.trialInfo}>
            <span>Or </span>
            <a href="#" className={styles.trialLink}>
              get a free trial
            </a>
            <span> for in-depth use of the tool</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
