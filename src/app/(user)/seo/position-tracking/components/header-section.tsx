"use client";

import React, { useState } from "react";
import { Input, Button, Select, DatePicker, Row, Col } from "antd";
import { FiSearch, FiPlus } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import dayjs from "dayjs";
import styles from "./header-section.module.scss";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface HeaderSectionProps {
  onCreateProject: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onCreateProject }) => {
  const [dateRange, setDateRange] = useState<string>("Last 8 days");
  const [searchValue, setSearchValue] = useState<string>("");

  const dateOptions = [
    "Last 8 days",
    "Last 30 days",
    "Last 3 months",
    "Last 6 months",
    "Last year",
  ];

  return (
    <div className={styles.headerSection}>
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Home</span>
        <span className={styles.separator}>›</span>
        <span className={styles.breadcrumbItem}>SEO</span>
        <span className={styles.separator}>›</span>
        <span className={styles.breadcrumbItem}>Position Tracking</span>
      </div>

      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.pageTitle}>Position Tracking</h1>
          <Button
            type="link"
            className={styles.feedbackBtn}
            icon={<AiOutlineCalendar />}
          >
            Send feedback
          </Button>
        </div>

        <Row gutter={[16, 16]} className={styles.controlsRow}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder="Project name or domain"
              prefix={<FiSearch className={styles.searchIcon} />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={styles.searchInput}
            />
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              value={dateRange}
              onChange={setDateRange}
              className={styles.dateSelect}
              suffixIcon={<AiOutlineCalendar />}
            >
              {dateOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <div className={styles.dateDisplay}>Jul 9-16, 2025</div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Button
              type="primary"
              icon={<FiPlus />}
              className={styles.createBtn}
              onClick={onCreateProject}
            >
              Create project
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeaderSection;
