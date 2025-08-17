"use client";

import React, { memo } from "react";
import { Card, Row, Col, Statistic } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface StatsCardsProps {
  projects: any[];
  isFiltered: boolean;
}

const StatsCards = memo(({ projects, isFiltered }: StatsCardsProps) => {
  const totalProjects = projects.length;
  const totalKeywords = projects.reduce((sum, p) => sum + (p._count?.keywords || 0), 0);
  const totalAudits = projects.reduce((sum, p) => sum + (p._count?.audits || 0), 0);
  const totalBacklinks = projects.reduce((sum, p) => sum + (p._count?.backlinks || 0), 0);

  return (
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col span={6}>
        <Card hoverable>
          <Statistic 
            title={`Projects ${isFiltered ? '(Filtered)' : ''}`}
            value={totalProjects} 
            valueStyle={{ color: '#1890ff' }}
            prefix={isFiltered ? <SearchOutlined /> : undefined}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card hoverable>
          <Statistic 
            title="Total Keywords" 
            value={totalKeywords} 
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card hoverable>
          <Statistic 
            title="SEO Audits" 
            value={totalAudits} 
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card hoverable>
          <Statistic 
            title="Backlinks" 
            value={totalBacklinks}
            valueStyle={{ color: '#722ed1' }}
          />
        </Card>
      </Col>
    </Row>
  );
});

StatsCards.displayName = 'StatsCards';

export default StatsCards;
