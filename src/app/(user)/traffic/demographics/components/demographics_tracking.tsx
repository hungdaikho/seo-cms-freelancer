"use client";

import React from "react";
import { Progress } from "antd";
import { TbUsers, TbChartPie, TbTarget } from "react-icons/tb";
import styles from "./demographics_tracking.module.scss";

const DemographicsTracking: React.FC = () => {
  const ageData = [
    { range: "18-24", percentage: 25, color: "#1890ff" },
    { range: "25-34", percentage: 45, color: "#52c41a" },
    { range: "35-44", percentage: 35, color: "#fa8c16" },
    { range: "45-54", percentage: 20, color: "#eb2f96" },
  ];

  const genderData = [
    { type: "Male", percentage: 55, count: "305.7M", color: "#1890ff" },
    { type: "Female", percentage: 45, count: "275.3M", color: "#eb2f96" },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Segment smarter and sharpen your campaigns
            </h2>

            <ul className={styles.trackingList}>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Break down competitor audiences by age, gender, and location
              </li>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Discover segments with high engagement across devices
              </li>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Use demographic gaps to identify new targeting opportunities
              </li>
            </ul>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.dashboardPreview}>
              <div className={styles.dashboardHeader}>
                <TbUsers className={styles.dashboardIcon} />
                <span className={styles.dashboardTitle}>Audience</span>
              </div>

              <div className={styles.demographicsSection}>
                <div className={styles.genderChart}>
                  <svg
                    width="100%"
                    height="120"
                    viewBox="0 0 160 120"
                    className={styles.genderSvg}
                  >
                    {/* Pie Chart Background */}
                    <circle cx="80" cy="60" r="45" fill="#f0f0f0" />

                    {/* Male Segment (55%) */}
                    <path
                      d="M 80 15 A 45 45 0 1 1 35 60 L 80 60 Z"
                      fill="#1890ff"
                      opacity="0.8"
                      className={styles.maleSegment}
                    />

                    {/* Female Segment (45%) */}
                    <path
                      d="M 80 60 L 35 60 A 45 45 0 0 1 80 15 L 80 60 Z"
                      fill="#eb2f96"
                      opacity="0.8"
                      className={styles.femaleSegment}
                    />

                    {/* Center Circle */}
                    <circle cx="80" cy="60" r="20" fill="#ffffff" />
                    <text
                      x="80"
                      y="58"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill="#666"
                    >
                      305.7M
                    </text>
                    <text
                      x="80"
                      y="70"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#999"
                    >
                      Users
                    </text>

                    {/* Gender Labels */}
                    <g className={styles.genderLabels}>
                      <circle cx="125" cy="40" r="4" fill="#1890ff" />
                      <text
                        x="135"
                        y="44"
                        fontSize="10"
                        fontWeight="500"
                        fill="#1890ff"
                      >
                        ♂ Male
                      </text>

                      <circle cx="125" cy="55" r="4" fill="#eb2f96" />
                      <text
                        x="135"
                        y="59"
                        fontSize="10"
                        fontWeight="500"
                        fill="#eb2f96"
                      >
                        ♀ Female
                      </text>
                    </g>
                  </svg>
                </div>

                <div className={styles.ageDistribution}>
                  <div className={styles.chartHeader}>
                    <TbChartPie className={styles.chartIcon} />
                    <span className={styles.chartTitle}>Age Distribution</span>
                  </div>

                  <div className={styles.ageChart}>
                    <svg
                      width="100%"
                      height="100"
                      viewBox="0 0 300 100"
                      className={styles.ageSvg}
                    >
                      {/* Age Group Bars */}
                      <rect
                        x="20"
                        y="60"
                        width="40"
                        height="30"
                        fill="#52c41a"
                        opacity="0.8"
                        className={styles.ageBar1}
                      />
                      <rect
                        x="80"
                        y="40"
                        width="40"
                        height="50"
                        fill="#1890ff"
                        opacity="0.8"
                        className={styles.ageBar2}
                      />
                      <rect
                        x="140"
                        y="50"
                        width="40"
                        height="40"
                        fill="#fa8c16"
                        opacity="0.8"
                        className={styles.ageBar3}
                      />
                      <rect
                        x="200"
                        y="70"
                        width="40"
                        height="20"
                        fill="#eb2f96"
                        opacity="0.8"
                        className={styles.ageBar4}
                      />

                      {/* Age Labels */}
                      <text
                        x="40"
                        y="105"
                        textAnchor="middle"
                        fontSize="9"
                        fill="#666"
                      >
                        18-24
                      </text>
                      <text
                        x="100"
                        y="105"
                        textAnchor="middle"
                        fontSize="9"
                        fill="#666"
                      >
                        25-34
                      </text>
                      <text
                        x="160"
                        y="105"
                        textAnchor="middle"
                        fontSize="9"
                        fill="#666"
                      >
                        35-44
                      </text>
                      <text
                        x="220"
                        y="105"
                        textAnchor="middle"
                        fontSize="9"
                        fill="#666"
                      >
                        45-54
                      </text>

                      {/* Percentage Labels */}
                      <text
                        x="40"
                        y="55"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="600"
                        fill="#ffffff"
                      >
                        25%
                      </text>
                      <text
                        x="100"
                        y="35"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="600"
                        fill="#ffffff"
                      >
                        45%
                      </text>
                      <text
                        x="160"
                        y="45"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="600"
                        fill="#ffffff"
                      >
                        35%
                      </text>
                      <text
                        x="220"
                        y="65"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="600"
                        fill="#ffffff"
                      >
                        20%
                      </text>
                    </svg>
                  </div>
                </div>

                <div className={styles.demographicStats}>
                  <div className={styles.statsHeader}>
                    <TbTarget className={styles.statsIcon} />
                    <span className={styles.statsTitle}>
                      Demographics Breakdown
                    </span>
                  </div>

                  <div className={styles.statsList}>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Primary Age Group</div>
                      <div className={styles.statValue}>25-34 (45%)</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Gender Split</div>
                      <div className={styles.statValue}>
                        55% Male / 45% Female
                      </div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Top Region</div>
                      <div className={styles.statValue}>
                        North America (68%)
                      </div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Primary Device</div>
                      <div className={styles.statValue}>Mobile (72%)</div>
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

export default DemographicsTracking;
