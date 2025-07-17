"use client";

import SocialNavLink from "./social-nav-link";
import styles from "./social-nav-demo.module.scss";

export default function SocialNavDemo() {
  return (
    <div className={styles.navDemo}>
      <h3>Social Navigation Demo</h3>
      <p>Click any link to navigate to specific sections:</p>

      <div className={styles.navLinks}>
        <SocialNavLink section="social-dashboard" className={styles.navButton}>
          📊 Social Dashboard
        </SocialNavLink>

        <SocialNavLink
          section="social-media-tracker"
          className={styles.navButton}
        >
          📈 Media Tracker
        </SocialNavLink>

        <SocialNavLink
          section="social-media-poster"
          className={styles.navButton}
        >
          📝 Media Poster
        </SocialNavLink>

        <SocialNavLink section="social-analytics" className={styles.navButton}>
          📊 Analytics
        </SocialNavLink>
      </div>
    </div>
  );
}
