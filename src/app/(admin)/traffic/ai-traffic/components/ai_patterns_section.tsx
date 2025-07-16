"use client";
import React from "react";
import { Card, Progress } from "antd";
import styles from "./ai_patterns_section.module.scss";

type Props = {};

const AiPatternsSection = ({}: Props) => {
  const features = [
    "Spot traffic trends from AI assistants",
    "Compare AI traffic share across competitors and devices",
    "See which AI assistant drives the most traffic",
  ];

  const topSources = [
    { name: "chatgpt.com", percentage: 30.13, color: "#722ed1" },
    { name: "claude.ai", percentage: 30.13, color: "#52c41a" },
    { name: "perplexity.ai", percentage: 30.13, color: "#1890ff" },
    { name: "gemini.google.com", percentage: 0.88, color: "#faad14" },
    { name: "deepseek.com", percentage: 30.13, color: "#f5222d" },
  ];

  return (
    <div className={styles.patternsSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Uncover AI assistant traffic patterns
            </h2>

            <ul className={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <div className={styles.bullet}></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.visualContent}>
            <div className={styles.dashboardContainer}>
              <Card className={styles.sourcesCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Top Sources</h3>
                </div>

                <div className={styles.sourcesList}>
                  {topSources.map((source, index) => (
                    <div key={index} className={styles.sourceItem}>
                      <div className={styles.sourceInfo}>
                        <span className={styles.sourceName}>{source.name}</span>
                        <span className={styles.sourcePercentage}>
                          {source.percentage}%
                        </span>
                      </div>
                      <Progress
                        percent={source.percentage}
                        strokeColor={source.color}
                        showInfo={false}
                        strokeWidth={6}
                        className={styles.sourceProgress}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={styles.statsCard}>
                <div className={styles.statsContent}>
                  <div className={styles.mainStat}>
                    <span className={styles.statValue}>305.7M</span>
                    <span className={styles.statLabel}>Visits</span>
                  </div>

                  <div className={styles.deviceStats}>
                    <div className={styles.deviceItem}>
                      <div className={styles.deviceIcon}>🖥️</div>
                      <span className={styles.deviceLabel}>Desktop</span>
                    </div>
                    <div className={styles.deviceItem}>
                      <div className={styles.deviceIcon}>📱</div>
                      <span className={styles.deviceLabel}>Mobile</span>
                    </div>
                  </div>

                  <div className={styles.highlight}>
                    <span className={styles.highlightText}>ebay.com</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPatternsSection;
