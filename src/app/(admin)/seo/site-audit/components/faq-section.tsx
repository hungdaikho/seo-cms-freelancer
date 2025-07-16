"use client";

import React from "react";
import { Collapse } from "antd";
import { FiPlus, FiMinus } from "react-icons/fi";
import styles from "./faq-section.module.scss";

const { Panel } = Collapse;

interface FAQItem {
  key: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {}

const FAQSection: React.FC<FAQSectionProps> = () => {
  const faqData: FAQItem[] = [
    {
      key: "1",
      question: "What is an SEO audit?",
      answer:
        "An SEO audit is a comprehensive analysis of your website to identify factors that may be affecting your search engine rankings. It examines technical issues, on-page optimization, content quality, and other factors that impact your site's visibility in search results.",
    },
    {
      key: "2",
      question: "How long does the audit take?",
      answer:
        "Our automated SEO audit typically takes 2-5 minutes to complete, depending on the size of your website. You'll receive an instant report with actionable recommendations.",
    },
    {
      key: "3",
      question: "Is the SEO audit really free?",
      answer:
        "Yes, our basic SEO audit is completely free. You'll get a comprehensive report identifying the most critical issues on your website without any cost or commitment.",
    },
    {
      key: "4",
      question: "What issues does the audit check for?",
      answer:
        "Our audit checks for over 140+ SEO factors including technical issues (page speed, mobile-friendliness, crawlability), on-page optimization (meta tags, headings, content), and off-page factors (backlinks, social signals).",
    },
    {
      key: "5",
      question: "Can I audit multiple pages?",
      answer:
        "The free audit covers your main website and key pages. For comprehensive multi-page audits and advanced features, you can upgrade to our premium plans.",
    },
    {
      key: "6",
      question: "Do I need technical knowledge to understand the report?",
      answer:
        "No! Our audit reports are designed to be user-friendly with clear explanations and actionable recommendations. Each issue includes detailed guidance on how to fix it, even for non-technical users.",
    },
  ];

  const expandIcon = ({ isActive }: { isActive?: boolean }) =>
    isActive ? <FiMinus /> : <FiPlus />;

  return (
    <div className={styles.faqSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <p className={styles.sectionSubtitle}>
          Got questions about our SEO audit tool? We've got answers.
        </p>
      </div>

      <div className={styles.faqContainer}>
        <Collapse
          expandIcon={expandIcon}
          className={styles.faqCollapse}
          size="large"
        >
          {faqData.map((faq) => (
            <Panel
              header={faq.question}
              key={faq.key}
              className={styles.faqPanel}
            >
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default FAQSection;
