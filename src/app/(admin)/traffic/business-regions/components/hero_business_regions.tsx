"use client";

import React from "react";
import { Input, Button } from "antd";
import styles from "./hero_business_regions.module.scss";

const HeroBusinessRegions: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.badge}>Business Regions</div>
            <h1 className={styles.title}>
              Analyze Competitor Traffic by Global Business Regions
            </h1>
            <p className={styles.description}>
              Evaluate traffic and engagement across EMEA, APAC, LATAM, and
              North America.
            </p>

            <div className={styles.inputSection}>
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Main</span>
                  <Input
                    placeholder="Enter your domain, subdomain or subfolder"
                    className={styles.mainInput}
                    size="large"
                  />
                </div>
                <Input
                  placeholder="Enter competitor domain, subdomain or subfolder"
                  className={styles.competitorInput}
                  size="large"
                />
                <button className={styles.addCompetitor}>
                  + Add more competitors
                </button>
              </div>
              <Button
                type="primary"
                size="large"
                className={styles.analyzeButton}
              >
                Analyze
              </Button>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.businessVisualization}>
              <div className={styles.businessContainer}>
                <svg
                  className={styles.businessIcon}
                  viewBox="0 0 300 300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Business globe with regions */}
                  <circle
                    cx="150"
                    cy="150"
                    r="120"
                    fill="#f0f9ff"
                    stroke="#bae0ff"
                    strokeWidth="3"
                  />

                  {/* Regional divisions */}
                  <path
                    d="M 150 30 A 120 120 0 0 1 270 150"
                    fill="none"
                    stroke="#1890ff"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 270 150 A 120 120 0 0 1 150 270"
                    fill="none"
                    stroke="#52c41a"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 150 270 A 120 120 0 0 1 30 150"
                    fill="none"
                    stroke="#722ed1"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 30 150 A 120 120 0 0 1 150 30"
                    fill="none"
                    stroke="#fa8c16"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />

                  {/* Regional labels and indicators */}
                  <g className={styles.businessRegions}>
                    {/* North America - Top Right */}
                    <circle
                      cx="210"
                      cy="90"
                      r="15"
                      fill="#1890ff"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="r"
                        values="15;18;15"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="210"
                      y="96"
                      textAnchor="middle"
                      fontSize="10"
                      fill="white"
                      fontWeight="600"
                    >
                      NA
                    </text>

                    {/* EMEA - Top Left */}
                    <circle cx="90" cy="90" r="12" fill="#52c41a" opacity="0.8">
                      <animate
                        attributeName="r"
                        values="12;15;12"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="90"
                      y="96"
                      textAnchor="middle"
                      fontSize="9"
                      fill="white"
                      fontWeight="600"
                    >
                      EMEA
                    </text>

                    {/* APAC - Bottom Right */}
                    <circle
                      cx="210"
                      cy="210"
                      r="10"
                      fill="#722ed1"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="r"
                        values="10;13;10"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="210"
                      y="216"
                      textAnchor="middle"
                      fontSize="8"
                      fill="white"
                      fontWeight="600"
                    >
                      APAC
                    </text>

                    {/* LATAM - Bottom Left */}
                    <circle cx="90" cy="210" r="8" fill="#fa8c16" opacity="0.8">
                      <animate
                        attributeName="r"
                        values="8;11;8"
                        dur="3.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="3.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="90"
                      y="216"
                      textAnchor="middle"
                      fontSize="7"
                      fill="white"
                      fontWeight="600"
                    >
                      LATAM
                    </text>
                  </g>

                  {/* Business flow connections */}
                  <g className={styles.businessFlows}>
                    <path
                      d="M210 90 Q150 120 90 90"
                      stroke="#1890ff"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.6;1;0.6"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M210 210 Q180 150 210 90"
                      stroke="#722ed1"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.5;0.9;0.5"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M90 210 Q120 150 90 90"
                      stroke="#52c41a"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.4;0.8;0.4"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M90 210 Q150 180 210 210"
                      stroke="#fa8c16"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.7"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.7;1;0.7"
                        dur="3.5s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>

                  {/* Central business hub */}
                  <circle
                    cx="150"
                    cy="150"
                    r="25"
                    fill="white"
                    stroke="#1890ff"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                  <text
                    x="150"
                    y="145"
                    textAnchor="middle"
                    fontSize="8"
                    fill="#1890ff"
                    fontWeight="600"
                  >
                    Global
                  </text>
                  <text
                    x="150"
                    y="158"
                    textAnchor="middle"
                    fontSize="8"
                    fill="#1890ff"
                    fontWeight="600"
                  >
                    Business
                  </text>

                  {/* Hand holding business globe */}
                  <g
                    className={styles.handIcon}
                    transform="translate(120, 240)"
                  >
                    <path
                      d="M20 40 Q15 35 20 30 Q25 25 35 30 Q45 35 50 40 Q55 45 50 50 Q45 55 35 50 Q25 45 20 40 Z"
                      fill="#f0f0f0"
                      stroke="#d9d9d9"
                      strokeWidth="2"
                    />
                    <circle cx="35" cy="42" r="3" fill="#bfbfbf" />
                    {/* Business briefcase indicator */}
                    <rect
                      x="32"
                      y="35"
                      width="6"
                      height="4"
                      rx="1"
                      fill="#1890ff"
                      opacity="0.8"
                    />
                  </g>
                </svg>

                {/* Business labels */}
                <div className={styles.businessLabels}>
                  <div className={styles.topLabel}>Business</div>
                  <div className={styles.bottomLabel}>Regions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBusinessRegions;
