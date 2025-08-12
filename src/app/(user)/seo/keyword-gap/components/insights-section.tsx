import React from "react";
import { Card, Table, Progress } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styles from "./insights-section.module.scss";

const InsightsSection: React.FC = () => {
  const keywordColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => (
        <a href="#" className={styles.keywordLink}>
          {text}
        </a>
      ),
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
    },
    {
      title: "",
      dataIndex: "sites",
      key: "sites",
      render: (sites: string[]) => (
        <div className={styles.siteIndicators}>
          {sites.map((site, index) => (
            <span
              key={index}
              className={styles.siteIndicator}
              style={{
                backgroundColor:
                  site === "ebay.com"
                    ? "#10b981"
                    : site === "amazon.com"
                    ? "#10b981"
                    : "#3b82f6",
              }}
            ></span>
          ))}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "trend",
      key: "trend",
      render: (trend: string) => (
        <span className={trend === "up" ? styles.trendUp : styles.trendDown}>
          {trend === "up" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </span>
      ),
    },
  ];

  const keywordData = [
    {
      key: "1",
      keyword: "buy",
      volume: "185.1M",
      sites: ["ebay.com", "amazon.com"],
      trend: "up",
    },
    {
      key: "2",
      keyword: "movies",
      volume: "134.5K",
      sites: ["ebay.com"],
      trend: "up",
    },
    {
      key: "3",
      keyword: "book",
      volume: "23.4K",
      sites: ["amazon.com"],
      trend: "down",
    },
  ];

  return (
    <div className={styles.insightsSection}>
      <div className={styles.sectionGrid}>
        <div className={styles.leftContent}>
          <h2>Get insights to stay ahead</h2>
          <p>
            Find out the competitors with the largest keyword profile. Create
            your own keyword masterlist helping you beat your competitors.
          </p>
        </div>

        <div className={styles.rightContent}>
          <Card className={styles.insightsCard}>
            <div className={styles.insightsContent}>
              <div className={styles.tableSection}>
                <Table
                  columns={keywordColumns}
                  dataSource={keywordData}
                  pagination={false}
                  size="small"
                  showHeader={true}
                />
              </div>

              <div className={styles.chartSection}>
                <div className={styles.chartPlaceholder}>
                  <div className={styles.chartPattern}>
                    {/* Simplified pattern representation */}
                    <div className={styles.patternRow}>
                      <div
                        className={styles.patternDot}
                        style={{ backgroundColor: "#a855f7" }}
                      ></div>
                      <div
                        className={styles.patternDot}
                        style={{ backgroundColor: "#ec4899" }}
                      ></div>
                      <div
                        className={styles.patternDot}
                        style={{ backgroundColor: "#f59e0b" }}
                      ></div>
                      <div
                        className={styles.patternDot}
                        style={{ backgroundColor: "#10b981" }}
                      ></div>
                    </div>
                    <div className={styles.patternRow}>
                      <div
                        className={styles.patternDot}
                        style={{ backgroundColor: "#3b82f6" }}
                      ></div>
                      <div
                        className={styles.patternDot}
                        style={{ backgroundColor: "#8b5cf6" }}
                      ></div>
                      <div
                        className={styles.patternDot}
                        style={{ backgroundColor: "#06b6d4" }}
                      ></div>
                      <div
                        className={styles.patternDot}
                        style={{ backgroundColor: "#ef4444" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;
