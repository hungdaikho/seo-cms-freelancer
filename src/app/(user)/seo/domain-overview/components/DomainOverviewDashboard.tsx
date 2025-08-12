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
  BookOutlined,
} from "@ant-design/icons";
import { useDomainOverview } from "@/stores/hooks/useDomainOverview";
import { DomainAuthorityCard } from "@/components/domain-overview/DomainAuthorityCard";
import styles from "../page.module.scss";
import { useAppSelector } from "@/stores/hooks";

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
  { code: "CD", name: "Congo, The Democratic Republic of the" },
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
  { code: "CV", name: "Cape Verde" },
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
  { code: "FM", name: "Micronesia, Federated States of" },
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
  { code: "IR", name: "Iran, Islamic Republic of" },
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
  { code: "MD", name: "Moldova, Republic of" },
  { code: "ME", name: "Montenegro" },
  { code: "MF", name: "Saint Martin (French part)" },
  { code: "MG", name: "Madagascar" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MK", name: "Macedonia, The Former Yugoslav Republic of" },
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
  { code: "PS", name: "Palestinian Territory, Occupied" },
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
  { code: "SZ", name: "Swaziland" },
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
  { code: "TW", name: "Taiwan, Province of China" },
  { code: "TZ", name: "Tanzania, United Republic of" },
  { code: "UA", name: "Ukraine" },
  { code: "UG", name: "Uganda" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VA", name: "Holy See (Vatican City State)" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "VE", name: "Venezuela, Bolivarian Republic of" },
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

interface Props {
  selectedProjectId?: string;
}

const DomainOverviewDashboard: React.FC<Props> = ({ selectedProjectId }) => {
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
    setDomain,
    setCountry,
    analyzeDomain,
  } = useDomainOverview();
  const [searchDomain, setSearchDomain] = useState(selectedDomain || "");
  const [selectedDatabase, setSelectedDatabase] = useState(
    selectedCountry || "US"
  );

  useEffect(() => {
    if (selectedProjectId) {
      const selectedProject =
        projects.find((project) => project.id === selectedProjectId)?.domain ||
        "";
      setSearchDomain(selectedProject);
    }
  }, [selectedProjectId, projects]);

  const handleSearchDomain = () => {
    if (searchDomain.trim()) {
      setDomain(searchDomain);
      setCountry(selectedDatabase);
      analyzeDomain(searchDomain, { country: selectedDatabase });
    } else {
      message.error("Please enter a domain name");
    }
  };

  const formatNumber = (num?: number) => {
    if (!num) return "0";
    return num.toLocaleString();
  };

  const formatKMB = (num?: number) => {
    if (!num) return "0";
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const topKeywordsColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position: number) => (
        <Tag
          color={position <= 3 ? "green" : position <= 10 ? "blue" : "orange"}
        >
          {position}
        </Tag>
      ),
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      render: (volume: number) => formatKMB(volume),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      render: (cpc: number) => `$${cpc?.toFixed(2) || "0.00"}`,
    },
  ];

  const competitorsColumns = [
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Competitive Level",
      dataIndex: "competitionLevel",
      key: "competitionLevel",
      render: (level: number) => (
        <Progress
          percent={level}
          size="small"
          strokeColor={
            level > 70 ? "#ff4d4f" : level > 40 ? "#faad14" : "#52c41a"
          }
        />
      ),
    },
    {
      title: "Common Keywords",
      dataIndex: "commonKeywords",
      key: "commonKeywords",
      render: (count: number) => formatNumber(count),
    },
    {
      title: "Organic Keywords",
      dataIndex: "organicKeywords",
      key: "organicKeywords",
      render: (count: number) => formatNumber(count),
    },
  ];

  const topicsColumns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "keywords",
      render: (count: number) => formatNumber(count),
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
      render: (traffic: number) => formatKMB(traffic),
    },
  ];

  return (
    <div className={styles.domainOverview}>
      <div className={styles.header}>
        <Title level={2}>
          <GlobalOutlined /> Domain Overview
        </Title>
        <Text type="secondary">
          Analyze your domain's organic search performance and competitive
          landscape
        </Text>
      </div>

      <Card className={styles.searchCard}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Enter domain (e.g., example.com)"
              value={searchDomain}
              onChange={(e) => setSearchDomain(e.target.value)}
              onPressEnter={handleSearchDomain}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              value={selectedDatabase}
              onChange={setSelectedDatabase}
              style={{ width: "100%" }}
              placeholder="Select country"
            >
              {countries.map((country) => (
                <Option key={country.code} value={country.code}>
                  {country.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={4}>
            <Button
              type="primary"
              onClick={handleSearchDomain}
              loading={isLoading}
              icon={<SearchOutlined />}
              block
            >
              Analyze
            </Button>
          </Col>
        </Row>
      </Card>

      {overview && (
        <>
          <Row gutter={[16, 16]} className={styles.metricsRow}>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Organic Keywords"
                  value={formatKMB(overview.organicKeywords)}
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Organic Traffic"
                  value={formatKMB(overview.organicTraffic)}
                  prefix={<LineChartOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Traffic Cost"
                  value={`$${formatKMB(overview.organicCost)}`}
                  prefix={<SearchOutlined />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <DomainAuthorityCard authority={authority} loading={isLoading} />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <TrophyOutlined />
                    Top Organic Keywords
                    <Tooltip title="Keywords bringing the most organic traffic">
                      <InfoCircleOutlined style={{ color: "#999" }} />
                    </Tooltip>
                  </Space>
                }
                className={styles.tableCard}
              >
                <Table
                  columns={topKeywordsColumns}
                  dataSource={topKeywords?.data || []}
                  pagination={false}
                  loading={isLoading}
                  size="small"
                  scroll={{ x: 400 }}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <LineChartOutlined />
                    Main Organic Competitors
                    <Tooltip title="Domains competing for similar keywords">
                      <InfoCircleOutlined style={{ color: "#999" }} />
                    </Tooltip>
                  </Space>
                }
                className={styles.tableCard}
              >
                <Table
                  columns={competitorsColumns}
                  dataSource={competitors?.data || []}
                  pagination={false}
                  loading={isLoading}
                  size="small"
                  scroll={{ x: 400 }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card
                title={
                  <Space>
                    <BookOutlined />
                    Topics
                    <Tooltip title="Content topics generating organic traffic">
                      <InfoCircleOutlined style={{ color: "#999" }} />
                    </Tooltip>
                  </Space>
                }
                className={styles.tableCard}
              >
                <Table
                  columns={topicsColumns}
                  dataSource={topics?.data || []}
                  pagination={{ pageSize: 10 }}
                  loading={isLoading}
                  size="small"
                  scroll={{ x: 400 }}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}

      {!overview && !isLoading && (
        <Card className={styles.emptyState}>
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <GlobalOutlined style={{ fontSize: "64px", color: "#d9d9d9" }} />
            <Title level={3} type="secondary">
              Enter a domain to start analysis
            </Title>
            <Text type="secondary">
              Get comprehensive domain insights including organic keywords,
              traffic, and competitors
            </Text>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DomainOverviewDashboard;
