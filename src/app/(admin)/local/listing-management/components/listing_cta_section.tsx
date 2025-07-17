"use client";

import React from "react";
import { Typography, Button, Input } from "antd";
import { FaSearch } from "react-icons/fa";
import styles from "./listing_cta_section.module.scss";

const { Title, Text } = Typography;

const ListingCtaSection: React.FC = () => {
  return (
    <section className={styles.listing_cta_section}>
      <div className={styles.container}>
        <div className={styles.cta_content}>
          <Title level={2} className={styles.cta_title}>
            Grow your business with listings, data, and reviews.
          </Title>
          <Title level={3} className={styles.cta_subtitle}>
            All in one platform
          </Title>

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
        </div>
      </div>
    </section>
  );
};

export default ListingCtaSection;
