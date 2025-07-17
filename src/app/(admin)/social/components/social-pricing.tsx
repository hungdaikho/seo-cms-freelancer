"use client";

import styles from "../page.module.scss";

export default function SocialPricing() {
  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Unlock our most advanced plan</h2>
          <p className={styles.subtitle}>
            Scale your social media management with influencer marketing and
            social listening tools
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.icon}>📱</div>
              <h3>Social media management</h3>
              <p>Create and schedule engaging posts, track performance</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icon}>🎯</div>
              <h3>Influencer discovery</h3>
              <p>Find and select the best content creators for your projects</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icon}>👂</div>
              <h3>Social media listening</h3>
              <p>Monitor brand sentiment and industry shifts</p>
            </div>
          </div>

          <button className={styles.ctaButton}>Try for free</button>
          <p className={styles.trial}>7-day free trial, then $250/month</p>
        </div>
      </div>
    </section>
  );
}
