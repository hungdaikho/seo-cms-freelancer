"use client";

import styles from "../page.module.scss";

export default function SocialContent() {
  const posts = [
    {
      time: "10:00 AM",
      platform: "instagram",
      title: "New product launch",
      status: "scheduled",
    },
    {
      time: "1:00 PM",
      platform: "facebook",
      title: "Blog post check out our new blog post",
      status: "published",
    },
    {
      time: "3:00 PM",
      platform: "twitter",
      title: "Sale ends soon",
      status: "scheduled",
    },
    {
      time: "6:00 PM",
      platform: "instagram",
      title: "Happy holidays!",
      status: "scheduled",
    },
    {
      time: "9:00 PM",
      platform: "facebook",
      title: "Check out the reviews",
      status: "scheduled",
    },
  ];

  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
              <h3>Monday / Tuesday</h3>
            </div>

            <div className={styles.posts}>
              {posts.map((post, index) => (
                <div
                  key={index}
                  className={`${styles.post} ${styles[post.status]}`}
                >
                  <div className={styles.time}>{post.time}</div>
                  <div
                    className={`${styles.platform} ${styles[post.platform]}`}
                  >
                    {post.platform === "instagram" && "📷"}
                    {post.platform === "facebook" && "f"}
                    {post.platform === "twitter" && "🐦"}
                  </div>
                  <div className={styles.title}>{post.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.textContent}>
            <h2>
              Create and share engaging content on all your social profiles
            </h2>
            <ul className={styles.featureList}>
              <li>
                Streamline your social calendar by scheduling posts to
                Instagram, Facebook, X (Twitter), Pinterest, LinkedIn, and
                Google Business Profile
              </li>
              <li>
                Create content, manage your approval process, and find the best
                time to post
              </li>
              <li>
                Effortlessly share any type of social content on all of your
                social profiles
              </li>
            </ul>
            <button className={styles.ctaButton}>Drive engagement</button>
          </div>
        </div>
      </div>
    </section>
  );
}
