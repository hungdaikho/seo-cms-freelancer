"use client";

import React from "react";
import { Card } from "antd";
import {
  FaRocket,
  FaGlobe,
  FaUsers,
  FaEye,
  FaChartLine,
  FaSearch,
} from "react-icons/fa";
import {
  FaArrowTrendUp,
  FaChartBar,
  FaFilter,
  FaBell,
  FaDownload,
  FaShareNodes,
} from "react-icons/fa6";
import styles from "./features_trending_websites.module.scss";

const FeaturesTrendingWebsites: React.FC = () => {
  const features = [
    {
      icon: <FaArrowTrendUp />,
      title: "Real-Time Trending Detection",
      description:
        "Monitor websites as they trend in real-time with instant alerts for viral content and traffic spikes. Track emerging platforms before they become mainstream.",
      highlights: [
        "Live trend monitoring",
        "Viral content alerts",
        "Early detection system",
      ],
    },
    {
      icon: <FaChartLine />,
      title: "Traffic Growth Analytics",
      description:
        "Analyze website traffic patterns, growth trajectories, and momentum indicators. Understand what drives traffic spikes and sustained growth.",
      highlights: [
        "Growth pattern analysis",
        "Traffic momentum tracking",
        "Trend predictions",
      ],
    },
    {
      icon: <FaGlobe />,
      title: "Global Website Rankings",
      description:
        "Access comprehensive rankings of websites worldwide across all industries and regions. Compare performance metrics and market positions.",
      highlights: [
        "Global rankings database",
        "Industry categorization",
        "Regional breakdowns",
      ],
    },
    {
      icon: <FaUsers />,
      title: "Audience Migration Tracking",
      description:
        "Track how audiences move between platforms and websites. Identify shifts in user behavior and platform preferences over time.",
      highlights: [
        "User flow analysis",
        "Platform switching patterns",
        "Audience retention metrics",
      ],
    },
    {
      icon: <FaEye />,
      title: "Viral Content Analysis",
      description:
        "Identify content that drives massive traffic spikes and user engagement. Analyze viral patterns and content performance metrics.",
      highlights: [
        "Viral pattern detection",
        "Content performance analysis",
        "Engagement tracking",
      ],
    },
    {
      icon: <FaChartBar />,
      title: "Competitive Intelligence",
      description:
        "Monitor competitor performance, track market positioning changes, and identify opportunities for growth and improvement.",
      highlights: [
        "Competitor monitoring",
        "Market position tracking",
        "Growth opportunities",
      ],
    },
    {
      icon: <FaFilter />,
      title: "Advanced Filtering & Segmentation",
      description:
        "Filter trending data by industry, geography, device type, and traffic source. Create custom segments for targeted analysis.",
      highlights: [
        "Multi-dimensional filtering",
        "Custom segmentation",
        "Targeted analysis tools",
      ],
    },
    {
      icon: <FaBell />,
      title: "Trend Alert System",
      description:
        "Set up custom alerts for trending websites, traffic spikes, and ranking changes. Never miss important market movements.",
      highlights: [
        "Custom alert setup",
        "Real-time notifications",
        "Trend monitoring",
      ],
    },
    {
      icon: <FaSearch />,
      title: "Deep Website Discovery",
      description:
        "Discover emerging websites and platforms before they become widely known. Find hidden gems in specific niches and industries.",
      highlights: [
        "Website discovery engine",
        "Niche platform detection",
        "Emerging trend identification",
      ],
    },
    {
      icon: <FaDownload />,
      title: "Export & Reporting",
      description:
        "Generate comprehensive reports on trending websites and export data in multiple formats for further analysis and presentation.",
      highlights: [
        "Custom report generation",
        "Multiple export formats",
        "Data visualization",
      ],
    },
    {
      icon: <FaShareNodes />,
      title: "Social Trend Integration",
      description:
        "Correlate website trends with social media buzz and viral content. Understand the relationship between social and web traffic.",
      highlights: [
        "Social media correlation",
        "Cross-platform analysis",
        "Viral content tracking",
      ],
    },
    {
      icon: <FaRocket />,
      title: "Growth Prediction Models",
      description:
        "Use AI-powered models to predict which websites are likely to trend next. Stay ahead of the curve with predictive analytics.",
      highlights: [
        "AI-powered predictions",
        "Trend forecasting",
        "Growth modeling",
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.featuresSection}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Comprehensive Trending Website Analysis
          </h2>
          <p className={styles.description}>
            Discover, track, and analyze trending websites with our
            comprehensive suite of tools. Stay ahead of digital trends and
            identify opportunities before your competition.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Card key={index} className={styles.featureCard} hoverable>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>{feature.icon}</div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
                <ul className={styles.highlights}>
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className={styles.highlight}>
                      <span className={styles.highlightBullet}>✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>
              Ready to Track Trending Websites?
            </h3>
            <p className={styles.ctaDescription}>
              Start monitoring trending websites and viral content today. Get
              insights into the next big digital trends.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>
                <FaRocket />
                Start Trend Analysis
              </button>
              <button className={styles.secondaryButton}>
                <FaEye />
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesTrendingWebsites;
