"use client";

import React, { useState } from "react";
import { Card, Table, Tag, Input, Select, Checkbox, Button } from "antd";
import { FiSearch } from "react-icons/fi";
import styles from "./keywords-section.module.scss";

const { Option } = Select;

interface KeywordData {
  key: string;
  keyword: string;
  type: string;
  position: number;
}

interface KeywordsSectionProps {}

const KeywordsSection: React.FC<KeywordsSectionProps> = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const data: KeywordData[] = [
    {
      key: "1",
      keyword: "semrush",
      type: "Semrush",
      position: 1,
    },
    {
      key: "2",
      keyword: "sem rush",
      type: "Google Search Console",
      position: 2,
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      width: 50,
      render: (_: any, record: KeywordData) => (
        <Checkbox
          checked={selectedRows.includes(record.key)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, record.key]);
            } else {
              setSelectedRows(selectedRows.filter((key) => key !== record.key));
            }
          }}
        />
      ),
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
      render: (type: string) => (
        <Tag
          color={type === "Semrush" ? "blue" : "green"}
          className={styles.typeTag}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Pos",
      dataIndex: "position",
      key: "position",
      align: "center" as const,
      render: (position: number) => (
        <span className={styles.positionValue}>{position}</span>
      ),
    },
  ];

  return (
    <div className={styles.keywordsSection}>
      <Card className={styles.keywordsCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <h2 className={styles.sectionTitle}>
              Discover "not provided" keywords
            </h2>
            <p className={styles.sectionDescription}>
              Connect your GA and Google Search Console accounts to get a list
              of keywords that actually drive organic traffic to your top
              performing pages.
            </p>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.tabsContainer}>
              <div className={styles.tabs}>
                <div className={`${styles.tab} ${styles.active}`}>Keywords</div>
                <div className={styles.tab}>Semrush</div>
                <div className={styles.tab}>Google Search Console</div>
              </div>
            </div>

            <div className={styles.tableControls}>
              <div className={styles.searchControl}>
                <Input
                  placeholder="Search"
                  prefix={<FiSearch />}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.filterControl}>
                <Select
                  value={typeFilter}
                  onChange={setTypeFilter}
                  className={styles.typeSelect}
                  style={{ width: 120 }}
                >
                  <Option value="All">All</Option>
                  <Option value="Semrush">Semrush</Option>
                  <Option value="Google Search Console">GSC</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            size="middle"
            className={styles.keywordsTable}
          />
        </div>
      </Card>
    </div>
  );
};

export default KeywordsSection;
