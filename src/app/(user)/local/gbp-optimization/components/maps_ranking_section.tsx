"use client";
import React from "react";
import { Button } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./maps_ranking_section.module.scss";

type Props = {};

const MapsRankingSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <h3 className={styles.sectionTitle}>
              Track your Google Maps rankings
            </h3>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                Get a 360-degree view of your Google Maps rankings across
                different locations and keywords
              </li>
              <li className={styles.featureItem}>
                Identify your top competitors and see how they rank compared to
                you in specific locations
              </li>
              <li className={styles.featureItem}>
                Adjust settings such as the number of keywords to track, the
                area grid for monitoring, and report frequency to fit your
                specific needs
              </li>
            </ul>

            <Button type="primary" className={styles.connectBtn}>
              Connect your business
            </Button>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.rankingPanel}>
              <div className={styles.rankingTabs}>
                <div className={styles.tabItem}>
                  <FaMapMarkerAlt className={styles.tabIcon} />
                  <span>Your rankings</span>
                </div>
                <div className={styles.tabItem}>
                  <div className={styles.tabIcon}>🏪</div>
                  <span>Competitor #1</span>
                </div>
                <div className={styles.tabItem}>
                  <div className={styles.tabIcon}>🏬</div>
                  <span>Competitor #2</span>
                </div>
              </div>

              <div className={styles.businessRankings}>
                <div className={styles.businessItem}>
                  <FaMapMarkerAlt className={styles.businessIcon} />
                  <div className={styles.businessInfo}>
                    <h4>John's Roofing</h4>
                    <div className={styles.avgRank}>
                      Avg. Rank
                      <span className={styles.rankValue}>5.82</span>
                      <div className={styles.trendChart}>📈</div>
                    </div>
                  </div>
                </div>

                <div className={styles.competitorsList}>
                  <div className={styles.competitorItem}>
                    <span className={styles.rank}>2.6</span>
                    <span className={styles.name}>Roof Revivers</span>
                    <span className={styles.label}>Competitor</span>
                  </div>

                  <div
                    className={`${styles.competitorItem} ${styles.highlighted}`}
                  >
                    <span className={styles.rank}>5.8</span>
                    <span className={styles.name}>John's Roofing</span>
                    <span className={styles.label}>You</span>
                  </div>

                  <div className={styles.competitorItem}>
                    <span className={styles.rank}>9.4</span>
                    <span className={styles.name}>The Roof Detective</span>
                    <span className={styles.label}>Competitor</span>
                  </div>
                </div>
              </div>

              <div className={styles.mapVisualization}>
                <div className={styles.mapContainer}>
                  <div className={`${styles.mapPoint} ${styles.point15}`}>
                    15
                  </div>
                  <div className={`${styles.mapPoint} ${styles.point3}`}>3</div>
                  <div className={`${styles.mapPoint} ${styles.point6}`}>6</div>
                  <div className={`${styles.mapPoint} ${styles.point12}`}>
                    12
                  </div>
                  <div className={`${styles.mapPoint} ${styles.point1}`}>1</div>
                  <div className={`${styles.mapPoint} ${styles.point4}`}>4</div>
                  <div className={`${styles.mapPoint} ${styles.point14}`}>
                    14
                  </div>
                  <div className={`${styles.mapPoint} ${styles.point5}`}>5</div>
                  <div className={`${styles.mapPoint} ${styles.point9}`}>9</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsRankingSection;
