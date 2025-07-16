"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./hero_email.module.scss";

const HeroEmail: React.FC = () => {
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
            <div className={styles.badge}>Email</div>
            <h1 className={styles.title}>
              Assess Your Competitors' Email Traffic Performance
            </h1>
            <p className={styles.description}>
              Track how email campaigns drive traffic and engagement.
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
            <div className={styles.emailDevice}>
              <div className={styles.deviceScreen}>
                <div className={styles.emailInterface}>
                  <div className={styles.emailHeader}>
                    <div className={styles.emailSubject}>
                      <div className={styles.subjectLine}></div>
                    </div>
                    <div className={styles.emailMeta}>
                      <div className={styles.sender}></div>
                      <div className={styles.timestamp}></div>
                    </div>
                  </div>
                  <div className={styles.emailContent}>
                    <div className={styles.contentLine}></div>
                    <div className={styles.contentLine}></div>
                    <div className={styles.contentLine}></div>
                    <div className={styles.ctaButton}></div>
                  </div>
                </div>
              </div>
              <div className={styles.deviceBase}></div>
            </div>
            <div className={styles.emailIcon}>
              <div className={styles.envelope}>
                <div className={styles.envelopeFlap}></div>
                <div className={styles.envelopeBody}></div>
                <div className={styles.emailSymbol}>@</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroEmail;
