"use client";

import React from "react";
import { Progress } from "antd";
import { TbChartLine, TbTrendingUp, TbTarget } from "react-icons/tb";
import styles from "./market_overview_tracking.module.scss";

const MarketOverviewTracking: React.FC = () => {
  const marketPlayers = [
    {
      name: "walmart.com",
      position: "Leaders",
      color: "#10b981",
      growth: "+35M",
      percentage: "+0.23%",
    },
    {
      name: "target.com",
      position: "Game Changers",
      color: "#8b5cf6",
      growth: "+12M",
      percentage: "+0.15%",
    },
    {
      name: "ebay.com",
      position: "Niche Players",
      color: "#f59e0b",
      growth: "+8M",
      percentage: "+0.08%",
    },
    {
      name: "etsy.com",
      position: "Established Players",
      color: "#ef4444",
      growth: "+5M",
      percentage: "+0.05%",
    },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Track market share, trends, and game changers
            </h2>

            <ul className={styles.trackingList}>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Monitor share shifts and player trajectories at a glance
              </li>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                See which brands are gaining momentum in your space
              </li>
              <li className={styles.trackingItem}>
                <span className={styles.bullet}>•</span>
                Compare competitors side-by-side with key market stats
              </li>
            </ul>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.dashboardPreview}>
              <div className={styles.dashboardHeader}>
                <TbChartLine className={styles.dashboardIcon} />
                <span className={styles.dashboardTitle}>Growth Quadrant</span>
              </div>

              <div className={styles.quadrantSection}>
                <div className={styles.quadrantChart}>
                  <svg
                    width="100%"
                    height="220"
                    viewBox="0 0 300 220"
                    className={styles.quadrantSvg}
                  >
                    {/* Quadrant Background */}
                    <rect width="300" height="220" fill="#f8fafc" rx="8" />

                    {/* Quadrant Lines */}
                    <line
                      x1="150"
                      y1="0"
                      x2="150"
                      y2="220"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />
                    <line
                      x1="0"
                      y1="110"
                      x2="300"
                      y2="110"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />

                    {/* Quadrant Labels */}
                    <text
                      x="75"
                      y="20"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#64748b"
                    >
                      Game Changers
                    </text>
                    <text
                      x="225"
                      y="20"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#64748b"
                    >
                      Leaders
                    </text>
                    <text
                      x="75"
                      y="210"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#64748b"
                    >
                      Niche Players
                    </text>
                    <text
                      x="225"
                      y="210"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#64748b"
                    >
                      Established Players
                    </text>

                    {/* Market Players */}
                    {/* Walmart (Leaders) */}
                    <circle
                      cx="230"
                      cy="60"
                      r="12"
                      fill="#10b981"
                      opacity="0.8"
                      className={styles.player1}
                    />
                    <text
                      x="230"
                      y="50"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#059669"
                    >
                      walmart.com
                    </text>

                    {/* Target (Game Changers) */}
                    <circle
                      cx="90"
                      cy="80"
                      r="8"
                      fill="#8b5cf6"
                      opacity="0.8"
                      className={styles.player2}
                    />
                    <text
                      x="90"
                      y="70"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#7c3aed"
                    >
                      target.com
                    </text>

                    {/* eBay (Established) */}
                    <circle
                      cx="220"
                      cy="160"
                      r="10"
                      fill="#ef4444"
                      opacity="0.8"
                      className={styles.player3}
                    />
                    <text
                      x="220"
                      y="180"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#dc2626"
                    >
                      ebay.com
                    </text>

                    {/* Etsy (Niche) */}
                    <circle
                      cx="80"
                      cy="170"
                      r="7"
                      fill="#f59e0b"
                      opacity="0.8"
                      className={styles.player4}
                    />
                    <text
                      x="80"
                      y="185"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#d97706"
                    >
                      etsy.com
                    </text>

                    {/* Growth Arrows */}
                    <path
                      d="M240 70 L250 60"
                      stroke="#10b981"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                    <path
                      d="M100 90 L110 80"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />

                    {/* Arrow Marker */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className={styles.trafficGrowth}>
                  <div className={styles.growthHeader}>
                    <TbTrendingUp className={styles.growthIcon} />
                    <span className={styles.growthTitle}>Traffic Growth</span>
                    <span className={styles.growthValue}>+35M</span>
                    <span className={styles.growthPercentage}>+0.23%</span>
                  </div>

                  <div className={styles.playersList}>
                    {marketPlayers.map((player, index) => (
                      <div key={index} className={styles.playerItem}>
                        <div
                          className={styles.playerDot}
                          style={{ backgroundColor: player.color }}
                        ></div>
                        <div className={styles.playerInfo}>
                          <div className={styles.playerName}>{player.name}</div>
                          <div className={styles.playerPosition}>
                            {player.position}
                          </div>
                        </div>
                        <div className={styles.playerMetrics}>
                          <div className={styles.playerGrowth}>
                            {player.growth}
                          </div>
                          <div className={styles.playerPercentage}>
                            {player.percentage}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.marketStats}>
                  <div className={styles.statsHeader}>
                    <TbTarget className={styles.statsIcon} />
                    <span className={styles.statsTitle}>Market Dynamics</span>
                  </div>

                  <div className={styles.statsList}>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Market Size</div>
                      <div className={styles.statValue}>$2.5B</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Growth Rate</div>
                      <div className={styles.statValue}>+12.5%</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Top Players</div>
                      <div className={styles.statValue}>4 Leaders</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Market Share</div>
                      <div className={styles.statValue}>68% Total</div>
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

export default MarketOverviewTracking;
