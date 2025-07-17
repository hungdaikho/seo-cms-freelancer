"use client";
import React from "react";
import { Button } from "antd";
import { FaBuilding } from "react-icons/fa";
import styles from "./gbp_cta_section.module.scss";

type Props = {};

const GbpCtaSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Ready to take your Google Business Profile to new heights?
          </h2>
          <p className={styles.subtitle}>
            Help your business reach its full potential today.
          </p>

          <Button type="primary" className={styles.connectBtn}>
            <FaBuilding className={styles.btnIcon} />
            Connect your business
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GbpCtaSection;
