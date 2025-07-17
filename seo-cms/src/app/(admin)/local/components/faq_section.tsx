import React from "react";
import { Collapse } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import styles from "./faq_section.module.scss";

const { Panel } = Collapse;

const FaqSection = () => {
  return (
    <div className={styles.faqContainer}>
      <h2>Frequently Asked Questions</h2>
      <Collapse
        accordion
        expandIcon={({ isActive }) => (
          <FaQuestionCircle
            style={{ transform: isActive ? "rotate(90deg)" : "none" }}
          />
        )}
      >
        <Panel header="What is the purpose of this application?" key="1">
          <p>
            This application is designed to manage and optimize business
            profiles.
          </p>
        </Panel>
        <Panel header="How can I manage my reviews?" key="2">
          <p>
            You can manage your reviews through the Review Management section.
          </p>
        </Panel>
        <Panel header="What features does the Map Rank Tracker offer?" key="3">
          <p>
            The Map Rank Tracker helps you track your business's ranking on
            maps.
          </p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FaqSection;
