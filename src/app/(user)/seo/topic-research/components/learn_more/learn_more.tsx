"use client";

import React from "react";
import { Card } from "antd";
import { FaLightbulb, FaSearch, FaClipboardList } from "react-icons/fa";
import styles from "./learn_more.module.scss";

const applications = [
  {
    icon: <FaLightbulb />,
    title: "How to Find Relevant Topics with Good SEO Potential",
    bgColor: "#ffd700",
  },
  {
    icon: <FaSearch />,
    title: "How to Find Hundreds of Content Ideas in Minutes",
    bgColor: "#4dabf7",
  },
  {
    icon: <FaClipboardList />,
    title: "How to Find Gaps in Your Content Plan",
    bgColor: "#51cf66",
  },
];

const LearnMore = () => {
  return (
    <div className={styles.learnMore}>
      <h2 className={styles.title}>
        Learn More About the Applications of the Topic Research Tool
      </h2>

      <div className={styles.applicationsGrid}>
        {applications.map((app, index) => (
          <Card key={index} className={styles.appCard} hoverable>
            <div
              className={styles.imageWrapper}
              style={{ backgroundColor: app.bgColor }}
            >
              <div className={styles.iconOverlay}>
                <span className={styles.icon}>{app.icon}</span>
              </div>
            </div>
            <h3 className={styles.appTitle}>{app.title}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearnMore;
