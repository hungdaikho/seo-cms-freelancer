import React from "react";
import { Card, Tag } from "antd";
import styles from "./keyword-types-section.module.scss";

const KeywordTypesSection: React.FC = () => {
  return (
    <div className={styles.keywordTypesSection}>
      <div className={styles.sectionGrid}>
        <div className={styles.leftContent}>
          <h2>Choose keyword types</h2>
          <p>
            Switch between the keywords for organic, paid search, and PLA. Mix
            the types, see how they intersect, and assess your SEO and PPC
            efforts.
          </p>
        </div>

        <div className={styles.rightContent}>
          <Card className={styles.keywordCard}>
            <div className={styles.keywordContent}>
              <div className={styles.overlapHeader}>
                <h3>Keyword Overlap</h3>
              </div>

              <div className={styles.vennDiagram}>
                <div
                  className={styles.circle}
                  style={{
                    left: "20%",
                    top: "30%",
                    backgroundColor: "#a7f3d0",
                    width: "70px",
                    height: "70px",
                  }}
                ></div>
                <div
                  className={styles.circle}
                  style={{
                    left: "50%",
                    top: "20%",
                    backgroundColor: "#fed7aa",
                    width: "60px",
                    height: "60px",
                  }}
                ></div>
                <div
                  className={styles.circle}
                  style={{
                    left: "35%",
                    top: "50%",
                    backgroundColor: "#bfdbfe",
                    width: "65px",
                    height: "65px",
                  }}
                ></div>
              </div>

              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: "#3b82f6" }}
                  ></span>
                  <span>your domain</span>
                  <span className={styles.count}>1.06M</span>
                </div>
                <div className={styles.legendItem}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: "#06b6d4" }}
                  ></span>
                  <span>competitor</span>
                  <span className={styles.count}>1.06M</span>
                </div>
                <div className={styles.legendItem}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: "#f59e0b" }}
                  ></span>
                  <span>competitor</span>
                  <span className={styles.count}>1.06M</span>
                </div>
              </div>

              <div className={styles.keywordTags}>
                <Tag color="blue" className={styles.activeTag}>
                  Organic keywords
                </Tag>
                <Tag className={styles.inactiveTag}>Paid keywords</Tag>
                <Tag className={styles.inactiveTag}>PLA keywords</Tag>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KeywordTypesSection;
