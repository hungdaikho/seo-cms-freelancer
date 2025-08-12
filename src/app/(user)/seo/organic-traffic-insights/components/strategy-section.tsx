"use client";

import React from "react";
import { Row, Col, Card, Table, Select, Input, Button } from "antd";
import { FiSearch } from "react-icons/fi";
import styles from "./strategy-section.module.scss";

const { Option } = Select;

interface StrategyData {
  key: string;
  keyword: string;
  type: string;
}

interface StrategySectionProps {}

const StrategySection: React.FC<StrategySectionProps> = () => {
  const data: StrategyData[] = [
    { key: "1", keyword: "semrush", type: "All" },
    { key: "2", keyword: "sem rush", type: "New" },
    { key: "3", keyword: "semrush.com", type: "Lost" },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      width: 40,
      render: () => <input type="checkbox" className={styles.checkbox} />,
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => (
        <span className={styles.keywordText}>{text}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <span className={styles.typeText}>{type}</span>,
    },
  ];

  return (
    <div className={styles.strategySection}>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <Card className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <div className={styles.searchContainer}>
                <Input
                  placeholder="Search"
                  prefix={<FiSearch />}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.filterContainer}>
                <Select defaultValue="All" className={styles.typeFilter}>
                  <Option value="All">All</Option>
                  <Option value="New">New</Option>
                  <Option value="Lost">Lost</Option>
                  <Option value="Winner">Winner</Option>
                  <Option value="Loser">Loser</Option>
                </Select>
              </div>
            </div>

            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              size="middle"
              className={styles.strategyTable}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className={styles.improveCard}>
            <div className={styles.improveContent}>
              <h3 className={styles.improveTitle}>Improve your SEO strategy</h3>
              <p className={styles.improveDescription}>
                Filter your traffic and keywords using handy filters by device,
                country, etc. Take action by correcting your SEO strategy and
                immediately track your results.
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StrategySection;
