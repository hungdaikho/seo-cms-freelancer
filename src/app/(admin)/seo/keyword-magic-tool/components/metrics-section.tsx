"use client";

import styles from "./metrics-section.module.scss";

interface MetricItem {
  title: string;
  description: string;
}

const MetricsSection = () => {
  const leftMetrics: MetricItem[] = [
    {
      title: "Keyword search volume",
      description: "The average monthly searches for a keyword.",
    },
    {
      title: "Search intent",
      description:
        "The purpose behind the query, indicating what users are looking for.",
    },
    {
      title: "12-month trend",
      description: "The keyword's changes in popularity over the past year.",
    },
    {
      title: "Keyword difficulty",
      description: "How hard it will be to rank for a keyword.",
    },
  ];

  const rightMetrics: MetricItem[] = [
    {
      title: "CPC",
      description:
        "The average cost per click if you advertise for that keyword.",
    },
    {
      title: "SERP features",
      description: "Additional elements in the search results for a keyword.",
    },
    {
      title: "Competitive density",
      description: "The level of advertiser competition bidding on a keyword.",
    },
    {
      title: "Number of results",
      description:
        "The number of URLs displayed in search results for a keyword.",
    },
  ];

  return (
    <div className={styles.metricsSection}>
      <div className={styles.sectionHeader}>
        <h2>Stay on Top of Key Metrics with Our Free Keyword Tool</h2>
        <p>
          Free and paid versions of our keyword tool provide the following
          metrics:
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

      <div className={styles.metricsFooter}>
        <p>
          These in-depth keyword metrics, combined with a huge range of advanced
          filters, make it easy
          <br />
          to uncover untapped, high-value keywords for your SEO and PPC efforts.
        </p>
      </div>
    </div>
  );
};

export default MetricsSection;
