"use client";

import styles from "./how-to-use-section.module.scss";

interface Step {
  number: number;
  title: string;
  description: string;
}

const HowToUseSection = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: "Enter a seed keyword.",
      description: "Start with a general term related to your business.",
    },
    {
      number: 2,
      title: "Review the keyword suggestions.",
      description:
        "Review the keywords the tool suggests and choose those most relevant to your business.",
    },
    {
      number: 3,
      title: "Analyze keyword metrics.",
      description:
        "Use the provided metrics, including monthly search volume, keyword difficulty, and intent to decide which keywords to include in your SEO strategy.",
    },
    {
      number: 4,
      title: "Incorporate selected keywords into your SEO strategy.",
      description:
        "Use the keywords you choose in the previous step in your content, meta tags, and anchor text.",
    },
  ];

  return (
    <div className={styles.howToUseSection}>
      <div className={styles.sectionHeader}>
        <h2>How to Use This Keyword Tool</h2>
      </div>

      <div className={styles.stepsContainer}>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToUseSection;
