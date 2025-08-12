"use client";

import React from "react";
import { Collapse } from "antd";
import { FiChevronDown } from "react-icons/fi";
import styles from "./faq-section.module.scss";

const { Panel } = Collapse;

interface FAQItem {
  key: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {}

const FAQSection: React.FC<FAQSectionProps> = () => {
  const faqItems: FAQItem[] = [
    {
      key: "1",
      question: "Why Backlink Audit is Important?",
      answer:
        "Backlink auditing is crucial for maintaining a healthy link profile that supports your SEO efforts. It helps identify toxic links that could harm your rankings, discover new link opportunities, monitor competitor strategies, and ensure your backlink profile aligns with Google's quality guidelines. Regular audits can prevent penalties and improve your overall search engine performance.",
    },
    {
      key: "2",
      question: "What metrics are available for each backlink in the tool?",
      answer:
        "Our backlink audit tool provides comprehensive metrics including Authority Score, toxicity score, referring domain authority, anchor text analysis, link type (dofollow/nofollow), traffic estimates, spam indicators, link placement context, and historical data. These metrics help you evaluate the quality and potential impact of each backlink on your SEO performance.",
    },
    {
      key: "3",
      question: "What does the Semrush Toxicity score mean?",
      answer:
        "The Semrush Toxicity Score is a proprietary metric that evaluates the potential risk of a backlink to your website's SEO health. It considers factors like the linking domain's quality, spam indicators, anchor text patterns, and linking behavior. Scores range from 0-100, with higher scores indicating potentially harmful links that should be reviewed for disavowal.",
    },
    {
      key: "4",
      question: "How often is the data in the Backlink Audit Tool updated?",
      answer:
        "Our backlink database is continuously updated with new discoveries happening daily. The core database refreshes regularly to ensure you have access to the most current backlink information. You can set up automated crawls and monitoring to receive alerts about new, lost, or changed backlinks as they occur, keeping your audit data fresh and actionable.",
    },
  ];

  const expandIcon = ({ isActive }: { isActive?: boolean }) => (
    <FiChevronDown
      className={`${styles.expandIcon} ${isActive ? styles.active : ""}`}
    />
  );

  return (
    <div className={styles.faqSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
      </div>

      <Collapse
        className={styles.faqCollapse}
        expandIcon={expandIcon}
        expandIconPosition="end"
        ghost
      >
        {faqItems.map((item) => (
          <Panel
            key={item.key}
            header={item.question}
            className={styles.faqPanel}
          >
            <div className={styles.faqAnswer}>{item.answer}</div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQSection;
