"use client";
import React, { useState } from "react";
import { Input, Select, Button, Card, Typography } from "antd";
import { CloseOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import styles from "./domain.module.scss";

const { Option } = Select;
const { Title, Text } = Typography;

type Props = {};

const Domain = (props: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState("US");

  const handleAddDomain = () => {
    if (domain.trim()) {
      console.log("Adding domain:", domain, "Country:", country);
      // Add your logic here
    }
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
              <div className={styles.domainItem}>
                <div className={styles.domainInfo}>
                  <Text className={styles.domainName}>domain.com</Text>
                  <Text className={styles.domainStats}>50.5M</Text>
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
            </Card>
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
                  placeholder="Enter domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className={styles.domainInput}
                />
                <Select
                  value={country}
                  onChange={setCountry}
                  className={styles.countrySelect}
                  suffixIcon={null}
                >
                  <Option value="US">🇺🇸 US</Option>
                  <Option value="UK">🇬🇧 UK</Option>
                  <Option value="CA">🇨🇦 CA</Option>
                  <Option value="AU">🇦🇺 AU</Option>
                </Select>
                <Button
                  type="primary"
                  onClick={handleAddDomain}
                  className={styles.addButton}
                >
                  + Add domain
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Domain;
