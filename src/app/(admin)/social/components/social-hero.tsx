"use client";

import styles from "../page.module.scss";

export default function SocialHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1>
          Social Media Management
          <br />
          as Easy as Click, Click
        </h1>
        <p className={styles.subtitle}>
          Easily Grow Your Brand's Visibility On Social Media
        </p>
        <button className={styles.ctaButton}>Try for free</button>

        <div className={styles.illustration}>
          {/* SVG illustration of people working with social media tools */}
          <div
            style={{
              width: "100%",
              height: "300px",
              background: "#f1f5f9",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#94a3b8",
              fontSize: "1.2rem",
            }}
          >
            Social Media Team Illustration
          </div>
        </div>
      </div>
    </section>
  );
}
