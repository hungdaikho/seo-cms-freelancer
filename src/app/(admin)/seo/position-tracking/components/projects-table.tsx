"use client";

import React from "react";
import { Table, Tag, Button } from "antd";
import { FiFlag } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import styles from "./projects-table.module.scss";

interface ProjectData {
  key: string;
  domain: string;
  url: string;
  device: string;
  location: string;
  visibility: number;
  diff: number;
  improved: number;
  declined: number;
  total: number;
  updated: string;
}

interface ProjectsTableProps {
  onUpgrade: () => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ onUpgrade }) => {
  const data: ProjectData[] = [
    {
      key: "1",
      domain: "vanhungtran.com",
      url: "vanhungtran.com",
      device: "Vietnam (Google)",
      location: "Vietnamese",
      visibility: 0,
      diff: 0,
      improved: 0,
      declined: 0,
      total: 1,
      updated: "5h ago",
    },
  ];

  const columns = [
    {
      title: "Project",
      dataIndex: "domain",
      key: "project",
      render: (text: string, record: ProjectData) => (
        <div className={styles.projectCell}>
          <div className={styles.domainName}>{text}</div>
          <div className={styles.domainUrl}>{record.url}</div>
        </div>
      ),
    },
    {
      title: "Device & Location",
      key: "deviceLocation",
      render: (record: ProjectData) => (
        <div className={styles.deviceLocation}>
          <div className={styles.deviceInfo}>
            <FiFlag className={styles.flagIcon} />
            <span>
              {record.device}, {record.location}
            </span>
          </div>
          <div className={styles.locationDetail}>{record.url}</div>
        </div>
      ),
    },
    {
      title: "Visibility",
      dataIndex: "visibility",
      key: "visibility",
      align: "center" as const,
      render: (value: number) => (
        <span className={styles.metricValue}>{value}</span>
      ),
    },
    {
      title: "Diff",
      dataIndex: "diff",
      key: "diff",
      align: "center" as const,
      render: (value: number) => (
        <span className={styles.metricValue}>{value}</span>
      ),
    },
    {
      title: "Improved keywords",
      dataIndex: "improved",
      key: "improved",
      align: "center" as const,
      render: (value: number) => (
        <span className={styles.metricValue}>{value}</span>
      ),
    },
    {
      title: "Declined keywords",
      dataIndex: "declined",
      key: "declined",
      align: "center" as const,
      render: (value: number) => (
        <span className={styles.metricValue}>{value}</span>
      ),
    },
    {
      title: "All keywords",
      dataIndex: "total",
      key: "total",
      align: "center" as const,
      render: (value: number) => (
        <span className={styles.metricValue}>{value}</span>
      ),
    },
    {
      title: "Updated",
      dataIndex: "updated",
      key: "updated",
      align: "center" as const,
      render: (value: string) => (
        <span className={styles.updatedValue}>{value}</span>
      ),
    },
  ];

  return (
    <div className={styles.projectsTable}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className={styles.table}
      />

      <div className={styles.pagination}>
        <span>Page: 1 of 1</span>
      </div>

      <div className={styles.upgradeNotice}>
        <div className={styles.noticeContent}>
          <p>
            Your account is limited to one project. To get more projects,
            upgrade your subscription plan.
          </p>
          <Button
            type="primary"
            className={styles.upgradeBtn}
            onClick={onUpgrade}
          >
            See plans and prices
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTable;
