"use client";
import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import styles from "./latest_news_section.module.scss";

type Props = {};

const LatestNewsSection = ({}: Props) => {
  return (
    <div className={styles.newsSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.badge}>
              What's new from Semrush Traffic & Market
            </div>

            <h2 className={styles.title}>
              FMCG Ecommerce in 2025: Top Brands, Trends, & Market Shifts
            </h2>

            <p className={styles.description}>
              Explore top FMCG growth trends, channels, and AI's impact in our
              new report with Euromonitor.
            </p>

            <Button
              type="default"
              size="large"
              icon={<DownloadOutlined />}
              className={styles.downloadBtn}
            >
              Download now
            </Button>
          </div>

          <div className={styles.visualContent}>
            <div className={styles.reportMockup}>
              <div className={styles.reportCover}>
                <div className={styles.reportImage}>
                  <div className={styles.personImage}></div>
                  <div className={styles.logoArea}>
                    <span className={styles.reportTitle}>
                      The State of FMCG Ecommerce
                    </span>
                    <span className={styles.reportSubtitle}>
                      Market Trends & Growth Predictions in 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNewsSection;
