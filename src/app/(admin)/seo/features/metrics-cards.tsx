import React from "react";
import { Card, Row, Col, Select, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styles from "./metrics-cards.module.scss";

const { Option } = Select;

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  percentage?: string;
  hasInfo?: boolean;
  color?: string;
  children?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  percentage,
  hasInfo = false,
  color,
  children,
}) => {
  return (
    <Card className={styles.metricCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        {hasInfo && <InfoCircleOutlined className={styles.infoIcon} />}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.mainValue} style={{ color }}>
          {value}
          {percentage && (
            <span className={styles.percentage}>{percentage}</span>
          )}
        </div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {children}
      </div>
    </Card>
  );
};

const MetricsCards: React.FC = () => {
  return (
    <div className={styles.metricsSection}>
      <Row gutter={24}>
        <Col span={6}>
          <MetricCard
            title="Domain Analytics"
            value="2"
            subtitle="Semrush Rank"
            hasInfo={true}
          >
            <div className={styles.additionalInfo}>
              <div>
                Authority Score: <span className={styles.score}>2</span>
              </div>
            </div>
          </MetricCard>
        </Col>

        <Col span={6}>
          <MetricCard
            title="Organic Traffic"
            value="0"
            percentage="0%"
            hasInfo={true}
          />
        </Col>

        <Col span={6}>
          <MetricCard
            title="Organic Keywords"
            value="0"
            percentage="0%"
            hasInfo={true}
          >
            <div className={styles.additionalInfo}>
              <div>
                Paid Keywords: <span className={styles.score}>0</span>
              </div>
              <div>
                Paid Traffic: <span className={styles.score}>0</span>
              </div>
            </div>
          </MetricCard>
        </Col>

        <Col span={6}>
          <MetricCard
            title="Ref. Domains"
            value="71"
            percentage="0%"
            color="#1890ff"
            hasInfo={true}
          >
            <div className={styles.additionalInfo}>
              <div>
                Backlinks: <span className={styles.score}>107</span>
              </div>
            </div>
          </MetricCard>
        </Col>
      </Row>

      <div className={styles.filterSection}>
        <div className={styles.scopeFilter}>
          <span>Scope: Root Domain</span>
          <Select defaultValue="us" style={{ width: 120, marginLeft: 8 }}>
            <Option value="us">🇺🇸 United States</Option>
          </Select>
          <Select defaultValue="desktop" style={{ width: 100, marginLeft: 8 }}>
            <Option value="desktop">💻 Desktop</Option>
          </Select>
          <span style={{ marginLeft: 8 }}>Jul 14, 2025</span>
          <Button type="text" size="small" style={{ marginLeft: 8 }}>
            ✕
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetricsCards;
