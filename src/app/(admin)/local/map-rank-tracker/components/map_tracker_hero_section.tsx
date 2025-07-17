"use client";

import React from "react";
import { Button, Input, Typography } from "antd";
import { FaSearch } from "react-icons/fa";
import styles from "./map_tracker_hero_section.module.scss";

const { Title, Text } = Typography;

const MapTrackerHeroSection: React.FC = () => {
  return (
    <section className={styles.map_tracker_hero_section}>
      <div className={styles.hero_background}>
        <div className={styles.container}>
          <div className={styles.hero_content}>
            <Text className={styles.tracker_badge}>Map Rank Tracker</Text>

            <Title level={1} className={styles.hero_title}>
              Monitor your local rankings
            </Title>
            <Title level={1} className={styles.hero_title}>
              with pinpoint accuracy
            </Title>

            <div className={styles.search_section}>
              <div className={styles.search_container}>
                <Input
                  placeholder="Enter company name (and location if necessary)"
                  className={styles.search_input}
                />
                <Button
                  type="primary"
                  icon={<FaSearch />}
                  className={styles.search_button}
                />
              </div>

              <div className={styles.examples_section}>
                <Text className={styles.examples_label}>Examples:</Text>
                <div className={styles.examples_tags}>
                  <span className={styles.example_tag}>Semrush Barcelona</span>
                  <span className={styles.example_tag}>State Cafe NoMade</span>
                  <span className={styles.example_tag}>
                    King Key Locksmith San Francisco
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapTrackerHeroSection;
