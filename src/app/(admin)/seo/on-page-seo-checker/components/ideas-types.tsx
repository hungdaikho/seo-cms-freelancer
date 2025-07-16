"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import styles from "./ideas-types.module.scss";

interface IdeaType {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface IdeasTypesProps {}

const IdeasTypes: React.FC<IdeasTypesProps> = () => {
  const ideaTypes: IdeaType[] = [
    {
      icon: "SI",
      title: "Strategy Ideas",
      description:
        "Find out which of your pages are ranking the highest and optimize them to get more traffic.",
      color: "#1890ff",
    },
    {
      icon: "BI",
      title: "Backlinks Ideas",
      description: "Discover which websites you should earn links from.",
      color: "#52c41a",
    },
    {
      icon: "Te",
      title: "Technical SEO Ideas",
      description:
        "Get a structured list of technical issues found on your website.",
      color: "#fa8c16",
    },
    {
      icon: "Ux",
      title: "User Experience Ideas",
      description:
        "Connect your Google Analytics account and boost your user experience for better rankings.",
      color: "#722ed1",
    },
    {
      icon: "Sf",
      title: "SERP Features Ideas",
      description:
        "Learn what you can do to get your webpage featured in special SERP results.",
      color: "#f5222d",
    },
    {
      icon: "Se",
      title: "Semantic Ideas",
      description:
        "Discover what important words are used by the websites in Google's Top 10.",
      color: "#13c2c2",
    },
    {
      icon: "Co",
      title: "Content Ideas",
      description: "Adopt the best practices of Google's top 10 performers.",
      color: "#52c41a",
    },
  ];

  return (
    <div className={styles.ideasTypes}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>The ideas you'll get</h2>
      </div>

      <Row gutter={[24, 24]}>
        {ideaTypes.map((idea, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card className={styles.ideaCard}>
              <div
                className={styles.ideaIcon}
                style={{ backgroundColor: idea.color }}
              >
                {idea.icon}
              </div>
              <h3 className={styles.ideaTitle}>{idea.title}</h3>
              <p className={styles.ideaDescription}>{idea.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default IdeasTypes;
