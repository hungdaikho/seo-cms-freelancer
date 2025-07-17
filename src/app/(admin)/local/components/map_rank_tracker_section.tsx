"use client";
import React from "react";
import { Button } from "antd";
import styles from "./map_rank_tracker_section.module.scss";

type Props = {};

const MapRankTrackerSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.rankingTabs}>
              <div className={styles.tabItem}>
                <div className={styles.tabIcon}>🏢</div>
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
                <div className={styles.businessIcon}>📍</div>
                <div className={styles.businessInfo}>
                  <h4>John's Roofing</h4>
                  <div className={styles.avgRank}>
                    Avg. Rank
                    <span className={styles.rankValue}>5.82</span>
                    <div className={styles.trendChart}>📈</div>
                  </div>
                </div>
              </div>

              <div className={styles.competitorItem}>
                <span className={styles.rank}>2.6</span>
                <span className={styles.name}>Roof Revivers</span>
                <span className={styles.label}>Competitor</span>
              </div>

              <div className={`${styles.competitorItem} ${styles.highlighted}`}>
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

            <div className={styles.mapVisualization}>
              <div className={styles.mapContainer}>
                <div className={styles.mapPoint + " " + styles.point15}>15</div>
                <div className={styles.mapPoint + " " + styles.point3}>3</div>
                <div className={styles.mapPoint + " " + styles.point6}>6</div>
                <div className={styles.mapPoint + " " + styles.point12}>12</div>
                <div className={styles.mapPoint + " " + styles.point1}>1</div>
                <div className={styles.mapPoint + " " + styles.point4}>4</div>
                <div className={styles.mapPoint + " " + styles.point14}>14</div>
                <div className={styles.mapPoint + " " + styles.point5}>5</div>
                <div className={styles.mapPoint + " " + styles.point9}>9</div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.badge}>MAP RANK TRACKER</div>
            <h2 className={styles.title}>Zero in on local rankings</h2>
            <p className={styles.description}>
              See exactly where your local SEO has moved the needle, how your
              competitors are moving it, and what you need to do to move it
              more.
            </p>
            <div className={styles.actions}>
              <Button type="primary" className={styles.getStartedBtn}>
                Get started
              </Button>
              <Button type="link" className={styles.findOutBtn}>
                Find out more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapRankTrackerSection;
