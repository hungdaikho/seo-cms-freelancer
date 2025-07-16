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
    console.log("Searching keyword...");
  };

  return (
    <div className={styles.searchSection}>
      <div className={styles.header}>
        <div className={styles.badge}>Free Keyword Checker</div>
        <h1>
          Check Keyword Difficulty, Competition, Trends,
          <br />
          and More with Keyword Overview
        </h1>
        <p>
          Instantly evaluate how hard it will be to rank in the top 10 results
          for a
          <br />
          search term. Along with other critical keyword metrics.
        </p>
      </div>

      <div className={styles.searchForm}>
        <div className={styles.searchRow}>
          <div className={styles.keywordInput}>
            <div className={styles.inputLabel}>
              <span>Keywords</span>
              <span className={styles.counter}>0/100</span>
            </div>
            <Input
              placeholder="Enter keywords separated by commas"
              className={styles.keywordField}
              suffix={<AiOutlineSearch />}
            />
          </div>
        </div>

        <div className={styles.optionsRow}>
          <div className={styles.examples}>
            <span>Examples:</span>
            <a href="#">loans</a>
            <a href="#">movies</a>
            <a href="#">how to buy audible books</a>
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
