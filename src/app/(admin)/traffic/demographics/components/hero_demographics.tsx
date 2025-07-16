"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./hero_demographics.module.scss";

const HeroDemographics: React.FC = () => {
  const [domain, setDomain] = useState<string>("");
  const [competitor, setCompetitor] = useState<string>("");

  const handleAnalyze = () => {
    console.log("Analyzing demographics for:", { domain, competitor });
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.badge}>Demographics</div>
            <h1 className={styles.title}>
              Refine Your Targeting with Audience Demographics
            </h1>
            <p className={styles.subtitle}>
              Understand competitor audience makeup by age, gender, region, and
              device usage.
            </p>

            <div className={styles.analysisForm}>
              <div className={styles.inputGroup}>
                <Input
                  size="large"
                  placeholder="Enter your domain, subdomain or subfolder"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className={styles.domainInput}
                  prefix={<span className={styles.inputLabel}>Main</span>}
                />
              </div>

              <div className={styles.inputGroup}>
                <Input
                  size="large"
                  placeholder="Enter competitor domain, subdomain or subfolder"
                  value={competitor}
                  onChange={(e) => setCompetitor(e.target.value)}
                  className={styles.competitorInput}
                />
              </div>

              <div className={styles.actionGroup}>
                <button className={styles.addCompetitor}>
                  + Add more competitors
                </button>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleAnalyze}
                  className={styles.analyzeButton}
                >
                  Analyze
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.illustrationWrapper}>
              <div className={styles.demographicsVisualization}>
                <svg
                  width="420"
                  height="340"
                  viewBox="0 0 420 340"
                  className={styles.demographicsSvg}
                >
                  {/* Background Elements */}
                  <defs>
                    <linearGradient
                      id="maleGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#1890ff" stopOpacity="0.9" />
                      <stop
                        offset="100%"
                        stopColor="#0050b3"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                    <linearGradient
                      id="femaleGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#eb2f96" stopOpacity="0.9" />
                      <stop
                        offset="100%"
                        stopColor="#c41d7f"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                  </defs>

                  {/* Device Icons */}
                  <g className={styles.deviceIcons}>
                    {/* Mobile Phone */}
                    <rect
                      x="60"
                      y="80"
                      width="35"
                      height="60"
                      rx="8"
                      fill="#52c41a"
                      opacity="0.8"
                      className={styles.mobileDevice}
                    />
                    <rect
                      x="65"
                      y="90"
                      width="25"
                      height="40"
                      rx="2"
                      fill="#ffffff"
                      opacity="0.9"
                    />
                    <circle cx="77.5" cy="125" r="3" fill="#52c41a" />

                    {/* Tablet */}
                    <rect
                      x="120"
                      y="90"
                      width="50"
                      height="40"
                      rx="6"
                      fill="#722ed1"
                      opacity="0.8"
                      className={styles.tabletDevice}
                    />
                    <rect
                      x="127"
                      y="97"
                      width="36"
                      height="26"
                      rx="2"
                      fill="#ffffff"
                      opacity="0.9"
                    />
                    <circle cx="145" cy="115" r="2" fill="#722ed1" />

                    {/* Desktop */}
                    <rect
                      x="190"
                      y="100"
                      width="60"
                      height="35"
                      rx="4"
                      fill="#fa8c16"
                      opacity="0.8"
                      className={styles.desktopDevice}
                    />
                    <rect
                      x="195"
                      y="105"
                      width="50"
                      height="25"
                      rx="2"
                      fill="#ffffff"
                      opacity="0.9"
                    />
                    <rect
                      x="210"
                      y="135"
                      width="20"
                      height="8"
                      rx="2"
                      fill="#fa8c16"
                      opacity="0.8"
                    />
                  </g>

                  {/* Gender Icons */}
                  <g className={styles.genderIcons}>
                    {/* Male Symbol */}
                    <circle
                      cx="320"
                      cy="100"
                      r="20"
                      fill="url(#maleGradient)"
                      className={styles.maleSymbol}
                    />
                    <path
                      d="M330 90 L340 80 L340 90 L330 80"
                      stroke="#ffffff"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <text
                      x="320"
                      y="107"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="bold"
                      fill="#ffffff"
                    >
                      ♂
                    </text>

                    {/* Female Symbol */}
                    <circle
                      cx="370"
                      cy="100"
                      r="20"
                      fill="url(#femaleGradient)"
                      className={styles.femaleSymbol}
                    />
                    <line
                      x1="370"
                      y1="120"
                      x2="370"
                      y2="135"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="362"
                      y1="127"
                      x2="378"
                      y2="127"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text
                      x="370"
                      y="107"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="bold"
                      fill="#ffffff"
                    >
                      ♀
                    </text>
                  </g>

                  {/* Age Groups Visualization */}
                  <g className={styles.ageGroups}>
                    {/* Age Group Bars */}
                    <rect
                      x="80"
                      y="200"
                      width="15"
                      height="40"
                      fill="#1890ff"
                      opacity="0.7"
                      className={styles.ageBar1}
                    />
                    <rect
                      x="100"
                      y="180"
                      width="15"
                      height="60"
                      fill="#1890ff"
                      opacity="0.8"
                      className={styles.ageBar2}
                    />
                    <rect
                      x="120"
                      y="160"
                      width="15"
                      height="80"
                      fill="#1890ff"
                      opacity="0.9"
                      className={styles.ageBar3}
                    />
                    <rect
                      x="140"
                      y="190"
                      width="15"
                      height="50"
                      fill="#1890ff"
                      opacity="0.6"
                      className={styles.ageBar4}
                    />

                    {/* Age Labels */}
                    <text
                      x="87"
                      y="255"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#666"
                    >
                      18-24
                    </text>
                    <text
                      x="107"
                      y="255"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#666"
                    >
                      25-34
                    </text>
                    <text
                      x="127"
                      y="255"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#666"
                    >
                      35-44
                    </text>
                    <text
                      x="147"
                      y="255"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#666"
                    >
                      45-54
                    </text>
                  </g>

                  {/* Location Pins */}
                  <g className={styles.locationPins}>
                    <circle
                      cx="280"
                      cy="180"
                      r="8"
                      fill="#13c2c2"
                      className={styles.locationPin1}
                    />
                    <path d="M280 172 L280 180 L285 175 Z" fill="#ffffff" />

                    <circle
                      cx="320"
                      cy="200"
                      r="8"
                      fill="#13c2c2"
                      className={styles.locationPin2}
                    />
                    <path d="M320 192 L320 200 L325 195 Z" fill="#ffffff" />

                    <circle
                      cx="350"
                      cy="170"
                      r="8"
                      fill="#13c2c2"
                      className={styles.locationPin3}
                    />
                    <path d="M350 162 L350 170 L355 165 Z" fill="#ffffff" />
                  </g>

                  {/* Connection Lines */}
                  <g className={styles.connectionLines}>
                    <path
                      d="M100 160 Q200 140 300 160"
                      stroke="#1890ff"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className={styles.connectionLine1}
                    />
                    <path
                      d="M150 120 Q220 110 290 120"
                      stroke="#eb2f96"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className={styles.connectionLine2}
                    />
                  </g>

                  {/* Demographic Data Points */}
                  <g className={styles.dataPoints}>
                    <circle
                      cx="200"
                      cy="140"
                      r="4"
                      fill="#fa8c16"
                      className={styles.dataPoint}
                    >
                      <animate
                        attributeName="r"
                        values="4;6;4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="250"
                      cy="160"
                      r="4"
                      fill="#52c41a"
                      className={styles.dataPoint}
                    >
                      <animate
                        attributeName="r"
                        values="4;6;4"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="180"
                      cy="200"
                      r="4"
                      fill="#722ed1"
                      className={styles.dataPoint}
                    >
                      <animate
                        attributeName="r"
                        values="4;6;4"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>

                  {/* User Profile Icon */}
                  <g className={styles.userProfile}>
                    <circle
                      cx="150"
                      cy="300"
                      r="25"
                      fill="#f0f0f0"
                      stroke="#1890ff"
                      strokeWidth="3"
                    />
                    <circle cx="150" cy="290" r="8" fill="#1890ff" />
                    <path
                      d="M135 310 Q150 305 165 310"
                      stroke="#1890ff"
                      strokeWidth="3"
                      fill="none"
                    />
                  </g>

                  {/* Analytics Chart Lines */}
                  <g className={styles.analyticsLines}>
                    <polyline
                      points="50,280 70,270 90,260 110,250 130,245"
                      stroke="#52c41a"
                      strokeWidth="3"
                      fill="none"
                      className={styles.trendLine1}
                    />
                    <polyline
                      points="250,280 270,275 290,270 310,265 330,260"
                      stroke="#fa8c16"
                      strokeWidth="3"
                      fill="none"
                      className={styles.trendLine2}
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDemographics;
