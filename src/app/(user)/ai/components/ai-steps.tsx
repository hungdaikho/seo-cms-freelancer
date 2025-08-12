"use client";

import styles from "../page.module.scss";

export default function AiSteps() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2>
          See what LLMs say about your brand
          <br />
          and use it to your advantage
        </h2>
        <p className={styles.subtitle}>
          Get actionable insights from millions of AI conversations
        </p>
      </div>
    </section>
  );
}
