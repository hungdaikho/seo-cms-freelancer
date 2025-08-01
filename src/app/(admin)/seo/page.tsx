"use client";

import React, { useEffect, useState } from "react";
import { Card, Tabs, Select, Typography, Button } from "antd";
import {
  BarChartOutlined,
  SearchOutlined,
  TrophyOutlined,
  FileTextOutlined,
  PlusOutlined,
  LinkOutlined,
  BookOutlined,
  EditOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import { Project } from "@/types/api.type";
import KeywordManager from "./features/keyword_manager";
// Import các component con
import PositionTrackingManager from "./position-tracking/features/position_tracking_manager_fixed";
import SiteAuditManager from "./site-audit/features/site_audit_manager";
import KeywordMagicTool from "./keyword-magic-tool/features/keyword_magic_tool";
import BacklinkAnalyticsManager from "./backlink-analytics/features/backlink_analytics_manager";
import KeywordGapAnalyzer from "./keyword-gap/features/keyword_gap_analyzer";
import OrganicResearchPage from "./organic-research/page";
import DomainOverviewPage from "./domain-overview/page";
import TopicResearchPage from "./topic-research/page";
import styles from "./page.module.scss";
import PositionTracking from "./features/position-tracking";
import OrganicResearchWidget from "./features/organic-research-widget";

const { Title, Text } = Typography;
const { Option } = Select;

const SeoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects, loading: projectsLoading } = useAppSelector(
    (state) => state.project
  );
  const [selectedProject, setSelectedProject] = useState<string>("");

  useEffect(() => {
    // Load projects on component mount
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  return (
    <div className={styles.seoPage}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title level={2}>SEO Dashboard</Title>
          <Text type="secondary">
            Manage your SEO campaigns and track keyword performance
          </Text>
        </div>
        <div className={styles.projectSelector}>
          <Select
            placeholder="Select a project"
            style={{ width: 300 }}
            value={selectedProject}
            onChange={setSelectedProject}
            loading={projectsLoading}
            disabled={projects.length === 0}
          >
            {projects.map((project: Project) => (
              <Option key={project.id} value={project.id}>
                {project.name} ({project.domain})
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {selectedProject ? (
        <Tabs
          defaultActiveKey="keywords"
          className={styles.seoTabs}
          items={[
            {
              key: "keywords",
              label: (
                <span>
                  <SearchOutlined />
                  Keyword Management
                </span>
              ),
              children: <KeywordManager projectId={selectedProject} />,
            },
            {
              key: "tracking",
              label: (
                <span>
                  <BarChartOutlined />
                  Position Tracking
                </span>
              ),
              children: (
                <PositionTracking selectedProjectId={selectedProject} />
              ),
            },
            {
              key: "organic-research",
              label: (
                <span>
                  <TrophyOutlined />
                  Organic Research
                </span>
              ),
              children: (
                <OrganicResearchWidget selectedProjectId={selectedProject} />
              ),
            },
            {
              key: "audit",
              label: (
                <span>
                  <FileTextOutlined />
                  Site Audit
                </span>
              ),
              children: <SiteAuditManager />,
            },
            {
              key: "keyword-magic",
              label: (
                <span>
                  <SearchOutlined />
                  Keyword Magic Tool
                </span>
              ),
              children: (
                <KeywordMagicTool selectedProjectId={selectedProject} />
              ),
            },
            {
              key: "domain-overview",
              label: (
                <span>
                  <BarChartOutlined />
                  Domain Overview
                </span>
              ),
              children: <DomainOverviewPage />,
            },
            {
              key: "backlink-analytics",
              label: (
                <span>
                  <LinkOutlined />
                  Backlink Analytics
                </span>
              ),
              children: <BacklinkAnalyticsManager />,
            },
            {
              key: "keyword-gap",
              label: (
                <span>
                  <SearchOutlined />
                  Keyword Gap
                </span>
              ),
              children: <KeywordGapAnalyzer />,
            },
            {
              key: "topic-research",
              label: (
                <span>
                  <BookOutlined />
                  Topic Research
                </span>
              ),
              children: <TopicResearchPage />,
            },
            {
              key: "seo-content-template",
              label: (
                <span>
                  <EditOutlined />
                  SEO Content Template
                </span>
              ),
              children: (
                <div className={styles.comingSoon}>
                  <Title level={3}>SEO Content Template</Title>
                  <Text type="secondary">
                    Create SEO-optimized content templates
                  </Text>
                  <div style={{ marginTop: 16 }}>
                    <Button type="primary" icon={<PlusOutlined />}>
                      Create Template
                    </Button>
                  </div>
                </div>
              ),
            },
            {
              key: "on-page-seo-checker",
              label: (
                <span>
                  <BulbOutlined />
                  On-Page SEO Checker
                </span>
              ),
              children: (
                <div className={styles.comingSoon}>
                  <Title level={3}>On-Page SEO Checker</Title>
                  <Text type="secondary">
                    Analyze and optimize your pages for better SEO
                  </Text>
                  <div style={{ marginTop: 16 }}>
                    <Button type="primary" icon={<PlusOutlined />}>
                      Check Page
                    </Button>
                  </div>
                </div>
              ),
            },
          ]}
        />
      ) : (
        <Card className={styles.noProject}>
          <div className={styles.emptyState}>
            <Title level={3}>No Project Selected</Title>
            <Text type="secondary">
              Please select a project to manage SEO campaigns
            </Text>
            <div style={{ marginTop: 16 }}>
              <Button type="primary" href="/projects">
                Go to Projects
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SeoPage;
