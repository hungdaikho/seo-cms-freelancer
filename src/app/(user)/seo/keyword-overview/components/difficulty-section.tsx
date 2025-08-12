"use client";

import styles from "./difficulty-section.module.scss";

const DifficultySection = () => {
  return (
    <div className={styles.difficultySection}>
      <div className={styles.sectionHeader}>
        <h2>Understanding Keyword Difficulty and Competition</h2>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          <p>
            Keyword difficulty is an SEO metric that measures how difficult it
            will be to rank in the top 10 for a specific keyword in search
            engine results. A higher difficulty score means it may require more
            high-quality content, backlinks, and authority to outrank existing
            competitors.
          </p>

          <p>
            Keyword competition refers to how many websites are targeting the
            same keyword and how strong those websites are in terms of content
            and authority.
          </p>

          <p>
            Our keyword difficulty tool analyzes both of these factors to give
            you a realistic picture of your chances to rank for any term.
          </p>

          <p>
            By assessing difficulty, competition, and search volume together,
            you can choose which keywords are most worth your effort. This helps
            you prioritize targets that balance opportunity and feasibility,
            ensuring you invest resources where they will deliver the best SEO
            returns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DifficultySection;
