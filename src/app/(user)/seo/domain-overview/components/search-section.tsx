"use client";
import React, { useState } from "react";
import { Input, Button, Select } from "antd";
import { FiGlobe } from "react-icons/fi";
import { getSortedCountries } from "@/utils/countries";
import styles from "./search-section.module.scss";

const { Option } = Select;

interface SearchSectionProps {
  onSearch: (domain: string, location: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("Worldwide");

  // Get sorted countries list
  const sortedCountries = getSortedCountries();

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
          showSearch
          placeholder="Select location"
          filterOption={(input, option) =>
            (option?.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          <Option value="Worldwide">🌍 Worldwide</Option>
          {sortedCountries.map((country) => (
            <Option key={country.code} value={country.code}>
              {country.flag} {country.name}
            </Option>
          ))}
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
