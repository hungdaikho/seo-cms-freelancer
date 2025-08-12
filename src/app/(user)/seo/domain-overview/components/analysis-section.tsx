import React from "react";
import { Card } from "antd";
import styles from "./analysis-section.module.scss";

interface AnalysisSectionProps {
  title: string;
  description: string;
  features: string[];
  children?: React.ReactNode;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({
  title,
  description,
  features,
  children,
}) => {
  return (
    <div className={styles.analysisSection}>
      <Card className={styles.analysisCard}>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <ul className={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.rightContent}>{children}</div>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisSection;
