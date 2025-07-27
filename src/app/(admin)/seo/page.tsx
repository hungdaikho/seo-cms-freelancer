"use client";

import React, { useEffect, useState } from "react";
import { Card, Tabs, Select, Typography, Button } from "antd";
import {
  BarChartOutlined,
  SearchOutlined,
  TrophyOutlined,
  FileTextOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import { Project } from "@/types/api.type";
import KeywordManager from "./features/keyword_manager";
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
            <div className={styles.comingSoon}>
              <Title level={3}>Position Tracking</Title>
              <Text type="secondary">
                Track your keyword rankings over time
              </Text>
              <div style={{ marginTop: 16 }}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Set up Tracking
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane
            tab={
              <span>
                <TrophyOutlined />
                Competitor Analysis
              </span>
            }
            key="competitors"
          >
            <div className={styles.comingSoon}>
              <Title level={3}>Competitor Analysis</Title>
              <Text type="secondary">
                Analyze your competitors' SEO strategies
              </Text>
              <div style={{ marginTop: 16 }}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Competitors
                </Button>
              </div>
            </div>
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
            <div className={styles.comingSoon}>
              <Title level={3}>Site Audit</Title>
              <Text type="secondary">
                Comprehensive SEO audit of your website
              </Text>
              <div style={{ marginTop: 16 }}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Start Audit
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
