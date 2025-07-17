"use client";
import React from "react";
import { Button, Card } from "antd";
import {
  FaChartLine,
  FaEye,
  FaMousePointer,
  FaStar,
  FaGoogle,
  FaYelp,
  FaSearch,
} from "react-icons/fa";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import styles from "./business_tools_section.module.scss";

type Props = {};

const BusinessToolsSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            All the tools you need to be the go-to local business in your area
          </h2>
        </div>

        <div className={styles.toolsGrid}>
          {/* GBP Optimization Tool */}
          <div className={styles.toolCard}>
            <div className={styles.toolContent}>
              <div className={styles.toolBadge}>GBP OPTIMIZATION</div>
              <h3 className={styles.toolTitle}>Own your digital storefront</h3>
              <p className={styles.toolDescription}>
                Rank higher in local searches and convert more potential
                customers into foot traffic, all from one quick dashboard.
              </p>
              <div className={styles.toolActions}>
                <Button type="primary" className={styles.getStartedBtn}>
                  Get started
                </Button>
                <Button type="link" className={styles.findOutBtn}>
                  Find out more
                </Button>
              </div>
            </div>
          </div>

          {/* Google Business Profile Insights */}
          <div className={styles.insightsCard}>
            <div className={styles.insightsHeader}>
              <h4>Google Business Profile Insights</h4>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Views</div>
                <div className={styles.statValue}>
                  55.1K <span className={styles.positive}>+28%</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Actions</div>
                <div className={styles.statValue}>
                  345 <span className={styles.negative}>-2.5%</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Average Rating</div>
                <div className={styles.statValue}>
                  4.8 <span className={styles.positive}>+0.3</span>
                </div>
              </div>
            </div>

            <div className={styles.chartsRow}>
              <div className={styles.chartItem}>
                <div className={styles.chartLabel}>Google Search Views</div>
                <div className={styles.chartStats}>
                  <span className={styles.year}>2024</span>
                  <span className={styles.year}>2023</span>
                  <span className={styles.positive}>+26%</span>
                </div>
                <div className={styles.chartPlaceholder}></div>
              </div>
              <div className={styles.chartItem}>
                <div className={styles.chartLabel}>Google Maps Views</div>
                <div className={styles.chartStats}>
                  <span className={styles.year}>2024</span>
                  <span className={styles.year}>2023</span>
                  <span className={styles.positive}>+40%</span>
                </div>
                <div className={styles.chartPlaceholder}></div>
              </div>
            </div>

            <div className={styles.viewsDistribution}>
              <div className={styles.distributionLabel}>Views Distribution</div>
              <div className={styles.distributionBar}></div>
            </div>
          </div>
        </div>

        {/* Business Directory Status */}
        <div className={styles.directorySection}>
          <div className={styles.businessProfile}>
            <div className={styles.businessHeader}>
              <FaGoogle className={styles.businessLogo} />
              <div className={styles.businessInfo}>
                <h4>John's Roofing</h4>
                <div className={styles.businessMeta}>
                  <span className={styles.presence}>Online presence</span>
                  <span className={styles.listings}>Listings to fix</span>
                  <span className={styles.rating}>Rating</span>
                </div>
                <div className={styles.businessStats}>
                  <span className={styles.medium}>Medium</span>
                  <span className={styles.score}>64/72</span>
                  <span className={styles.stars}>4.5 ⭐</span>
                </div>
              </div>
            </div>

            <div className={styles.directoryStatus}>
              <div className={styles.statusHeader}>
                <span>Directory</span>
                <span>Status</span>
              </div>

              <div className={styles.statusItem}>
                <div className={styles.platform}>
                  <FaGoogle />
                  <span>Insider Pages</span>
                </div>
                <span className={styles.notPresent}>❌ Not Present</span>
              </div>

              <div className={styles.statusItem}>
                <div className={styles.platform}>
                  <FaGoogle />
                  <span>Facebook</span>
                </div>
                <span className={styles.connected}>✅ Connected</span>
              </div>

              <div className={styles.statusItem}>
                <div className={styles.platform}>
                  <FaGoogle />
                  <span>Siri</span>
                </div>
                <span className={styles.notPresent}>❌ Not Present</span>
              </div>

              <div className={styles.statusItem}>
                <div className={styles.platform}>
                  <FaSearch />
                  <span>Bing</span>
                </div>
                <span className={styles.notPresent}>❌ Not Present</span>
              </div>

              <div className={styles.statusItem}>
                <div className={styles.platform}>
                  <FaYelp />
                  <span>Yelp</span>
                </div>
                <span className={styles.notPresent}>❌ Not Present</span>
              </div>
            </div>
          </div>

          {/* Listing Management */}
          <div className={styles.listingManagement}>
            <div className={styles.managementBadge}>LISTING MANAGEMENT</div>
            <h3 className={styles.managementTitle}>
              Show up to more customers
            </h3>
            <p className={styles.managementDescription}>
              Keep your business listings up to date. Win new traffic from top
              directories like Yelp and Tripadvisor and get noticed more in
              local search—without endless form filling.
            </p>
            <div className={styles.managementActions}>
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

export default BusinessToolsSection;
