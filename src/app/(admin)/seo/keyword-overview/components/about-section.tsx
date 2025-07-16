"use client";

import styles from "./about-section.module.scss";

const AboutSection = () => {
  return (
    <div className={styles.aboutSection}>
      <div className={styles.aboutGrid}>
        <div className={styles.leftContent}>
          <h2>What Is Keyword Overview?</h2>
          <p>
            Keyword Overview is a keyword checker that instantly reveals the
            most important SEO and marketing metrics for any term. Just enter a
            word or phrase. The tool will dig deep into Semrush's massive
            database to provide the keyword's search volume, keyword difficulty,
            intent, competition level, CPC, 12-month trend, number of results,
            and more.
          </p>
          <p>
            These insights help you assess how difficult it will be to rank for
            your chosen keyword and fine-tune your SEO strategy with confidence.
          </p>
          <p>
            Keyword Overview is a free, hassle-free alternative to Google
            Keyword Planner.
          </p>
        </div>

        <div className={styles.rightContent}>
          <h2>Why Use a Keyword Checker?</h2>
          <p>
            You should use a keyword checker to gain in-depth insights into each
            keyword's difficulty, search volume, and competition, allowing you
            to make data-driven marketing decisions.
          </p>
          <p>
            By identifying which search terms are realistic to target, you can
            prioritize the most promising opportunities, drive more organic
            traffic, and ultimately get better results from your SEO and
            marketing efforts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
