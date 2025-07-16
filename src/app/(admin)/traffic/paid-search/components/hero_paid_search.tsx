"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./hero_paid_search.module.scss";

const HeroPaidSearch: React.FC = () => {
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
            <div className={styles.badge}>Paid Search</div>
            <h1 className={styles.title}>
              Pinpoint Your Competitors' Winning PPC Strategies
            </h1>
            <p className={styles.description}>
              See how competitors use paid keywords and landing pages to win
              traffic.
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
            <div className={styles.ppcDevice}>
              <div className={styles.deviceScreen}>
                <div className={styles.adsInterface}>
                  <div className={styles.adHeader}>
                    <div className={styles.adLabel}>Ad</div>
                    <div className={styles.adUrl}>www.example.com</div>
                  </div>
                  <div className={styles.adContent}>
                    <div className={styles.adTitle}></div>
                    <div className={styles.adDescription}></div>
                  </div>
                  <div className={styles.adFooter}>
                    <div className={styles.rating}>
                      <span className={styles.star}>★</span>
                      <span className={styles.star}>★</span>
                      <span className={styles.star}>★</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.deviceBase}></div>
            </div>
            <div className={styles.handPointer}>
              <div className={styles.hand}>
                <div className={styles.finger}></div>
                <div className={styles.thumb}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPaidSearch;
