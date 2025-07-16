"use client";

import React from "react";
import { Row, Col, Card, Button } from "antd";
import { FiDownload, FiUpload, FiBarChart } from "react-icons/fi";
import styles from "./how-to-analyze.module.scss";

interface Step {
  stepNumber: number;
  title: string;
  description: string;
  details: string;
  actionText?: string;
  actionType?: "button" | "info";
  icon: React.ReactNode;
  illustration: React.ReactNode;
}

interface HowToAnalyzeProps {}

const HowToAnalyze: React.FC<HowToAnalyzeProps> = () => {
  const steps: Step[] = [
    {
      stepNumber: 1,
      title: "Download log files from your site",
      description:
        'To download your log files (access.log), you need to access your site via an FTP client. Log files are usually located in the "/logs/" or "/access_log/" folder.',
      details:
        "If you experience any difficulties getting your logs, you can read our instructions or ask an IT specialist to help you with the process.",
      actionText: "Read instructions",
      actionType: "button",
      icon: <FiDownload />,
      illustration: (
        <div className={styles.stepIllustration}>
          <div className={styles.fileIcon}>
            <div className={styles.fileHeader}>access.log</div>
            <div className={styles.uploadArea}>
              <FiUpload className={styles.uploadIcon} />
              <span>Upload log files</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNumber: 2,
      title: "Upload log files",
      description:
        "Once you've accessed your log files, return to this page and drop them into the Drag & Drop form above.",
      details: "",
      actionType: "info",
      icon: <FiUpload />,
      illustration: (
        <div className={styles.stepIllustration}>
          <div className={styles.uploadInterface}>
            <div className={styles.fileItem}>
              <div className={styles.fileIconSmall}></div>
              <span className={styles.fileName}>access.log</span>
              <Button size="small" className={styles.downloadBtn}>
                <FiDownload /> Download log files
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNumber: 3,
      title: "Get a detailed report",
      description: "In a short while your report will be ready.",
      details: "",
      actionType: "info",
      icon: <FiBarChart />,
      illustration: (
        <div className={styles.stepIllustration}>
          <div className={styles.reportPreview}>
            <div className={styles.chartArea}>
              <div className={styles.lineChart}>
                <svg width="100" height="60" viewBox="0 0 100 60">
                  <path
                    d="M10 50 Q30 20 50 30 T90 10"
                    fill="none"
                    stroke="#52c41a"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 45 Q30 25 50 35 T90 15"
                    fill="none"
                    stroke="#1890ff"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className={styles.chartLabels}>
                <div className={styles.chartLabel}>
                  <div
                    className={styles.labelDot}
                    style={{ backgroundColor: "#52c41a" }}
                  ></div>
                  <span>Googlebot</span>
                  <span className={styles.labelValue}>20</span>
                </div>
                <div className={styles.chartLabel}>
                  <div
                    className={styles.labelDot}
                    style={{ backgroundColor: "#1890ff" }}
                  ></div>
                  <span>Googlebot Smartphone</span>
                  <span className={styles.labelValue}>5</span>
                </div>
              </div>
            </div>
            <div className={styles.piecharts}>
              <div className={styles.piechartContainer}>
                <div className={styles.piechart}>
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle
                      cx="20"
                      cy="20"
                      r="15"
                      fill="#52c41a"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 5 A15 15 0 0 1 35 20 L20 20 Z"
                      fill="#fa8c16"
                    />
                    <path
                      d="M35 20 A15 15 0 0 1 20 35 L20 20 Z"
                      fill="#f5222d"
                    />
                  </svg>
                </div>
                <span className={styles.chartTitle}>Status Code</span>
              </div>
              <div className={styles.piechartContainer}>
                <div className={styles.piechart}>
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle
                      cx="20"
                      cy="20"
                      r="15"
                      fill="#1890ff"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 5 A15 15 0 0 1 35 20 L20 20 Z"
                      fill="#52c41a"
                    />
                    <path
                      d="M35 20 A15 15 0 0 1 20 35 L20 20 Z"
                      fill="#fa8c16"
                    />
                  </svg>
                </div>
                <span className={styles.chartTitle}>File Type</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.howToAnalyze}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          How to analyze log files with Log File Analyzer
        </h2>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.stepWrapper}>
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} lg={12}>
                <div className={styles.stepContent}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>
                      Step {step.stepNumber}
                    </span>
                    <div className={styles.stepIcon}>{step.icon}</div>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                  {step.details && (
                    <p className={styles.stepDetails}>{step.details}</p>
                  )}
                  {step.actionText && step.actionType === "button" && (
                    <Button type="primary" className={styles.actionButton}>
                      {step.actionText}
                    </Button>
                  )}
                </div>
              </Col>
              <Col xs={24} lg={12}>
                {step.illustration}
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToAnalyze;
