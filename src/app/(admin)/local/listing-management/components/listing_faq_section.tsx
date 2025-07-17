"use client";

import React from "react";
import { Typography, Collapse } from "antd";
import { FaChevronRight } from "react-icons/fa";
import styles from "./listing_faq_section.module.scss";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ListingFaqSection: React.FC = () => {
  const faqData = [
    {
      key: "1",
      question: "What is a local directory listing?",
      answer:
        "A local directory listing is your business information (name, address, phone number, website) displayed on online directories like Google My Business, Yelp, Yellow Pages, and other local search platforms. These listings help customers find your business when searching for local services or products.",
    },
    {
      key: "2",
      question: "Why are listings important?",
      answer:
        "Directory listings are crucial for local SEO and visibility. They help your business appear in local search results, improve your online presence, build trust with potential customers, and provide consistent business information across the web. They also contribute to your local search rankings.",
    },
    {
      key: "3",
      question: "What is local Listing Management?",
      answer:
        "Local listing management is the process of creating, maintaining, and optimizing your business listings across multiple online directories and platforms. It ensures your business information is accurate, consistent, and up-to-date everywhere it appears online.",
    },
    {
      key: "4",
      question: "How do I start using the Listing Management tool?",
      answer:
        "To start using our Listing Management tool, simply sign up for an account, verify your business information, connect your Google Business Profile, and our tool will automatically scan and manage your listings across 150+ directories worldwide.",
    },
    {
      key: "5",
      question:
        "Which directories does Semrush Listing Management distribute to?",
      answer:
        "Our Listing Management tool distributes to over 150 directories including Google, Facebook, Apple Maps, Bing, Yahoo, Foursquare, TripAdvisor, and many other local and industry-specific directories. The exact directories depend on your business location and category.",
    },
    {
      key: "6",
      question: "How much does the subscription cost?",
      answer:
        "Our Listing Management tool offers flexible pricing plans to suit different business needs. Pricing starts from $20/month for basic listing management and scales based on the number of locations and features required. Contact our sales team for enterprise pricing.",
    },
    {
      key: "7",
      question: "How do I cancel my subscription?",
      answer:
        'You can cancel your subscription at any time by logging into your account, going to the billing section, and clicking "Cancel Subscription." Your listings will remain active until the end of your current billing period, and you can reactivate anytime.',
    },
  ];

  return (
    <section className={styles.listing_faq_section}>
      <div className={styles.container}>
        <div className={styles.section_header}>
          <Title level={2} className={styles.section_title}>
            Frequently asked questions
          </Title>
        </div>

        <div className={styles.faq_container}>
          <Collapse
            ghost
            expandIcon={({ isActive }) => (
              <FaChevronRight
                className={`${styles.expand_icon} ${
                  isActive ? styles.active : ""
                }`}
              />
            )}
            className={styles.faq_collapse}
          >
            {faqData.map((faq) => (
              <Panel
                header={
                  <Text className={styles.faq_question}>{faq.question}</Text>
                }
                key={faq.key}
                className={styles.faq_panel}
              >
                <Text className={styles.faq_answer}>{faq.answer}</Text>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default ListingFaqSection;
