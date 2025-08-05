import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  Form,
  Row,
  Col,
  Typography,
  Space,
  Alert,
  Spin,
  Switch,
  InputNumber,
  Divider,
  message,
} from "antd";
import {
  PlayCircleOutlined,
  ReloadOutlined,
  SettingOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  startOnPageSEOAnalysis,
  waitForAuditCompletion,
  clearError,
  clearCurrentResults,
} from "@/stores/slices/on-page-seo.slice";
import { OnPageSEOAnalysisRequest } from "@/types/on-page-seo.type";
import OnPageSEOResults from "./OnPageSEOResults";
import OnPageSEOProgress from "./OnPageSEOProgress";

const { Title, Text } = Typography;
const { Option } = Select;

interface OnPageSEOAnalyzerProps {
  projectId: string;
}

const OnPageSEOAnalyzer: React.FC<OnPageSEOAnalyzerProps> = ({ projectId }) => {
  const dispatch = useAppDispatch();
  const { currentAudit, currentResults, loading, error } = useAppSelector(
    (state) => state.onPageSEO
  );

  const [form] = Form.useForm();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Clear error khi unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handle form submission
  const handleAnalyze = async (values: any) => {
    try {
      setIsAnalyzing(true);
      dispatch(clearError());
      dispatch(clearCurrentResults());

      const request: OnPageSEOAnalysisRequest = {
        url: values.url,
        options: {
          auditType: values.auditType || "full",
          settings: {
            crawlDepth: values.crawlDepth || 1,
            includeImages: values.includeImages !== false,
            checkMobileFriendly: values.checkMobileFriendly !== false,
            analyzePageSpeed: values.analyzePageSpeed !== false,
          },
        },
      };

      // Start analysis
      const resultAction = await dispatch(
        startOnPageSEOAnalysis({ projectId, request })
      );

      if (startOnPageSEOAnalysis.fulfilled.match(resultAction)) {
        const audit = resultAction.payload;
        message.success("Analysis started successfully!");

        // Wait for completion
        const completionAction = await dispatch(
          waitForAuditCompletion({ auditId: audit.id })
        );

        if (waitForAuditCompletion.fulfilled.match(completionAction)) {
          message.success("Analysis completed successfully!");
        } else {
          message.error("Analysis failed or timed out");
        }
      } else {
        message.error("Failed to start analysis");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      message.error("An unexpected error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset form và state
  const handleReset = () => {
    form.resetFields();
    dispatch(clearCurrentResults());
    dispatch(clearError());
    setIsAnalyzing(false);
  };

  // Validate URL
  const validateURL = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please enter a URL"));
    }

    try {
      new URL(value);
      return Promise.resolve();
    } catch {
      return Promise.reject(new Error("Please enter a valid URL"));
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>
          <GlobalOutlined style={{ marginRight: "8px" }} />
          On-Page SEO Checker
        </Title>
        <Text type="secondary">
          Analyze and optimize your web pages for better search engine
          visibility
        </Text>
      </div>

      {error && (
        <Alert
          type="error"
          message="Analysis Error"
          description={error}
          closable
          onClose={() => dispatch(clearError())}
          style={{ marginBottom: "16px" }}
        />
      )}

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title="Page Analysis">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAnalyze}
              disabled={isAnalyzing}
            >
              <Form.Item
                name="url"
                label="Page URL"
                rules={[{ validator: validateURL }]}
              >
                <Input
                  placeholder="https://example.com/page-to-analyze"
                  prefix={<GlobalOutlined />}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="auditType"
                label="Analysis Type"
                initialValue="full"
              >
                <Select size="large">
                  <Option value="full">Complete Analysis</Option>
                  <Option value="technical">Technical SEO Only</Option>
                  <Option value="content">Content Analysis Only</Option>
                  <Option value="performance">Performance Only</Option>
                </Select>
              </Form.Item>

              <div style={{ marginBottom: "16px" }}>
                <Button
                  type="link"
                  icon={<SettingOutlined />}
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  style={{ padding: 0, height: "auto" }}
                >
                  Advanced Settings
                </Button>
              </div>

              {showAdvancedSettings && (
                <>
                  <Divider />

                  <Form.Item
                    name="crawlDepth"
                    label="Crawl Depth"
                    initialValue={1}
                    tooltip="Number of page levels to analyze"
                  >
                    <InputNumber min={1} max={3} style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    name="includeImages"
                    label="Image Analysis"
                    valuePropName="checked"
                    initialValue={true}
                  >
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    name="checkMobileFriendly"
                    label="Mobile-Friendly Check"
                    valuePropName="checked"
                    initialValue={true}
                  >
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    name="analyzePageSpeed"
                    label="Page Speed Analysis"
                    valuePropName="checked"
                    initialValue={true}
                  >
                    <Switch />
                  </Form.Item>
                </>
              )}

              <Space direction="vertical" style={{ width: "100%" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlayCircleOutlined />}
                  loading={isAnalyzing}
                  size="large"
                  block
                >
                  {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                </Button>

                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleReset}
                  disabled={isAnalyzing}
                  block
                >
                  Reset
                </Button>
              </Space>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          {isAnalyzing && currentAudit && (
            <OnPageSEOProgress audit={currentAudit} />
          )}

          {currentResults && !isAnalyzing && (
            <OnPageSEOResults results={currentResults} />
          )}

          {!isAnalyzing && !currentResults && (
            <Card style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ color: "#8c8c8c" }}>
                <GlobalOutlined
                  style={{ fontSize: "48px", marginBottom: "16px" }}
                />
                <Title level={4} type="secondary">
                  Ready to Analyze
                </Title>
                <Text type="secondary">
                  Enter a URL and click "Start Analysis" to begin your SEO audit
                </Text>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OnPageSEOAnalyzer;
