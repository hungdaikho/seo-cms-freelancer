import React from "react";
import { Card, Button, Row, Col } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import styles from "./tools-section.module.scss";

interface ToolCardProps {
  title: string;
  description: string;
  hasSettings?: boolean;
  onSetup?: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  hasSettings = false,
  onSetup,
}) => {
  return (
    <Card className={styles.toolCard} size="small">
      <div className={styles.toolHeader}>
        <h4 className={styles.toolTitle}>{title}</h4>
        {hasSettings && <SettingOutlined className={styles.settingsIcon} />}
        <Button type="text" size="small" className={styles.closeBtn}>
          ✕
        </Button>
      </div>
      <p className={styles.toolDescription}>{description}</p>
      <Button
        type="primary"
        size="small"
        onClick={onSetup}
        className={styles.setupBtn}
      >
        Set up
      </Button>
    </Card>
  );
};

const ToolsSection: React.FC = () => {
  return (
    <div className={styles.toolsContainer}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ToolCard
            title="Site Audit"
            description="Detect issues related to crawlability, content, links and coding."
            hasSettings={true}
          />
        </Col>
        <Col span={12}>
          <ToolCard
            title="On Page SEO Checker"
            description="Collect ideas on strategy, content, backlinks and more."
            hasSettings={true}
          />
        </Col>
        <Col span={12}>
          <ToolCard
            title="Backlink Audit"
            description="Detoxify your backlink portfolio and strengthen your website rankings."
            hasSettings={true}
          />
        </Col>
        <Col span={12}>
          <ToolCard
            title="Organic Traffic Insights"
            description="Uncover 'not provided' keywords combining GA, GSC and Semrush data."
            hasSettings={true}
          />
        </Col>
        <Col span={24}>
          <ToolCard
            title="Link Building Tool"
            description="Uncover backlink opportunities in your niche."
            hasSettings={true}
          />
        </Col>
      </Row>

      <Card className={styles.organicResearchCard}>
        <div className={styles.researchHeader}>
          <div className={styles.researchLeft}>
            <h3>Organic Research</h3>
            <div className={styles.scopeInfo}>
              <span>Scope: Root Domain</span>
              <span>🇺🇸 United States</span>
              <span>💻 Desktop</span>
            </div>
          </div>
          <div className={styles.researchRight}>
            <span>Last month</span>
            <Button type="text" size="small">
              ✕
            </Button>
          </div>
        </div>

        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📊</div>
          <div className={styles.emptyTitle}>Nothing found</div>
          <div className={styles.emptyText}>
            We haven't found any data for the analyzed domain
          </div>
        </div>

        <div className={styles.connectSection}>
          <h4>Connect Google services</h4>
          <p>
            Enrich your analysis with real-time data from Google Analytics and
            Google Search Console to your SEO Dashboard.
          </p>
          <div className={styles.connectActions}>
            <Button icon="🔗">Connect</Button>
            <Button type="link">Disclaimer</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ToolsSection;
