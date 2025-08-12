"use client";
import React, { useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./hero_referral.module.scss";

type Props = {};

const HeroReferral = ({}: Props) => {
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
            <div className={styles.badge}>Referral</div>

            <h1 className={styles.title}>
              Uncover Your Competitors' Winning Referral Strategies
            </h1>

            <p className={styles.description}>
              See which referral sources drive traffic to competitors to find
              new partnership opportunities.
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
              <div className={styles.networkDevice}>
                <div className={styles.deviceScreen}>
                  <div className={styles.networkNodes}>
                    <div className={styles.centerNode}></div>
                    <div className={styles.outerNode}></div>
                    <div className={styles.outerNode}></div>
                    <div className={styles.outerNode}></div>
                  </div>
                  <div className={styles.connections}>
                    <div className={styles.connection}></div>
                    <div className={styles.connection}></div>
                    <div className={styles.connection}></div>
                  </div>
                </div>
                <div className={styles.deviceBase}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroReferral;
