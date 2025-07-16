"use client";
import React, { useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./hero_analytics.module.scss";

type Props = {};

const HeroAnalytics = ({}: Props) => {
  const [mainDomain, setMainDomain] = useState("");
  const [competitors, setCompetitors] = useState<string[]>([""]);

  const addCompetitor = () => {
    setCompetitors([...competitors, ""]);
  };

  const updateCompetitor = (index: number, value: string) => {
    const newCompetitors = [...competitors];
    newCompetitors[index] = value;
    setCompetitors(newCompetitors);
  };

  const handleAnalyze = () => {
    console.log("Analyzing:", { mainDomain, competitors });
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <div className={styles.badge}>Traffic Analytics</div>

            <h1 className={styles.title}>Analyze Competitor Traffic</h1>

            <p className={styles.description}>
              Get an overview of any website's traffic to uncover how
              competitors attract and engage audiences.
            </p>

            <div className={styles.formSection}>
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Main</span>
                  <Input
                    size="large"
                    placeholder="Enter your domain, subdomain or subfolder"
                    value={mainDomain}
                    onChange={(e) => setMainDomain(e.target.value)}
                    className={styles.mainInput}
                  />
                </div>
              </div>

              {competitors.map((competitor, index) => (
                <div key={index} className={styles.inputGroup}>
                  <Input
                    size="large"
                    placeholder="Enter competitor domain, subdomain or subfolder"
                    value={competitor}
                    onChange={(e) => updateCompetitor(index, e.target.value)}
                    className={styles.competitorInput}
                  />
                </div>
              ))}

              <div className={styles.actions}>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={addCompetitor}
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
              <div className={styles.deviceMockup}>
                <div className={styles.screen}>
                  <div className={styles.chartArea}>
                    <div className={styles.chartLines}>
                      <div className={styles.chartLine}></div>
                      <div className={styles.chartPoints}>
                        <div className={styles.point}></div>
                        <div className={styles.point}></div>
                        <div className={styles.point}></div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.deviceElements}>
                    <div className={styles.element}></div>
                    <div className={styles.element}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAnalytics;
