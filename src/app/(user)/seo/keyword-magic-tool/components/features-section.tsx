"use client";

import { Card } from "antd";
import {
  AiOutlineSearch,
  AiOutlineBarChart,
  AiOutlineFilter,
  AiOutlineEye,
  AiOutlineAim,
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
      icon: <AiOutlineSearch />,
      title: "Search Keyword Variations",
      description:
        "Discover a complete range of keyword variations, including broad match, phrase match, exact match, related terms, long-tail keywords, question-based queries, and more.",
    },
    {
      icon: <AiOutlineBarChart />,
      title: "Upgrade Your Keyword Strategy",
      description:
        "Select the keywords you're interested in and send them to your other projects. Monitor your ranking positions for specific keywords in Position Tracking or add them to Keyword Strategy Builder to bulk up your keyword targeting.",
    },
    {
      icon: <AiOutlineFilter />,
      title: "Sort and Refine Your Keywords",
      description:
        "Take control of your keyword list. Organize and filter them by search volume, include or exclude terms, refine by word count, and target the best opportunities for your SEO strategy.",
    },
    {
      icon: <AiOutlineEye />,
      title: "Discover Content Ideas",
      description:
        "Explore trending topics, popular questions, and relevant themes so you can create content that resonates with your audience.",
    },
    {
      icon: <AiOutlineAim />,
      title: "Target the Right Intent",
      description:
        "Use our AI-powered keyword tool to identify each keyword's unique search intent, and tailor your content strategy accordingly.",
    },
    {
      icon: <AiOutlineLineChart />,
      title: "Analyze Actual Search Results",
      description:
        "Review Google's actual search results for your chosen keyword, see how competitors' pages rank, and uncover gaps you can fill to improve your marketing efforts.",
    },
  ];

  return (
    <div className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <h2>What You Can Do with Our Keyword Research Tool</h2>
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
