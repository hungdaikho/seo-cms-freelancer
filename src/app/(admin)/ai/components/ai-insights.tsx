"use client";

import styles from "../page.module.scss";

export default function AiInsights() {
  return (
    <section className={styles.insights}>
      <div className={styles.container}>
        <h2>
          Win the market with AI insights—
          <br />
          before your competitors do
        </h2>

        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3>Review your AI brand visibility</h3>
            <p>
              Understand your brand's share in AI conversations and identify top
              priorities for improvement.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3>Beat your competition in LLMs</h3>
            <p>
              Track how AI platforms present you vs. rivals and get tips to
              strengthen your position.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3>Build a stronger business strategy</h3>
            <p>
              Understand how your customers feel and optimize your product and
              marketing strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
