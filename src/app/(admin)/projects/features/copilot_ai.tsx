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
              <div className={styles.domain}>
                {currentProject?.domain || "vanhungtran.com"}
              </div>
            </div>
            <div className={styles.contentCenter}>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : competitorRankings ? (
                <div>
                  {competitorRankings.opportunities?.length > 0 ? (
                    <div>
                      <h4>Opportunities:</h4>
                      <ul>
                        {competitorRankings.opportunities.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : null}

                  {competitorRankings.strengths?.length > 0 ? (
                    <div>
                      <h4>Strengths:</h4>
                      <ul>
                        {competitorRankings.strengths.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : null}

                  {competitorRankings.weaknesses?.length > 0 ? (
                    <div>
                      <h4>Weaknesses:</h4>
                      <ul>
                        {competitorRankings.weaknesses.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : null}

                  {!competitorRankings.opportunities?.length &&
                    !competitorRankings.strengths?.length &&
                    !competitorRankings.weaknesses?.length && (
                      <p>No competitor ranking data available at the moment.</p>
                    )}
                </div>
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
              <div className={styles.domain}>
                {currentProject?.domain || "vanhungtran.com"}
              </div>
            </div>
            <div className={styles.contentCenter}>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : technicalAudit ? (
                <div>
                  {technicalAudit.overallScore && (
                    <div style={{ marginBottom: "16px" }}>
                      <h4>
                        Overall Score:{" "}
                        <span
                          style={{
                            color:
                              technicalAudit.overallScore >= 70
                                ? "#52c41a"
                                : technicalAudit.overallScore >= 50
                                ? "#faad14"
                                : "#f5222d",
                          }}
                        >
                          {technicalAudit.overallScore}/100
                        </span>
                      </h4>
                    </div>
                  )}

                  {technicalAudit.issues?.length > 0 ? (
                    <div style={{ marginBottom: "12px" }}>
                      <h4>Issues Found:</h4>
                      <div>
                        {technicalAudit.issues.map(
                          (issue: any, index: number) => (
                            <div
                              key={index}
                              style={{
                                marginBottom: "8px",
                                padding: "8px",
                                backgroundColor: "#fff2f0",
                                borderLeft: "3px solid #f5222d",
                                borderRadius: "4px",
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: "500",
                                  color: "#f5222d",
                                  marginBottom: "4px",
                                }}
                              >
                                {typeof issue === "string"
                                  ? issue
                                  : issue.category ||
                                    issue.issue ||
                                    "Technical Issue"}
                              </div>
                              {issue.severity_level && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "2px",
                                  }}
                                >
                                  Severity:{" "}
                                  <span style={{ fontWeight: "500" }}>
                                    {issue.severity_level}
                                  </span>
                                </div>
                              )}
                              {issue.impact_on_seo && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "2px",
                                  }}
                                >
                                  SEO Impact: {issue.impact_on_seo}
                                </div>
                              )}
                              {issue.recommendations && (
                                <div
                                  style={{ fontSize: "12px", color: "#1890ff" }}
                                >
                                  Recommendation: {issue.recommendations}
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : null}

                  {technicalAudit.recommendations?.length > 0 ? (
                    <div style={{ marginBottom: "12px" }}>
                      <h4>Recommendations:</h4>
                      <ul>
                        {technicalAudit.recommendations.map(
                          (rec: any, index: number) => (
                            <li
                              key={index}
                              style={{ color: "#1890ff", marginBottom: "4px" }}
                            >
                              {typeof rec === "string"
                                ? rec
                                : rec.recommendation ||
                                  rec.description ||
                                  JSON.stringify(rec)}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : null}

                  {technicalAudit.technicalIssues?.length > 0 ? (
                    <div>
                      <h4>Technical Issues:</h4>
                      <ul>
                        {technicalAudit.technicalIssues.map(
                          (issue: any, index: number) => (
                            <li
                              key={index}
                              style={{ color: "#fa8c16", marginBottom: "4px" }}
                            >
                              {typeof issue === "string"
                                ? issue
                                : issue.issue ||
                                  issue.description ||
                                  JSON.stringify(issue)}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : null}

                  {!technicalAudit.issues?.length &&
                    !technicalAudit.recommendations?.length &&
                    !technicalAudit.technicalIssues?.length &&
                    !technicalAudit.overallScore && (
                      <p>No technical audit data available at the moment.</p>
                    )}
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default CopilotAI;
