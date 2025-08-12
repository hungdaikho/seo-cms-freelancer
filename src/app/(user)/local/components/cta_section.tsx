"use client";
import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./cta_section.module.scss";

type Props = {};

const CtaSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Control your GBP, reviews, and listings,
            <br />
            and get deep insights into local SEO
          </h2>
          <p className={styles.subtitle}>
            Get started with a free audit of your online presence in local
            listings
          </p>

          <div className={styles.searchForm}>
            <div className={styles.searchContainer}>
              <Input
                placeholder="Enter your business name"
                className={styles.searchInput}
                size="large"
              />
              <Button
                type="primary"
                className={styles.searchButton}
                size="large"
              >
                Get started
              </Button>
            </div>

            <div className={styles.advancedSearch}>
              <Button type="link" className={styles.advancedLink}>
                Advanced search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
