"use client";
import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import styles from "./faq_section.module.scss";

type Props = {};

const FaqSection = ({}: Props) => {
  const faqItems = [
    {
      key: "1",
      label:
        "What is market research, and how can Semrush Traffic & Market help you conduct it?",
      children: (
        <div className={styles.faqContent}>
          <p>
            Market research is the process of gathering and analyzing data about
            your industry, competitors, and audience to make informed business
            decisions. It helps you understand competitor strategies, identify
            market trends, and track shifts in consumer behavior.
          </p>
          <p>
            Having access to the right market research resources allows you to
            uncover new opportunities, anticipate industry changes, and gain a
            comprehensive view of the{" "}
            <a href="#" className={styles.link}>
              competitive landscape
            </a>{" "}
            to stay ahead.
          </p>
          <p>
            Semrush Traffic & Market provides powerful tools and market research
            resources to help businesses conduct in-depth analysis, offering
            real-time insights to refine strategies and drive growth
            effectively.
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label:
        "What kinds of data can the Semrush Traffic & Market Toolkit offer?",
      children: <div>Content for question 2...</div>,
    },
    {
      key: "3",
      label: "Why is market research important for my business strategy?",
      children: <div>Content for question 3...</div>,
    },
    {
      key: "4",
      label:
        "How does the Semrush Traffic & Market Toolkit provide data on market trends and my rivals?",
      children: <div>Content for question 4...</div>,
    },
    {
      key: "5",
      label:
        "How can data from Semrush Traffic & Market help me grow my business?",
      children: <div>Content for question 5...</div>,
    },
    {
      key: "6",
      label:
        "Can I integrate Semrush Traffic & Market data with my in-house systems?",
      children: <div>Content for question 6...</div>,
    },
  ];

  return (
    <div className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
        </div>

        <div className={styles.faqContent}>
          <Collapse
            items={faqItems}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className={styles.collapse}
            size="large"
          />
        </div>

        <div className={styles.footer}>
          <div className={styles.partnerInfo}>
            <span>An </span>
            <span className={styles.partnerLogo}>ESOMAR</span>
            <span> partner</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
