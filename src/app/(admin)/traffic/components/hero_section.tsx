"use client";
import React, { useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./hero_section.module.scss";

type Props = {};

const HeroSection = ({}: Props) => {
  const [competitors, setCompetitors] = useState<string[]>([""]);
  const [mainDomain, setMainDomain] = useState("");

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
            <h1 className={styles.title}>
              Traffic & Market insights that deliver results
            </h1>
            <p className={styles.subtitle}>
              Instantly reveal what's working for your competitors and how to
              grow faster.
            </p>

            <div className={styles.formSection}>
              <div className={styles.inputGroup}>
                <Input
                  size="large"
                  placeholder="Enter your domain, subdomain or subfolder"
                  value={mainDomain}
                  onChange={(e) => setMainDomain(e.target.value)}
                  className={styles.mainInput}
                />
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

          <div className={styles.imageSection}>
            <div className={styles.illustration}>
              <div className={styles.mockupDevice}>
                <div className={styles.screen}>
                  <div className={styles.chart}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
