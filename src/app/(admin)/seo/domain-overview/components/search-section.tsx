"use client";
import React, { useState } from "react";
import { Input, Button, Select } from "antd";
import { FiGlobe } from "react-icons/fi";
import styles from "./search-section.module.scss";

const { Option } = Select;

interface SearchSectionProps {
  onSearch: (domain: string, location: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("Worldwide");

  const handleSearch = () => {
    onSearch(domain, location);
  };

  return (
    <div className={styles.searchSection}>
      <div className={styles.header}>
        <h1>Domain Overview</h1>
        <p>
          Get instant insights into strengths and weaknesses of your competitor
          or prospective customer.
        </p>
      </div>

      <div className={styles.searchForm}>
        <Input
          placeholder="Enter domain, subdomain or URL"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className={styles.domainInput}
        />
        <Select
          value={location}
          onChange={setLocation}
          className={styles.locationSelect}
          suffixIcon={<FiGlobe />}
        >
          <Option value="Worldwide">Worldwide</Option>
          <Option value="US">United States</Option>
          <Option value="UK">United Kingdom</Option>
          <Option value="CA">Canada</Option>
        </Select>
        <Button
          type="primary"
          onClick={handleSearch}
          className={styles.searchButton}
        >
          Search
        </Button>
      </div>

      <div className={styles.examples}>
        <span>Examples: </span>
        <a href="#" onClick={(e) => e.preventDefault()}>
          worldwildlife.org
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          unicef.org/stories
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          edition.cnn.com
        </a>
      </div>
    </div>
  );
};

export default SearchSection;
