"use client";
import React from "react";
import { Button } from "antd";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import styles from "./gbp_hero_section.module.scss";

type Props = {};

const GbpHeroSection = (props: Props) => {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <h1 className={styles.title}>
              <span className={styles.levelUp}>Level up</span> your
              <br />
              Google Business Profile
              <br />
              and lead in local search
            </h1>
            <p className={styles.subtitle}>
              Insights, reviews, posts, precise ranking on maps against
              competitors. With Semrush Local, getting to the top is easy for
              local businesses
            </p>
            <Button type="primary" className={styles.connectBtn}>
              <FaBuilding className={styles.btnIcon} />
              Connect your business
            </Button>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.mockupContainer}>
              <div className={styles.mainMockup}>
                <img
                  src="/enterprise-bg.jpg"
                  alt="Business owner"
                  className={styles.businessImage}
                />
              </div>
              <div className={styles.floatingCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Happy Days</span>
                  <div className={styles.cardMeta}>
                    <span>Brewery • Rating • Hours</span>
                  </div>
                </div>
                <div className={styles.cardImage}>
                  <div className={styles.imageGrid}>
                    <div className={styles.gridItem}></div>
                    <div className={styles.gridItem}></div>
                    <div className={styles.gridItem}></div>
                    <div className={styles.gridItem}></div>
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

export default GbpHeroSection;
