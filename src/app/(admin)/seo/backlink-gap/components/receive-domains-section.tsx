import React from "react";
import { Card, Table } from "antd";
import styles from "./receive-domains-section.module.scss";

const ReceiveDomainsSection: React.FC = () => {
  const columns = [
    {
      title: "",
      dataIndex: "indicator",
      key: "indicator",
      width: 40,
      render: (indicator: string) => (
        <div className={styles.indicatorDots}>
          <span
            className={styles.dot}
            style={{
              backgroundColor: indicator === "blue" ? "#3b82f6" : "#10b981",
            }}
          ></span>
          <span
            className={styles.dot}
            style={{
              backgroundColor: indicator === "blue" ? "#3b82f6" : "#10b981",
            }}
          ></span>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "bars",
      key: "bars",
      render: (bars: string) => (
        <div className={styles.dataBar}>
          <div className={styles.barRow}>
            <span className={styles.barDot}></span>
            <span className={styles.barDot}></span>
            <span className={styles.barDot}></span>
          </div>
        </div>
      ),
    },
    {
      title: "0",
      dataIndex: "col1",
      key: "col1",
      align: "center" as const,
    },
    {
      title: "13",
      dataIndex: "col2",
      key: "col2",
      align: "center" as const,
    },
    {
      title: "",
      dataIndex: "empty1",
      key: "empty1",
    },
    {
      title: "124",
      dataIndex: "col3",
      key: "col3",
      align: "center" as const,
    },
    {
      title: "0",
      dataIndex: "col4",
      key: "col4",
      align: "center" as const,
    },
    {
      title: "",
      dataIndex: "empty2",
      key: "empty2",
    },
    {
      title: "0",
      dataIndex: "col5",
      key: "col5",
      align: "center" as const,
    },
    {
      title: "42",
      dataIndex: "col6",
      key: "col6",
      align: "center" as const,
    },
  ];

  const data = [
    {
      key: "1",
      indicator: "blue",
      bars: "bars",
      col1: "",
      col2: "",
      empty1: "",
      col3: "",
      col4: "",
      empty2: "",
      col5: "",
      col6: "",
    },
    {
      key: "2",
      indicator: "green",
      bars: "bars",
      col1: "",
      col2: "",
      empty1: "",
      col3: "",
      col4: "",
      empty2: "",
      col5: "",
      col6: "",
    },
  ];

  return (
    <div className={styles.receiveDomainsSection}>
      <div className={styles.sectionGrid}>
        <div className={styles.leftContent}>
          <h2>Receive domains to target</h2>
          <p>
            You'll receive a list of domains to target in your link-building
            campaigns.
          </p>
        </div>

        <div className={styles.rightContent}>
          <Card className={styles.domainsCard}>
            <div className={styles.domainsContent}>
              <div className={styles.tableContainer}>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  size="small"
                  showHeader={true}
                  className={styles.domainsTable}
                />
              </div>

              <div className={styles.illustrationOverlay}>
                <div className={styles.overlayShape}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReceiveDomainsSection;
