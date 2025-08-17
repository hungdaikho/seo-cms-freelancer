"use client";

import React, { memo } from "react";
import { Table, Spin, Space, Button, Tooltip, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  RiseOutlined,
  FallOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { getSortedCountries } from "@/utils/countries";
import { getSortedLanguages } from "@/utils/languages";

interface ProjectsTableProps {
  projects: any[];
  loading: boolean;
  onViewProject: (project: any) => void;
  onEditProject: (project: any) => void;
  onDeleteProject: (projectId: string, projectName: string) => void;
  deleteLoading: boolean;
}

const ProjectsTable = memo(
  ({
    projects,
    loading,
    onViewProject,
    onEditProject,
    onDeleteProject,
    deleteLoading,
  }: ProjectsTableProps) => {
    // Get status tag based on setup progress
    const getStatusTag = (project: any) => {
      const hasKeywords = project._count?.keywords > 0;
      const hasAudits = project._count?.audits > 0;
      const hasCompetitors = project._count?.competitors > 0;

      if (hasKeywords && hasAudits && hasCompetitors) {
        return <Tag color="green">Complete</Tag>;
      } else if (hasKeywords || hasAudits) {
        return <Tag color="orange">In Progress</Tag>;
      } else {
        return <Tag color="red">Setup Required</Tag>;
      }
    };

    const columns = [
      {
        title: "Project",
        dataIndex: "name",
        key: "name",
        width: 200,
        render: (text: string, record: any) => {
          const countryInfo = getSortedCountries().find(
            (c) => c.code === record.settings?.country
          );
          const languageInfo = getSortedLanguages().find(
            (l) => l.code === record.settings?.language
          );

          return (
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  color: "#1890ff",
                  marginBottom: 4,
                }}
              >
                {text}
              </div>
              <div style={{ fontSize: "12px", color: "#999", marginBottom: 4 }}>
                <a
                  href={`https://${record.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#999", textDecoration: "none" }}
                  onMouseOver={(e) =>
                    ((e.target as HTMLElement).style.color = "#1890ff")
                  }
                  onMouseOut={(e) =>
                    ((e.target as HTMLElement).style.color = "#999")
                  }
                >
                  {record.domain}
                </a>
              </div>
              <div style={{ marginBottom: 4 }}>{getStatusTag(record)}</div>
              <div style={{ fontSize: "11px", color: "#666" }}>
                {countryInfo && (
                  <Space size={4}>
                    <span>{countryInfo.flag}</span>
                    <span>{countryInfo.name}</span>
                    {languageInfo && <span>• {languageInfo.nativeName}</span>}
                  </Space>
                )}
              </div>
            </div>
          );
        },
      },
      {
        title: "Keywords",
        dataIndex: ["_count", "keywords"],
        key: "keywords",
        width: 100,
        render: (count: number, record: any) => (
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "18px", fontWeight: "bold", color: "#1890ff" }}
            >
              {count || 0}
            </div>
            {record.stats && (
              <div style={{ fontSize: "12px", color: "#999" }}>
                Avg: {record.stats.averageRanking?.toFixed(1) || "N/A"}
              </div>
            )}
          </div>
        ),
      },
      {
        title: "Ranking Distribution",
        key: "rankingDistribution",
        width: 200,
        render: (text: string, record: any) => {
          if (!record.stats?.rankingDistribution) {
            return (
              <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
                Set Up
              </Button>
            );
          }

          const { rankingDistribution } = record.stats;
          return (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Tooltip title="Top 3">
                <Tag color="green">1-3: {rankingDistribution?.top3}</Tag>
              </Tooltip>
              <Tooltip title="Top 10">
                <Tag color="blue">4-10: {rankingDistribution?.top10}</Tag>
              </Tooltip>
              <Tooltip title="Top 50">
                <Tag color="orange">11-50: {rankingDistribution?.top50}</Tag>
              </Tooltip>
              <Tooltip title="Beyond 50">
                <Tag color="red">50+: {rankingDistribution?.beyond50}</Tag>
              </Tooltip>
            </div>
          );
        },
      },
      {
        title: "Recent Changes",
        key: "recentChanges",
        width: 150,
        render: (text: string, record: any) => {
          if (!record.stats) {
            return (
              <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
                Set Up
              </Button>
            );
          }

          const { improvedKeywords, declinedKeywords, stableKeywords } =
            record.stats;
          return (
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <RiseOutlined style={{ color: "#52c41a" }} />
                <span style={{ color: "#52c41a" }}>
                  {improvedKeywords || 0}
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <FallOutlined style={{ color: "#f5222d" }} />
                <span style={{ color: "#f5222d" }}>
                  {declinedKeywords || 0}
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <MinusOutlined style={{ color: "#faad14" }} />
                <span style={{ color: "#faad14" }}>{stableKeywords || 0}</span>
              </div>
            </div>
          );
        },
      },
      {
        title: "Audits",
        dataIndex: ["_count", "audits"],
        key: "audits",
        width: 100,
        render: (count: number, record: any) => (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              {count || 0}
            </div>
            {record.stats?.auditSummary && (
              <div
                style={{
                  fontSize: "12px",
                  color:
                    record.stats.auditSummary.averageScore > 80
                      ? "#52c41a"
                      : "#f5222d",
                }}
              >
                Score: {record.stats.auditSummary.averageScore}
              </div>
            )}
          </div>
        ),
      },
      {
        title: "Competitors",
        dataIndex: ["_count", "competitors"],
        key: "competitors",
        width: 100,
        render: (count: number) => (
          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {count || 0}
          </div>
        ),
      },
      {
        title: "Backlinks",
        dataIndex: ["_count", "backlinks"],
        key: "backlinks",
        width: 100,
        render: (count: number) => (
          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {count || 0}
          </div>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        width: 120,
        render: (text: string, record: any) => (
          <Space size="small">
            <Tooltip title="View Details">
              <Button
                type="text"
                icon={<EyeOutlined />}
                size="small"
                onClick={() => onViewProject(record)}
              />
            </Tooltip>
            <Tooltip title="Edit Project">
              <Button
                type="text"
                icon={<EditOutlined />}
                size="small"
                onClick={() => onEditProject(record)}
              />
            </Tooltip>
            <Tooltip title="Delete Project">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => onDeleteProject(record.id, record.name)}
                loading={deleteLoading}
              />
            </Tooltip>
          </Space>
        ),
      },
    ];

    return (
      <Spin spinning={loading}>
        <Table
          dataSource={projects}
          columns={columns}
          pagination={{
            current: 1,
            pageSize: 10,
            total: projects.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} projects`,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          size="middle"
          scroll={{ x: 1500 }}
          rowKey="id"
        />
      </Spin>
    );
  }
);

ProjectsTable.displayName = "ProjectsTable";

export default ProjectsTable;
