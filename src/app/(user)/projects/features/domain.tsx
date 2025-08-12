"use client";
import React, { useState } from "react";
import {
  Input,
  Select,
  Button,
  Card,
  Typography,
  Spin,
  message,
  List,
  Tag,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  CloseOutlined,
  UpOutlined,
  DownOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import { useDomain } from "@/stores/hooks";
import styles from "./domain.module.scss";

const { Title, Text } = Typography;

// Define countries array
const countries = [
  { value: "AF", label: "Afghanistan" },
  { value: "AL", label: "Albania" },
  { value: "DZ", label: "Algeria" },
  { value: "AR", label: "Argentina" },
  { value: "AU", label: "Australia" },
  { value: "AT", label: "Austria" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "BS", label: "Bahamas" },
  { value: "BH", label: "Bahrain" },
  { value: "BD", label: "Bangladesh" },
  { value: "BY", label: "Belarus" },
  { value: "BE", label: "Belgium" },
  { value: "BZ", label: "Belize" },
  { value: "BJ", label: "Benin" },
  { value: "BT", label: "Bhutan" },
  { value: "BO", label: "Bolivia" },
  { value: "BA", label: "Bosnia and Herzegovina" },
  { value: "BR", label: "Brazil" },
  { value: "BN", label: "Brunei" },
  { value: "BG", label: "Bulgaria" },
  { value: "KH", label: "Cambodia" },
  { value: "CM", label: "Cameroon" },
  { value: "CA", label: "Canada" },
  { value: "CL", label: "Chile" },
  { value: "CN", label: "China" },
  { value: "CO", label: "Colombia" },
  { value: "CR", label: "Costa Rica" },
  { value: "HR", label: "Croatia" },
  { value: "CU", label: "Cuba" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czech Republic" },
  { value: "DK", label: "Denmark" },
  { value: "DO", label: "Dominican Republic" },
  { value: "EC", label: "Ecuador" },
  { value: "EG", label: "Egypt" },
  { value: "SV", label: "El Salvador" },
  { value: "EE", label: "Estonia" },
  { value: "ET", label: "Ethiopia" },
  { value: "FJ", label: "Fiji" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "GH", label: "Ghana" },
  { value: "GR", label: "Greece" },
  { value: "GT", label: "Guatemala" },
  { value: "HT", label: "Haiti" },
  { value: "HN", label: "Honduras" },
  { value: "HK", label: "Hong Kong" },
  { value: "HU", label: "Hungary" },
  { value: "IS", label: "Iceland" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Iraq" },
  { value: "IE", label: "Ireland" },
  { value: "IL", label: "Israel" },
  { value: "IT", label: "Italy" },
  { value: "JM", label: "Jamaica" },
  { value: "JP", label: "Japan" },
  { value: "JO", label: "Jordan" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "KE", label: "Kenya" },
  { value: "KR", label: "Korea, South" },
  { value: "KW", label: "Kuwait" },
  { value: "LV", label: "Latvia" },
  { value: "LB", label: "Lebanon" },
  { value: "LY", label: "Libya" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "MK", label: "Macedonia" },
  { value: "MG", label: "Madagascar" },
  { value: "MY", label: "Malaysia" },
  { value: "MV", label: "Maldives" },
  { value: "MT", label: "Malta" },
  { value: "MX", label: "Mexico" },
  { value: "MD", label: "Moldova" },
  { value: "MC", label: "Monaco" },
  { value: "MN", label: "Mongolia" },
  { value: "ME", label: "Montenegro" },
  { value: "MA", label: "Morocco" },
  { value: "MM", label: "Myanmar" },
  { value: "NP", label: "Nepal" },
  { value: "NL", label: "Netherlands" },
  { value: "NZ", label: "New Zealand" },
  { value: "NI", label: "Nicaragua" },
  { value: "NG", label: "Nigeria" },
  { value: "NO", label: "Norway" },
  { value: "OM", label: "Oman" },
  { value: "PK", label: "Pakistan" },
  { value: "PA", label: "Panama" },
  { value: "PY", label: "Paraguay" },
  { value: "PE", label: "Peru" },
  { value: "PH", label: "Philippines" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "PR", label: "Puerto Rico" },
  { value: "QA", label: "Qatar" },
  { value: "RO", label: "Romania" },
  { value: "RU", label: "Russia" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "RS", label: "Serbia" },
  { value: "SG", label: "Singapore" },
  { value: "SK", label: "Slovakia" },
  { value: "SI", label: "Slovenia" },
  { value: "ZA", label: "South Africa" },
  { value: "ES", label: "Spain" },
  { value: "LK", label: "Sri Lanka" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "TW", label: "Taiwan" },
  { value: "TJ", label: "Tajikistan" },
  { value: "TZ", label: "Tanzania" },
  { value: "TH", label: "Thailand" },
  { value: "TN", label: "Tunisia" },
  { value: "TR", label: "Turkey" },
  { value: "TM", label: "Turkmenistan" },
  { value: "UA", label: "Ukraine" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "UY", label: "Uruguay" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "VE", label: "Venezuela" },
  { value: "VN", label: "Vietnam" },
  { value: "YE", label: "Yemen" },
  { value: "ZM", label: "Zambia" },
  { value: "ZW", label: "Zimbabwe" },
];

type Props = {};

const Domain = (props: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState("US");

  const {
    overview,
    competitors,
    topKeywords,
    authority,
    overviewLoading,
    competitorsLoading,
    topKeywordsLoading,
    authorityLoading,
    competitorsError,
    monitoredDomains,
    analyzeDomain,
    addDomain,
    removeDomain,
    setDomain: setSelectedDomain,
    setCountry: setSelectedCountry,
  } = useDomain();

  const handleAddDomain = async () => {
    if (domain.trim()) {
      try {
        // Remove protocol and www. from the start
        let cleanedDomain = domain
          .trim()
          .replace(/^https?:\/\//i, "")
          .replace(/^www\./i, "");

        // Validate domain format
        const domainRegex =
          /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!domainRegex.test(cleanedDomain)) {
          message.error(
            "Please enter a valid domain format (e.g., example.com)"
          );
          return;
        }

        // Set selected domain and country
        setSelectedDomain(cleanedDomain);
        setSelectedCountry(country);

        // Add to monitored domains
        addDomain(cleanedDomain);

        // Analyze the domain
        await analyzeDomain(cleanedDomain, country);

        message.success(`Domain ${cleanedDomain} added successfully!`);
        setDomain(""); // Clear input
      } catch (error) {
        message.error("Failed to analyze domain. Please try again.");
        console.error("Error analyzing domain:", error);
      }
    } else {
      message.warning("Please enter a domain name");
    }
  };

  const handleRemoveDomain = (domainToRemove: string) => {
    removeDomain(domainToRemove);
    message.success(`Domain ${domainToRemove} removed from monitoring`);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.domain}>
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          Domains for monitoring
        </Title>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={toggleCollapse}
          className={styles.closeButton}
        >
          Close {isCollapsed ? <DownOutlined /> : <UpOutlined />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <Card className={styles.competitorCard}>
              <div className={styles.cardHeader}>
                <Text className={styles.cardTitle}>My competitors</Text>
              </div>

              {competitorsLoading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <Spin size="large" />
                </div>
              ) : competitorsError ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#ff4d4f",
                  }}
                >
                  Error loading competitors: {competitorsError}
                </div>
              ) : competitors && competitors.data.length > 0 ? (
                <List
                  dataSource={competitors.data.slice(0, 5)}
                  renderItem={(competitor) => (
                    <List.Item style={{ padding: 0, border: "none" }}>
                      <div className={styles.domainItem}>
                        <div className={styles.domainInfo}>
                          <Text className={styles.domainName}>
                            {competitor.domain}
                          </Text>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              marginTop: "4px",
                            }}
                          >
                            <Text className={styles.domainStats}>
                              {formatNumber(competitor.estimatedTraffic)}
                            </Text>
                            <Tag
                              color={
                                competitor.competitionLevel > 80
                                  ? "red"
                                  : competitor.competitionLevel > 60
                                  ? "orange"
                                  : "green"
                              }
                            >
                              {competitor.competitionLevel}% competition
                            </Tag>
                          </div>
                        </div>
                        <div className={styles.chartPlaceholder}>
                          <svg width="100" height="40" viewBox="0 0 100 40">
                            <path
                              d="M0,30 Q25,10 50,20 T100,15"
                              stroke="#1890ff"
                              strokeWidth="2"
                              fill="none"
                            />
                            <path
                              d="M0,30 Q25,10 50,20 T100,15 L100,40 L0,40 Z"
                              fill="rgba(24, 144, 255, 0.1)"
                            />
                          </svg>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <div className={styles.domainItem}>
                  <div className={styles.domainInfo}>
                    <Text className={styles.domainName}>
                      No competitors found
                    </Text>
                    <Text className={styles.domainStats}>
                      Add a domain to see competitors
                    </Text>
                  </div>
                  <div className={styles.chartPlaceholder}>
                    <svg width="100" height="40" viewBox="0 0 100 40">
                      <path
                        d="M0,30 Q25,10 50,20 T100,15"
                        stroke="#1890ff"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M0,30 Q25,10 50,20 T100,15 L100,40 L0,40 Z"
                        fill="rgba(24, 144, 255, 0.1)"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </Card>

            {/* Domain Overview Stats */}
            {overview && (
              <Card
                className={styles.overviewCard}
                style={{ marginTop: "16px" }}
              >
                <Title level={5}>Domain Overview</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic
                      title="Authority Score"
                      value={overview.authorityScore}
                      prefix={<TrophyOutlined />}
                      suffix="/100"
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Organic Traffic"
                      value={formatNumber(overview.organicTraffic)}
                      prefix={<RiseOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Keywords"
                      value={formatNumber(overview.organicKeywords)}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Backlinks"
                      value={formatNumber(overview.backlinks)}
                    />
                  </Col>
                </Row>
              </Card>
            )}
          </div>

          <div className={styles.rightSection}>
            <div className={styles.description}>
              <Text>
                Quickly see changes in key organic and paid traffic metrics and
                track the <Text strong>Authority Score</Text> of your
                competitors.
              </Text>
            </div>

            <div className={styles.addDomainSection}>
              <div className={styles.inputGroup}>
                <Input
                  placeholder="Enter domain (e.g., example.com)"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className={styles.domainInput}
                  onPressEnter={handleAddDomain}
                />
                <Select
                  value={country}
                  onChange={setCountry}
                  className={styles.countrySelect}
                  suffixIcon={null}
                  showSearch
                  placeholder="Select country"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={countries}
                />
                <Button
                  type="primary"
                  onClick={handleAddDomain}
                  className={styles.addButton}
                  loading={
                    overviewLoading ||
                    competitorsLoading ||
                    topKeywordsLoading ||
                    authorityLoading
                  }
                >
                  + Add domain
                </Button>
              </div>
            </div>

            {/* Monitored Domains */}
            {monitoredDomains.length > 0 && (
              <div
                className={styles.monitoredDomains}
                style={{ marginTop: "16px" }}
              >
                <Title level={5}>Monitored Domains</Title>
                <div className={styles.domainTags}>
                  {monitoredDomains.map((monitoredDomain) => (
                    <Tag
                      key={monitoredDomain}
                      closable
                      onClose={() => handleRemoveDomain(monitoredDomain)}
                      style={{ marginBottom: "8px" }}
                    >
                      {monitoredDomain}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Top Keywords Preview */}
            {topKeywords && topKeywords.data.length > 0 && (
              <Card
                className={styles.keywordsCard}
                style={{ marginTop: "16px" }}
              >
                <Title level={5}>Top Keywords</Title>
                <List
                  dataSource={topKeywords.data.slice(0, 5)}
                  renderItem={(keyword) => (
                    <List.Item>
                      <div style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text strong>{keyword.keyword}</Text>
                          <div>
                            <Tag
                              color={
                                keyword.position <= 3
                                  ? "green"
                                  : keyword.position <= 10
                                  ? "orange"
                                  : "red"
                              }
                            >
                              #{keyword.position}
                            </Tag>
                            <Text type="secondary">
                              {formatNumber(keyword.searchVolume)} searches
                            </Text>
                          </div>
                        </div>
                        <div style={{ marginTop: "4px" }}>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            Traffic: {formatNumber(keyword.traffic)} |
                            Difficulty: {keyword.difficulty}% | Trend:{" "}
                            {keyword.trend === "up" ? (
                              <RiseOutlined style={{ color: "green" }} />
                            ) : keyword.trend === "down" ? (
                              <FallOutlined style={{ color: "red" }} />
                            ) : (
                              <span style={{ color: "gray" }}>-</span>
                            )}
                          </Text>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            )}

            {/* Domain Authority Scores */}
            {authority && (
              <Card
                className={styles.authorityCard}
                style={{ marginTop: "16px" }}
              >
                <Title level={5}>Domain Authority</Title>
                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic
                      title="Moz DA"
                      value={authority.moz}
                      suffix="/100"
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Ahrefs DR"
                      value={authority.ahrefs}
                      suffix="/100"
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="SEMrush AS"
                      value={authority.semrush}
                      suffix="/100"
                    />
                  </Col>
                </Row>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Domain;
