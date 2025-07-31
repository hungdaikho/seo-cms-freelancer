"use client";
import React from "react";
import {
  Card,
  Table,
  Tag,
  Typography,
  Row,
  Col,
  Statistic,
  Progress,
} from "antd";
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useDomain } from "@/stores/hooks";
import type {
  TopKeyword,
  DomainCompetitor,
  ContentTopic,
} from "@/services/domain.service";

const { Title, Text } = Typography;

interface Props {
  domain: string;
}

const DomainAnalysisDetail: React.FC<Props> = ({ domain }) => {
  const {
    overview,
    topKeywords,
    competitors,
    topics,
    authority,
    overviewLoading,
    topKeywordsLoading,
    competitorsLoading,
    topicsLoading,
    authorityLoading,
  } = useDomain();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const keywordColumns = [
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
          color={position <= 3 ? "green" : position <= 10 ? "orange" : "red"}
        >
          #{position}
        </Tag>
      ),
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      render: (volume: number) => formatNumber(volume),
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
      render: (traffic: number) => formatNumber(traffic),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      render: (cpc: number) => `$${cpc.toFixed(2)}`,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty: number) => (
        <Progress percent={difficulty} size="small" showInfo={false} />
      ),
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      render: (trend: string) => {
        if (trend === "up") return <RiseOutlined style={{ color: "green" }} />;
        if (trend === "down") return <FallOutlined style={{ color: "red" }} />;
        return <span style={{ color: "gray" }}>-</span>;
      },
    },
  ];

  const competitorColumns = [
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Competition Level",
      dataIndex: "competitionLevel",
      key: "competitionLevel",
      render: (level: number) => <Progress percent={level} size="small" />,
    },
    {
      title: "Common Keywords",
      dataIndex: "commonKeywords",
      key: "commonKeywords",
      render: (count: number) => formatNumber(count),
    },
    {
      title: "Authority Score",
      dataIndex: "authorityScore",
      key: "authorityScore",
      render: (score: number) => (
        <Tag color={score >= 80 ? "green" : score >= 60 ? "orange" : "red"}>
          {score}
        </Tag>
      ),
    },
    {
      title: "Estimated Traffic",
      dataIndex: "estimatedTraffic",
      key: "estimatedTraffic",
      render: (traffic: number) => formatNumber(traffic),
    },
    {
      title: "Traffic Gap",
      dataIndex: "trafficGap",
      key: "trafficGap",
      render: (gap: number) => (
        <Text type={gap > 0 ? "success" : "danger"}>
          {gap > 0 ? "+" : ""}
          {formatNumber(gap)}
        </Text>
      ),
    },
  ];

  const topicColumns = [
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
      render: (traffic: number) => formatNumber(traffic),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty: number) => (
        <Progress percent={difficulty} size="small" />
      ),
    },
    {
      title: "Opportunities",
      dataIndex: "opportunities",
      key: "opportunities",
      render: (count: number) => <Tag color="blue">{count} new keywords</Tag>,
    },
  ];

  if (!domain) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <Text type="secondary">Select a domain to view detailed analysis</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Domain Analysis: {domain}</Title>

      {/* Domain Overview Stats */}
      {overview && (
        <Card title="Domain Overview" style={{ marginBottom: "20px" }}>
          <Row gutter={24}>
            <Col span={6}>
              <Statistic
                title="Authority Score"
                value={overview.authorityScore}
                prefix={<TrophyOutlined />}
                suffix="/100"
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Organic Traffic"
                value={formatNumber(overview.organicTraffic)}
                prefix={<EyeOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Organic Keywords"
                value={formatNumber(overview.organicKeywords)}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Backlinks"
                value={formatNumber(overview.backlinks)}
              />
            </Col>
          </Row>

          <Row gutter={24} style={{ marginTop: "20px" }}>
            <Col span={6}>
              <Statistic
                title="Referring Domains"
                value={formatNumber(overview.referringDomains)}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Organic Cost"
                value={`$${formatNumber(overview.organicCost)}`}
              />
            </Col>
            <Col span={12}>
              <Title level={5}>Top Countries</Title>
              {overview.topCountries.slice(0, 3).map((country, index) => (
                <div key={country.country} style={{ marginBottom: "8px" }}>
                  <Text>{country.country}: </Text>
                  <Text strong>
                    {formatNumber(country.traffic)} (
                    {country.percentage.toFixed(1)}%)
                  </Text>
                </div>
              ))}
            </Col>
          </Row>
        </Card>
      )}

      {/* Domain Authority */}
      {authority && (
        <Card
          title="Domain Authority Comparison"
          style={{ marginBottom: "20px" }}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Statistic
                title="Moz Domain Authority"
                value={authority.moz}
                suffix="/100"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Ahrefs Domain Rating"
                value={authority.ahrefs}
                suffix="/100"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="SEMrush Authority Score"
                value={authority.semrush}
                suffix="/100"
              />
            </Col>
          </Row>
        </Card>
      )}

      {/* Top Keywords */}
      <Card
        title={`Top Keywords ${
          topKeywords ? `(${topKeywords.total} total)` : ""
        }`}
        style={{ marginBottom: "20px" }}
      >
        <Table
          dataSource={topKeywords?.data || []}
          columns={keywordColumns}
          loading={topKeywordsLoading}
          pagination={{ pageSize: 10 }}
          rowKey="keyword"
        />
      </Card>

      {/* Competitors */}
      <Card
        title={`Competitors ${
          competitors ? `(${competitors.total} found)` : ""
        }`}
        style={{ marginBottom: "20px" }}
      >
        <Table
          dataSource={competitors?.data || []}
          columns={competitorColumns}
          loading={competitorsLoading}
          pagination={{ pageSize: 10 }}
          rowKey="domain"
        />
      </Card>

      {/* Content Topics */}
      <Card
        title={`Content Topics ${topics ? `(${topics.total} found)` : ""}`}
        style={{ marginBottom: "20px" }}
      >
        <Table
          dataSource={topics?.data || []}
          columns={topicColumns}
          loading={topicsLoading}
          pagination={{ pageSize: 10 }}
          rowKey="topic"
          expandable={{
            expandedRowRender: (record: ContentTopic) => (
              <div style={{ margin: "10px 0" }}>
                <Text strong>Top Keywords in this topic:</Text>
                <div style={{ marginTop: "8px" }}>
                  {record.topKeywords.map((keyword, index) => (
                    <Tag key={index} style={{ marginBottom: "4px" }}>
                      {keyword}
                    </Tag>
                  ))}
                </div>
              </div>
            ),
          }}
        />
      </Card>
    </div>
  );
};

export default DomainAnalysisDetail;
