"use client";

import styles from "../page.module.scss";

export default function SocialTracker() {
  const companies = [
    {
      name: "My Company",
      followers: "1,438 K",
      change: "+0.2%",
      positive: true,
    },
    {
      name: "Competitor 1",
      followers: "1,196 K",
      change: "-0.3%",
      positive: false,
    },
    {
      name: "Competitor 2",
      followers: "465 K",
      change: "+2.1%",
      positive: true,
    },
    {
      name: "Competitor 3",
      followers: "240 K",
      change: "-1.1%",
      positive: false,
    },
  ];

  return (
    <section className={styles.tracker}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2>Track and analyze any brand's social strategy</h2>
            <ul className={styles.featureList}>
              <li>
                Track all your competitors' accounts to uncover their best
                tactics
              </li>
              <li>
                Get a 360-degree view of your brand's impact by comparing your
                KPIs
              </li>
              <li>
                Monitor the top social media accounts in your niche and jump on
                best trends early
              </li>
            </ul>
            <button className={styles.ctaButton}>Analyze competitors</button>
          </div>

          <div className={styles.dashboard}>
            <div className={styles.header}>
              <h3>Audience</h3>
              <div className={styles.socialIcons}>
                <div className={`${styles.icon} ${styles.facebook}`}>f</div>
                <div className={`${styles.icon} ${styles.instagram}`}>📷</div>
                <div className={`${styles.icon} ${styles.twitter}`}>🐦</div>
                <div className={`${styles.icon} ${styles.pinterest}`}>P</div>
                <div className={`${styles.icon} ${styles.youtube}`}>▶</div>
              </div>
            </div>

            {companies.map((company, index) => (
              <div key={index} className={styles.companyRow}>
                <div className={styles.company}>{company.name}</div>
                <div className={styles.metrics}>
                  <span className={styles.value}>{company.followers}</span>
                  <span
                    className={`${styles.change} ${
                      company.positive ? styles.positive : styles.negative
                    }`}
                  >
                    {company.change}
                  </span>
                </div>
                <div className={styles.progress}>
                  <div
                    className={`${styles.bar} ${styles.facebook}`}
                    style={{ width: "60%" }}
                  ></div>
                  <div
                    className={`${styles.bar} ${styles.instagram}`}
                    style={{ width: "30%" }}
                  ></div>
                  <div
                    className={`${styles.bar} ${styles.other}`}
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
