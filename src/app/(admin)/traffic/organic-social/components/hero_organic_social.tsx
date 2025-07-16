"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./hero_organic_social.module.scss";

const HeroOrganicSocial: React.FC = () => {
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
            <div className={styles.badge}>Organic Social</div>
            <h1 className={styles.title}>
              Unpack Your Competitors' Social Media Traffic Strategies
            </h1>
            <p className={styles.description}>
              See how organic social contributes to traffic and engagement.
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
            <div className={styles.socialDevice}>
              <div className={styles.deviceScreen}>
                <div className={styles.socialInterface}>
                  <div className={styles.socialPost}>
                    <div className={styles.postHeader}>
                      <div className={styles.avatar}></div>
                      <div className={styles.userInfo}>
                        <div className={styles.username}></div>
                        <div className={styles.timestamp}></div>
                      </div>
                    </div>
                    <div className={styles.postContent}>
                      <div className={styles.postText}></div>
                      <div className={styles.postImage}></div>
                    </div>
                    <div className={styles.postActions}>
                      <div className={styles.actionBtn}></div>
                      <div className={styles.actionBtn}></div>
                      <div className={styles.actionBtn}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.deviceBase}></div>
            </div>
            <div className={styles.handSocial}>
              <div className={styles.hand}>
                <div className={styles.finger}></div>
                <div className={styles.thumb}></div>
                <div className={styles.socialIcon}>
                  <div className={styles.heart}>♥</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOrganicSocial;
