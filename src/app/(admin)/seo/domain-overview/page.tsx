"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Input,
  Button,
  Select,
  Form,
  message,
  Progress,
  Tag,
  Table,
  Space,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  TrophyOutlined,
  LineChartOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useDomainOverview } from "@/stores/hooks/useDomainOverview";
import { DomainAuthorityCard } from "@/components/domain-overview/DomainAuthorityCard";
import styles from "./page.module.scss";
import { useAppSelector } from "@/stores/hooks";
import { useSearchParams } from "next/navigation";

const { Title, Text } = Typography;
const { Option } = Select;

// List of all countries
const countries = [
  { code: "AD", name: "Andorra" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "AF", name: "Afghanistan" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AI", name: "Anguilla" },
  { code: "AL", name: "Albania" },
  { code: "AM", name: "Armenia" },
  { code: "AO", name: "Angola" },
  { code: "AQ", name: "Antarctica" },
  { code: "AR", name: "Argentina" },
  { code: "AS", name: "American Samoa" },
  { code: "AT", name: "Austria" },
  { code: "AU", name: "Australia" },
  { code: "AW", name: "Aruba" },
  { code: "AX", name: "Åland Islands" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BB", name: "Barbados" },
  { code: "BD", name: "Bangladesh" },
  { code: "BE", name: "Belgium" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BG", name: "Bulgaria" },
  { code: "BH", name: "Bahrain" },
  { code: "BI", name: "Burundi" },
  { code: "BJ", name: "Benin" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "BM", name: "Bermuda" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BO", name: "Bolivia" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BR", name: "Brazil" },
  { code: "BS", name: "Bahamas" },
  { code: "BT", name: "Bhutan" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BW", name: "Botswana" },
  { code: "BY", name: "Belarus" },
  { code: "BZ", name: "Belize" },
  { code: "CA", name: "Canada" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CD", name: "Congo, Democratic Republic of the" },
  { code: "CF", name: "Central African Republic" },
  { code: "CG", name: "Congo" },
  { code: "CH", name: "Switzerland" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "CK", name: "Cook Islands" },
  { code: "CL", name: "Chile" },
  { code: "CM", name: "Cameroon" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "CU", name: "Cuba" },
  { code: "CV", name: "Cabo Verde" },
  { code: "CW", name: "Curaçao" },
  { code: "CX", name: "Christmas Island" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DE", name: "Germany" },
  { code: "DJ", name: "Djibouti" },
  { code: "DK", name: "Denmark" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "DZ", name: "Algeria" },
  { code: "EC", name: "Ecuador" },
  { code: "EE", name: "Estonia" },
  { code: "EG", name: "Egypt" },
  { code: "EH", name: "Western Sahara" },
  { code: "ER", name: "Eritrea" },
  { code: "ES", name: "Spain" },
  { code: "ET", name: "Ethiopia" },
  { code: "FI", name: "Finland" },
  { code: "FJ", name: "Fiji" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FM", name: "Micronesia" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GB", name: "United Kingdom" },
  { code: "GD", name: "Grenada" },
  { code: "GE", name: "Georgia" },
  { code: "GF", name: "French Guiana" },
  { code: "GG", name: "Guernsey" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GL", name: "Greenland" },
  { code: "GM", name: "Gambia" },
  { code: "GN", name: "Guinea" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "GR", name: "Greece" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "GT", name: "Guatemala" },
  { code: "GU", name: "Guam" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HK", name: "Hong Kong" },
  { code: "HM", name: "Heard Island and McDonald Islands" },
  { code: "HN", name: "Honduras" },
  { code: "HR", name: "Croatia" },
  { code: "HT", name: "Haiti" },
  { code: "HU", name: "Hungary" },
  { code: "ID", name: "Indonesia" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IM", name: "Isle of Man" },
  { code: "IN", name: "India" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "IQ", name: "Iraq" },
  { code: "IR", name: "Iran" },
  { code: "IS", name: "Iceland" },
  { code: "IT", name: "Italy" },
  { code: "JE", name: "Jersey" },
  { code: "JM", name: "Jamaica" },
  { code: "JO", name: "Jordan" },
  { code: "JP", name: "Japan" },
  { code: "KE", name: "Kenya" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "KH", name: "Cambodia" },
  { code: "KI", name: "Kiribati" },
  { code: "KM", name: "Comoros" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "KP", name: "Korea, Democratic People's Republic of" },
  { code: "KR", name: "Korea, Republic of" },
  { code: "KW", name: "Kuwait" },
  { code: "KY", name: "Cayman Islands" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LB", name: "Lebanon" },
  { code: "LC", name: "Saint Lucia" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LK", name: "Sri Lanka" },
  { code: "LR", name: "Liberia" },
  { code: "LS", name: "Lesotho" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "LV", name: "Latvia" },
  { code: "LY", name: "Libya" },
  { code: "MA", name: "Morocco" },
  { code: "MC", name: "Monaco" },
  { code: "MD", name: "Moldova" },
  { code: "ME", name: "Montenegro" },
  { code: "MF", name: "Saint Martin (French part)" },
  { code: "MG", name: "Madagascar" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MK", name: "North Macedonia" },
  { code: "ML", name: "Mali" },
  { code: "MM", name: "Myanmar" },
  { code: "MN", name: "Mongolia" },
  { code: "MO", name: "Macao" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MS", name: "Montserrat" },
  { code: "MT", name: "Malta" },
  { code: "MU", name: "Mauritius" },
  { code: "MV", name: "Maldives" },
  { code: "MW", name: "Malawi" },
  { code: "MX", name: "Mexico" },
  { code: "MY", name: "Malaysia" },
  { code: "MZ", name: "Mozambique" },
  { code: "NA", name: "Namibia" },
  { code: "NC", name: "New Caledonia" },
  { code: "NE", name: "Niger" },
  { code: "NF", name: "Norfolk Island" },
  { code: "NG", name: "Nigeria" },
  { code: "NI", name: "Nicaragua" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "NP", name: "Nepal" },
  { code: "NR", name: "Nauru" },
  { code: "NU", name: "Niue" },
  { code: "NZ", name: "New Zealand" },
  { code: "OM", name: "Oman" },
  { code: "PA", name: "Panama" },
  { code: "PE", name: "Peru" },
  { code: "PF", name: "French Polynesia" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PH", name: "Philippines" },
  { code: "PK", name: "Pakistan" },
  { code: "PL", name: "Poland" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "PN", name: "Pitcairn" },
  { code: "PR", name: "Puerto Rico" },
  { code: "PS", name: "Palestine, State of" },
  { code: "PT", name: "Portugal" },
  { code: "PW", name: "Palau" },
  { code: "PY", name: "Paraguay" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RS", name: "Serbia" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SC", name: "Seychelles" },
  { code: "SD", name: "Sudan" },
  { code: "SE", name: "Sweden" },
  { code: "SG", name: "Singapore" },
  { code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha" },
  { code: "SI", name: "Slovenia" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SK", name: "Slovakia" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SM", name: "San Marino" },
  { code: "SN", name: "Senegal" },
  { code: "SO", name: "Somalia" },
  { code: "SR", name: "Suriname" },
  { code: "SS", name: "South Sudan" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SV", name: "El Salvador" },
  { code: "SX", name: "Sint Maarten (Dutch part)" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "SZ", name: "Eswatini" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TD", name: "Chad" },
  { code: "TF", name: "French Southern Territories" },
  { code: "TG", name: "Togo" },
  { code: "TH", name: "Thailand" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TK", name: "Tokelau" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TN", name: "Tunisia" },
  { code: "TO", name: "Tonga" },
  { code: "TR", name: "Turkey" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TV", name: "Tuvalu" },
  { code: "TW", name: "Taiwan" },
  { code: "TZ", name: "Tanzania" },
  { code: "UA", name: "Ukraine" },
  { code: "UG", name: "Uganda" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VA", name: "Holy See (Vatican City State)" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "VE", name: "Venezuela" },
  { code: "VG", name: "Virgin Islands, British" },
  { code: "VI", name: "Virgin Islands, U.S." },
  { code: "VN", name: "Viet Nam" },
  { code: "VU", name: "Vanuatu" },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "WS", name: "Samoa" },
  { code: "YE", name: "Yemen" },
  { code: "YT", name: "Mayotte" },
  { code: "ZA", name: "South Africa" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

const DomainOverviewPage: React.FC = () => {
  const searchParams = useSearchParams();
  const selectedProjectId = searchParams.get("projectId");
  // Use domain overview hook
  const { projects } = useAppSelector((state) => state.project);
  const {
    overview,
    topKeywords,
    competitors,
    topics,
    authority,
    isLoading,

    selectedDomain,
    selectedCountry,
    analyzeDomain,
    setCountry,
  } = useDomainOverview();
  const [searchDomain, setSearchDomain] = useState(selectedDomain || "");

  useEffect(() => {
    if (selectedProjectId) {
      // Auto-load data when project is selected
      // This could be enhanced to remember last analyzed domain
      setSearchDomain(
        projects.find((project) => project.id === selectedProjectId)?.domain ||
          ""
      );
    }
  }, [selectedProjectId, projects]);
  // Analyze domain function
  const handleAnalyzeDomain = async (domain: string) => {
    if (!domain.trim()) {
      message.warning("Please enter a valid domain");
      return;
    }

    try {
      await analyzeDomain(domain, {
        country: selectedCountry,
        includeSubdomains: false,
        keywordsLimit: 50,
        competitorsLimit: 10,
        topicsLimit: 20,
        includeAuthority: true,
      });
      message.success(`Domain analysis completed for ${domain}`);
    } catch (error) {
      console.error("Error analyzing domain:", error);
      message.error("Failed to analyze domain. Please try again.");
    }
  };

  const handleSearch = () => {
    handleAnalyzeDomain(searchDomain);
  };

  const handleCountryChange = (country: string) => {
    setCountry(country);
  };

  const getAuthorityScoreColor = (score: number) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#faad14";
    if (score >= 40) return "#fa8c16";
    return "#ff4d4f";
  };

  const keywordColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position: number) => (
        <span
          style={{
            fontWeight: "bold",
            color: position <= 10 ? "#52c41a" : "#faad14",
          }}
        >
          {position}
        </span>
      ),
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
      render: (traffic: number) => traffic.toLocaleString(),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty: number) => (
        <Progress
          percent={difficulty}
          size="small"
          strokeColor={
            difficulty > 70
              ? "#ff4d4f"
              : difficulty > 40
              ? "#faad14"
              : "#52c41a"
          }
          showInfo={false}
        />
      ),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      render: (cpc: number) => `$${cpc.toFixed(2)}`,
    },
  ];

  const competitorColumns = [
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (domain: string) => <strong>{domain}</strong>,
    },
    {
      title: "Authority Score",
      dataIndex: "authorityScore",
      key: "authorityScore",
      render: (score: number) => (
        <span
          style={{ color: getAuthorityScoreColor(score), fontWeight: "bold" }}
        >
          {score}
        </span>
      ),
    },
    {
      title: "Organic Keywords",
      dataIndex: "organicKeywords",
      key: "organicKeywords",
      render: (keywords: number) => keywords.toLocaleString(),
    },
    {
      title: "Common Keywords",
      dataIndex: "commonKeywords",
      key: "commonKeywords",
      render: (keywords: number) => keywords.toLocaleString(),
    },
    {
      title: "Competition Level",
      dataIndex: "competitionLevel",
      key: "competitionLevel",
      render: (level: number) => {
        const levelText = level >= 80 ? "High" : level >= 50 ? "Medium" : "Low";
        const color = level >= 80 ? "red" : level >= 50 ? "orange" : "green";
        return <Tag color={color}>{levelText}</Tag>;
      },
    },
    {
      title: "Traffic Gap",
      dataIndex: "trafficGap",
      key: "trafficGap",
      render: (gap: number) => (
        <span style={{ color: gap > 0 ? "#52c41a" : "#ff4d4f" }}>
          {gap > 0 ? "+" : ""}
          {gap.toLocaleString()}
        </span>
      ),
    },
  ];

  const topicColumns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "keywords",
      render: (keywords: number) => keywords.toLocaleString(),
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
      render: (traffic: number) => traffic.toLocaleString(),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty: number) => (
        <Progress
          percent={difficulty}
          size="small"
          strokeColor={
            difficulty > 70
              ? "#ff4d4f"
              : difficulty > 40
              ? "#faad14"
              : "#52c41a"
          }
          showInfo={false}
        />
      ),
    },
    {
      title: "Opportunities",
      dataIndex: "opportunities",
      key: "opportunities",
      render: (opportunities: number) => opportunities.toLocaleString(),
    },
  ];

  return (
    <div className={styles.domainOverviewPage}>
      {/* Header */}
      <div className={styles.header}>
        <Title level={2}>Domain Overview</Title>
        <Text type="secondary">
          Get a complete picture of any domain's online performance
        </Text>
      </div>

      {/* Search Section */}
      <Card className={styles.searchCard}>
        <Form layout="inline" onFinish={handleSearch}>
          <Form.Item>
            <Input
              value={searchDomain}
              onChange={(e) => setSearchDomain(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Select
              value={selectedCountry}
              onChange={handleCountryChange}
              style={{ width: 200 }}
              showSearch
              placeholder="Select country"
              filterOption={(input, option) =>
                (option?.label as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase()) ||
                (option?.value as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {countries.map((country) => (
                <Option
                  key={country.code}
                  value={country.code}
                  label={country.name}
                >
                  {country.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              loading={isLoading}
            >
              Analyze
            </Button>
          </Form.Item>
          {/* <Form.Item>
            <Button icon={<ExportOutlined />}>Export</Button>
          </Form.Item> */}
        </Form>
      </Card>

      {/* Domain Metrics Overview */}
      <Row gutter={[24, 24]} className={styles.metricsRow}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={
                <Space>
                  Authority Score
                  <Tooltip title="Authority Score is a metric that measures the overall quality and SEO power of a domain">
                    <InfoCircleOutlined />
                  </Tooltip>
                </Space>
              }
              value={overview?.authorityScore || 0}
              suffix="/100"
              valueStyle={{
                color: getAuthorityScoreColor(overview?.authorityScore || 0),
              }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Organic Keywords"
              value={overview?.organicKeywords || 0}
              formatter={(value) => value?.toLocaleString()}
              prefix={<SearchOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Organic Traffic"
              value={overview?.organicTraffic || 0}
              formatter={(value) => value?.toLocaleString()}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Traffic Cost"
              value={overview?.organicCost || 0}
              formatter={(value) => `$${value?.toLocaleString()}`}
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Backlinks"
              value={overview?.backlinks || 0}
              formatter={(value) => value?.toLocaleString()}
              prefix={<GlobalOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Referring Domains"
              value={overview?.referringDomains || 0}
              formatter={(value) => value?.toLocaleString()}
              prefix={<GlobalOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Domain Trend"
              value={overview?.trafficTrend?.length || 0}
              suffix=" months"
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Top Countries"
              value={overview?.topCountries?.length || 0}
              suffix=" countries"
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Domain Authority Section */}
      {authority && (
        <DomainAuthorityCard authority={authority} loading={isLoading} />
      )}

      {/* Top Keywords Section */}
      <Card className={styles.contentCard} title="Top Organic Keywords">
        <Table
          dataSource={topKeywords?.data || []}
          columns={keywordColumns}
          loading={isLoading}
          rowKey={(record, index) => `keyword-${record.keyword}-${index}`}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Top ${total} keywords`,
          }}
        />
      </Card>

      {/* Main Competitors Section */}
      <Card className={styles.contentCard} title="Main Organic Competitors">
        <Table
          dataSource={competitors?.data || []}
          columns={competitorColumns}
          loading={isLoading}
          rowKey={(record, index) => `competitor-${record.domain}-${index}`}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Top ${total} competitors`,
          }}
        />
      </Card>

      {/* Top Topics Section */}
      <Card className={styles.contentCard} title="Top Organic Topics">
        <Table
          dataSource={topics?.data || []}
          columns={topicColumns}
          loading={isLoading}
          rowKey={(record, index) => `topic-${record.topic}-${index}`}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Top ${total} topics`,
          }}
        />
      </Card>
    </div>
  );
};

export default DomainOverviewPage;
