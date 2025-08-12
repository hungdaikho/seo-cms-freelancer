"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import styles from "./detailed-reports.module.scss";

interface DetailedReportsProps {}

const DetailedReports: React.FC<DetailedReportsProps> = () => {
  return (
    <div className={styles.detailedReports}>
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} lg={12}>
          <div className={styles.reportContent}>
            <h2 className={styles.sectionTitle}>
              Get a comprehensive report on any page of your website
            </h2>
            <ul className={styles.featuresList}>
              <li>Home into the exact issues that need your attention</li>
              <li>
                Look into detailed how-tos for improving each area of your site
              </li>
            </ul>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <Card className={styles.reportPreview}>
            <div className={styles.previewHeader}>
              <div className={styles.urlBar}>https://www.krispykreme.com</div>
            </div>

            <div className={styles.previewContent}>
              <div className={styles.reportSection}>
                <div
                  className={styles.sectionTag}
                  style={{ backgroundColor: "#f5222d" }}
                >
                  Sf
                </div>
                <div className={styles.sectionContent}>
                  <div className={styles.sectionTitle}>SERP Features</div>
                  <div className={styles.sectionItem}>
                    • Mark up your aggregate rating
                  </div>
                </div>
              </div>

              <div className={styles.reportSection}>
                <div
                  className={styles.sectionTag}
                  style={{ backgroundColor: "#52c41a" }}
                >
                  Co
                </div>
                <div className={styles.sectionContent}>
                  <div className={styles.sectionTitle}>Content</div>
                  <div className={styles.sectionItem}>
                    • Use target keywords in &lt;title&gt; tag
                  </div>
                  <div className={styles.sectionItem}>
                    • Use target keyword in &lt;h1&gt; tag
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetailedReports;
