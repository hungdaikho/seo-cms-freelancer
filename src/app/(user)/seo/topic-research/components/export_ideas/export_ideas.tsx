"use client";

import React from "react";
import { Card } from "antd";
import { FaBullseye, FaTrello, FaFileExcel } from "react-icons/fa";
import styles from "./export_ideas.module.scss";

const exportOptions = [
  {
    icon: <FaBullseye />,
    title: "SEO Content Template",
    description:
      "Create automated SEO-friendly content briefs for your subtopics.",
    color: "#ff6b35",
  },
  {
    icon: <FaTrello />,
    title: "Trello",
    description: "Send your content tasks directly to Trello with one click.",
    color: "#0079bf",
  },
  {
    icon: <FaFileExcel />,
    title: "Excel",
    description:
      "Send collected data to an XLSX file showing backlinks, volume, and potential resonance for each idea.",
    color: "#217346",
  },
];

const ExportIdeas = () => {
  return (
    <div className={styles.exportIdeas}>
      <h2 className={styles.title}>Export Ideas for Your Content Plan</h2>

      <div className={styles.optionsGrid}>
        {exportOptions.map((option, index) => (
          <Card key={index} className={styles.optionCard}>
            <div className={styles.iconWrapper} style={{ color: option.color }}>
              <span className={styles.icon}>{option.icon}</span>
            </div>
            <h3 className={styles.optionTitle}>{option.title}</h3>
            <p className={styles.optionDescription}>{option.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExportIdeas;
