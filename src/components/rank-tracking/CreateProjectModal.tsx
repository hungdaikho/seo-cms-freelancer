"use client";
import React, { useState } from "react";
import { Modal, Form, Input, Button, Steps, message, Select } from "antd";
import { CreateProjectData } from "@/types/rank-tracking.type";
import styles from "./CreateProjectModal.module.scss";

const { Step } = Steps;
const { TextArea } = Input;

interface CreateProjectModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: CreateProjectData) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [projectData, setProjectData] = useState<Partial<CreateProjectData>>(
    {}
  );

  const steps = [
    {
      title: "Project Information",
      content: "project-info",
    },
    {
      title: "Specify Locations",
      content: "locations",
    },
    {
      title: "Enter Keywords",
      content: "keywords",
    },
  ];

  const countries = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "VN", label: "Vietnam" },
  ];

  const next = async () => {
    try {
      const values = await form.validateFields();
      setProjectData({ ...projectData, ...values });
      setCurrent(current + 1);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const finalData = { ...projectData, ...values };

      // Convert keywords string to array
      if (typeof finalData.keywords === "string") {
        finalData.keywords = finalData.keywords
          .split("\n")
          .map((k: string) => k.trim())
          .filter((k: string) => k.length > 0);
      }

      onSubmit(finalData as CreateProjectData);
      handleCancel();
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setCurrent(0);
    setProjectData({});
    form.resetFields();
    onCancel();
  };

  const renderStepContent = () => {
    switch (current) {
      case 0:
        return (
          <>
            <Form.Item
              name="websiteUrl"
              label="Website URL"
              rules={[
                { required: true, message: "Please input your website URL!" },
                { type: "url", message: "Please enter a valid URL!" },
              ]}
            >
              <Input placeholder="https://example.com" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Project Name"
              rules={[
                { required: true, message: "Please input project name!" },
              ]}
            >
              <Input placeholder="My SEO Project" />
            </Form.Item>
          </>
        );
      case 1:
        return (
          <Form.Item
            name="location"
            label="Enter country or city"
            rules={[{ required: true, message: "Please select a location!" }]}
          >
            <Select
              placeholder="Select a country"
              options={countries}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>
        );
      case 2:
        return (
          <Form.Item
            name="keywords"
            label="Keywords"
            rules={[{ required: true, message: "Please enter keywords!" }]}
            extra="Explore better plans to add multiple locations"
          >
            <TextArea rows={6} placeholder="Enter keywords (one per line)" />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title="New Project"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      className={styles.modal}
    >
      <div className={styles.stepsContainer}>
        <Steps current={current} size="small">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={projectData}
        className={styles.formContainer}
      >
        <div className={styles.contentArea}>{renderStepContent()}</div>

        <div className={styles.footerArea}>
          <div>
            {current > 0 && (
              <Button onClick={prev} className={styles.secondaryButton}>
                Back
              </Button>
            )}
            {current === 0 && (
              <Button onClick={handleCancel} className={styles.secondaryButton}>
                Close
              </Button>
            )}
          </div>
          <div>
            {current < steps.length - 1 && (
              <Button
                type="primary"
                onClick={next}
                className={styles.primaryButton}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={handleSubmit}
                className={styles.primaryButton}
              >
                Create Project
              </Button>
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
