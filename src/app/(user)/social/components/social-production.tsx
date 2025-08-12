"use client";

import styles from "../page.module.scss";

export default function SocialProduction() {
  return (
    <section className={styles.production}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textContent}>
            <h2>
              Full-cycle social media content production— ideas, copy, design,
              and video by AI
            </h2>
            <ul className={styles.featureList}>
              <li>
                Find trending content ideas tailored to your brand— 100+ per
                day, sorted by topic
              </li>
              <li>
                Generate unique images, captions, videos, and designs with AI,
                all customized to your brand's style
              </li>
              <li>
                Add any link from your website and transform it into engaging
                posts across various platforms
              </li>
            </ul>
            <button className={styles.ctaButton}>Start creating now</button>
          </div>

          <div className={styles.aiTool}>
            <div className={styles.header}>
              <h3>Generate with AI</h3>
            </div>

            <div className={styles.prompt}>
              Cold brew coffee with oat? It's more than just a viral drink.
              Using our quality beans, this brew method unlocks smooth flavors
              and a rich taste of indulgence that awakens every sense to the
              craft and origins of the beans, ready to serve your morning
              routine?
            </div>

            <div className={styles.suggestions}>
              <div className={styles.suggestion}>
                <span className={styles.icon}>✨</span>
                <span>Rephrase</span>
              </div>
              <div className={styles.suggestion}>
                <span className={styles.icon}>📝</span>
                <span>Shorten</span>
              </div>
              <div className={styles.suggestion}>
                <span className={styles.icon}>📈</span>
                <span>Expand</span>
              </div>
              <div className={styles.suggestion}>
                <span className={styles.icon}>🎵</span>
                <span>Tone of voice</span>
              </div>
              <div className={styles.suggestion}>
                <span className={styles.icon}>📱</span>
                <span>Post type</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
