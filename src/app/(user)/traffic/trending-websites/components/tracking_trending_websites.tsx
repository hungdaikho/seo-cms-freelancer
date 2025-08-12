"use client";

import React from "react";
import {
  FaRocket,
  FaChartLine,
  FaGlobe,
  FaUsers,
  FaEye,
  FaChartBar,
  FaArrowTrendUp,
} from "react-icons/fa6";
import styles from "./tracking_trending_websites.module.scss";

const TrackingTrendingWebsites: React.FC = () => {
  const trackingFeatures = [
    {
      icon: <FaArrowTrendUp />,
      title: "Real-time Trend Detection",
      description: "Monitor trending websites and viral content as they emerge",
    },
    {
      icon: <FaChartLine />,
      title: "Traffic Growth Analysis",
      description:
        "Track website traffic patterns and growth trajectories over time",
    },
    {
      icon: <FaGlobe />,
      title: "Global Website Rankings",
      description:
        "Access comprehensive rankings of websites across all industries",
    },
    {
      icon: <FaUsers />,
      title: "Audience Movement Tracking",
      description: "Understand how audiences shift between trending platforms",
    },
    {
      icon: <FaEye />,
      title: "Viral Content Detection",
      description:
        "Identify content that's driving traffic spikes and user engagement",
    },
    {
      icon: <FaChartBar />,
      title: "Competitive Intelligence",
      description:
        "Track competitor performance and market positioning changes",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.trackingSection}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <div className={styles.header}>
              <FaRocket className={styles.headerIcon} />
              <h2 className={styles.title}>Track Website Trending & Growth</h2>
            </div>
            <p className={styles.description}>
              Stay ahead of digital trends with comprehensive website tracking
              and analysis. Monitor emerging platforms, track traffic growth,
              and identify the next big thing in the digital landscape before
              your competition does.
            </p>

            <div className={styles.featureList}>
              {trackingFeatures.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.visualSection}>
            <div className={styles.dashboard}>
              <div className={styles.dashboardHeader}>
                <h3>Trending Websites Dashboard</h3>
                <div className={styles.liveIndicator}>
                  <div className={styles.pulse}></div>
                  <span>Live Data</span>
                </div>
              </div>

              <div className={styles.metricsGrid}>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>+847%</div>
                  <div className={styles.metricLabel}>Peak Growth</div>
                  <div className={styles.metricChange}>↗ TikTok Lite</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>12.4B</div>
                  <div className={styles.metricLabel}>Monthly Visits</div>
                  <div className={styles.metricChange}>↗ OpenAI.com</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>156</div>
                  <div className={styles.metricLabel}>New Trending</div>
                  <div className={styles.metricChange}>↗ This Month</div>
                </div>
              </div>

              <div className={styles.trendChart}>
                <div className={styles.chartTitle}>Top Trending Categories</div>
                <div className={styles.chartBars}>
                  <div className={styles.chartBar}>
                    <div className={styles.barLabel}>AI & Tech</div>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFill}
                        style={{ width: "85%" }}
                      ></div>
                      <span className={styles.barValue}>85%</span>
                    </div>
                  </div>
                  <div className={styles.chartBar}>
                    <div className={styles.barLabel}>Social Media</div>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFill}
                        style={{ width: "72%" }}
                      ></div>
                      <span className={styles.barValue}>72%</span>
                    </div>
                  </div>
                  <div className={styles.chartBar}>
                    <div className={styles.barLabel}>E-commerce</div>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFill}
                        style={{ width: "68%" }}
                      ></div>
                      <span className={styles.barValue}>68%</span>
                    </div>
                  </div>
                  <div className={styles.chartBar}>
                    <div className={styles.barLabel}>Streaming</div>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFill}
                        style={{ width: "54%" }}
                      ></div>
                      <span className={styles.barValue}>54%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.alertsSection}>
                <div className={styles.alertsTitle}>Trending Alerts</div>
                <div className={styles.alerts}>
                  <div className={styles.alert}>
                    <div className={styles.alertIcon}>🚀</div>
                    <div className={styles.alertText}>
                      <strong>perplexity.ai</strong> traffic surge +340% in 24h
                    </div>
                  </div>
                  <div className={styles.alert}>
                    <div className={styles.alertIcon}>⚡</div>
                    <div className={styles.alertText}>
                      <strong>threads.net</strong> breaking into top 50 globally
                    </div>
                  </div>
                  <div className={styles.alert}>
                    <div className={styles.alertIcon}>📈</div>
                    <div className={styles.alertText}>
                      <strong>claude.ai</strong> mobile traffic increased 180%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingTrendingWebsites;
