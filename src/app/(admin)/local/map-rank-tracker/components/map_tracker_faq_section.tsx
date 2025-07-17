"use client";

import React from "react";
import { Typography, Collapse } from "antd";
import { FaChevronRight } from "react-icons/fa";
import styles from "./map_tracker_faq_section.module.scss";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const MapTrackerFaqSection: React.FC = () => {
  const faqData = [
    {
      key: "1",
      question: "What does Map Rank Tracker do?",
      answer:
        "Map Rank Tracker monitors your business rankings on Google Maps across different geographical areas. It shows you exactly where your business appears in local search results when customers search for relevant keywords in specific locations, helping you understand your local visibility and track performance over time.",
    },
    {
      key: "2",
      question:
        "How are Google Maps rankings different from standard Google SERP positions?",
      answer:
        'Google Maps rankings specifically track your position in the local "Map Pack" results that appear in Google Search, while standard SERP positions track organic web results. Map rankings are crucial for local businesses as they often appear more prominently and are based on proximity, relevance, and prominence factors specific to local search.',
    },
    {
      key: "3",
      question:
        "How is Map Rank Tracker different from Local Rank Checker and Position Tracking by ZIP Code?",
      answer:
        "Map Rank Tracker provides pinpoint geographical accuracy with customizable grid overlays, showing exact ranking positions across multiple micro-locations within your service area. Unlike ZIP code tracking that covers broad areas, our tool gives you precise location-based insights down to specific coordinates on a map grid.",
    },
    {
      key: "4",
      question:
        "Can I set up Map Rank Tracker for a service area business (SAB)?",
      answer:
        "Yes, Map Rank Tracker is perfect for service area businesses. You can set custom geographic boundaries that match your service area, track rankings across multiple locations where you provide services, and monitor how your visibility changes across different neighborhoods or regions within your coverage area.",
    },
    {
      key: "5",
      question: "Can I view competitor data in Map Rank Tracker?",
      answer:
        "Absolutely! Map Rank Tracker allows you to monitor competitor rankings alongside your own business. You can see how competitors perform in different areas, identify gaps in their coverage, analyze their keyword strategies, and discover opportunities to outrank them in specific geographical locations.",
    },
    {
      key: "6",
      question: "How much does it cost?",
      answer:
        "Map Rank Tracker pricing varies based on the number of keywords, locations, and tracking frequency you need. Plans start from $99/month for basic tracking and scale up for enterprise needs. Contact our sales team for custom pricing based on your specific requirements and tracking volume.",
    },
    {
      key: "7",
      question: "How do I cancel my subscription?",
      answer:
        'You can cancel your Map Rank Tracker subscription anytime by logging into your account dashboard, navigating to the billing section, and clicking "Cancel Subscription." Your tracking will continue until the end of your current billing period, and you can reactivate your subscription at any time without losing historical data.',
    },
  ];

  return (
    <section className={styles.map_tracker_faq_section}>
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

export default MapTrackerFaqSection;
