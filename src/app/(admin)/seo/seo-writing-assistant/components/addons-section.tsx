"use client";

import React from "react";
import { Row, Col, Button } from "antd";
import { FiFileText, FiEdit, FiTool } from "react-icons/fi";
import styles from "./addons-section.module.scss";

interface Addon {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonClass: string;
}

interface AddonsSectionProps {}

const AddonsSection: React.FC<AddonsSectionProps> = () => {
  const addons: Addon[] = [
    {
      icon: <FiFileText />,
      title: "Google Docs Add-On",
      description:
        "Optimize your content directly in Google Docs with real-time SEO suggestions.",
      buttonText: "Google Docs Add-On",
      buttonClass: "googleDocs",
    },
    {
      icon: <FiEdit />,
      title: "WordPress Add-On",
      description:
        "Seamlessly integrate SEO optimization into your WordPress editing workflow.",
      buttonText: "WordPress Add-On",
      buttonClass: "wordpress",
    },
    {
      icon: <FiTool />,
      title: "MS Word Add-On",
      description:
        "Enhance your Microsoft Word documents with powerful SEO analysis tools.",
      buttonText: "MS Word Add-On",
      buttonClass: "msword",
    },
  ];

  return (
    <div className={styles.addonsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Available Add-Ons</h2>
        <p className={styles.sectionSubtitle}>
          Optimize your content where it's most convenient.
        </p>
      </div>

      <Row gutter={[32, 32]} justify="center">
        {addons.map((addon, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <div className={styles.addonCard}>
              <div className={styles.addonIcon}>{addon.icon}</div>
              <h3 className={styles.addonTitle}>{addon.title}</h3>
              <p className={styles.addonDescription}>{addon.description}</p>
              <Button
                className={`${styles.addonButton} ${styles[addon.buttonClass]}`}
                size="large"
                block
              >
                {addon.buttonText}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AddonsSection;
