"use client";

import styles from "./about-section.module.scss";

const AboutSection = () => {
  return (
    <div className={styles.aboutSection}>
      <div className={styles.aboutGrid}>
        <div className={styles.leftContent}>
          <h2>What Is the Keyword Magic Tool?</h2>
          <p>
            Semrush's Keyword Magic Tool is a keyword research tool that helps
            you discover highly relevant keyword suggestions. Better than a
            simple keyword generator, the Keyword Magic Tool uses actual data,
            advanced filters, and AI to provide the best keyword opportunities
            for organic growth.
          </p>
          <p>
            Keyword Magic Tool is an excellent alternative to Google's Keyword
            Planner, providing even more data and keywords without the need for
            an active ad campaign.
          </p>
        </div>

        <div className={styles.rightContent}>
          <h2>Why Should You Use Our Keyword Research Tool?</h2>
          <p>
            You should use our keyword research tool because it's built on the
            largest keyword database, with billions of real, up-to-date
            keywords, and offers dozens of advanced metrics and filters to
            refine your strategy.
          </p>
          <p>
            Our keyword tool relies on actual data, not generated keywords, to
            ensure your research is accurate and reliable.
          </p>
          <p>
            Plus, our AI-driven insights make it easy to uncover personalized
            hidden opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
