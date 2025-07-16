import React from "react";
import styles from "./trusted_by_section.module.scss";

type Props = {};

const TrustedBySection = ({}: Props) => {
  const companies = [
    { name: "Tesla", logo: "Tesla" },
    { name: "Decathlon", logo: "DECATHLON" },
    { name: "P&G", logo: "P&G" },
    { name: "Samsung", logo: "SAMSUNG" },
    { name: "Microsoft", logo: "Microsoft" },
    { name: "LaLiga", logo: "LaLiga" },
    { name: "Amazon", logo: "amazon" },
  ];

  return (
    <div className={styles.trustedSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.label}>Trusted by</p>

          <div className={styles.logosGrid}>
            {companies.map((company, index) => (
              <div key={index} className={styles.logoItem}>
                <span className={styles.logoText}>{company.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;
