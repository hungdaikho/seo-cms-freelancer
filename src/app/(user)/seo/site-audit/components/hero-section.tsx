"use client";

import React, { useState } from "react";
import { Input, Button, Card, message, Modal, Form, Select } from "antd";
import { useProject } from "@/stores/hooks/useProject";
import { useAudit } from "@/stores/hooks/useAudit";
import styles from "./hero-section.module.scss";

const { Option } = Select;

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [domain, setDomain] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { projects, fetchProjects, createProject } = useProject();
  const { startNewAudit } = useAudit();

  const handleStartAudit = async () => {
    if (!domain.trim()) {
      message.error("Please enter a domain");
      return;
    }

    // Check if we have projects, if not fetch them
    if (projects.length === 0) {
      await fetchProjects();
    }

    // Show modal to select or create project
    setIsModalVisible(true);
  };

  const handleAuditSubmit = async (values: any) => {
    try {
      let projectId = values.projectId;

      // If creating new project
      if (values.projectId === "new") {
        const newProjectResult = await createProject({
          name: values.projectName || `${domain} Project`,
          domain: domain,
          settings: {
            location: values.location || "United States",
            language: values.language || "en",
          },
        });
        // The result from createAsyncThunk will be the fulfilled payload
        projectId = (newProjectResult.payload as any)?.id;
      }

      // Start the audit
      await startNewAudit(projectId, {
        settings: {
          include_mobile: true,
          check_accessibility: true,
          analyze_performance: true,
        },
      });

      message.success("SEO Audit started successfully!");
      setIsModalVisible(false);
      form.resetFields();
      setDomain("");
    } catch (error) {
      message.error("Failed to start audit. Please try again.");
    }
  };

  return (
    <div className={styles.heroSection}>
      <Card className={styles.auditCard}>
        <div className={styles.cardContent}>
          <div className={styles.badge}>Free SEO Audit Tool</div>

          <h1 className={styles.title}>
            Run a Powerful Website Audit and Identify Critical SEO Issues with
            Site Audit
          </h1>

          <p className={styles.subtitle}>
            Find and fix critical SEO issues on your site, identify technical
            problems, improve site performance, and boost your search rankings.
          </p>

          <div className={styles.searchContainer}>
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              className={styles.searchInput}
              size="large"
              onPressEnter={handleStartAudit}
            />
            <Button
              type="primary"
              size="large"
              className={styles.searchButton}
              onClick={handleStartAudit}
            >
              Start SEO Audit
            </Button>
          </div>
        </div>
      </Card>

      {/* Project Selection Modal */}
      <Modal
        title="Select or Create Project"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAuditSubmit}
          initialValues={{
            projectId: projects.length > 0 ? projects[0].id : "new",
            location: "United States",
            language: "en",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <p>
              <strong>Domain:</strong> {domain}
            </p>
          </div>

          <Form.Item
            name="projectId"
            label="Select Project"
            rules={[{ required: true, message: "Please select a project" }]}
          >
            <Select placeholder="Select an existing project or create new">
              {projects.map((project) => (
                <Option key={project.id} value={project.id}>
                  {project.name} ({project.domain})
                </Option>
              ))}
              <Option value="new">Create New Project</Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.projectId !== currentValues.projectId
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("projectId") === "new" ? (
                <>
                  <Form.Item
                    name="projectName"
                    label="Project Name"
                    rules={[
                      { required: true, message: "Please enter project name" },
                    ]}
                  >
                    <Input placeholder={`${domain} Project`} />
                  </Form.Item>

                  <Form.Item name="location" label="Target Location">
                    <Select>
                      <Option value="United States">United States</Option>
                      <Option value="United Kingdom">United Kingdom</Option>
                      <Option value="Canada">Canada</Option>
                      <Option value="Australia">Australia</Option>
                      <Option value="Germany">Germany</Option>
                      <Option value="France">France</Option>
                      <Option value="Vietnam">Vietnam</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="language" label="Target Language">
                    <Select>
                      <Option value="en">English</Option>
                      <Option value="es">Spanish</Option>
                      <Option value="fr">French</Option>
                      <Option value="de">German</Option>
                      <Option value="vi">Vietnamese</Option>
                    </Select>
                  </Form.Item>
                </>
              ) : null
            }
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Start Audit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HeroSection;
