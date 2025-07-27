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

const { Title, Text } = Typography;
const { TabPane } = Tabs;
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
        <Tabs defaultActiveKey="keywords" className={styles.seoTabs}>
          <TabPane
            tab={
              <span>
                <SearchOutlined />
                Keyword Management
              </span>
            }
            key="keywords"
          >
            <KeywordManager projectId={selectedProject} />
          </TabPane>

          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Position Tracking
              </span>
            }
            key="tracking"
          >
            <PositionTrackingManager />
          </TabPane>

          <TabPane
            tab={
              <span>
                <TrophyOutlined />
                Organic Research
              </span>
            }
            key="organic-research"
          >
            <OrganicResearchPage />
          </TabPane>

          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                Site Audit
              </span>
            }
            key="audit"
          >
            <SiteAuditManager />
          </TabPane>

          <TabPane
            tab={
              <span>
                <SearchOutlined />
                Keyword Magic Tool
              </span>
            }
            key="keyword-magic"
          >
            <KeywordMagicTool />
          </TabPane>

          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Domain Overview
              </span>
            }
            key="domain-overview"
          >
            <DomainOverviewPage />
          </TabPane>

          <TabPane
            tab={
              <span>
                <LinkOutlined />
                Backlink Analytics
              </span>
            }
            key="backlink-analytics"
          >
            <BacklinkAnalyticsManager />
          </TabPane>

          <TabPane
            tab={
              <span>
                <SearchOutlined />
                Keyword Gap
              </span>
            }
            key="keyword-gap"
          >
            <KeywordGapAnalyzer />
          </TabPane>

          <TabPane
            tab={
              <span>
                <BookOutlined />
                Topic Research
              </span>
            }
            key="topic-research"
          >
            <TopicResearchPage />
          </TabPane>

          <TabPane
            tab={
              <span>
                <EditOutlined />
                SEO Content Template
              </span>
            }
            key="seo-content-template"
          >
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
          </TabPane>

          <TabPane
            tab={
              <span>
                <BulbOutlined />
                On-Page SEO Checker
              </span>
            }
            key="on-page-seo-checker"
          >
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
          </TabPane>
        </Tabs>
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
