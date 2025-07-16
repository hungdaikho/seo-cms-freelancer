"use client";

import { Input, Button, Select } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./search-section.module.scss";

const { Option } = Select;

interface SearchSectionProps {
  onSearch?: (keyword: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const handleSearch = () => {
    // Implement search logic
    console.log("Searching keyword magic tool...");
  };

  return (
    <div className={styles.searchSection}>
      <div className={styles.header}>
        <div className={styles.badge}>Free Keyword Research Tool</div>
        <h1>
          Find SEO Keyword Suggestions Instantly
          <br />
          with the Keyword Magic Tool
        </h1>
        <p>
          Discover millions of high-value keywords from popular terms
          <br />
          to long-tail phrases to improve your website's marketing performance.
        </p>
        <p className={styles.subDescription}>
          Enter a word or phrase to find related keywords. Add your website URL
          <br />
          for personalized, AI-driven suggestions.
        </p>
      </div>

      <div className={styles.searchForm}>
        <div className={styles.searchRow}>
          <div className={styles.keywordInput}>
            <div className={styles.inputHeader}>
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
            <Input
              placeholder="Enter keyword"
              className={styles.keywordField}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.domainInput}>
            <Input
              placeholder="🔮 Enter domain for personalized data"
              className={styles.domainField}
            />
            <div className={styles.aiFeature}>AI-powered feature</div>
          </div>

          <Select
            defaultValue="US"
            className={styles.countrySelect}
            suffixIcon={<span>🇺🇸</span>}
          >
            <Option value="US">🇺🇸 US</Option>
            <Option value="UK">🇬🇧 UK</Option>
            <Option value="CA">🇨🇦 CA</Option>
          </Select>

          <Button
            type="primary"
            size="large"
            className={styles.searchButton}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
