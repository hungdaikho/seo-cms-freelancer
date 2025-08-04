import React from "react";
import { Card, Row, Col, Statistic, Progress, Divider, Typography } from "antd";
import { DomainAuthorityMetrics } from "@/types/domain-overview.type";

const { Text } = Typography;

interface DomainAuthorityCardProps {
  authority: DomainAuthorityMetrics | null;
  loading?: boolean;
}

export const DomainAuthorityCard: React.FC<DomainAuthorityCardProps> = ({
  authority,
  loading = false,
}) => {
  if (!authority || !authority.metrics) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#faad14";
    if (score >= 40) return "#fa8c16";
    return "#ff4d4f";
  };

  const getSpamScoreColor = (score: number) => {
    if (score <= 1) return "#52c41a";
    if (score <= 5) return "#faad14";
    if (score <= 15) return "#fa8c16";
    return "#ff4d4f";
  };

  return (
    <Card title="Domain Authority Metrics" loading={loading}>
      <Row gutter={[16, 16]}>
        {/* Authority Scores */}
        <Col xs={24}>
          <Text strong>Authority Scores</Text>
          <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
            <Col xs={12} sm={8} md={6}>
              <Statistic
                title="Moz DA"
                value={authority.metrics?.mozDA || 0}
                suffix="/100"
                valueStyle={{
                  color: getScoreColor(authority.metrics?.mozDA || 0),
                }}
              />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Statistic
                title="Ahrefs DR"
                value={authority.metrics?.ahrefsDR || 0}
                suffix="/100"
                valueStyle={{
                  color: getScoreColor(authority.metrics?.ahrefsDR || 0),
                }}
              />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Statistic
                title="SEMrush AS"
                value={authority.metrics?.semrushAS || 0}
                suffix="/100"
                valueStyle={{
                  color: getScoreColor(authority.metrics?.semrushAS || 0),
                }}
              />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Statistic
                title="Majestic TF"
                value={authority.metrics?.majesticTF || 0}
                suffix="/100"
                valueStyle={{
                  color: getScoreColor(authority.metrics?.majesticTF || 0),
                }}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Divider />
        </Col>

        {/* Backlink Metrics */}
        <Col xs={24}>
          <Text strong>Backlink Profile</Text>
          <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
            <Col xs={12} sm={6}>
              <Statistic
                title="Total Backlinks"
                value={authority.backlinks?.total || 0}
                formatter={(value) => value?.toLocaleString()}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="Referring Domains"
                value={authority.backlinks?.referringDomains || 0}
                formatter={(value) => value?.toLocaleString()}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="DoFollow Links"
                value={authority.backlinks?.dofollow || 0}
                formatter={(value) => value?.toLocaleString()}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="NoFollow Links"
                value={authority.backlinks?.nofollow || 0}
                formatter={(value) => value?.toLocaleString()}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Divider />
        </Col>

        {/* Trust Metrics */}
        <Col xs={24}>
          <Text strong>Trust & Quality</Text>
          <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
            <Col xs={8}>
              <Statistic
                title="Trust Flow"
                value={authority.trust?.trustFlow || 0}
                suffix="/100"
                valueStyle={{
                  color: getScoreColor(authority.trust?.trustFlow || 0),
                }}
              />
            </Col>
            <Col xs={8}>
              <Statistic
                title="Citation Flow"
                value={authority.trust?.citationFlow || 0}
                suffix="/100"
                valueStyle={{
                  color: getScoreColor(authority.trust?.citationFlow || 0),
                }}
              />
            </Col>
            <Col xs={8}>
              <Statistic
                title="Spam Score"
                value={authority.trust?.spamScore || 0}
                suffix="%"
                valueStyle={{
                  color: getSpamScoreColor(authority.trust?.spamScore || 0),
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
