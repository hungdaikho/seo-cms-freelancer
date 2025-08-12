"use client";

import React, { useState } from "react";
import { Input, Button, Select, Card } from "antd";
import { FiX } from "react-icons/fi";
import styles from "./hero-section.module.scss";

const { TextArea } = Input;
const { Option } = Select;

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [urlList, setUrlList] = useState("example.com\nhttp://example.com");
  const [resultsScope, setResultsScope] = useState("Auto");
  const [urlCount, setUrlCount] = useState(2);

  const handleCompare = () => {
    console.log("Starting bulk analysis...");
    // Handle comparison logic here
  };

  const handleClearAll = () => {
    setUrlList("");
    setUrlCount(0);
  };

  const handleUrlListChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUrlList(value);

    // Count non-empty lines
    const lines = value.split("\n").filter((line) => line.trim() !== "");
    setUrlCount(lines.length);
  };

  const maxUrls = 200;

  return (
    <div className={styles.heroSection}>
      <Card className={styles.analysisCard}>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Bulk Backlink Analysis</h1>
            <p className={styles.subtitle}>
              Analyze your competitors, find link building opportunities, and
              export results to XLSX or CSV.
            </p>
          </div>

          <div className={styles.inputSection}>
            <div className={styles.inputHeader}>
              <label className={styles.inputLabel}>
                Enter up to {maxUrls} URLs/domains, one per line • {urlCount}/
                {maxUrls}
              </label>
            </div>

            <div className={styles.textareaContainer}>
              <TextArea
                value={urlList}
                onChange={handleUrlListChange}
                placeholder="example.com&#10;http://example.com"
                className={styles.urlTextarea}
                rows={8}
                maxLength={10000}
              />

              <div className={styles.urlCounter}>
                <span className={styles.counterText}>
                  {urlCount.toLocaleString()}/{maxUrls.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.leftControls}>
              <div className={styles.scopeControl}>
                <label className={styles.scopeLabel}>Results scope</label>
                <Select
                  value={resultsScope}
                  onChange={setResultsScope}
                  className={styles.scopeSelect}
                  size="large"
                >
                  <Option value="Auto">Auto</Option>
                  <Option value="Domain">Domain</Option>
                  <Option value="Exact URL">Exact URL</Option>
                  <Option value="Subdomain">Subdomain</Option>
                </Select>
              </div>

              <Button
                type="primary"
                size="large"
                className={styles.compareButton}
                onClick={handleCompare}
                disabled={urlCount === 0}
              >
                Compare
              </Button>
            </div>

            <div className={styles.rightControls}>
              <Button
                type="text"
                className={styles.clearButton}
                onClick={handleClearAll}
                icon={<FiX />}
              >
                Clear all
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HeroSection;
