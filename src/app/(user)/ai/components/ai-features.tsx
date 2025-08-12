"use client";

import styles from "../page.module.scss";

export default function AiFeatures() {
  const features = [
    {
      title: "Business Landscape: Understand your market",
      items: [
        "Track which competitors are gaining AI visibility and why",
        "Identify emerging market gaps and opportunities",
        "Learn about shifts in AI conversations in your industry",
      ],
    },
    {
      title: "Brand & Marketing: Master your AI presence",
      items: [
        "Compare how different AI platforms present your products",
        "Track changes in sentiment and feature mentions over time",
        "See which use cases and benefits resonate most",
      ],
    },
    {
      title: "Audience & Content: Turn AI Queries into Action",
      items: [
        "Discover what users ask AI about your brand and category",
        "See how LLMs guide purchase decisions",
        "Track trending questions and concerns",
      ],
    },
    {
      title: "AI-Generated Tips: Get Clear Action Steps",
      items: [
        "Get specific suggestions for product development",
        "Explore tips to boost your marketing ROI",
        "Align your product positioning with real-world customer needs",
      ],
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <h3>{feature.title}</h3>
              <ul className={styles.featureList}>
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
              <button className={styles.ctaButton}>Get Started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
