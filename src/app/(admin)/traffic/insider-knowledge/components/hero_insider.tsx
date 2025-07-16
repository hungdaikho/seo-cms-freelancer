"use client";
import React from "react";
import { Button } from "antd";
import { BookOutlined } from "@ant-design/icons";
import styles from "./hero_insider.module.scss";

type Props = {};

const HeroInsider = ({}: Props) => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <div className={styles.badge}>
              <BookOutlined />
              <span>Insider Knowledge</span>
            </div>

            <h1 className={styles.title}>
              Grow Your Expertise with Insider Knowledge
            </h1>

            <p className={styles.description}>
              Explore data-driven research, real-world use cases, and other
              resources to uncover new market opportunities and refine your
              strategy.
            </p>

            <Button type="primary" size="large" className={styles.exploreBtn}>
              Explore Insider Knowledge
            </Button>
          </div>

          <div className={styles.visualSection}>
            <div className={styles.mockupCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Your market</span>
                <div className={styles.cardStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Market Share</span>
                    <span className={styles.statValue}>32M</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Traffic Growth</span>
                    <span className={styles.statValue}>+2M</span>
                  </div>
                </div>
              </div>

              <div className={styles.chartArea}>
                <div className={styles.chart}>
                  <div className={styles.chartLine}></div>
                  <div className={styles.chartPoints}>
                    <div className={styles.point}></div>
                    <div className={styles.point}></div>
                    <div className={styles.point}></div>
                  </div>
                </div>
              </div>

              <div className={styles.competitorsList}>
                <div className={styles.competitor}>
                  <div
                    className={styles.competitorDot}
                    style={{ backgroundColor: "#ff6b6b" }}
                  ></div>
                  <span>Competitor A</span>
                </div>
                <div className={styles.competitor}>
                  <div
                    className={styles.competitorDot}
                    style={{ backgroundColor: "#4ecdc4" }}
                  ></div>
                  <span>Competitor B</span>
                </div>
                <div className={styles.competitor}>
                  <div
                    className={styles.competitorDot}
                    style={{ backgroundColor: "#45b7d1" }}
                  ></div>
                  <span>Your Website</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInsider;
