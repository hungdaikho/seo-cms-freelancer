"use client";

import React from "react";
import { Input, Button } from "antd";
import styles from "./hero_subfolders.module.scss";

const HeroSubfolders: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.badge}>Subfolders & Subdomains</div>
            <h1 className={styles.title}>
              Track Competitor Traffic at the Structural Level
            </h1>
            <p className={styles.description}>
              Reveal content and conversion strategies across subfolders and
              subdomains.
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
            <div className={styles.structureVisualization}>
              <div className={styles.structureContainer}>
                <svg
                  className={styles.structureDiagram}
                  viewBox="0 0 300 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Folder stack visualization */}
                  <g className={styles.folderStack}>
                    {/* Main folder - back */}
                    <path
                      d="M60 80 L60 60 L80 60 L90 70 L240 70 L240 150 L60 150 Z"
                      fill="#e6f3ff"
                      stroke="#91caff"
                      strokeWidth="2"
                      opacity="0.6"
                    />

                    {/* Middle folder */}
                    <path
                      d="M70 70 L70 50 L90 50 L100 60 L250 60 L250 140 L70 140 Z"
                      fill="#bae0ff"
                      stroke="#69b1ff"
                      strokeWidth="2"
                      opacity="0.8"
                    />

                    {/* Front folder - main focus */}
                    <path
                      d="M80 60 L80 40 L100 40 L110 50 L260 50 L260 130 L80 130 Z"
                      fill="white"
                      stroke="#1890ff"
                      strokeWidth="3"
                    />

                    {/* Folder tabs */}
                    <rect
                      x="80"
                      y="40"
                      width="30"
                      height="10"
                      rx="2"
                      fill="#1890ff"
                      opacity="0.8"
                    />
                    <rect
                      x="90"
                      y="50"
                      width="30"
                      height="10"
                      rx="2"
                      fill="#40a9ff"
                      opacity="0.8"
                    />
                    <rect
                      x="100"
                      y="60"
                      width="30"
                      height="10"
                      rx="2"
                      fill="#69b1ff"
                      opacity="0.8"
                    />

                    {/* Subfolder items inside */}
                    <rect
                      x="100"
                      y="75"
                      width="120"
                      height="8"
                      rx="4"
                      fill="#1890ff"
                      opacity="0.3"
                    />
                    <text
                      x="105"
                      y="81"
                      fontSize="8"
                      fill="#1890ff"
                      fontWeight="600"
                    >
                      /store
                    </text>

                    <rect
                      x="100"
                      y="90"
                      width="100"
                      height="8"
                      rx="4"
                      fill="#40a9ff"
                      opacity="0.3"
                    />
                    <text
                      x="105"
                      y="96"
                      fontSize="8"
                      fill="#40a9ff"
                      fontWeight="600"
                    >
                      /video
                    </text>

                    <rect
                      x="100"
                      y="105"
                      width="140"
                      height="8"
                      rx="4"
                      fill="#69b1ff"
                      opacity="0.3"
                    />
                    <text
                      x="105"
                      y="111"
                      fontSize="8"
                      fill="#69b1ff"
                      fontWeight="600"
                    >
                      /your-account
                    </text>

                    {/* Traffic flow indicators */}
                    <circle cx="130" cy="79" r="2" fill="#52c41a">
                      <animate
                        attributeName="r"
                        values="2;3;2"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;1;0.6"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="140" cy="94" r="2.5" fill="#1890ff">
                      <animate
                        attributeName="r"
                        values="2.5;3.5;2.5"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.7;1;0.7"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="150" cy="109" r="2" fill="#722ed1">
                      <animate
                        attributeName="r"
                        values="2;3;2"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;1;0.5"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>

                  {/* Structure metrics */}
                  <g className={styles.metrics}>
                    <rect
                      x="20"
                      y="20"
                      width="50"
                      height="20"
                      rx="10"
                      fill="white"
                      stroke="#52c41a"
                      strokeWidth="2"
                    />
                    <text
                      x="45"
                      y="32"
                      textAnchor="middle"
                      fontSize="9"
                      fill="#52c41a"
                      fontWeight="600"
                    >
                      53%
                    </text>

                    <rect
                      x="250"
                      y="170"
                      width="40"
                      height="18"
                      rx="9"
                      fill="white"
                      stroke="#1890ff"
                      strokeWidth="2"
                    />
                    <text
                      x="270"
                      y="181"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#1890ff"
                      fontWeight="600"
                    >
                      820M
                    </text>

                    <rect
                      x="20"
                      y="160"
                      width="45"
                      height="16"
                      rx="8"
                      fill="white"
                      stroke="#722ed1"
                      strokeWidth="2"
                    />
                    <text
                      x="42"
                      y="170"
                      textAnchor="middle"
                      fontSize="7"
                      fill="#722ed1"
                      fontWeight="600"
                    >
                      43%
                    </text>
                  </g>
                </svg>

                {/* Structure labels */}
                <div className={styles.structureLabels}>
                  <div className={styles.topLabel}>Subfolders</div>
                  <div className={styles.bottomLabel}>Structure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSubfolders;
