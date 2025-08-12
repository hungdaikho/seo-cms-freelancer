"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./hero_market_overview.module.scss";

const HeroMarketOverview: React.FC = () => {
  const [domain, setDomain] = useState<string>("");
  const [competitor, setCompetitor] = useState<string>("");

  const handleAnalyze = () => {
    console.log("Analyzing market overview for:", { domain, competitor });
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.badge}>Market Overview</div>
            <h1 className={styles.title}>
              Uncover Market Growth and Competitive Dynamics
            </h1>
            <p className={styles.subtitle}>
              Analyze overall market size, growth rates, and player performance
              to shape your strategy.
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
              <div className={styles.marketVisualization}>
                <svg
                  width="420"
                  height="340"
                  viewBox="0 0 420 340"
                  className={styles.marketSvg}
                >
                  {/* Background Elements */}
                  <defs>
                    <linearGradient
                      id="marketGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                      <stop
                        offset="100%"
                        stopColor="#059669"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                    <linearGradient
                      id="growthGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#0891b2"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                    <filter id="marketGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Market Overview Background */}
                  <rect
                    x="50"
                    y="50"
                    width="320"
                    height="240"
                    rx="16"
                    fill="#f0fdf4"
                    opacity="0.6"
                    className={styles.marketBackground}
                  />

                  {/* Analyst with Magnifying Glass */}
                  <g className={styles.analystIcon}>
                    {/* Head */}
                    <circle
                      cx="320"
                      cy="80"
                      r="25"
                      fill="#10b981"
                      opacity="0.8"
                    />
                    {/* Body */}
                    <rect
                      x="305"
                      y="105"
                      width="30"
                      height="45"
                      rx="15"
                      fill="#10b981"
                      opacity="0.8"
                    />
                    {/* Arms */}
                    <rect
                      x="285"
                      y="115"
                      width="20"
                      height="8"
                      rx="4"
                      fill="#10b981"
                      opacity="0.8"
                    />
                    <rect
                      x="335"
                      y="115"
                      width="20"
                      height="8"
                      rx="4"
                      fill="#10b981"
                      opacity="0.8"
                    />

                    {/* Magnifying Glass */}
                    <circle
                      cx="365"
                      cy="110"
                      r="15"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="3"
                    />
                    <line
                      x1="378"
                      y1="123"
                      x2="390"
                      y2="135"
                      stroke="#059669"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="365"
                      cy="110"
                      r="8"
                      fill="#ffffff"
                      opacity="0.7"
                    />
                  </g>

                  {/* Market Growth Chart */}
                  <g className={styles.marketChart}>
                    {/* Chart Background */}
                    <rect
                      x="80"
                      y="120"
                      width="180"
                      height="120"
                      rx="8"
                      fill="#ffffff"
                      opacity="0.9"
                      className={styles.chartBackground}
                    />

                    {/* Growth Line */}
                    <polyline
                      points="90,220 110,200 130,180 150,160 170,140 190,120 210,110 230,100 250,90"
                      stroke="url(#growthGradient)"
                      strokeWidth="4"
                      fill="none"
                      className={styles.growthLine}
                      filter="url(#marketGlow)"
                    />

                    {/* Data Points */}
                    <circle
                      cx="90"
                      cy="220"
                      r="4"
                      fill="#06b6d4"
                      className={styles.dataPoint1}
                    />
                    <circle
                      cx="130"
                      cy="180"
                      r="4"
                      fill="#06b6d4"
                      className={styles.dataPoint2}
                    />
                    <circle
                      cx="170"
                      cy="140"
                      r="4"
                      fill="#06b6d4"
                      className={styles.dataPoint3}
                    />
                    <circle
                      cx="210"
                      cy="110"
                      r="4"
                      fill="#06b6d4"
                      className={styles.dataPoint4}
                    />
                    <circle
                      cx="250"
                      cy="90"
                      r="4"
                      fill="#06b6d4"
                      className={styles.dataPoint5}
                    />

                    {/* Growth Arrow */}
                    <path
                      d="M240 100 L250 90 L245 95 L250 90 L245 85"
                      stroke="#059669"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Competitive Players */}
                  <g className={styles.competitors}>
                    {/* Competitor 1 */}
                    <circle
                      cx="120"
                      cy="80"
                      r="12"
                      fill="#3b82f6"
                      opacity="0.8"
                      className={styles.competitor1}
                    />
                    <text
                      x="120"
                      y="85"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      A
                    </text>

                    {/* Competitor 2 */}
                    <circle
                      cx="160"
                      cy="70"
                      r="10"
                      fill="#8b5cf6"
                      opacity="0.8"
                      className={styles.competitor2}
                    />
                    <text
                      x="160"
                      y="75"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      B
                    </text>

                    {/* Competitor 3 */}
                    <circle
                      cx="200"
                      cy="85"
                      r="14"
                      fill="#ef4444"
                      opacity="0.8"
                      className={styles.competitor3}
                    />
                    <text
                      x="200"
                      y="90"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      C
                    </text>

                    {/* Your Position */}
                    <circle
                      cx="180"
                      cy="90"
                      r="16"
                      fill="#10b981"
                      opacity="0.9"
                      className={styles.yourPosition}
                    />
                    <text
                      x="180"
                      y="95"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="#ffffff"
                    >
                      YOU
                    </text>
                  </g>

                  {/* Market Size Indicators */}
                  <g className={styles.marketSize}>
                    {/* Large Market Bubble */}
                    <circle
                      cx="150"
                      cy="280"
                      r="35"
                      fill="url(#marketGradient)"
                      opacity="0.6"
                      className={styles.marketBubble1}
                    />
                    <text
                      x="150"
                      y="275"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Market
                    </text>
                    <text
                      x="150"
                      y="288"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#ffffff"
                    >
                      $2.5B
                    </text>

                    {/* Medium Market Bubble */}
                    <circle
                      cx="220"
                      cy="270"
                      r="25"
                      fill="url(#marketGradient)"
                      opacity="0.7"
                      className={styles.marketBubble2}
                    />
                    <text
                      x="220"
                      y="275"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Segment
                    </text>

                    {/* Small Market Bubble */}
                    <circle
                      cx="280"
                      cy="280"
                      r="18"
                      fill="url(#marketGradient)"
                      opacity="0.8"
                      className={styles.marketBubble3}
                    />
                    <text
                      x="280"
                      y="285"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="600"
                      fill="#ffffff"
                    >
                      Niche
                    </text>
                  </g>

                  {/* Connection Lines */}
                  <g className={styles.connectionLines}>
                    <path
                      d="M180 106 Q170 130 160 150"
                      stroke="#10b981"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="4,4"
                      className={styles.connectionLine1}
                    />
                    <path
                      d="M200 101 Q210 120 220 140"
                      stroke="#ef4444"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="4,4"
                      className={styles.connectionLine2}
                    />
                  </g>

                  {/* Market Trends */}
                  <g className={styles.marketTrends}>
                    <rect
                      x="290"
                      y="160"
                      width="80"
                      height="60"
                      rx="8"
                      fill="#ffffff"
                      opacity="0.9"
                      className={styles.trendsBox}
                    />
                    <text
                      x="330"
                      y="175"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill="#059669"
                    >
                      Trends
                    </text>

                    {/* Trend Icons */}
                    <circle cx="310" cy="190" r="3" fill="#10b981" />
                    <text x="320" y="194" fontSize="8" fill="#374151">
                      Growth +23%
                    </text>

                    <circle cx="310" cy="205" r="3" fill="#06b6d4" />
                    <text x="320" y="209" fontSize="8" fill="#374151">
                      Share +5.2%
                    </text>
                  </g>

                  {/* Animated Elements */}
                  <g className={styles.animatedElements}>
                    <circle cx="100" cy="60" r="2" fill="#10b981" opacity="0.8">
                      <animate
                        attributeName="cy"
                        values="60;50;60"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="350"
                      cy="200"
                      r="2"
                      fill="#06b6d4"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="cy"
                        values="200;190;200"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="70" cy="150" r="2" fill="#8b5cf6" opacity="0.8">
                      <animate
                        attributeName="cy"
                        values="150;140;150"
                        dur="2s"
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

export default HeroMarketOverview;
