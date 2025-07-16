"use client";

import React from "react";
import { Input, Button } from "antd";
import styles from "./hero_countries.module.scss";

const HeroCountries: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.badge}>Countries</div>
            <h1 className={styles.title}>
              Understand Country-level Traffic Trends
            </h1>
            <p className={styles.description}>
              Benchmark traffic across countries to fine-tune international
              strategies and messaging.
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
            <div className={styles.globeVisualization}>
              <div className={styles.globeContainer}>
                <svg
                  className={styles.globeIcon}
                  viewBox="0 0 300 300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Globe base */}
                  <circle
                    cx="150"
                    cy="150"
                    r="120"
                    fill="#f0f9ff"
                    stroke="#bae0ff"
                    strokeWidth="3"
                  />

                  {/* Longitude lines */}
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="120"
                    ry="60"
                    fill="none"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="120"
                    ry="30"
                    fill="none"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="90"
                    ry="120"
                    fill="none"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="60"
                    ry="120"
                    fill="none"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="30"
                    ry="120"
                    fill="none"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                  />

                  {/* Latitude lines */}
                  <line
                    x1="30"
                    y1="150"
                    x2="270"
                    y2="150"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="150"
                    cy="120"
                    rx="100"
                    ry="8"
                    fill="none"
                    stroke="#e6f3ff"
                    strokeWidth="1.5"
                  />
                  <ellipse
                    cx="150"
                    cy="180"
                    rx="100"
                    ry="8"
                    fill="none"
                    stroke="#e6f3ff"
                    strokeWidth="1.5"
                  />

                  {/* Country regions with traffic indicators */}
                  <g className={styles.countryRegions}>
                    {/* North America */}
                    <circle
                      cx="90"
                      cy="100"
                      r="12"
                      fill="#1890ff"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="r"
                        values="12;15;12"
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
                      x="90"
                      y="105"
                      textAnchor="middle"
                      fontSize="8"
                      fill="white"
                      fontWeight="600"
                    >
                      US
                    </text>

                    {/* Europe */}
                    <circle
                      cx="180"
                      cy="90"
                      r="10"
                      fill="#52c41a"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="r"
                        values="10;12;10"
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
                      x="180"
                      y="95"
                      textAnchor="middle"
                      fontSize="7"
                      fill="white"
                      fontWeight="600"
                    >
                      EU
                    </text>

                    {/* Asia */}
                    <circle
                      cx="220"
                      cy="120"
                      r="8"
                      fill="#722ed1"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="r"
                        values="8;10;8"
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
                      x="220"
                      y="125"
                      textAnchor="middle"
                      fontSize="6"
                      fill="white"
                      fontWeight="600"
                    >
                      AS
                    </text>

                    {/* Canada */}
                    <circle cx="80" cy="80" r="6" fill="#fa8c16" opacity="0.8">
                      <animate
                        attributeName="r"
                        values="6;8;6"
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
                      x="80"
                      y="84"
                      textAnchor="middle"
                      fontSize="5"
                      fill="white"
                      fontWeight="600"
                    >
                      CA
                    </text>

                    {/* Norway */}
                    <circle cx="170" cy="70" r="5" fill="#13c2c2" opacity="0.8">
                      <animate
                        attributeName="r"
                        values="5;7;5"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="170"
                      y="74"
                      textAnchor="middle"
                      fontSize="4"
                      fill="white"
                      fontWeight="600"
                    >
                      NO
                    </text>
                  </g>

                  {/* Traffic flow connections */}
                  <g className={styles.trafficFlows}>
                    <path
                      d="M90 100 Q150 50 180 90"
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
                      d="M180 90 Q200 60 220 120"
                      stroke="#52c41a"
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
                      d="M80 80 Q120 40 170 70"
                      stroke="#fa8c16"
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
                  </g>

                  {/* Hand holding globe */}
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
                  </g>
                </svg>

                {/* Globe labels */}
                <div className={styles.globeLabels}>
                  <div className={styles.topLabel}>Global</div>
                  <div className={styles.bottomLabel}>Analytics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCountries;
