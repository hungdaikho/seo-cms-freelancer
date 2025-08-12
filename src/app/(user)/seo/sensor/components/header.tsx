"use client";

import React from "react";
import { Row, Col, Button, Select } from "antd";
import {
  FaComment,
  FaBell,
  FaShare,
  FaDesktop,
  FaMobile,
} from "react-icons/fa";
import styles from "./header.module.scss";

const { Option } = Select;

const Header = () => {
  return (
    <div className={styles.header}>
      <Row justify="space-between" align="middle" className={styles.headerRow}>
        <Col>
          <h1 className={styles.title}>Semrush Sensor</h1>
        </Col>
        <Col>
          <div className={styles.headerActions}>
            <Button
              type="link"
              icon={<FaComment />}
              className={styles.actionButton}
            >
              Send feedback
            </Button>
            <Button
              type="primary"
              icon={<FaBell />}
              className={styles.subscribeButton}
            >
              Subscribe to notifications
            </Button>
          </div>
        </Col>
      </Row>

      <div className={styles.navigation}>
        <div className={styles.navTabs}>
          <span className={`${styles.navTab} ${styles.active}`}>Overview</span>
          <span className={styles.navTab}>Personal Score</span>
          <span className={styles.navTab}>Deviations</span>
          <span className={styles.navTab}>Winners & Losers</span>
        </div>

        <div className={styles.filters}>
          <Select defaultValue="United States" className={styles.countrySelect}>
            <Option value="United States">🇺🇸 United States</Option>
            <Option value="United Kingdom">🇬🇧 United Kingdom</Option>
            <Option value="Canada">🇨🇦 Canada</Option>
          </Select>

          <div className={styles.deviceToggle}>
            <Button type="primary" size="small" icon={<FaDesktop />}>
              Desktop
            </Button>
            <Button type="default" size="small" icon={<FaMobile />}>
              Mobile
            </Button>
          </div>

          <Select defaultValue="Compare with" className={styles.compareSelect}>
            <Option value="Compare with">Compare with</Option>
            <Option value="Last week">Last week</Option>
            <Option value="Last month">Last month</Option>
          </Select>

          <Button icon={<FaShare />} className={styles.shareButton}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
