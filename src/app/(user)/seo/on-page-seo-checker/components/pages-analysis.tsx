"use client";

import React from "react";
import { Row, Col, Card, Tag } from "antd";
import styles from "./pages-analysis.module.scss";

interface PageData {
  url: string;
  priority: "high" | "medium" | "low";
  ideas: number;
}

interface PagesAnalysisProps {}

const PagesAnalysis: React.FC<PagesAnalysisProps> = () => {
  const pagesData: PageData[] = [
    {
      url: "http://www.krispykreme.com/locate/location-search",
      priority: "high",
      ideas: 11,
    },
    {
      url: "http://www.krispykreme.com",
      priority: "high",
      ideas: 14,
    },
    {
      url: "http://www.krispykreme.com/locate/bowling-green",
      priority: "medium",
      ideas: 12,
    },
    {
      url: "http://www.krispykreme.com/locate/coffee-and-drinks/latte",
      priority: "low",
      ideas: 9,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#f5222d";
      case "medium":
        return "#fa8c16";
      case "low":
        return "#fadb14";
      default:
        return "#d9d9d9";
    }
  };

  const getPriorityDots = (priority: string) => {
    switch (priority) {
      case "high":
        return "●●●";
      case "medium":
        return "●●○";
      case "low":
        return "●○○";
      default:
        return "○○○";
    }
  };

  return (
    <div className={styles.pagesAnalysis}>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={14}>
          <Card className={styles.pagesCard}>
            <div className={styles.cardHeader}>
              <div className={styles.headerItem}>
                <span className={styles.headerLabel}>Priority</span>
              </div>
              <div className={styles.headerItem}>
                <span className={styles.headerLabel}>Page</span>
              </div>
              <div className={styles.headerItem}>
                <span className={styles.headerLabel}>All ideas</span>
              </div>
            </div>

            <div className={styles.pagesList}>
              {pagesData.map((page, index) => (
                <div key={index} className={styles.pageItem}>
                  <div className={styles.priorityColumn}>
                    <span
                      className={styles.priorityDots}
                      style={{ color: getPriorityColor(page.priority) }}
                    >
                      {getPriorityDots(page.priority)}
                    </span>
                  </div>
                  <div className={styles.urlColumn}>
                    <span className={styles.pageUrl}>{page.url}</span>
                  </div>
                  <div className={styles.ideasColumn}>
                    <Tag className={styles.ideasTag} color="green">
                      {page.ideas} ideas
                    </Tag>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <div className={styles.reportInfo}>
            <h3 className={styles.reportTitle}>
              Get a report on all pages of your site
            </h3>
            <ul className={styles.reportFeatures}>
              <li>
                Get a list of pages with a number of ideas for improvements
              </li>
              <li>
                Sort pages by recommendation importance, number of ideas, volume
                and more
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PagesAnalysis;
