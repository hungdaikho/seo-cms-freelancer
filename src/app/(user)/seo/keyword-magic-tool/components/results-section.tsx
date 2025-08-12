"use client";

import { Card, Table, Button, Tag } from "antd";
import { AiOutlineExpand, AiOutlineStar } from "react-icons/ai";
import { HiOutlineLightBulb } from "react-icons/hi";
import styles from "./results-section.module.scss";

interface KeywordData {
  key: string;
  keyword: string;
  intent: string;
  volume: number;
  potentialTraffic: number;
  personalKD: number;
  updated: string;
}

const ResultsSection = () => {
  const keywordData: KeywordData[] = [
    {
      key: "1",
      keyword: "bookstore",
      intent: "C",
      volume: 224,
      potentialTraffic: 98,
      personalKD: 5,
      updated: "5min",
    },
    {
      key: "2",
      keyword: "books",
      intent: "C",
      volume: 82,
      potentialTraffic: 95,
      personalKD: 10,
      updated: "Today",
    },
    {
      key: "3",
      keyword: "book store",
      intent: "I",
      volume: 67,
      potentialTraffic: 89,
      personalKD: 8,
      updated: "Now",
    },
    {
      key: "4",
      keyword: "epic books",
      intent: "N",
      volume: 45,
      potentialTraffic: 73,
      personalKD: 12,
      updated: "1h",
    },
    {
      key: "5",
      keyword: "books a million",
      intent: "N",
      volume: 30,
      potentialTraffic: 31,
      personalKD: 15,
      updated: "4h",
    },
  ];

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case "C":
        return "#f59e0b";
      case "I":
        return "#10b981";
      case "N":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  const getIntentIcon = (intent: string) => {
    switch (intent) {
      case "C":
        return "💰";
      case "I":
        return "📝";
      case "N":
        return "🔍";
      default:
        return "❓";
    }
  };

  const getDifficultyColor = (kd: number) => {
    if (kd <= 5) return "#10b981";
    if (kd <= 10) return "#f59e0b";
    return "#ef4444";
  };

  const columns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => (
        <div className={styles.keywordCell}>
          <AiOutlineExpand className={styles.expandIcon} />
          <span className={styles.keywordText}>{text}</span>
        </div>
      ),
    },
    {
      title: "Intent",
      dataIndex: "intent",
      key: "intent",
      render: (intent: string) => (
        <div className={styles.intentCell}>
          <span className={styles.intentIcon}>{getIntentIcon(intent)}</span>
        </div>
      ),
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => (
        <div className={styles.volumeCell}>
          <div className={styles.volumeBar}>
            <div
              className={styles.volumeFill}
              style={{ width: `${(volume / 224) * 100}%` }}
            ></div>
          </div>
          <span>{volume}</span>
        </div>
      ),
    },
    {
      title: () => (
        <div className={styles.columnHeader}>
          <AiOutlineStar className={styles.starIcon} />
          <span>Potential Traffic</span>
        </div>
      ),
      dataIndex: "potentialTraffic",
      key: "potentialTraffic",
      render: (traffic: number) => (
        <div className={styles.trafficCell}>
          <div
            className={styles.difficultyDot}
            style={{ backgroundColor: getDifficultyColor(traffic) }}
          ></div>
          <span>{traffic}</span>
        </div>
      ),
    },
    {
      title: () => (
        <div className={styles.columnHeader}>
          <HiOutlineLightBulb className={styles.bulbIcon} />
          <span>Personal KD%</span>
        </div>
      ),
      dataIndex: "personalKD",
      key: "personalKD",
      render: (kd: number) => (
        <div className={styles.kdCell}>
          <div
            className={styles.difficultyDot}
            style={{ backgroundColor: getDifficultyColor(kd) }}
          ></div>
          <span>{kd}</span>
        </div>
      ),
    },
    {
      title: "Updated",
      dataIndex: "updated",
      key: "updated",
      render: (updated: string) => (
        <span className={styles.updatedText}>{updated}</span>
      ),
    },
  ];

  return (
    <div className={styles.resultsSection}>
      <Card className={styles.resultsCard}>
        <div className={styles.resultsHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.aiPowered}>
              <Button size="small" className={styles.aiButton}>
                AI-powered
              </Button>
            </div>
            <div className={styles.filterTabs}>
              <Button size="small" className={styles.domainTab}>
                🔮 Your domain
              </Button>
              <Button size="small" className={styles.matchTab}>
                Broad Match
              </Button>
              <span className={styles.matchTypes}>Phrase Match</span>
              <span className={styles.matchTypes}>Exact Match</span>
              <span className={styles.matchTypes}>Related</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.resultCount}>
              <span className={styles.totalKeywords}>All keywords</span>
              <span className={styles.count}>12,748,094</span>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={keywordData}
            pagination={false}
            className={styles.keywordTable}
            size="small"
          />
        </div>
      </Card>
    </div>
  );
};

export default ResultsSection;
