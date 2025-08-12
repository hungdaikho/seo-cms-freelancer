"use client";

import React from "react";
import { Input, Button } from "antd";
import styles from "./hero_top_pages.module.scss";

const HeroTopPages: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.badge}>Top Pages</div>
            <h1 className={styles.title}>
              Reveal Your Competitors' Best-Performing Pages
            </h1>
            <p className={styles.description}>
              See the pages that drive traffic and conversions-know what gets
              results.
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
            <div className={styles.pagesVisualization}>
              <div className={styles.pagesContainer}>
                <svg
                  className={styles.pagesStack}
                  viewBox="0 0 300 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Page stack visualization */}
                  <g className={styles.pageStack}>
                    {/* Back pages */}
                    <rect
                      x="40"
                      y="40"
                      width="180"
                      height="120"
                      rx="8"
                      fill="#f0f9ff"
                      stroke="#bae0ff"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                    <rect
                      x="50"
                      y="50"
                      width="180"
                      height="120"
                      rx="8"
                      fill="#e6f3ff"
                      stroke="#91caff"
                      strokeWidth="2"
                      opacity="0.8"
                    />

                    {/* Front page - main focus */}
                    <rect
                      x="60"
                      y="60"
                      width="180"
                      height="120"
                      rx="8"
                      fill="white"
                      stroke="#1890ff"
                      strokeWidth="3"
                    />

                    {/* Page content elements */}
                    <rect
                      x="80"
                      y="80"
                      width="140"
                      height="8"
                      rx="4"
                      fill="#1890ff"
                      opacity="0.3"
                    />
                    <rect
                      x="80"
                      y="95"
                      width="100"
                      height="6"
                      rx="3"
                      fill="#40a9ff"
                      opacity="0.5"
                    />
                    <rect
                      x="80"
                      y="108"
                      width="120"
                      height="6"
                      rx="3"
                      fill="#69b1ff"
                      opacity="0.4"
                    />

                    {/* Chart visualization on page */}
                    <rect
                      x="80"
                      y="125"
                      width="140"
                      height="40"
                      rx="4"
                      fill="#f0f9ff"
                      stroke="#bae0ff"
                    />

                    {/* Mini chart bars */}
                    <rect
                      x="90"
                      y="140"
                      width="8"
                      height="20"
                      fill="#1890ff"
                      opacity="0.8"
                    />
                    <rect
                      x="105"
                      y="135"
                      width="8"
                      height="25"
                      fill="#40a9ff"
                      opacity="0.8"
                    />
                    <rect
                      x="120"
                      y="130"
                      width="8"
                      height="30"
                      fill="#69b1ff"
                      opacity="0.8"
                    />
                    <rect
                      x="135"
                      y="145"
                      width="8"
                      height="15"
                      fill="#91caff"
                      opacity="0.8"
                    />
                    <rect
                      x="150"
                      y="138"
                      width="8"
                      height="22"
                      fill="#bae0ff"
                      opacity="0.8"
                    />

                    {/* Performance indicators */}
                    <circle cx="200" cy="85" r="3" fill="#52c41a">
                      <animate
                        attributeName="r"
                        values="3;4;3"
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
                    <circle cx="210" cy="100" r="2.5" fill="#1890ff">
                      <animate
                        attributeName="r"
                        values="2.5;3.5;2.5"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;1;0.6"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="195" cy="115" r="2" fill="#722ed1">
                      <animate
                        attributeName="r"
                        values="2;3;2"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.7;1;0.7"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>

                  {/* Floating metrics */}
                  <g className={styles.metrics}>
                    <rect
                      x="20"
                      y="20"
                      width="60"
                      height="25"
                      rx="12"
                      fill="white"
                      stroke="#52c41a"
                      strokeWidth="2"
                    />
                    <text
                      x="50"
                      y="35"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#52c41a"
                      fontWeight="600"
                    >
                      +25.3%
                    </text>

                    <rect
                      x="250"
                      y="30"
                      width="50"
                      height="20"
                      rx="10"
                      fill="white"
                      stroke="#1890ff"
                      strokeWidth="2"
                    />
                    <text
                      x="275"
                      y="42"
                      textAnchor="middle"
                      fontSize="9"
                      fill="#1890ff"
                      fontWeight="600"
                    >
                      750K
                    </text>

                    <rect
                      x="20"
                      y="180"
                      width="55"
                      height="18"
                      rx="9"
                      fill="white"
                      stroke="#722ed1"
                      strokeWidth="2"
                    />
                    <text
                      x="47"
                      y="191"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#722ed1"
                      fontWeight="600"
                    >
                      3.2min
                    </text>
                  </g>
                </svg>

                {/* Performance labels */}
                <div className={styles.performanceLabels}>
                  <div className={styles.topLabel}>Top Pages</div>
                  <div className={styles.bottomLabel}>Performance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroTopPages;
