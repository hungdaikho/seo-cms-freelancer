import React from "react";
import HeroEmail from "./components/hero_email";
import EmailTrackingSection from "./components/email_tracking_section";
import styles from "./page.module.scss";

const EmailPage: React.FC = () => {
  return (
    <div className={styles.emailPage}>
      <HeroEmail />
      <EmailTrackingSection />
    </div>
  );
};

export default EmailPage;
