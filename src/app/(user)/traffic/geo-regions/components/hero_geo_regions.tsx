"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./hero_geo_regions.module.scss";

const HeroGeoRegions: React.FC = () => {
  const [domain, setDomain] = useState<string>("");
  const [competitor, setCompetitor] = useState<string>("");

  const handleAnalyze = () => {
    console.log("Analyzing geo regions for:", { domain, competitor });
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.badge}>Geographical Regions</div>
            <h1 className={styles.title}>
              Break Down Competitor Traffic by Region
            </h1>
            <p className={styles.subtitle}>
              Explore performance across key regions across the globe.
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
              <div className={styles.geoVisualization}>
                <svg
                  width="400"
                  height="320"
                  viewBox="0 0 400 320"
                  className={styles.geoSvg}
                >
                  {/* Background Circle */}
                  <circle
                    cx="200"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                    className={styles.backgroundCircle}
                  />

                  {/* World Map Outline */}
                  <g className={styles.worldMap}>
                    {/* North America */}
                    <path
                      d="M60 80 Q80 70 100 80 L120 90 Q130 100 125 120 L110 140 Q90 145 70 140 L50 120 Q55 100 60 80Z"
                      fill="#1890ff"
                      opacity="0.8"
                      className={styles.regionNA}
                    />

                    {/* Europe */}
                    <path
                      d="M180 85 Q200 80 220 85 L230 95 Q225 105 220 115 L200 120 Q185 115 180 105 L175 95 Q175 90 180 85Z"
                      fill="#52c41a"
                      opacity="0.8"
                      className={styles.regionEU}
                    />

                    {/* Asia */}
                    <path
                      d="M260 90 Q290 85 320 95 L340 110 Q345 130 335 150 L315 160 Q285 155 260 150 L250 130 Q255 110 260 90Z"
                      fill="#fa8c16"
                      opacity="0.8"
                      className={styles.regionAS}
                    />

                    {/* South America */}
                    <path
                      d="M90 180 Q110 175 125 185 L130 200 Q125 220 120 240 L110 255 Q95 250 85 240 L80 220 Q85 200 90 180Z"
                      fill="#eb2f96"
                      opacity="0.8"
                      className={styles.regionSA}
                    />

                    {/* Africa */}
                    <path
                      d="M170 160 Q190 155 210 165 L220 180 Q215 200 210 220 L200 240 Q185 235 175 225 L165 205 Q165 180 170 160Z"
                      fill="#722ed1"
                      opacity="0.8"
                      className={styles.regionAF}
                    />

                    {/* Oceania */}
                    <path
                      d="M300 220 Q320 215 335 225 L340 235 Q335 245 330 250 L315 245 Q305 240 300 235 L295 230 Q295 225 300 220Z"
                      fill="#13c2c2"
                      opacity="0.8"
                      className={styles.regionOC}
                    />
                  </g>

                  {/* Traffic Flow Lines */}
                  <g className={styles.trafficFlows}>
                    <path
                      d="M100 120 Q150 100 200 110"
                      stroke="#1890ff"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                      className={styles.flowLine1}
                    />
                    <path
                      d="M220 115 Q250 110 280 125"
                      stroke="#52c41a"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                      className={styles.flowLine2}
                    />
                    <path
                      d="M110 200 Q140 180 180 190"
                      stroke="#fa8c16"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                      className={styles.flowLine3}
                    />
                  </g>

                  {/* Regional Data Points */}
                  <g className={styles.dataPoints}>
                    <circle
                      cx="90"
                      cy="110"
                      r="6"
                      fill="#1890ff"
                      className={styles.dataPoint}
                    >
                      <animate
                        attributeName="r"
                        values="6;8;6"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="200"
                      cy="100"
                      r="6"
                      fill="#52c41a"
                      className={styles.dataPoint}
                    >
                      <animate
                        attributeName="r"
                        values="6;8;6"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="290"
                      cy="120"
                      r="6"
                      fill="#fa8c16"
                      className={styles.dataPoint}
                    >
                      <animate
                        attributeName="r"
                        values="6;8;6"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="110"
                      cy="220"
                      r="6"
                      fill="#eb2f96"
                      className={styles.dataPoint}
                    >
                      <animate
                        attributeName="r"
                        values="6;8;6"
                        dur="2.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="190"
                      cy="200"
                      r="6"
                      fill="#722ed1"
                      className={styles.dataPoint}
                    >
                      <animate
                        attributeName="r"
                        values="6;8;6"
                        dur="1.9s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="320"
                      cy="235"
                      r="6"
                      fill="#13c2c2"
                      className={styles.dataPoint}
                    >
                      <animate
                        attributeName="r"
                        values="6;8;6"
                        dur="2.1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>

                  {/* Magnifying Glass */}
                  <g className={styles.magnifyingGlass}>
                    <circle
                      cx="320"
                      cy="60"
                      r="25"
                      fill="none"
                      stroke="#1890ff"
                      strokeWidth="3"
                    />
                    <line
                      x1="340"
                      y1="80"
                      x2="355"
                      y2="95"
                      stroke="#1890ff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text
                      x="320"
                      y="67"
                      textAnchor="middle"
                      fontSize="12"
                      fill="#1890ff"
                      fontWeight="bold"
                    >
                      GEO
                    </text>
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

export default HeroGeoRegions;
