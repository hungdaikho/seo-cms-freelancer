"use client";

import React from "react";
import { Progress } from "antd";
import { TbUsers, TbChartAreaLine, TbTarget } from "react-icons/tb";
import styles from "./audience_overlap_tracking.module.scss";

const AudienceOverlapTracking: React.FC = () => {
  const overlapData = [
    { source: "amazon.com", percentage: 315.7, color: "#f59e0b" },
    { source: "ebay.com", percentage: 123.7, color: "#10b981" },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Analyze overlap, spot gaps, and expand reach
            </h2>

            <ul className={styles.trackingList}>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                See audience crossover among key competitors
              </li>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Find high-value websites that share traffic with competitors
              </li>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Benchmark your position by comparing reach across key domains
              </li>
            </ul>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.dashboardPreview}>
              <div className={styles.dashboardHeader}>
                <TbUsers className={styles.dashboardIcon} />
                <span className={styles.dashboardTitle}>Audience Overlap</span>
              </div>

              <div className={styles.overlapSection}>
                <div className={styles.overlapVisualization}>
                  <svg
                    width="100%"
                    height="200"
                    viewBox="0 0 300 200"
                    className={styles.overlapSvg}
                  >
                    {/* Background */}
                    <rect width="300" height="200" fill="#f8fafc" rx="8" />

                    {/* Venn Diagram */}
                    <g className={styles.vennDiagram}>
                      {/* Left Circle - Your Site */}
                      <circle
                        cx="90"
                        cy="100"
                        r="60"
                        fill="#3b82f6"
                        opacity="0.6"
                        className={styles.yourCircle}
                      />

                      {/* Right Circle - Competitor */}
                      <circle
                        cx="210"
                        cy="100"
                        r="60"
                        fill="#10b981"
                        opacity="0.6"
                        className={styles.competitorCircle}
                      />

                      {/* Overlap Area */}
                      <path
                        d="M 120 70 A 60 60 0 0 1 120 130 A 60 60 0 0 1 120 70"
                        fill="#8b5cf6"
                        opacity="0.8"
                        className={styles.overlapPath}
                      />
                    </g>

                    {/* Labels */}
                    <text
                      x="60"
                      y="50"
                      fontSize="12"
                      fontWeight="600"
                      fill="#3b82f6"
                      textAnchor="middle"
                    >
                      You
                    </text>
                    <text
                      x="240"
                      y="50"
                      fontSize="12"
                      fontWeight="600"
                      fill="#10b981"
                      textAnchor="middle"
                    >
                      Competitor
                    </text>
                    <text
                      x="150"
                      y="105"
                      fontSize="11"
                      fontWeight="600"
                      fill="#ffffff"
                      textAnchor="middle"
                    >
                      Shared
                    </text>

                    {/* Shared Count */}
                    <rect
                      x="120"
                      y="160"
                      width="60"
                      height="25"
                      fill="#10b981"
                      rx="12"
                      opacity="0.9"
                    />
                    <text
                      x="150"
                      y="175"
                      fontSize="12"
                      fontWeight="700"
                      fill="#ffffff"
                      textAnchor="middle"
                    >
                      820.4M
                    </text>
                  </svg>
                </div>

                <div className={styles.overlapStats}>
                  <div className={styles.statsHeader}>
                    <TbTarget className={styles.statsIcon} />
                    <span className={styles.statsTitle}>Shared</span>
                    <span className={styles.sharedCount}>820.4M</span>
                  </div>

                  <div className={styles.audienceStats}>
                    {overlapData.map((item, index) => (
                      <div key={index} className={styles.statItem}>
                        <div
                          className={styles.sourceDot}
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <div className={styles.sourceName}>{item.source}</div>
                        <div className={styles.sourceValue}>
                          {item.percentage}K
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.expansionMetrics}>
                    <div className={styles.metricItem}>
                      <div className={styles.metricLabel}>Overlap Rate</div>
                      <div className={styles.metricValue}>68.5%</div>
                    </div>
                    <div className={styles.metricItem}>
                      <div className={styles.metricLabel}>
                        Expansion Potential
                      </div>
                      <div className={styles.metricValue}>31.5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceOverlapTracking;
