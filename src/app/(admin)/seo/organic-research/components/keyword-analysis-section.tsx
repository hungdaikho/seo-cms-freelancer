import React from "react";
import { Card, Table, Tag } from "antd";
import styles from "./keyword-analysis-section.module.scss";

const KeywordAnalysisSection: React.FC = () => {
  const keywordColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => (
        <span className={styles.keywordText}>{text}</span>
      ),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position: number) => (
        <span className={styles.position}>→ {position}</span>
      ),
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: string) => (
        <span className={styles.volume}>{volume}</span>
      ),
    },
  ];

  const keywordData = [
    { key: "1", keyword: "", position: 1, volume: "5,500" },
    { key: "2", keyword: "", position: 3, volume: "2,100" },
  ];

  return (
    <div className={styles.keywordAnalysisSection}>
      <div className={styles.sectionGrid}>
        <div className={styles.leftContent}>
          <h2>Discover your competitors' best keywords</h2>
          <ul className={styles.featuresList}>
            <li>Explore your rivals' keyword rankings on desktop and mobile</li>
            <li>
              View their landing pages displayed in the SERPs for a given
              keyword
            </li>
            <li>See how much traffic a search term is bringing organically</li>
          </ul>
        </div>

        <div className={styles.rightContent}>
          <Card className={styles.trafficCard}>
            <div className={styles.cardHeader}>
              <h3>Estimated Traffic Trend</h3>
            </div>

            <div className={styles.chartArea}>
              <svg viewBox="0 0 300 120" className={styles.chartSvg}>
                <defs>
                  <linearGradient
                    id="blueGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path
                  d="M20,100 Q60,60 120,70 T240,50 T280,40"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M20,100 Q60,60 120,70 T240,50 T280,40 L280,110 L20,110 Z"
                  fill="url(#blueGradient)"
                />
              </svg>
              <div className={styles.chartLabels}>
                <span>Jan 28</span>
                <span>Jan 29</span>
                <span>Jan 30</span>
              </div>
            </div>

            <div className={styles.keywordsTable}>
              <div className={styles.tableHeader}>
                <h4>Top organic Keywords</h4>
              </div>
              <Table
                columns={keywordColumns}
                dataSource={keywordData}
                pagination={false}
                size="small"
                showHeader={true}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KeywordAnalysisSection;
