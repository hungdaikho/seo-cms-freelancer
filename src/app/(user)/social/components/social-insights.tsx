"use client";

import styles from "../page.module.scss";

export default function SocialInsights() {
  return (
    <section className={styles.insights}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.analytics}>
            <div className={styles.header}>
              <h3>Daily Engagement</h3>
              <p className={styles.subtitle}>Daily Reach</p>
            </div>

            <div className={styles.metrics}>
              <div className={styles.metric}>
                <div className={styles.value}>8,725</div>
                <div className={`${styles.change} ${styles.negative}`}>
                  -6.2%
                </div>
                <div className={styles.label}>Shares</div>
              </div>
              <div className={styles.metric}>
                <div className={styles.value}>683</div>
                <div className={`${styles.change} ${styles.positive}`}>
                  +2.7%
                </div>
                <div className={styles.label}>Comments</div>
              </div>
              <div className={styles.metric}>
                <div className={styles.value}>155</div>
                <div className={`${styles.change} ${styles.negative}`}>
                  -4.3%
                </div>
                <div className={styles.label}>Clicks</div>
              </div>
              <div className={styles.metric}>
                <div className={styles.value}>16,355</div>
                <div className={`${styles.change} ${styles.negative}`}>-1%</div>
                <div className={styles.label}>Likes</div>
              </div>
            </div>

            <div className={styles.chart}>
              <div className={styles.bars}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>
              <div className={styles.legend}>
                <div className={styles.item}>
                  <div className={`${styles.dot} ${styles.organic}`}></div>
                  <span>Organic</span>
                </div>
                <div className={styles.item}>
                  <div className={`${styles.dot} ${styles.paid}`}></div>
                  <span>Paid</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.textContent}>
            <h2>Hone your social strategy with analytical insights</h2>
            <ul className={styles.featureList}>
              <li>
                Strengthen your social presence with data-driven recommendations
              </li>
              <li>
                Track your KPIs with easy-to-understand data visualization
              </li>
              <li>
                Stay up-to-date with automated reporting delivered straight to
                your inbox
              </li>
            </ul>
            <button className={styles.ctaButton}>Amplify your success</button>
          </div>
        </div>
      </div>
    </section>
  );
}
