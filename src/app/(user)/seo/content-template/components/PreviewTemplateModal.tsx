"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  message,
  Spin,
  Typography,
  Divider,
} from "antd";
import { EyeOutlined, CopyOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { previewTemplate } from "@/stores/slices/content-template.slice";
import { ContentTemplate } from "@/types/content-template.type";
import styles from "./ContentTemplateManager.module.scss";

const { TextArea } = Input;
const { Text, Title } = Typography;

interface PreviewTemplateModalProps {
  visible: boolean;
  onCancel: () => void;
  projectId: string;
  template: ContentTemplate | null;
}

const PreviewTemplateModal: React.FC<PreviewTemplateModalProps> = ({
  visible,
  onCancel,
  projectId,
  template,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.contentTemplate);
  const [form] = Form.useForm();
  const [preview, setPreview] = useState<string>("");
  const [variables, setVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    if (visible && template) {
      // Initialize form with empty values for all variables
      const initialValues: Record<string, string> = {};
      template.variables.forEach((variable) => {
        initialValues[variable.name] = variable.defaultValue || "";
      });
      setVariables(initialValues);
      form.setFieldsValue(initialValues);
      generateLocalPreview(template.template, initialValues);
    }
  }, [visible, template, form]);

  const generateLocalPreview = (
    templateContent: string,
    vars: Record<string, string>
  ) => {
    let previewContent = templateContent;

    // Replace variables with values
    Object.entries(vars).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, "g");
      previewContent = previewContent.replace(regex, value || `{${key}}`);
    });

    setPreview(previewContent);
  };

  const handleVariableChange = (variableName: string, value: string) => {
    const newVariables = { ...variables, [variableName]: value };
    setVariables(newVariables);

    if (template) {
      generateLocalPreview(template.template, newVariables);
    }
  };

  const handleServerPreview = async () => {
    if (!template) return;

    try {
      const result = await dispatch(
        previewTemplate({
          projectId,
          templateId: template.id,
          variables,
        })
      ).unwrap();
      setPreview(result.preview);
      message.success("Preview generated successfully");
    } catch (error: any) {
      message.error(error || "Failed to generate preview");
    }
  };

  const handleCopyPreview = () => {
    navigator.clipboard.writeText(preview);
    message.success("Preview copied to clipboard");
  };

  if (!template) return null;

  return (
    <Modal
      title={`Preview: ${template.name}`}
      open={visible}
      onCancel={onCancel}
      width={1000}
      footer={[
        <Button key="copy" icon={<CopyOutlined />} onClick={handleCopyPreview}>
          Copy Preview
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Close
        </Button>,
      ]}
      className={styles.templateModal}
    >
      <Row gutter={24}>
        {/* Variables Input */}
        <Col span={10}>
          <Card title="Template Variables" size="small">
            <Form form={form} layout="vertical" size="small">
              {template.variables.map((variable) => (
                <Form.Item
                  key={variable.name}
                  name={variable.name}
                  label={
                    <div>
                      <Text strong>{variable.name}</Text>
                      {variable.required && <Text type="danger"> *</Text>}
                      <br />
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        {variable.description || `${variable.type} field`}
                      </Text>
                    </div>
                  }
                  rules={
                    variable.required
                      ? [
                          {
                            required: true,
                            message: `${variable.name} is required`,
                          },
                        ]
                      : []
                  }
                >
                  {variable.type === "text" &&
                  variable.name.toLowerCase().includes("content") ? (
                    <TextArea
                      rows={3}
                      placeholder={`Enter ${variable.name}...`}
                      onChange={(e) =>
                        handleVariableChange(variable.name, e.target.value)
                      }
                    />
                  ) : (
                    <Input
                      placeholder={`Enter ${variable.name}...`}
                      onChange={(e) =>
                        handleVariableChange(variable.name, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              ))}

              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={handleServerPreview}
                loading={loading}
                style={{ width: "100%" }}
              >
                Generate AI Preview
              </Button>
            </Form>
          </Card>

          {/* Template Info */}
          <Card
            title="Template Information"
            size="small"
            style={{ marginTop: 16 }}
          >
            <div>
              <Text strong>Type:</Text>{" "}
              {template.type.replace("-", " ").toUpperCase()}
            </div>
            <div style={{ marginTop: 8 }}>
              <Text strong>Word Count:</Text> {template.wordCountRange.min} -{" "}
              {template.wordCountRange.max} words
            </div>
            <div style={{ marginTop: 8 }}>
              <Text strong>Variables:</Text> {template.variables.length}
            </div>
            <div style={{ marginTop: 8 }}>
              <Text strong>SEO Guidelines:</Text>{" "}
              {template.seoGuidelines.length}
            </div>
          </Card>
        </Col>

        {/* Preview */}
        <Col span={14}>
          <Card
            title="Live Preview"
            size="small"
            extra={
              <Button
                size="small"
                icon={<CopyOutlined />}
                onClick={handleCopyPreview}
              >
                Copy
              </Button>
            }
          >
            <Spin spinning={loading}>
              <div className={styles.previewSection}>
                <pre>
                  {preview || "Enter variable values to see preview..."}
                </pre>
              </div>
            </Spin>
          </Card>

          {/* SEO Guidelines */}
          <Card title="SEO Guidelines" size="small" style={{ marginTop: 16 }}>
            <div className={styles.seoGuidelinesList}>
              {template.seoGuidelines.map((guideline, index) => (
                <div key={index} className={styles.guideline}>
                  <Text type="secondary">• {guideline}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default PreviewTemplateModal;
