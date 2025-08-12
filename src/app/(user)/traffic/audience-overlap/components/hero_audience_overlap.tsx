"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./hero_audience_overlap.module.scss";

const HeroAudienceOverlap: React.FC = () => {
  const [domain, setDomain] = useState<string>("");
  const [competitor, setCompetitor] = useState<string>("");

  const handleAnalyze = () => {
    console.log("Analyzing audience overlap for:", { domain, competitor });
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.badge}>Audience Overlap</div>
            <h1 className={styles.title}>
              Identify Untapped Segments and Targeting Opportunities
            </h1>
            <p className={styles.subtitle}>
              Compare audience profiles to find shared visitors and gaps you can
              fill.
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
              <div className={styles.audienceVisualization}>
                <svg
                  width="420"
                  height="340"
                  viewBox="0 0 420 340"
                  className={styles.audienceSvg}
                >
                  {/* Background Elements */}
                  <defs>
                    <linearGradient
                      id="overlapGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#52c41a" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#1890ff"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Audience Circles */}
                  <g className={styles.audienceCircles}>
                    {/* Your Audience - Blue Circle */}
                    <circle
                      cx="150"
                      cy="170"
                      r="80"
                      fill="#1890ff"
                      opacity="0.6"
                      className={styles.yourAudience}
                      filter="url(#glow)"
                    />

                    {/* Competitor Audience - Green Circle */}
                    <circle
                      cx="270"
                      cy="170"
                      r="80"
                      fill="#52c41a"
                      opacity="0.6"
                      className={styles.competitorAudience}
                      filter="url(#glow)"
                    />

                    {/* Overlap Area */}
                    <ellipse
                      cx="210"
                      cy="170"
                      rx="40"
                      ry="60"
                      fill="url(#overlapGradient)"
                      className={styles.overlapArea}
                      filter="url(#glow)"
                    />
                  </g>

                  {/* User Icons */}
                  <g className={styles.userIcons}>
                    {/* Your Users */}
                    <g className={styles.yourUsers}>
                      <circle
                        cx="120"
                        cy="140"
                        r="8"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                      <circle
                        cx="110"
                        cy="170"
                        r="8"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                      <circle
                        cx="130"
                        cy="200"
                        r="8"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                      <circle
                        cx="90"
                        cy="180"
                        r="8"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                    </g>

                    {/* Competitor Users */}
                    <g className={styles.competitorUsers}>
                      <circle
                        cx="300"
                        cy="140"
                        r="8"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                      <circle
                        cx="310"
                        cy="170"
                        r="8"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                      <circle
                        cx="290"
                        cy="200"
                        r="8"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                      <circle
                        cx="330"
                        cy="180"
                        r="8"
                        fill="#ffffff"
                        opacity="0.9"
                      />
                    </g>

                    {/* Shared Users */}
                    <g className={styles.sharedUsers}>
                      <circle
                        cx="200"
                        cy="150"
                        r="8"
                        fill="#ffffff"
                        opacity="1"
                      />
                      <circle
                        cx="220"
                        cy="170"
                        r="8"
                        fill="#ffffff"
                        opacity="1"
                      />
                      <circle
                        cx="210"
                        cy="190"
                        r="8"
                        fill="#ffffff"
                        opacity="1"
                      />
                    </g>
                  </g>

                  {/* Magnifying Glasses */}
                  <g className={styles.magnifyingGlasses}>
                    {/* Left Magnifier */}
                    <circle
                      cx="60"
                      cy="80"
                      r="20"
                      fill="none"
                      stroke="#1890ff"
                      strokeWidth="3"
                    />
                    <line
                      x1="75"
                      y1="95"
                      x2="90"
                      y2="110"
                      stroke="#1890ff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Right Magnifier */}
                    <circle
                      cx="360"
                      cy="80"
                      r="20"
                      fill="none"
                      stroke="#52c41a"
                      strokeWidth="3"
                    />
                    <line
                      x1="375"
                      y1="95"
                      x2="390"
                      y2="110"
                      stroke="#52c41a"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Connection Lines */}
                  <g className={styles.connectionLines}>
                    <path
                      d="M80 100 Q120 120 150 140"
                      stroke="#1890ff"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="4,4"
                      className={styles.connectionLine1}
                    />
                    <path
                      d="M340 100 Q300 120 270 140"
                      stroke="#52c41a"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="4,4"
                      className={styles.connectionLine2}
                    />
                  </g>

                  {/* Labels */}
                  <g className={styles.labels}>
                    <text
                      x="110"
                      y="280"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="600"
                      fill="#1890ff"
                    >
                      Your Audience
                    </text>
                    <text
                      x="310"
                      y="280"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="600"
                      fill="#52c41a"
                    >
                      Competitor
                    </text>
                    <text
                      x="210"
                      y="300"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="500"
                      fill="#666"
                    >
                      Shared Visitors
                    </text>
                  </g>

                  {/* Animated Elements */}
                  <g className={styles.animatedElements}>
                    <circle
                      cx="180"
                      cy="120"
                      r="3"
                      fill="#fa8c16"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="cy"
                        values="120;130;120"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="240"
                      cy="130"
                      r="3"
                      fill="#eb2f96"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="cy"
                        values="130;140;130"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="220"
                      cy="220"
                      r="3"
                      fill="#722ed1"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="cy"
                        values="220;210;220"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
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

export default HeroAudienceOverlap;
