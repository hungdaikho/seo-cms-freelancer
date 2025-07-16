import React from "react";
import { Row, Col, Button } from "antd";
import { FaFileExport, FaCheckCircle } from "react-icons/fa";
import styles from "./empower-writers.module.scss";

const EmpowerWriters = () => {
  return (
    <div className={styles.empowerWriters}>
      <Row gutter={[40, 40]} align="middle">
        <Col span={12}>
          <h2 className={styles.title}>Empower your content writers</h2>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <FaFileExport className={styles.featureIcon} />
              <div>
                <h3>Add all SEO guidelines in one place</h3>
                <p>
                  Export your SEO content templates to a .doc file and share
                  them with your copywriters.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <FaCheckCircle className={styles.featureIcon} />
              <div>
                <h3>Check the submitted content in real-time</h3>
                <p>
                  Automatically send the written content to the SEO Writing
                  Assistant to ensure it's optimized for readers and search
                  engines.
                </p>
              </div>
            </div>
          </div>
        </Col>

        <Col span={12}>
          <div className={styles.previewSection}>
            <div className={styles.previewCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>SEO Recommendations</span>
                <span className={styles.cardSubtitle}>
                  Real-time Content Check
                </span>
                <Button
                  type="primary"
                  size="small"
                  icon={<FaFileExport />}
                  className={styles.exportButton}
                >
                  Export to DOC
                </Button>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.scoreSection}>
                  <div className={styles.scoreCircle}>
                    <div className={styles.scoreNumber}>7.4</div>
                    <div className={styles.scoreMax}>/10</div>
                  </div>
                  <div className={styles.scoreLabel}>
                    <span className={styles.goodScore}>Good</span>
                  </div>
                </div>

                <div className={styles.recommendationsPreview}>
                  <div className={styles.recItem}>
                    <div className={styles.recBar}></div>
                  </div>
                  <div className={styles.recItem}>
                    <div className={styles.recBar}></div>
                  </div>
                  <div className={styles.recItem}>
                    <div className={styles.recBar}></div>
                  </div>
                  <div className={styles.recItem}>
                    <div className={styles.recBar}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EmpowerWriters;
