"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./hero_display_ads.module.scss";

const HeroDisplayAds: React.FC = () => {
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
            <div className={styles.badge}>Display Ads</div>
            <h1 className={styles.title}>
              Measure Your Competitors' Display Ad Performance
            </h1>
            <p className={styles.description}>
              Analyze the impact and reach of display ads and campaigns.
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
            <div className={styles.displayDevice}>
              <div className={styles.deviceScreen}>
                <div className={styles.adInterface}>
                  <div className={styles.displayAd}>
                    <div className={styles.adContainer}>
                      <div className={styles.adContent}>
                        <div className={styles.playButton}>
                          <div className={styles.playIcon}>▶</div>
                        </div>
                      </div>
                      <div className={styles.adControls}>
                        <div className={styles.controlBtn}>◀</div>
                        <div className={styles.controlBtn}>▶</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.deviceBase}></div>
            </div>
            <div className={styles.displayGraphics}>
              <div className={styles.adBanner}>
                <div className={styles.bannerContent}></div>
              </div>
              <div className={styles.videoIcon}>
                <div className={styles.videoFrame}>
                  <div className={styles.videoPlay}>▶</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDisplayAds;
