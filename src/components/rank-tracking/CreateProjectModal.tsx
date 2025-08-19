"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Steps, message, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import { createProject, clearErrors } from "@/stores/slices/projects.slice";
import { CreateProjectRequest } from "@/services/project.service";
import { getSortedCountries } from "@/utils/countries";
import { getSortedLanguages } from "@/utils/languages";
import {
  validateDomain,
  getDomainPlaceholder,
} from "@/utils/domain-validation";
import styles from "./CreateProjectModal.module.scss";

const { Step } = Steps;
const { TextArea } = Input;

interface CreateProjectModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
}

interface ProjectFormData {
  name: string;
  domain: string;
  country: string;
  language: string;
  keywords: string;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.projects);

  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [projectData, setProjectData] = useState<Partial<ProjectFormData>>({});
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // Get sorted countries and languages
  const countries = getSortedCountries();
  const languages = getSortedLanguages();

  // Clear errors when modal opens
  useEffect(() => {
    if (visible) {
      dispatch(clearErrors());
    }
  }, [visible, dispatch]);

  // Handle success message and callback
  useEffect(() => {
    if (
      !loading.createProject &&
      !error.createProject &&
      visible &&
      current === 0 &&
      Object.keys(projectData).length > 0
    ) {
      message.success("Project created successfully!");
      onSuccess?.();
      handleCancel();
    }
  }, [
    loading.createProject,
    error.createProject,
    visible,
    onSuccess,
    projectData,
    current,
  ]);

  // Handle error message
  useEffect(() => {
    if (error.createProject) {
      message.error(error.createProject);
    }
  }, [error.createProject]);

  const steps = [
    {
      title: "Project Information",
      content: "project-info",
    },
    {
      title: "Settings",
      content: "settings",
    },
    {
      title: "Enter Keywords",
      content: "keywords",
    },
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
      const keywordsArray =
        typeof finalData.keywords === "string"
          ? finalData.keywords
              .split("\n")
              .map((k: string) => k.trim())
              .filter((k: string) => k.length > 0)
          : [];

      // Prepare data for API
      const createProjectData: CreateProjectRequest = {
        name: finalData.name,
        domain: finalData.domain,
        settings: {
          country: finalData.country,
          language: finalData.language,
          trackingEnabled: true,
          keyWordsArray: keywordsArray,
        },
      };

      // Dispatch create project action
      await dispatch(createProject(createProjectData)).unwrap();
      onSuccess?.();
      // Success handling is done in useEffect
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      if (typeof errorInfo === "string") {
        message.error(errorInfo);
      }
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
              name="name"
              label="Project Name"
              rules={[
                { required: true, message: "Please input project name!" },
                {
                  min: 2,
                  message: "Project name must be at least 2 characters!",
                },
              ]}
            >
              <Input placeholder="My SEO Project" />
            </Form.Item>
            <Form.Item
              name="domain"
              label="Website Domain"
              rules={[
                {
                  required: true,
                  message: "Please input your website domain!",
                },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();

                    const validation = validateDomain(value);

                    if (!validation.isValid) {
                      return Promise.reject(new Error(validation.error));
                    }

                    // Update form value with cleaned domain if it was modified
                    if (validation.cleanDomain !== value) {
                      form.setFieldValue("domain", validation.cleanDomain);
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder={getDomainPlaceholder(selectedCountry)}
                onChange={(e) => {
                  // Auto-clean domain as user types
                  const value = e.target.value;
                  if (value) {
                    const cleaned = value
                      .toLowerCase()
                      .replace(/^https?:\/\//, "")
                      .replace(/^www\./, "");
                    if (cleaned !== value) {
                      form.setFieldValue("domain", cleaned);
                    }
                  }
                }}
              />
            </Form.Item>
          </>
        );
      case 1:
        return (
          <>
            <Form.Item
              name="country"
              label="Target Country"
              rules={[{ required: true, message: "Please select a country!" }]}
            >
              <Select
                placeholder="Select a country"
                showSearch
                optionFilterProp="label"
                onChange={(value) => {
                  setSelectedCountry(value);
                  // Update domain placeholder when country changes
                  const domainField = form.getFieldValue("domain");
                  if (!domainField) {
                    // Trigger re-render to update placeholder
                    form.setFieldsValue({ domain: undefined });
                  }
                }}
                filterOption={(input, option) =>
                  ((option?.label as string) ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={countries.map((country) => ({
                  value: country.code,
                  label: `${country.flag} ${country.name}`,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="language"
              label="Target Language"
              rules={[{ required: true, message: "Please select a language!" }]}
            >
              <Select
                placeholder="Select a language"
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  ((option?.label as string) ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={languages.map((language) => ({
                  value: language.code,
                  label: `${language.name} (${language.nativeName})`,
                }))}
              />
            </Form.Item>
          </>
        );
      case 2:
        return (
          <Form.Item
            name="keywords"
            label="Keywords (Optional)"
            extra="You can add keywords later from the project dashboard"
          >
            <TextArea
              rows={6}
              placeholder="Enter keywords (one per line)&#10;Example:&#10;seo services&#10;digital marketing&#10;website optimization"
            />
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
      maskClosable={!loading.createProject}
      closable={!loading.createProject}
    >
      <Spin spinning={loading.createProject} tip="Creating project...">
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
                <Button
                  onClick={prev}
                  className={styles.secondaryButton}
                  disabled={loading.createProject}
                >
                  Back
                </Button>
              )}
              {current === 0 && (
                <Button
                  onClick={handleCancel}
                  className={styles.secondaryButton}
                  disabled={loading.createProject}
                >
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
                  disabled={loading.createProject}
                >
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  className={styles.primaryButton}
                  loading={loading.createProject}
                  disabled={loading.createProject}
                >
                  Create Project
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateProjectModal;
