"use client";

import React from "react";
import { Row, Col, Card, Button } from "antd";
import styles from "./export-section.module.scss";

interface ExportSectionProps {}

const ExportSection: React.FC<ExportSectionProps> = () => {
  return (
    <div className={styles.exportSection}>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card className={styles.exportCard}>
            <div className={styles.exportContent}>
              <h3 className={styles.exportTitle}>
                Export keywords to other tools or Excel
              </h3>
              <ul className={styles.exportList}>
                <li>
                  Send them to Position Tracking to compare your performance
                  with your competitors
                </li>
                <li>Type them in Keyword Magic to get more keyword ideas</li>
                <li>
                  Import them to SEO Ideas to find out how to get to the top
                </li>
                <li>Export them to Excel</li>
              </ul>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className={styles.trackingCard}>
            <div className={styles.trackingContent}>
              <h3 className={styles.trackingTitle}>
                Send to Position Tracking
              </h3>
              <div className={styles.selectionInfo}>
                <div className={styles.selectionBadge}>All (348)</div>
                <div className={styles.selectionLabel}>selected (0)</div>
              </div>

              <div className={styles.projectInfo}>
                <div className={styles.projectLabel}>Project</div>
                <div className={styles.projectDetails}>
                  <span className={styles.projectName}>billmonetary.com</span>
                  <span className={styles.projectMeta}>(billmonetary.com)</span>
                  <span className={styles.projectLocation}>
                    🇺🇸 United States • English
                  </span>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <Button type="primary" className={styles.sendBtn}>
                  Send keywords
                </Button>
                <Button className={styles.cancelBtn}>Cancel</Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExportSection;
