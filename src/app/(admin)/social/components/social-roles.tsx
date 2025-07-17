"use client";

import { useState } from "react";
import styles from "../page.module.scss";

export default function SocialRoles() {
  const [activeTab, setActiveTab] = useState("Business Owner");

  const roles = [
    "Business Owner",
    "Digital Marketer",
    "Social Media Manager",
    "Digital agency",
  ];

  const roleContent = {
    "Business Owner": {
      title:
        "Save time and money, and deliver amazing results on social media.",
      description:
        "Automate crucial social media management tasks so you can focus on growing your business.",
      features:
        "Distribute all your social content from one place, and improve your strategy with the latest competitive insights and data-driven recommendations.",
    },
    "Digital Marketer": {
      title: "Boost your marketing ROI with comprehensive social media tools.",
      description:
        "Leverage data-driven insights to optimize your social media campaigns and drive better results.",
      features:
        "Track competitor strategies, automate content scheduling, and measure performance across all platforms.",
    },
    "Social Media Manager": {
      title: "Streamline your workflow and create engaging content at scale.",
      description:
        "Manage multiple accounts efficiently with advanced scheduling and content creation tools.",
      features:
        "Create content calendars, collaborate with teams, and use AI-powered tools for content generation.",
    },
    "Digital agency": {
      title: "Scale your agency operations with professional-grade tools.",
      description:
        "Manage multiple client accounts with advanced reporting and white-label solutions.",
      features:
        "Client reporting, team collaboration tools, and comprehensive analytics for all your accounts.",
    },
  };

  return (
    <section className={styles.roles}>
      <div className={styles.container}>
        <h2>Get results from social media whatever your role is</h2>

        <div className={styles.tabs}>
          {roles.map((role) => (
            <button
              key={role}
              className={`${styles.tab} ${
                activeTab === role ? styles.active : ""
              }`}
              onClick={() => setActiveTab(role)}
            >
              {role}
            </button>
          ))}
        </div>

        <div className={styles.roleContent}>
          <div className={styles.textContent}>
            <h3>{roleContent[activeTab as keyof typeof roleContent].title}</h3>
            <p className={styles.description}>
              {roleContent[activeTab as keyof typeof roleContent].description}
            </p>
            <p className={styles.features}>
              {roleContent[activeTab as keyof typeof roleContent].features}
            </p>
            <button className={styles.ctaButton}>Get started</button>
          </div>

          <div className={styles.illustration}>🎯</div>
        </div>
      </div>
    </section>
  );
}
