"use client";
import React from "react";
import { Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./gbp_faq_section.module.scss";

const { Panel } = Collapse;

type Props = {};

const GbpFaqSection = (props: Props) => {
  const faqItems = [
    {
      key: "1",
      label:
        "What's the difference between Google My Business and Google Business Profile (GBP)?",
      children: (
        <p>
          Google My Business was rebranded to Google Business Profile in 2021.
          They are essentially the same product - a free tool that allows
          businesses to manage their online presence across Google Search and
          Maps.
        </p>
      ),
    },
    {
      key: "2",
      label:
        "Is Semrush's GBP Optimization part of the Semrush Local suite of tools?",
      children: (
        <p>
          Yes, GBP Optimization is a core feature of Semrush Local, providing
          comprehensive tools to manage and optimize your Google Business
          Profile.
        </p>
      ),
    },
    {
      key: "3",
      label:
        "Do I need to create or verify my GBP before using Semrush's GBP Optimization tool?",
      children: (
        <p>
          Yes, you need to have a verified Google Business Profile before
          connecting it to Semrush Local for optimization.
        </p>
      ),
    },
    {
      key: "4",
      label:
        "Can I use your tool to optimize my GBP if I am a service-based business and don't have a physical location?",
      children: (
        <p>
          Absolutely! Our tool works for both location-based and service-area
          businesses. You can optimize your GBP regardless of your business
          type.
        </p>
      ),
    },
    {
      key: "5",
      label:
        "Do you provide any free tools to optimize my Google Business Profile?",
      children: (
        <p>
          We offer a free local audit tool that provides initial insights into
          your Google Business Profile optimization opportunities.
        </p>
      ),
    },
    {
      key: "6",
      label: "Can I automate GBP posts with Semrush's tool?",
      children: (
        <p>
          Yes, our platform allows you to schedule and automate GBP posts,
          including AI-driven content creation for consistent posting.
        </p>
      ),
    },
    {
      key: "7",
      label: "How does optimizing your GBP translate into business growth?",
      children: (
        <p>
          GBP optimization improves your local search visibility, leading to
          more customer actions like calls, visits, and directions, ultimately
          driving more foot traffic and sales.
        </p>
      ),
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently asked questions</h2>
        </div>

        <div className={styles.faqContainer}>
          <Collapse
            className={styles.collapse}
            expandIcon={({ isActive }) => (
              <DownOutlined
                rotate={isActive ? 180 : 0}
                className={styles.expandIcon}
              />
            )}
            expandIconPosition="end"
            ghost
          >
            {faqItems.map((item) => (
              <Panel
                key={item.key}
                header={
                  <span className={styles.panelHeader}>{item.label}</span>
                }
                className={styles.panel}
              >
                {item.children}
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default GbpFaqSection;
