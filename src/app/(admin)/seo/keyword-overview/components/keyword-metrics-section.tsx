"use client";

import styles from "./keyword-metrics-section.module.scss";

interface MetricItem {
  title: string;
  description: string;
}

const KeywordMetricsSection = () => {
  const leftMetrics: MetricItem[] = [
    {
      title: "Search volume",
      description:
        "The average number of monthly searches over the past 12 months.",
    },
    {
      title: "Keyword difficulty",
      description:
        "A score that estimates how hard it will be to rank in the top 10 for this keyword.",
    },
    {
      title: "Global search volume",
      description:
        "The total number of average monthly searches globally across all databases.",
    },
    {
      title: "Search intent",
      description: "The general purpose of or reason behind a search.",
    },
    {
      title: "Search trend",
      description:
        "The interest of searchers in an analyzed keyword over the last 12 months.",
    },
  ];

  const rightMetrics: MetricItem[] = [
    {
      title: "CPC",
      description:
        "The average price advertisers pay for a user's click on an ad triggered by the keyword in Google Ads.",
    },
    {
      title: "Competitive density",
      description:
        "The level of competition between advertisers bidding on an analyzed keyword within their PPC campaigns.",
    },
    {
      title: "Keyword ideas",
      description:
        "Lists of related keywords, including keyword variations, questions, and keyword clusters.",
    },
    {
      title: "SERP analysis",
      description:
        "An analysis of the search results for query, including SERP features, ranking URLs, and supporting data on the ranking URLs, such as referring domains and search traffic.",
    },
  ];

  return (
    <div className={styles.keywordMetricsSection}>
      <div className={styles.sectionHeader}>
        <h2>Get Deep Keyword Metrics with Keyword Overview</h2>
        <p>
          Keyword Overview provides the following metrics for each and every
          keyword:
        </p>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricsColumn}>
          {leftMetrics.map((metric, index) => (
            <div key={index} className={styles.metricItem}>
              <h3>{metric.title}</h3>
              <p>{metric.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.metricsColumn}>
          {rightMetrics.map((metric, index) => (
            <div key={index} className={styles.metricItem}>
              <h3>{metric.title}</h3>
              <p>{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeywordMetricsSection;
