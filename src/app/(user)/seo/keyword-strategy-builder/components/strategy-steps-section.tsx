"use client";

import React from "react";
import { Card, Button, Row, Col, Progress, Divider } from "antd";
import { FaLightbulb, FaRocket, FaCog } from "react-icons/fa";
import {
  AiOutlineFileText,
  AiOutlineBarChart,
  AiOutlineAim,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import styles from "./strategy-steps-section.module.scss";

interface StrategyStepsProps {}

const StrategyStepsSection: React.FC<StrategyStepsProps> = () => {
  const steps = [
    {
      icon: <FaLightbulb />,
      title: "Research keywords",
      description:
        "AI helps you discover relevant keywords from 25+ billion keyword database",
      features: [
        "Keyword difficulty analysis",
        "Search volume insights",
        "Competitive analysis",
        "Intent classification",
      ],
      color: "#8b5cf6",
    },
    {
      icon: <FaCog />,
      title: "Build strategy",
      description:
        "Get AI-powered content strategy recommendations based on your goals",
      features: [
        "Topic clustering",
        "Content gap analysis",
        "Priority scoring",
        "Content calendar",
      ],
      color: "#10b981",
    },
    {
      icon: <FaRocket />,
      title: "Execute & track",
      description:
        "Monitor your keyword rankings and content performance over time",
      features: [
        "Position tracking",
        "Traffic monitoring",
        "ROI measurement",
        "Performance alerts",
      ],
      color: "#f59e0b",
    },
  ];

  const demoData = [
    {
      keyword: "family photo ideas outdoor",
      difficulty: 45,
      volume: "2.9K",
      intent: "Informational",
      priority: "High",
      status: "In Progress",
    },
    {
      keyword: "creative family photography poses",
      difficulty: 52,
      volume: "1.8K",
      intent: "Informational",
      priority: "High",
      status: "Planned",
    },
    {
      keyword: "family portrait session tips",
      difficulty: 38,
      volume: "1.2K",
      intent: "Informational",
      priority: "Medium",
      status: "Completed",
    },
    {
      keyword: "best camera for family photos",
      difficulty: 67,
      volume: "3.5K",
      intent: "Commercial",
      priority: "Medium",
      status: "Research",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#ef4444";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#10b981";
      case "In Progress":
        return "#3b82f6";
      case "Planned":
        return "#8b5cf6";
      case "Research":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className={styles.strategyStepsSection}>
      <div className={styles.sectionHeader}>
        <h2>Build a better strategy in 3 simple steps</h2>
        <p>
          Our AI-powered platform guides you through every stage of keyword
          strategy development
        </p>
      </div>

      <Row gutter={[24, 24]} className={styles.stepsGrid}>
        {steps.map((step, index) => (
          <Col xs={24} md={8} key={index}>
            <Card className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <div
                  className={styles.stepIcon}
                  style={{ background: step.color }}
                >
                  {step.icon}
                </div>
                <div className={styles.stepNumber}>{index + 1}</div>
              </div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                <ul className={styles.featureList}>
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <AiOutlineCheckCircle className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider className={styles.sectionDivider} />

      <div className={styles.demoSection}>
        <div className={styles.demoHeader}>
          <h3>See your strategy in action</h3>
          <p>
            Example keyword strategy dashboard for family photography business
          </p>
        </div>

        <Card className={styles.demoCard}>
          <div className={styles.demoStats}>
            <Row gutter={16}>
              <Col span={6}>
                <div className={styles.statItem}>
                  <AiOutlineAim className={styles.statIcon} />
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>24</div>
                    <div className={styles.statLabel}>Target Keywords</div>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.statItem}>
                  <AiOutlineBarChart className={styles.statIcon} />
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>12.5K</div>
                    <div className={styles.statLabel}>Monthly Volume</div>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.statItem}>
                  <AiOutlineFileText className={styles.statIcon} />
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>8</div>
                    <div className={styles.statLabel}>Content Pieces</div>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.statItem}>
                  <div className={styles.progressContainer}>
                    <Progress
                      type="circle"
                      percent={75}
                      size={40}
                      strokeColor="#10b981"
                    />
                  </div>
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>75%</div>
                    <div className={styles.statLabel}>Strategy Complete</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className={styles.demoTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Keyword</div>
              <div className={styles.headerCell}>Difficulty</div>
              <div className={styles.headerCell}>Volume</div>
              <div className={styles.headerCell}>Intent</div>
              <div className={styles.headerCell}>Priority</div>
              <div className={styles.headerCell}>Status</div>
            </div>
            {demoData.map((item, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <span className={styles.keyword}>{item.keyword}</span>
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.difficultyBadge}>
                    <Progress
                      percent={item.difficulty}
                      size="small"
                      showInfo={false}
                      strokeColor={
                        item.difficulty > 60
                          ? "#ef4444"
                          : item.difficulty > 40
                          ? "#f59e0b"
                          : "#10b981"
                      }
                    />
                    <span>{item.difficulty}</span>
                  </div>
                </div>
                <div className={styles.tableCell}>
                  <span className={styles.volume}>{item.volume}</span>
                </div>
                <div className={styles.tableCell}>
                  <span className={styles.intent}>{item.intent}</span>
                </div>
                <div className={styles.tableCell}>
                  <span
                    className={styles.priority}
                    style={{ color: getPriorityColor(item.priority) }}
                  >
                    {item.priority}
                  </span>
                </div>
                <div className={styles.tableCell}>
                  <span
                    className={styles.status}
                    style={{
                      color: getStatusColor(item.status),
                      background: `${getStatusColor(item.status)}15`,
                      border: `1px solid ${getStatusColor(item.status)}30`,
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.demoActions}>
            <Button type="primary" size="large">
              View Full Strategy
            </Button>
            <Button size="large">Export Report</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StrategyStepsSection;
