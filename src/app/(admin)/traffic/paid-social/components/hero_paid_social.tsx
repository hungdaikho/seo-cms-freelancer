"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./hero_paid_social.module.scss";

const HeroPaidSocial: React.FC = () => {
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
            <div className={styles.badge}>Paid Social</div>
            <h1 className={styles.title}>
              Reveal Your Competitors' Paid Social Strategies
            </h1>
            <p className={styles.description}>
              Understand how paid social campaigns drive competitor traffic,
              engagement, and ROAS.
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
            <div className={styles.paidSocialDevice}>
              <div className={styles.deviceScreen}>
                <div className={styles.adInterface}>
                  <div className={styles.sponsoredAd}>
                    <div className={styles.adHeader}>
                      <div className={styles.sponsoredLabel}>Sponsored</div>
                      <div className={styles.adActions}>
                        <div className={styles.closeBtn}>×</div>
                        <div className={styles.menuBtn}>⋯</div>
                      </div>
                    </div>
                    <div className={styles.adContent}>
                      <div className={styles.adImage}></div>
                      <div className={styles.adText}>
                        <div className={styles.adTitle}></div>
                        <div className={styles.adDescription}></div>
                      </div>
                    </div>
                    <div className={styles.adFooter}>
                      <div className={styles.ctaButton}>Shop Now</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.deviceBase}></div>
            </div>
            <div className={styles.handSocialAd}>
              <div className={styles.hand}>
                <div className={styles.finger}></div>
                <div className={styles.thumb}></div>
                <div className={styles.adIcons}>
                  <div className={styles.dollarIcon}>$</div>
                  <div className={styles.heartIcon}>♥</div>
                  <div className={styles.shareIcon}>↗</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPaidSocial;
