"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import styles from "./process-section.module.scss";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessSectionProps {}

const ProcessSection: React.FC<ProcessSectionProps> = () => {
  const steps: ProcessStep[] = [
    {
      number: "1",
      title: "Enter your website URL.",
      description:
        'Simply enter your website\'s URL in the field above and click "Start SEO Audit."',
    },
    {
      number: "2",
      title: "Set up your project.",
      description:
        "Configure your audit by defining a crawl scope, page limit, crawl source, and project name. Alternatively, start with a free site audit using default settings for a quick analysis of your site.",
    },
    {
      number: "3",
      title: "Scan your website.",
      description:
        "Semrush's Site Audit tool will automatically scan your site, checking for more than 140 on-page and technical SEO factors. The tool looks for everything from broken links and crawl errors to missing meta tags and JavaScript issues.",
    },
    {
      number: "4",
      title: "Review your custom SEO audit report.",
      description:
        "In just minutes, you'll get a detailed audit report for your website. The tool will label issues by importance so you know which problems to address first. You'll also get detailed explanations of each issue and why it matters for SEO.",
    },
    {
      number: "5",
      title: "Fix issues according to recommendations.",
      description:
        "In addition to pointing out issues with your website, the Site Audit tool also provides actionable recommendations and guidance for how to fix them.",
    },
    {
      number: "6",
      title: "Re-run and monitor.",
      description:
        "After fixing issues, run the site audit again to see improvements to your site's overall health. Then schedule regular audits (e.g., monthly) to automatically scan your site and notify you of any issues that arise.",
    },
  ];

  return (
    <div className={styles.processSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          How to Use Semrush's SEO Site Audit Tool
        </h2>
      </div>

      <Row gutter={[32, 32]}>
        {steps.map((step, index) => (
          <Col xs={24} md={12} lg={8} key={index}>
            <Card className={styles.stepCard}>
              <div className={styles.stepContent}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProcessSection;
