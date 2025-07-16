import React from "react";
import { Row, Col } from "antd";
import Header from "./features/header";
import MetricsCards from "./features/metrics-cards";
import PositionTracking from "./features/position-tracking";
import TrafficAnalytics from "./features/traffic-analytics";
import ToolsSection from "./features/tools-section";
import styles from "./page.module.scss";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.page}>
      <Header />
      <MetricsCards />

      <div className={styles.mainContent}>
        <Row gutter={24}>
          <Col span={16}>
            <PositionTracking />
            <TrafficAnalytics />
          </Col>
          <Col span={8}>
            <ToolsSection />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Page;
