import React from "react";
import { Card, Table, Progress } from "antd";
import styles from "./position-tracking-section.module.scss";

const PositionTrackingSection: React.FC = () => {
  const competitorColumns = [
    {
      title: "Comp. Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "",
      dataIndex: "bar",
      key: "bar",
      render: (value: number, record: any) => (
        <div className={styles.competitorBar}>
          <div
            className={styles.barFill}
            style={{
              width: `${value}%`,
              backgroundColor: record.color,
            }}
          ></div>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "percentage",
      key: "percentage",
      render: (text: string) => (
        <span className={styles.percentage}>{text}</span>
      ),
    },
  ];

  const competitorData = [
    { key: "1", level: "", bar: 87, percentage: "87%", color: "#00bcd4" },
    { key: "2", level: "", bar: 45, percentage: "", color: "#00bcd4" },
    { key: "3", level: "", bar: 60, percentage: "", color: "#00bcd4" },
    { key: "4", level: "", bar: 30, percentage: "", color: "#00bcd4" },
  ];

  const positionColumns = [
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text: string) => <div className={styles.urlBar}></div>,
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
    },
    {
      title: "Traffic Diff.",
      dataIndex: "diff",
      key: "diff",
      render: (text: string) => (
        <span
          className={text.startsWith("+") ? styles.positive : styles.negative}
        >
          {text}
        </span>
      ),
    },
  ];

  const positionData = [
    { key: "1", url: "", traffic: "", diff: "+184.2K" },
    { key: "2", url: "", traffic: "", diff: "-99.1K" },
    { key: "3", url: "", traffic: "", diff: "+98.9K" },
    { key: "4", url: "", traffic: "", diff: "-90K" },
  ];

  return (
    <div className={styles.positionTrackingSection}>
      <div className={styles.sectionsGrid}>
        {/* Find New Organic Competitors */}
        <div className={styles.sectionItem}>
          <div className={styles.contentGrid}>
            <div className={styles.leftContent}>
              <h2>Find new organic competitors</h2>
              <ul className={styles.featuresList}>
                <li>
                  Keep close tabs on the dynamic organic competitive landscape
                </li>
                <li>
                  Get a visual representation of where your site stands amongst
                  other organic search players
                </li>
                <li>
                  See a list of domains you are battling against for the top
                  positions in Google and Bing
                </li>
              </ul>
            </div>
            <div className={styles.rightContent}>
              <Card className={styles.competitorCard}>
                <div className={styles.competitorMap}>
                  <h3>Main Organic Competitors</h3>
                  <Table
                    columns={competitorColumns}
                    dataSource={competitorData}
                    pagination={false}
                    size="small"
                    showHeader={false}
                  />

                  <div className={styles.positioningMap}>
                    <span className={styles.mapLabel}>
                      Competitive Positioning Map
                    </span>
                    <div className={styles.bubbleChart}>
                      <div
                        className={styles.bubble}
                        style={{
                          left: "60%",
                          top: "40%",
                          backgroundColor: "#3b82f6",
                          width: "60px",
                          height: "60px",
                        }}
                      ></div>
                      <div
                        className={styles.bubble}
                        style={{
                          left: "30%",
                          top: "60%",
                          backgroundColor: "#f59e0b",
                          width: "40px",
                          height: "40px",
                        }}
                      ></div>
                      <div
                        className={styles.bubble}
                        style={{
                          left: "70%",
                          top: "70%",
                          backgroundColor: "#a855f7",
                          width: "30px",
                          height: "30px",
                        }}
                      ></div>
                      <div
                        className={styles.bubble}
                        style={{
                          left: "20%",
                          top: "30%",
                          backgroundColor: "#10b981",
                          width: "35px",
                          height: "35px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Observe Position Changes */}
        <div className={styles.sectionItem}>
          <div className={styles.contentGrid}>
            <div className={styles.leftContent}>
              <h2>Observe a domain's position changes</h2>
              <ul className={styles.featuresList}>
                <li>
                  Find out where your rivals' keyword rankings are changing in
                  organic results and SERP features
                </li>
                <li>
                  Identify keywords and URLs that have gained or lost traffic
                </li>
                <li>
                  Understand where your own tactics are winning and if there's
                  room for improvement
                </li>
              </ul>
            </div>
            <div className={styles.rightContent}>
              <Card className={styles.positionCard}>
                <div className={styles.positionContent}>
                  <h3>Top Page Changes</h3>
                  <Table
                    columns={positionColumns}
                    dataSource={positionData}
                    pagination={false}
                    size="small"
                    showHeader={true}
                  />

                  <div className={styles.trendSection}>
                    <h4>Position Changes Trend</h4>
                    <div className={styles.trendChart}>
                      <svg viewBox="0 0 300 100" className={styles.chartSvg}>
                        <path
                          d="M20,80 Q60,40 120,50 T240,45 T280,35"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      <div className={styles.barChart}>
                        <div
                          className={styles.bar}
                          style={{ height: "30%", backgroundColor: "#ef4444" }}
                        ></div>
                        <div
                          className={styles.bar}
                          style={{ height: "50%", backgroundColor: "#f59e0b" }}
                        ></div>
                        <div
                          className={styles.bar}
                          style={{ height: "70%", backgroundColor: "#10b981" }}
                        ></div>
                        <div
                          className={styles.bar}
                          style={{ height: "40%", backgroundColor: "#ef4444" }}
                        ></div>
                        <div
                          className={styles.bar}
                          style={{ height: "80%", backgroundColor: "#10b981" }}
                        ></div>
                        <div
                          className={styles.bar}
                          style={{ height: "60%", backgroundColor: "#f59e0b" }}
                        ></div>
                        <div
                          className={styles.bar}
                          style={{ height: "90%", backgroundColor: "#10b981" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionTrackingSection;
