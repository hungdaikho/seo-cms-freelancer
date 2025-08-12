"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  InputNumber,
  Switch,
  Tag,
  Space,
  message,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { updateTemplate } from "@/stores/slices/content-template.slice";
import {
  ContentTemplate,
  UpdateContentTemplateRequest,
  TemplateVariable,
} from "@/types/content-template.type";
import styles from "./ContentTemplateManager.module.scss";

const { TextArea } = Input;
const { Option } = Select;

interface EditTemplateModalProps {
  visible: boolean;
  onCancel: () => void;
  projectId: string;
  template: ContentTemplate | null;
}

const EditTemplateModal: React.FC<EditTemplateModalProps> = ({
  visible,
  onCancel,
  projectId,
  template,
}) => {
  const dispatch = useAppDispatch();
  const { updating } = useAppSelector((state) => state.contentTemplate);
  const [form] = Form.useForm();
  const [variables, setVariables] = useState<TemplateVariable[]>([]);
  const [seoGuidelines, setSeoGuidelines] = useState<string[]>([]);
  const [newGuideline, setNewGuideline] = useState("");

  useEffect(() => {
    if (visible && template) {
      form.setFieldsValue({
        name: template.name,
        type: template.type,
        template: template.template,
        minWords: template.wordCountRange.min,
        maxWords: template.wordCountRange.max,
      });
      setVariables([...template.variables]);
      setSeoGuidelines([...template.seoGuidelines]);
    }
  }, [visible, template, form]);

  const handleSubmit = async () => {
    if (!template) return;

    try {
      const values = await form.validateFields();

      const templateData: UpdateContentTemplateRequest = {
        id: template.id,
        name: values.name,
        type: values.type,
        template: values.template,
        variables,
        seoGuidelines,
        wordCountRange: {
          min: values.minWords,
          max: values.maxWords,
        },
      };

      await dispatch(
        updateTemplate({
          projectId,
          templateId: template.id,
          data: templateData,
        })
      ).unwrap();
      message.success("Template updated successfully");
      onCancel();
    } catch (error: any) {
      message.error(error || "Failed to update template");
    }
  };

  const addVariable = () => {
    const newVariable: TemplateVariable = {
      name: "",
      type: "text",
      required: true,
      description: "",
    };
    setVariables([...variables, newVariable]);
  };

  const updateVariable = (
    index: number,
    field: keyof TemplateVariable,
    value: any
  ) => {
    const updatedVariables = [...variables];
    updatedVariables[index] = { ...updatedVariables[index], [field]: value };
    setVariables(updatedVariables);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const addSeoGuideline = () => {
    if (newGuideline.trim() && !seoGuidelines.includes(newGuideline.trim())) {
      setSeoGuidelines([...seoGuidelines, newGuideline.trim()]);
      setNewGuideline("");
    }
  };

  const removeSeoGuideline = (index: number) => {
    setSeoGuidelines(seoGuidelines.filter((_, i) => i !== index));
  };

  if (!template) return null;

  return (
    <Modal
      title="Edit Content Template"
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={updating}
          onClick={handleSubmit}
        >
          Update Template
        </Button>,
      ]}
      className={styles.templateModal}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="name"
              label="Template Name"
              rules={[
                { required: true, message: "Please enter template name" },
              ]}
            >
              <Input placeholder="e.g., SEO Blog Post Template" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="type"
              label="Template Type"
              rules={[
                { required: true, message: "Please select template type" },
              ]}
            >
              <Select>
                <Option value="blog-post">Blog Post</Option>
                <Option value="landing-page">Landing Page</Option>
                <Option value="email">Email</Option>
                <Option value="social-media">Social Media</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="template"
          label="Template Content"
          rules={[{ required: true, message: "Please enter template content" }]}
        >
          <TextArea
            rows={8}
            placeholder="Enter your template content with variables like {title}, {content}, etc."
            className={styles.templateEditor}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="minWords"
              label="Minimum Word Count"
              rules={[
                { required: true, message: "Please enter minimum word count" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="maxWords"
              label="Maximum Word Count"
              rules={[
                { required: true, message: "Please enter maximum word count" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* Variables Section */}
      <Card title="Template Variables" size="small" style={{ marginTop: 16 }}>
        {variables.map((variable, index) => (
          <Card
            key={index}
            size="small"
            className={styles.variableCard}
            extra={
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeVariable(index)}
              />
            }
          >
            <Row gutter={8}>
              <Col span={6}>
                <Input
                  placeholder="Variable name"
                  value={variable.name}
                  onChange={(e) =>
                    updateVariable(index, "name", e.target.value)
                  }
                />
              </Col>
              <Col span={4}>
                <Select
                  value={variable.type}
                  onChange={(value) => updateVariable(index, "type", value)}
                  style={{ width: "100%" }}
                >
                  <Option value="text">Text</Option>
                  <Option value="keyword">Keyword</Option>
                  <Option value="date">Date</Option>
                  <Option value="number">Number</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Description (optional)"
                  value={variable.description}
                  onChange={(e) =>
                    updateVariable(index, "description", e.target.value)
                  }
                />
              </Col>
              <Col span={6}>
                <Space>
                  <Switch
                    checked={variable.required}
                    onChange={(checked) =>
                      updateVariable(index, "required", checked)
                    }
                  />
                  <span>Required</span>
                </Space>
              </Col>
            </Row>
          </Card>
        ))}

        <Button
          type="dashed"
          onClick={addVariable}
          icon={<PlusOutlined />}
          className={styles.addVariableButton}
        >
          Add Variable
        </Button>
      </Card>

      {/* SEO Guidelines Section */}
      <Card title="SEO Guidelines" size="small" style={{ marginTop: 16 }}>
        <div className={styles.seoGuidelines}>
          {seoGuidelines.map((guideline, index) => (
            <div key={index} className={styles.guideline}>
              <Tag closable onClose={() => removeSeoGuideline(index)}>
                {guideline}
              </Tag>
            </div>
          ))}
        </div>

        <Row gutter={8} style={{ marginTop: 16 }}>
          <Col flex="auto">
            <Input
              placeholder="Add new SEO guideline"
              value={newGuideline}
              onChange={(e) => setNewGuideline(e.target.value)}
              onPressEnter={addSeoGuideline}
            />
          </Col>
          <Col>
            <Button type="primary" onClick={addSeoGuideline}>
              Add
            </Button>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default EditTemplateModal;
