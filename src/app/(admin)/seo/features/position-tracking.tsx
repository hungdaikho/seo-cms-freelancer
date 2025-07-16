import React from "react";
import { Card, Row, Col, Button, Select, Progress } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styles from "./position-tracking.module.scss";

const { Option } = Select;

const PositionTracking: React.FC = () => {
  return (
    <Card className={styles.positionCard}>
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.cardTitle}>
            Position Tracking <InfoCircleOutlined className={styles.infoIcon} />
          </h3>
          <div className={styles.locationSelector}>
            <span>🇻🇳 Vietnam (Google) - Vietnamese</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.updateTime}>Updated: 12 hours ago</span>
          <span className={styles.dateRange}>Jul 9 - Jul 15, 2025</span>
          <Select defaultValue="7days" size="small">
            <Option value="7days">last 7 days</Option>
          </Select>
          <Button type="text" size="small">
            ✕
          </Button>
        </div>
      </div>

      <div className={styles.visibilitySection}>
        <div className={styles.visibilityScore}>
          <span className={styles.visibilityLabel}>Visibility</span>
          <div className={styles.scoreValue}>0%</div>
        </div>

        <div className={styles.keywordStats}>
          <Row gutter={24}>
            <Col span={6}>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Keywords</div>
                <div className={styles.statSection}>
                  <div className={styles.sectionTitle}>Top 3</div>
                  <div className={styles.sectionValue}>0</div>
                  <div className={styles.changes}>
                    <span className={styles.new}>new 0</span>
                    <span className={styles.lost}>lost 0</span>
                  </div>
                  <Progress
                    percent={0}
                    showInfo={false}
                    strokeColor="#1890ff"
                  />
                </div>
              </div>
            </Col>

            <Col span={6}>
              <div className={styles.statItem}>
                <div className={styles.statSection}>
                  <div className={styles.sectionTitle}>Top 10</div>
                  <div className={styles.sectionValue}>0</div>
                  <div className={styles.changes}>
                    <span className={styles.new}>new 0</span>
                    <span className={styles.lost}>lost 0</span>
                  </div>
                  <Progress
                    percent={0}
                    showInfo={false}
                    strokeColor="#1890ff"
                  />
                </div>
              </div>
            </Col>

            <Col span={6}>
              <div className={styles.statItem}>
                <div className={styles.statSection}>
                  <div className={styles.sectionTitle}>Top 20</div>
                  <div className={styles.sectionValue}>0</div>
                  <div className={styles.changes}>
                    <span className={styles.new}>new 0</span>
                    <span className={styles.lost}>lost 0</span>
                  </div>
                  <Progress
                    percent={0}
                    showInfo={false}
                    strokeColor="#1890ff"
                  />
                </div>
              </div>
            </Col>

            <Col span={6}>
              <div className={styles.statItem}>
                <div className={styles.statSection}>
                  <div className={styles.sectionTitle}>Top 100</div>
                  <div className={styles.sectionValue}>0</div>
                  <div className={styles.changes}>
                    <span className={styles.new}>new 0</span>
                    <span className={styles.lost}>lost 0</span>
                  </div>
                  <Progress
                    percent={0}
                    showInfo={false}
                    strokeColor="#1890ff"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className={styles.topKeywords}>
          <div className={styles.topKeywordsHeader}>
            <span>Top Keywords</span>
          </div>
          <div className={styles.keywordTable}>
            <div className={styles.tableHeader}>
              <span>Keywords</span>
              <span>Position</span>
              <span>Visibility</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.keyword}>thiết kế web</span>
              <span>—</span>
              <span>0%</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <Button type="link">View full report</Button>
      </div>
    </Card>
  );
};

export default PositionTracking;
