"use client";
import React from "react";
import { Collapse, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./faq_section.module.scss";

const { Panel } = Collapse;

type Props = {};

const FaqSection = (props: Props) => {
  const faqItems = [
    {
      key: "1",
      label: "What's included in Semrush Local's suite of tools?",
      children: <p>Content for FAQ item 1</p>,
    },
    {
      key: "2",
      label: "Can I purchase Semrush Local as a standalone product?",
      children: <p>Content for FAQ item 2</p>,
    },
    {
      key: "3",
      label: "In which countries does the tool work?",
      children: <p>Content for FAQ item 3</p>,
    },
    {
      key: "4",
      label:
        "Do you offer special pricing for businesses managing multiple locations?",
      children: <p>Content for FAQ item 4</p>,
    },
    {
      key: "5",
      label: "Does Semrush offer a solution for agencies?",
      children: <p>Content for FAQ item 5</p>,
    },
    {
      key: "6",
      label:
        "Does the Semrush Local suite integrate with other Semrush solutions and apps?",
      children: <p>Content for FAQ item 6</p>,
    },
    {
      key: "7",
      label: "Does Semrush Local support team collaboration functionality?",
      children: <p>Content for FAQ item 7</p>,
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

export default FaqSection;
