"use client";
import React from "react";
import { Card, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./success_stories_section.module.scss";

type Props = {};

const SuccessStoriesSection = ({}: Props) => {
  const stories = [
    {
      company: "Impression",
      logo: "IMPRESSION",
      title: "Impression Digital Wins $430K in New Business",
      description:
        "Impression Digital used competitive data from Semrush Traffic & Market to outflank niches and win substantial new business opportunities.",
      action: "Read their story",
      color: "#00b894",
    },
    {
      company: "LaLiga",
      logo: "LaLiga",
      title: "La Liga Protects $6M in Revenue",
      description:
        "La Liga implemented the Semrush Trends API to detect and disrupt illegal streaming links, safeguarding their broadcast value.",
      action: "Read their story",
      color: "#6c5ce7",
    },
    {
      company: "Hotmart",
      logo: "hotmart",
      title: "Hotmart Increases Conversions by 80%",
      description:
        "Hotmart achieved a 10x increase in new creator engagement, 80% conversion growth, and 500K+ monthly sessions using the Traffic & Market Toolkit.",
      action: "Read their story",
      color: "#fd79a8",
    },
  ];

  return (
    <div className={styles.successSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Discover why industry leaders love the Traffic & Market Toolkit
          </h2>
          <p className={styles.subtitle}>
            Your trusted solution for insights on your competitors and market
          </p>
        </div>

        <div className={styles.storiesGrid}>
          {stories.map((story, index) => (
            <Card key={index} className={styles.storyCard} hoverable>
              <div className={styles.cardContent}>
                <div className={styles.logoSection}>
                  <div
                    className={styles.logoWrapper}
                    style={{ backgroundColor: story.color }}
                  >
                    <span className={styles.logoText}>{story.logo}</span>
                  </div>
                </div>

                <div className={styles.contentSection}>
                  <h3 className={styles.storyTitle}>{story.title}</h3>
                  <p className={styles.storyDescription}>{story.description}</p>

                  <Button
                    type="link"
                    className={styles.actionBtn}
                    style={{ color: story.color }}
                  >
                    {story.action} <ArrowRightOutlined />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.footer}>
          <Button type="primary" size="large" className={styles.exploreBtn}>
            Explore success stories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesSection;
