"use client";

import React from "react";
import { Button, Input, Typography } from "antd";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./listing_hero_section.module.scss";

const { Title, Text } = Typography;

const ListingHeroSection: React.FC = () => {
  return (
    <section className={styles.listing_hero_section}>
      <div className={styles.hero_background}>
        <div className={styles.map_overlay}>
          <FaMapMarkerAlt className={styles.location_marker} />
        </div>

        <div className={styles.container}>
          <div className={styles.hero_content}>
            <Text className={styles.listing_badge}>Listing Management</Text>

            <Title level={1} className={styles.hero_title}>
              Grow your Local businesses
            </Title>

            <Text className={styles.hero_subtitle}>
              Listings, data, and AI-powered reviews — all in one platform.
            </Text>

            <div className={styles.search_section}>
              <Text className={styles.search_label}>
                Check your local listings for free
              </Text>

              <div className={styles.search_container}>
                <Input
                  placeholder="Your business name, website or phone"
                  className={styles.search_input}
                  suffix={
                    <Button
                      type="primary"
                      icon={<FaSearch />}
                      className={styles.search_button}
                    />
                  }
                />
              </div>

              <Button type="link" className={styles.advanced_search}>
                Advanced search
              </Button>
            </div>

            <div className={styles.example_result}>
              <div className={styles.result_card}>
                <div className={styles.result_icon}>
                  <FaMapMarkerAlt />
                </div>
                <div className={styles.result_content}>
                  <Text className={styles.company_name}>
                    CÔNG TY TNHH XNK TM HƯNG VẤN
                  </Text>
                  <Text className={styles.company_address}>
                    91 Lạc Nghiệp, Hà Nội
                  </Text>
                </div>
                <Button type="link" className={styles.view_button}>
                  View →
                </Button>
              </div>
            </div>

            <div className={styles.features_row}>
              <div className={styles.feature_item}>
                <div className={styles.feature_icon}>📝</div>
                <div className={styles.feature_content}>
                  <Text className={styles.feature_title}>
                    Enter business name
                  </Text>
                  <Text className={styles.feature_desc}>
                    Run a scan of your local business listing in a few seconds
                  </Text>
                </div>
              </div>

              <div className={styles.feature_item}>
                <div className={styles.feature_icon}>📊</div>
                <div className={styles.feature_content}>
                  <Text className={styles.feature_title}>
                    Get a free report
                  </Text>
                  <Text className={styles.feature_desc}>
                    See which directories your business is listed, missing, or
                    need + your review ratings
                  </Text>
                </div>
              </div>

              <div className={styles.feature_item}>
                <div className={styles.feature_icon}>🚀</div>
                <div className={styles.feature_content}>
                  <Text className={styles.feature_title}>
                    Boost your local ranking
                  </Text>
                  <Text className={styles.feature_desc}>
                    See how much you can improve to claim the top spot in local
                    search
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingHeroSection;
