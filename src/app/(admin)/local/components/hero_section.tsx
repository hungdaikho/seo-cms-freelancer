"use client";
import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FaMapMarkerAlt, FaBuilding, FaEye } from "react-icons/fa";
import styles from "./hero_section.module.scss";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.overlay}>
          <div className={styles.container}>
            <div className={styles.content}>
              {/* Header with icons */}
              <div className={styles.iconRow}>
                <FaMapMarkerAlt className={styles.iconGreen} />
                <FaMapMarkerAlt className={styles.iconPink} />
              </div>

              {/* Main heading */}
              <h1 className={styles.title}>Watch your local business thrive</h1>

              {/* Subtitle */}
              <p className={styles.subtitle}>
                Manage your Google Business Profile and online reviews,
                automatically post business listings, and get precise local
                rankings data.
              </p>

              {/* Search form */}
              <div className={styles.searchForm}>
                <div className={styles.searchContainer}>
                  <Input
                    placeholder="Enter your business name or address to get a free local audit"
                    className={styles.searchInput}
                    size="large"
                  />
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    className={styles.searchButton}
                    size="large"
                  />
                </div>

                <div className={styles.advancedSearch}>
                  <Button type="link" className={styles.advancedLink}>
                    Advanced search
                  </Button>
                </div>
              </div>

              {/* Sample business card */}
              <div className={styles.businessCard}>
                <div className={styles.businessInfo}>
                  <FaBuilding className={styles.businessIcon} />
                  <div className={styles.businessDetails}>
                    <h3>CÔNG TY TNHH XNK TM HỒNG VÂN</h3>
                    <p>7 Lào 392, Hà Nội</p>
                  </div>
                  <Button type="link" className={styles.viewButton}>
                    View <FaEye />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
