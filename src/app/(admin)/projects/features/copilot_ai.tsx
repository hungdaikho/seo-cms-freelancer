"use client";
import React from "react";
import styles from "./copilot_ai.module.scss";
import { Button, Select, Space, Typography } from "antd";
import { FaCheck, FaCopy } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { IoCaretDown } from "react-icons/io5";
import { ArrowRight } from "lucide-react";
import { BiLike, BiDislike } from "react-icons/bi";
import { SwapOutlined } from "@ant-design/icons";

import { useCopilotAI } from "@/stores/hooks/useCopilotAI";
import { useProject } from "@/stores/hooks/useProject";

type Props = {};

const CopilotAI = (props: Props) => {
  const { currentProject, projects, setCurrentProject } = useProject();
  const [showContent, setShowContent] = React.useState(true);
  const {
    competitorRankings,
    technicalAudit,
    aiRecommendations,
    loading,
    error,
    getCompetitorRankings,
    getTechnicalAudit,
    getAIRecommendations,
  } = useCopilotAI();

  const handleProjectChange = (projectId: string) => {
    const selectedProject = projects.find((p) => p.id === projectId);
    if (selectedProject) {
      setCurrentProject(selectedProject);
    }
  };

  React.useEffect(() => {
    // Fetch AI recommendations using AI module APIs với projectId từ Redux
    if (currentProject?.id) {
      getCompetitorRankings(currentProject.id);
      getTechnicalAudit(currentProject.id);
      getAIRecommendations(currentProject.id);
    }
  }, [
    currentProject?.id,
    getCompetitorRankings,
    getTechnicalAudit,
    getAIRecommendations,
  ]);

  const renderProjectSelector = () => (
    <div
      style={{
        marginBottom: 16,
        padding: "0 16px",
        background: "#fafafa",
        borderRadius: 8,
      }}
    >
      <Space
        align="center"
        style={{
          width: "100%",
          justifyContent: "space-between",
          padding: "12px 0",
        }}
      >
        <Typography.Text strong>
          <SwapOutlined style={{ marginRight: 8 }} />
          Current Project:
        </Typography.Text>
        <Select
          value={currentProject?.id}
          onChange={handleProjectChange}
          placeholder="Select a project"
          style={{ minWidth: 200 }}
          size="small"
        >
          {projects.map((project) => (
            <Select.Option key={project.id} value={project.id}>
              {project.name} ({project.domain})
            </Select.Option>
          ))}
        </Select>
      </Space>
    </div>
  );

  return (
    <div className={styles.copilotAI}>
      {renderProjectSelector()}
      <div className={styles.contentAI}>
        <div className={styles.title}>
          <b>CopilotAI</b>{" "}
          <span style={{ color: "#6c6e79" }}>
            — your personal recommendations
          </span>
          <div className={styles.button}>
            <Button icon={<FaCopy />} size="small">
              Copy All
            </Button>
            <Button icon={<IoShareSocial />} size="small">
              Share Copilot
            </Button>
            <Button
              onClick={() => setShowContent(!showContent)}
              icon={<IoCaretDown />}
              size="small"
            ></Button>
          </div>
        </div>
        <div
          className={`${styles.description} ${showContent ? "" : styles.hide}`}
        >
          {/* Competitor Rankings */}
          <div className={styles.content}>
            <div className={styles.contentLeft}>
              <div className={styles.title}>Competitor Rankings</div>
              <div className={styles.domain}>vanhungtran.com</div>
            </div>
            <div className={styles.contentCenter}>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : competitorRankings ? (
                <pre
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {JSON.stringify(competitorRankings, null, 2)}
                </pre>
              ) : (
                <p>No competitor data.</p>
              )}
            </div>
            <div className={styles.contentRight}>
              <Button>
                <FaCheck /> Position Tracking <ArrowRight />
              </Button>
            </div>
            <div className={styles.contentBtn}>
              <Button icon={<BiLike />} size="small" />
              <Button icon={<BiDislike />} size="small" />
              <Button icon={<FaCopy />} size="small" />
            </div>
          </div>
          {/* Technical Audit */}
          <div className={styles.content}>
            <div className={styles.contentLeft}>
              <div className={styles.title}>Technical Audit</div>
              <div className={styles.domain}>vanhungtran.com</div>
            </div>
            <div className={styles.contentCenter}>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : technicalAudit ? (
                <pre
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {JSON.stringify(technicalAudit, null, 2)}
                </pre>
              ) : (
                <p>No audit data.</p>
              )}
            </div>
            <div className={styles.contentRight}>
              <Button>
                Site Audit <ArrowRight />
              </Button>
            </div>
            <div className={styles.contentBtn}>
              <Button icon={<BiLike />} size="small" />
              <Button icon={<BiDislike />} size="small" />
              <Button icon={<FaCopy />} size="small" />
            </div>
          </div>
          {/* AI Recommendations */}
          <div className={styles.content}>
            <div className={styles.contentLeft}>
              <div className={styles.title}>AI Recommendations</div>
              <div className={styles.domain}>vanhungtran.com</div>
            </div>
            <div className={styles.contentCenter}>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : aiRecommendations ? (
                <pre
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {JSON.stringify(aiRecommendations, null, 2)}
                </pre>
              ) : (
                <p>No AI recommendations available.</p>
              )}
            </div>
            <div className={styles.contentRight}>
              <Button>
                Content Optimization <ArrowRight />
              </Button>
            </div>
            <div className={styles.contentBtn}>
              <Button icon={<BiLike />} size="small" />
              <Button icon={<BiDislike />} size="small" />
              <Button icon={<FaCopy />} size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotAI;
