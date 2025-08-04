import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Select,
  AutoComplete,
  Statistic,
  Tag,
  Typography,
  Spin,
  Alert,
  Empty,
} from "antd";
import {
  SearchOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDomainAnalysis } from "@/stores/hooks/useOrganicResearch";
import styles from "./organic-research-widget.module.scss";

const { Option } = Select;
const { Text } = Typography;

interface OrganicResearchWidgetProps {
  selectedProjectId?: string;
}

const OrganicResearchWidget: React.FC<OrganicResearchWidgetProps> = ({
  selectedProjectId,
}) => {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  // Get projects from Redux store
  const { projects } = useSelector((state: RootState) => state.project);

  // Find the current project based on selectedProjectId
  const currentProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : useSelector((state: RootState) => state.project.currentProject);

  // Use domain analysis hook
  const { domainAnalysis, loading, error, analyzeDomain, clearError } =
    useDomainAnalysis();

  // Auto-analyze when selectedProjectId or project changes
  useEffect(() => {
    if (currentProject?.domain) {
      setSelectedDomain(currentProject.domain);
      analyzeDomain(currentProject.domain, selectedCountry, "google");
    }
  }, [currentProject?.domain, selectedCountry, selectedProjectId]);

  // Handle manual domain change/select
  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain);
    if (domain && domain.trim()) {
      analyzeDomain(domain.trim(), selectedCountry, "google");
    }
  };

  // Handle domain input change (without triggering analysis)
  const handleDomainInput = (value: string) => {
    setSelectedDomain(value);
  };

  // Manual analyze current domain
  const handleAnalyze = () => {
    if (selectedDomain && selectedDomain.trim()) {
      analyzeDomain(selectedDomain.trim(), selectedCountry, "google");
    }
  };

  // Format numbers for display
  const formatNumber = (num: number | undefined): string => {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Get trend color
  const getTrendColor = (value: number): string => {
    if (value > 50) return "#52c41a"; // Green
    if (value > 20) return "#faad14"; // Orange
    return "#ff4d4f"; // Red
  };

  if (error) {
    return (
      <Card title="Organic Research" className={styles.organicResearchWidget}>
        <Alert
          message="Failed to load organic research data"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={clearError}>
              Dismiss
            </Button>
          }
        />
      </Card>
    );
  }

  if (!currentProject) {
    return (
      <Card title="Organic Research" className={styles.organicResearchWidget}>
        <Empty
          description={
            selectedProjectId
              ? "Project not found or no domain configured"
              : "Please select a project to view organic research data"
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }
  return (
    <Card title="Organic Research" className={styles.organicResearchWidget}>
      <Spin spinning={loading}>
        <div className={styles.header}>
          <div className={styles.domainSelector}>
            <Text style={{ fontSize: "12px", color: "#666" }}>Domain:</Text>
            <div style={{ display: "flex", gap: "4px" }}>
              <AutoComplete
                defaultValue={currentProject.domain || ""}
                onChange={handleDomainInput}
                onSelect={handleDomainChange}
                style={{ flex: 1 }}
                size="small"
                placeholder="Enter or search domain"
                options={
                  currentProject?.domain &&
                  currentProject.domain !== selectedDomain
                    ? [
                        {
                          value: currentProject.domain,
                          label: currentProject.domain,
                        },
                      ]
                    : []
                }
                filterOption={(inputValue, option) =>
                  option?.value
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ?? false
                }
              />
              {selectedDomain && selectedDomain !== currentProject?.domain && (
                <Button
                  size="small"
                  type="primary"
                  loading={loading}
                  onClick={handleAnalyze}
                  style={{ flexShrink: 0 }}
                >
                  Analyze
                </Button>
              )}
            </div>
          </div>
          <div className={styles.countrySelector}>
            <Text style={{ fontSize: "12px", color: "#666" }}>Country:</Text>
            <Select
              value={selectedCountry}
              onChange={setSelectedCountry}
              style={{ width: "100%" }}
              size="small"
              showSearch
            >
              <Option value="US">United States</Option>
              <Option value="UK">United Kingdom</Option>
              <Option value="CA">Canada</Option>
              <Option value="AU">Australia</Option>
              <Option value="DE">Germany</Option>
              <Option value="FR">France</Option>
              <Option value="ES">Spain</Option>
              <Option value="IT">Italy</Option>
              <Option value="NL">Netherlands</Option>
              <Option value="SE">Sweden</Option>
              <Option value="NO">Norway</Option>
              <Option value="DK">Denmark</Option>
              <Option value="FI">Finland</Option>
              <Option value="CH">Switzerland</Option>
              <Option value="AT">Austria</Option>
              <Option value="BE">Belgium</Option>
              <Option value="PL">Poland</Option>
              <Option value="CZ">Czech Republic</Option>
              <Option value="PT">Portugal</Option>
              <Option value="GR">Greece</Option>
              <Option value="HU">Hungary</Option>
              <Option value="RO">Romania</Option>
              <Option value="BG">Bulgaria</Option>
              <Option value="HR">Croatia</Option>
              <Option value="SK">Slovakia</Option>
              <Option value="SI">Slovenia</Option>
              <Option value="EE">Estonia</Option>
              <Option value="LV">Latvia</Option>
              <Option value="LT">Lithuania</Option>
              <Option value="IE">Ireland</Option>
              <Option value="LU">Luxembourg</Option>
              <Option value="MT">Malta</Option>
              <Option value="CY">Cyprus</Option>
              <Option value="JP">Japan</Option>
              <Option value="KR">South Korea</Option>
              <Option value="SG">Singapore</Option>
              <Option value="HK">Hong Kong</Option>
              <Option value="TW">Taiwan</Option>
              <Option value="TH">Thailand</Option>
              <Option value="MY">Malaysia</Option>
              <Option value="PH">Philippines</Option>
              <Option value="ID">Indonesia</Option>
              <Option value="VN">Vietnam</Option>
              <Option value="IN">India</Option>
              <Option value="CN">China</Option>
              <Option value="AE">UAE</Option>
              <Option value="SA">Saudi Arabia</Option>
              <Option value="IL">Israel</Option>
              <Option value="TR">Turkey</Option>
              <Option value="ZA">South Africa</Option>
              <Option value="EG">Egypt</Option>
              <Option value="NG">Nigeria</Option>
              <Option value="BR">Brazil</Option>
              <Option value="MX">Mexico</Option>
              <Option value="AR">Argentina</Option>
              <Option value="CL">Chile</Option>
              <Option value="CO">Colombia</Option>
              <Option value="PE">Peru</Option>
              <Option value="UY">Uruguay</Option>
              <Option value="EC">Ecuador</Option>
              <Option value="VE">Venezuela</Option>
              <Option value="BO">Bolivia</Option>
              <Option value="PY">Paraguay</Option>
              <Option value="CR">Costa Rica</Option>
              <Option value="PA">Panama</Option>
              <Option value="GT">Guatemala</Option>
              <Option value="HN">Honduras</Option>
              <Option value="SV">El Salvador</Option>
              <Option value="NI">Nicaragua</Option>
              <Option value="DO">Dominican Republic</Option>
              <Option value="CU">Cuba</Option>
              <Option value="JM">Jamaica</Option>
              <Option value="TT">Trinidad and Tobago</Option>
              <Option value="RU">Russia</Option>
              <Option value="UA">Ukraine</Option>
              <Option value="BY">Belarus</Option>
              <Option value="KZ">Kazakhstan</Option>
              <Option value="UZ">Uzbekistan</Option>
              <Option value="NZ">New Zealand</Option>
            </Select>
          </div>
        </div>

        {domainAnalysis ? (
          <>
            {/* Key Metrics */}
            <Row gutter={[8, 8]} className={styles.metricsRow}>
              <Col span={12}>
                <div className={styles.metricCard}>
                  <div className={styles.metricValue}>
                    {formatNumber(domainAnalysis.organicKeywords)}
                  </div>
                  <div className={styles.metricLabel}>
                    <SearchOutlined style={{ marginRight: 4 }} />
                    Keywords
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.metricCard}>
                  <div className={styles.metricValue}>
                    {formatNumber(domainAnalysis.organicTraffic)}
                  </div>
                  <div className={styles.metricLabel}>
                    <TrophyOutlined style={{ marginRight: 4 }} />
                    Traffic
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.metricCard}>
                  <div className={styles.metricValue}>
                    ${formatNumber(domainAnalysis.organicCost)}
                  </div>
                  <div className={styles.metricLabel}>
                    <InfoCircleOutlined style={{ marginRight: 4 }} />
                    Cost
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.metricCard}>
                  <div
                    className={styles.metricValue}
                    style={{ color: getTrendColor(domainAnalysis.visibility) }}
                  >
                    {domainAnalysis.visibility.toFixed(1)}%
                  </div>
                  <div className={styles.metricLabel}>
                    <RiseOutlined style={{ marginRight: 4 }} />
                    Visibility
                  </div>
                </div>
              </Col>
            </Row>

            {/* Average Position */}
            <div className={styles.positionCard}>
              <div className={styles.positionValue}>
                #{domainAnalysis.avgPosition.toFixed(1)}
              </div>
              <div className={styles.positionLabel}>Average Position</div>
              <div className={styles.positionTrend}>
                {domainAnalysis.avgPosition <= 10 ? (
                  <Tag color="green">Top 10</Tag>
                ) : domainAnalysis.avgPosition <= 20 ? (
                  <Tag color="orange">Top 20</Tag>
                ) : (
                  <Tag color="red">Below 20</Tag>
                )}
              </div>
            </div>

            {/* Last Updated */}
            <div className={styles.lastUpdated}>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                Updated:{" "}
                {new Date(domainAnalysis.lastUpdated).toLocaleDateString()}
              </Text>
            </div>
          </>
        ) : (
          <Empty
            description="No organic research data available"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}

        {/* Footer Button */}
        <div className={styles.cardFooter}>
          <Button
            type="link"
            onClick={() => router.push("/seo/organic-research")}
          >
            View full report
          </Button>
        </div>
      </Spin>
    </Card>
  );
};

export default OrganicResearchWidget;
