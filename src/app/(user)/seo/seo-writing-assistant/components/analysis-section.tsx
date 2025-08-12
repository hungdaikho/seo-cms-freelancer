"use client";

import React from "react";
import { Row, Col, Progress, Button } from "antd";
import { FiEdit } from "react-icons/fi";
import styles from "./analysis-section.module.scss";

interface AnalysisSectionProps {}

const AnalysisSection: React.FC<AnalysisSectionProps> = () => {
  return (
    <div className={styles.analysisSection}>
      <Row gutter={[48, 48]} align="middle">
        <Col xs={24} lg={12}>
          <div className={styles.analysisContent}>
            <h2 className={styles.sectionTitle}>
              Improve your SEO writing on the go
            </h2>

            <ul className={styles.featuresList}>
              <li>
                <strong>Leverage real-time data and insights</strong> based on
                the top-ranking rivals for your keywords.
              </li>
              <li>
                <strong>Use add-ons to optimize your text</strong> in Google
                Docs, WordPress, or MS Word 365.
              </li>
              <li>
                <strong>Automate your editing process:</strong> get immediate
                detailed tips on how to improve each content piece.
              </li>
            </ul>

            <Button type="primary" size="large" className={styles.ctaButton}>
              Score and optimize your copy
            </Button>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <div className={styles.analysisDemo}>
            {/* Score Circle */}
            <div className={styles.scoreSection}>
              <div className={styles.scoreCircle}>
                <div className={styles.scoreValue}>
                  <span className={styles.scoreNumber}>Good 7.4</span>
                  <span className={styles.scoreTotal}>/10</span>
                </div>
                <Progress
                  type="circle"
                  percent={74}
                  strokeColor={{
                    "0%": "#52c41a",
                    "50%": "#faad14",
                    "100%": "#f5222d",
                  }}
                  strokeWidth={8}
                  size={120}
                  showInfo={false}
                  className={styles.progressCircle}
                />
              </div>

              <div className={styles.scoreLabels}>
                <div className={styles.scoreLabel}>
                  <span className={styles.labelText}>Readability</span>
                </div>
                <div className={styles.scoreLabel}>
                  <span className={styles.labelText}>SEO</span>
                </div>
                <div className={styles.scoreLabel}>
                  <span className={styles.labelText}>Originality</span>
                </div>
                <div className={styles.scoreLabel}>
                  <span className={styles.labelText}>Tone of voice</span>
                </div>
              </div>
            </div>

            {/* Analysis Details */}
            <div className={styles.analysisDetails}>
              {/* Originality */}
              <div className={styles.analysisItem}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Originality</h3>
                  <Button
                    type="text"
                    icon={<FiEdit />}
                    size="small"
                    className={styles.editBtn}
                  />
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.alertBadge}>
                    ● The text has been changed since the last check (currently{" "}
                    <strong>23%</strong> similar). Originality data may be
                    obsolete.
                  </div>
                  <div className={styles.itemStats}>
                    <span className={styles.statLabel}>Checks used</span>
                    <span className={styles.statValue}>3/10</span>
                  </div>
                  <Button size="small" className={styles.recheckBtn}>
                    Recheck
                  </Button>
                </div>
              </div>

              {/* Readability */}
              <div className={styles.analysisItem}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>Readability</h3>
                  <Button
                    type="text"
                    icon={<FiEdit />}
                    size="small"
                    className={styles.editBtn}
                  />
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.readabilityScore}>
                    <span className={styles.bigScore}>61.1%</span>
                  </div>
                  <p className={styles.itemDescription}>
                    The total percent of your text is not similar to other
                    sources.
                  </p>
                  <div className={styles.problemAlert}>
                    ● <strong>Unoriginal text (3)</strong>
                  </div>
                  <div className={styles.problemDetails}>
                    <strong>120</strong> copied words:
                    <br />
                    <em>
                      The tool returns a list of suggested keywords and their
                      search volume.
                    </em>
                  </div>
                </div>
              </div>

              {/* SEO */}
              <div className={styles.analysisItem}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>SEO</h3>
                  <Button
                    type="text"
                    icon={<FiEdit />}
                    size="small"
                    className={styles.editBtn}
                  />
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.problemAlert}>
                    ● <strong>Rewrite hard to read sentences</strong>
                  </div>
                  <div className={styles.problemCount}>5 more problems</div>
                  <br />
                  <div className={styles.problemAlert}>
                    ● <strong>Use at least one of your target keywords.</strong>
                  </div>
                  <div className={styles.problemCount}>5 more problems</div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AnalysisSection;
