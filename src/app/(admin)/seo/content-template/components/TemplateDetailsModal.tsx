"use client";

import React from "react";
import {
  Modal,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Divider,
  Space,
  Button,
} from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  CopyOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ContentTemplate } from "@/types/content-template.type";
import styles from "./ContentTemplateManager.module.scss";

const { Title, Text, Paragraph } = Typography;

interface TemplateDetailsModalProps {
  visible: boolean;
  onCancel: () => void;
  template: ContentTemplate | null;
}

const TemplateDetailsModal: React.FC<TemplateDetailsModalProps> = ({
  visible,
  onCancel,
  template,
}) => {
  if (!template) return null;

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case "blog-post":
        return "blue";
      case "landing-page":
        return "green";
      case "email":
        return "orange";
      case "social-media":
        return "purple";
      default:
        return "default";
    }
  };

  return (
    <Modal
      title={
        <div>
          <Title level={4} style={{ margin: 0 }}>
            {template.name}
          </Title>
          <Text type="secondary">Template Details</Text>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="close" onClick={onCancel}>
          Close
        </Button>,
      ]}
      className={styles.templateDetails}
    >
      <Row gutter={16}>
        <Col span={24}>
          {/* Basic Information */}
          <Card
            title="Basic Information"
            size="small"
            className={styles.detailCard}
          >
            <Row gutter={16}>
              <Col span={8}>
                <div>
                  <Text strong>Template Type</Text>
                  <br />
                  <Tag color={getTemplateTypeColor(template.type)}>
                    {template.type.replace("-", " ").toUpperCase()}
                  </Tag>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <Text strong>Word Count Range</Text>
                  <br />
                  <Text>
                    {template.wordCountRange.min} -{" "}
                    {template.wordCountRange.max} words
                  </Text>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <Text strong>Variables Count</Text>
                  <br />
                  <Text>{template.variables.length} variables</Text>
                </div>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col span={12}>
                <div>
                  <Text strong>Created At</Text>
                  <br />
                  <Space>
                    <ClockCircleOutlined />
                    <Text type="secondary">
                      {new Date(template.createdAt).toLocaleString()}
                    </Text>
                  </Space>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>Last Updated</Text>
                  <br />
                  <Space>
                    <ClockCircleOutlined />
                    <Text type="secondary">
                      {new Date(template.updatedAt).toLocaleString()}
                    </Text>
                  </Space>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Template Variables */}
          <Card
            title="Template Variables"
            size="small"
            className={styles.detailCard}
          >
            {template.variables.length > 0 ? (
              <div className={styles.variableList}>
                {template.variables.map((variable, index) => (
                  <div key={index} className={styles.variableItem}>
                    <div className={styles.variableInfo}>
                      <div className={styles.variableName}>
                        {variable.name}
                        {variable.required && <Text type="danger"> *</Text>}
                      </div>
                      {variable.description && (
                        <div className={styles.variableDesc}>
                          {variable.description}
                        </div>
                      )}
                    </div>
                    <div className={styles.variableMeta}>
                      <Tag>{variable.type}</Tag>
                      {variable.required && <Tag color="red">Required</Tag>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text type="secondary">No variables defined</Text>
            )}
          </Card>

          {/* SEO Guidelines */}
          <Card
            title="SEO Guidelines"
            size="small"
            className={styles.detailCard}
          >
            {template.seoGuidelines.length > 0 ? (
              <div className={styles.seoGuidelinesList}>
                {template.seoGuidelines.map((guideline, index) => (
                  <div key={index} className={styles.guideline}>
                    <CheckCircleOutlined className={styles.checkIcon} />
                    <Text>{guideline}</Text>
                  </div>
                ))}
              </div>
            ) : (
              <Text type="secondary">No SEO guidelines defined</Text>
            )}
          </Card>

          {/* Template Content */}
          <Card
            title="Template Content"
            size="small"
            className={styles.detailCard}
          >
            <div className={styles.templateContent}>
              <pre>{template.template}</pre>
            </div>
          </Card>

          {/* Metadata */}
          <Card title="Metadata" size="small" className={styles.detailCard}>
            <Row gutter={16}>
              <Col span={12}>
                <div>
                  <Text strong>Template ID</Text>
                  <br />
                  <Text type="secondary" copyable>
                    {template.id}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>Project ID</Text>
                  <br />
                  <Text type="secondary" copyable>
                    {template.projectId}
                  </Text>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default TemplateDetailsModal;
