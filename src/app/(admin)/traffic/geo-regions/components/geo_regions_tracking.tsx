"use client";

import React from "react";
import { Progress } from "antd";
import { TbChartAreaLine, TbWorld, TbTarget } from "react-icons/tb";
import styles from "./geo_regions_tracking.module.scss";

const GeoRegionsTracking: React.FC = () => {
  const regionalData = [
    {
      region: "Northern America",
      code: "NA",
      percentage: 81,
      color: "#1890ff",
    },
    { region: "Western Europe", code: "WE", percentage: 35, color: "#52c41a" },
    { region: "Eastern Asia", code: "EA", percentage: 27, color: "#fa8c16" },
    { region: "Southern Europe", code: "SE", percentage: 23, color: "#eb2f96" },
    { region: "Western Asia", code: "WA", percentage: 19, color: "#722ed1" },
    { region: "South America", code: "SA", percentage: 15, color: "#13c2c2" },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Spot regional winners and fine-tune your market focus
            </h2>

            <ul className={styles.trackingList}>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Identify high-traffic regions based on real engagement trends
              </li>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Benchmark competitors by growth in specific geographies
              </li>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Discover which content performs best in each region
              </li>
            </ul>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.dashboardPreview}>
              <div className={styles.dashboardHeader}>
                <TbWorld className={styles.dashboardIcon} />
                <span className={styles.dashboardTitle}>
                  Geographical Regions
                </span>
              </div>

              <div className={styles.regionSection}>
                <div className={styles.worldMap}>
                  <svg
                    width="100%"
                    height="200"
                    viewBox="0 0 480 200"
                    className={styles.mapSvg}
                  >
                    {/* World Map Regions */}
                    <g className={styles.continents}>
                      {/* North America */}
                      <path
                        d="M60 40 Q100 30 140 45 L160 65 Q155 90 145 110 L120 125 Q80 130 50 115 L30 95 Q35 70 60 40Z"
                        fill="#1890ff"
                        opacity="0.7"
                        className={styles.regionArea}
                      />

                      {/* Europe */}
                      <path
                        d="M200 45 Q230 40 250 50 L265 65 Q260 80 250 90 L225 95 Q205 90 195 80 L190 65 Q195 55 200 45Z"
                        fill="#52c41a"
                        opacity="0.7"
                        className={styles.regionArea}
                      />

                      {/* Asia */}
                      <path
                        d="M280 50 Q330 45 380 60 L410 80 Q415 110 405 140 L375 155 Q325 150 285 145 L270 125 Q275 90 280 50Z"
                        fill="#fa8c16"
                        opacity="0.7"
                        className={styles.regionArea}
                      />

                      {/* South America */}
                      <path
                        d="M90 130 Q120 125 140 140 L145 160 Q140 180 135 195 L120 200 Q100 195 85 185 L80 165 Q85 145 90 130Z"
                        fill="#13c2c2"
                        opacity="0.7"
                        className={styles.regionArea}
                      />

                      {/* Africa */}
                      <path
                        d="M180 100 Q210 95 235 110 L245 130 Q240 155 235 175 L220 185 Q195 180 180 170 L170 150 Q175 125 180 100Z"
                        fill="#722ed1"
                        opacity="0.7"
                        className={styles.regionArea}
                      />

                      {/* Oceania */}
                      <path
                        d="M350 160 Q380 155 400 165 L405 175 Q400 185 395 190 L375 185 Q360 180 350 175 L345 170 Q345 165 350 160Z"
                        fill="#eb2f96"
                        opacity="0.7"
                        className={styles.regionArea}
                      />
                    </g>

                    {/* Data Flow Lines */}
                    <g className={styles.dataFlows}>
                      <path
                        d="M120 80 Q180 70 240 80"
                        stroke="#1890ff"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4,4"
                        className={styles.flowLine}
                      />
                      <path
                        d="M250 75 Q300 70 350 85"
                        stroke="#52c41a"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4,4"
                        className={styles.flowLine}
                      />
                    </g>
                  </svg>
                </div>

                <div className={styles.regionStats}>
                  <div className={styles.statsHeader}>
                    <TbTarget className={styles.statsIcon} />
                    <span className={styles.statsTitle}>Traffic Share</span>
                  </div>

                  <div className={styles.geoStats}>
                    {regionalData.map((region, index) => (
                      <div key={index} className={styles.statItem}>
                        <div className={styles.regionCode}>{region.code}</div>
                        <div className={styles.regionName}>{region.region}</div>
                        <div className={styles.progressContainer}>
                          <Progress
                            percent={region.percentage}
                            strokeColor={region.color}
                            trailColor="#f0f0f0"
                            strokeWidth={8}
                            showInfo={false}
                            className={styles.progressBar}
                          />
                        </div>
                        <div className={styles.percentage}>
                          {region.percentage}%
                        </div>
                      </div>
                    ))}
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

export default GeoRegionsTracking;
