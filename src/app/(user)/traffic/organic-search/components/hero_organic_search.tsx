"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./hero_organic_search.module.scss";

const HeroOrganicSearch: React.FC = () => {
  const [mainDomain, setMainDomain] = useState("");
  const [competitors, setCompetitors] = useState([""]);

  const handleAddCompetitor = () => {
    setCompetitors([...competitors, ""]);
  };

  const handleCompetitorChange = (index: number, value: string) => {
    const newCompetitors = [...competitors];
    newCompetitors[index] = value;
    setCompetitors(newCompetitors);
  };

  const handleAnalyze = () => {
    console.log("Analyzing:", { mainDomain, competitors });
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <div className={styles.badge}>Organic Search</div>
            <h1 className={styles.title}>
              Unlock Your Competitors' Winning Search Strategies
            </h1>
            <p className={styles.description}>
              Analyze keywords, content, and pages that drive organic traffic to
              competitor sites.
            </p>
          </div>

          <div className={styles.formSection}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Main</span>
                <Input
                  placeholder="Enter your domain, subdomain or subfolder"
                  value={mainDomain}
                  onChange={(e) => setMainDomain(e.target.value)}
                  className={styles.mainInput}
                  size="large"
                />
              </div>
            </div>

            {competitors.map((competitor, index) => (
              <div key={index} className={styles.inputGroup}>
                <Input
                  placeholder="Enter competitor domain, subdomain or subfolder"
                  value={competitor}
                  onChange={(e) =>
                    handleCompetitorChange(index, e.target.value)
                  }
                  className={styles.competitorInput}
                  size="large"
                />
              </div>
            ))}

            <div className={styles.actions}>
              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={handleAddCompetitor}
                className={styles.addBtn}
              >
                Add more competitors
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleAnalyze}
                className={styles.analyzeBtn}
              >
                Analyze
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.visualSection}>
          <div className={styles.illustration}>
            <div className={styles.searchDevice}>
              <div className={styles.deviceScreen}>
                <div className={styles.searchInterface}>
                  <div className={styles.searchBar}>
                    <div className={styles.searchIcon}></div>
                    <div className={styles.searchText}></div>
                  </div>
                  <div className={styles.resultsList}>
                    <div className={styles.resultItem}></div>
                    <div className={styles.resultItem}></div>
                    <div className={styles.resultItem}></div>
                  </div>
                </div>
              </div>
              <div className={styles.deviceBase}></div>
            </div>
            <div className={styles.magnifyingGlass}>
              <div className={styles.glassLens}></div>
              <div className={styles.glassHandle}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOrganicSearch;
