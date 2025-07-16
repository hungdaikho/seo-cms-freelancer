"use client";

import React from "react";
import { Button, Input, Form } from "antd";
import {
  FaSearch,
  FaGlobe,
  FaChartLine,
  FaUsers,
  FaDesktop,
  FaMobile,
} from "react-icons/fa";
import styles from "./hero_trending_websites.module.scss";

const HeroTrendingWebsites: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Analyze trending websites:", values);
  };

  const topWebsites = [
    {
      rank: 1,
      website: "google.com",
      visits: "62.2B",
      growth: "+2.3%",
      mobile: 65,
    },
    {
      rank: 2,
      website: "youtube.com",
      visits: "29.7B",
      growth: "+5.7%",
      mobile: 72,
    },
    {
      rank: 3,
      website: "facebook.com",
      visits: "19.4B",
      growth: "-1.2%",
      mobile: 78,
    },
    {
      rank: 4,
      website: "wikipedia.org",
      visits: "12.8B",
      growth: "+3.1%",
      mobile: 58,
    },
    {
      rank: 5,
      website: "twitter.com",
      visits: "8.9B",
      growth: "+12.4%",
      mobile: 81,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h1 className={styles.title}>
              {/* <FaTrendingUp className={styles.titleIcon} /> */}
              Trending Websites Analysis
            </h1>
            <p className={styles.subtitle}>
              Discover the hottest websites, trending traffic patterns, and
              emerging digital destinations. Track website rankings, growth
              trends, and competitive movements in real-time.
            </p>

            <Form
              form={form}
              onFinish={onFinish}
              className={styles.analysisForm}
            >
              <div className={styles.inputGroup}>
                <Form.Item name="domain" className={styles.formItem}>
                  <Input
                    placeholder="Enter domain to track trending (e.g., example.com)"
                    size="large"
                    prefix={<FaGlobe className={styles.inputIcon} />}
                    className={styles.domainInput}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<FaSearch />}
                  className={styles.analyzeButton}
                >
                  Track Trends
                </Button>
              </div>
            </Form>

            <div className={styles.features}>
              <div className={styles.feature}>
                <FaChartLine className={styles.featureIcon} />
                <span>Traffic Trends</span>
              </div>
              <div className={styles.feature}>
                <FaUsers className={styles.featureIcon} />
                <span>Audience Growth</span>
              </div>
              <div className={styles.feature}>
                {/* <FaTrendingUp className={styles.featureIcon} /> */}
                <span>Ranking Changes</span>
              </div>
            </div>
          </div>

          <div className={styles.visualSection}>
            <div className={styles.trendingChart}>
              <div className={styles.chartHeader}>
                <h3>Top Trending Websites Worldwide</h3>
                <span className={styles.timeframe}>Last 30 days</span>
              </div>

              <div className={styles.websiteList}>
                {topWebsites.map((site) => (
                  <div key={site.rank} className={styles.websiteItem}>
                    <div className={styles.rankBadge}>#{site.rank}</div>
                    <div className={styles.websiteInfo}>
                      <div className={styles.websiteName}>{site.website}</div>
                      <div className={styles.websiteStats}>
                        <span className={styles.visits}>
                          {site.visits} visits
                        </span>
                        <span
                          className={`${styles.growth} ${
                            site.growth.startsWith("+")
                              ? styles.positive
                              : styles.negative
                          }`}
                        >
                          {site.growth}
                        </span>
                      </div>
                    </div>
                    <div className={styles.deviceStats}>
                      <div className={styles.deviceBar}>
                        <div
                          className={styles.desktop}
                          style={{ width: `${100 - site.mobile}%` }}
                        >
                          <FaDesktop />
                        </div>
                        <div
                          className={styles.mobile}
                          style={{ width: `${site.mobile}%` }}
                        >
                          <FaMobile />
                        </div>
                      </div>
                      <span className={styles.mobilePercent}>
                        {site.mobile}% mobile
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.trendIndicators}>
                <div className={styles.indicator}>
                  <div className={styles.indicatorValue}>+15.3%</div>
                  <div className={styles.indicatorLabel}>Avg Growth</div>
                </div>
                <div className={styles.indicator}>
                  <div className={styles.indicatorValue}>2.3B</div>
                  <div className={styles.indicatorLabel}>New Visitors</div>
                </div>
                <div className={styles.indicator}>
                  <div className={styles.indicatorValue}>68%</div>
                  <div className={styles.indicatorLabel}>Mobile Traffic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTrendingWebsites;
