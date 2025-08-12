"use client";

import { Card } from "antd";
import {
  AiOutlineFire,
  AiOutlineBarChart,
  AiOutlineGlobal,
  AiOutlineEye,
  AiOutlineSearch,
  AiOutlineLineChart,
} from "react-icons/ai";
import styles from "./features-section.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: <AiOutlineFire />,
      title: "Free & easy to use",
      description: "Our keyword checker is free and simple for anyone to use.",
    },
    {
      icon: <AiOutlineBarChart />,
      title: "Bulk keywords",
      description:
        "Check keyword insights for multiple keywords at once to compare and prioritize the best SEO opportunities.",
    },
    {
      icon: <AiOutlineSearch />,
      title: "All-in-one SEO keyword checker",
      description:
        "Provides a complete keyword overview, including difficulty scores, competition metrics, search intent, and search volume trends.",
    },
    {
      icon: <AiOutlineEye />,
      title: "Personalized insights",
      description:
        "Keyword Overview leverages AI and machine learning to provide estimates and data for your specific website.",
    },
    {
      icon: <AiOutlineGlobal />,
      title: "Website keyword checker",
      description:
        "Analyze any website's keywords to gauge keyword difficulty, competition, and targeting for an entire site.",
    },
    {
      icon: <AiOutlineGlobal />,
      title: "Local keywords",
      description:
        "Evaluate the local demand for your target keyword in any specific city or region.",
    },
    {
      icon: <AiOutlineBarChart />,
      title: "Keyword competition checker",
      description:
        "Evaluate how hard it is to outrank competitors by assessing the SEO competition for your target keywords.",
    },
    {
      icon: <AiOutlineLineChart />,
      title: "Real SERP analysis",
      description:
        "Benchmark your SEO competition using the actual Google search results pages, complete with SERP features.",
    },
  ];

  return (
    <div className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <h2>Key Features of Keyword Overview</h2>
        <p>
          Keyword Overview is the largest AI-powered keyword checker on the
          market.
          <br />
          The following features are available for both free and paid users:
        </p>
      </div>

      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <Card key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <div className={styles.featureContent}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
