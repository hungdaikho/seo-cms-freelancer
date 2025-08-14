"use client";

import React, { useState, useEffect } from "react";
import { Button, Select, Space, Typography, Input, Table } from "antd";
import {
  PlusOutlined,
  ShareAltOutlined,
  DownOutlined,
  FlagOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Title, Text } = Typography;

type Props = {};

const Page = (props: Props) => {
  const [selectedCountry, setSelectedCountry] = useState("Nig");

  // Mock data for projects table
  const projectsData = [
    {
      key: "1",
      project: "Gooz.com",
      domain: "gooz.online",
      status: "Set Up",
      siteAudit: "Set Up",
      positionTracking: "Set Up",
      onPageSEOChecker: "Set Up",
      socialMediaTools: "Set Up",
      brandMonitoring: "Set Up",
      backlinkAudit: "Set Up",
      buildingLinks: "Set Up",
      ppcKeyword: "Set Up",
      organicTraffic: "Set Up",
      socialMedia: "Set Up",
    },
    {
      key: "2",
      project: "Gooz.com",
      domain: "gooz.online",
      status: "Set Up",
      siteAudit: "Set Up",
      positionTracking: "Set Up",
      onPageSEOChecker: "Set Up",
      socialMediaTools: "Set Up",
      brandMonitoring: "Set Up",
      backlinkAudit: "Set Up",
      buildingLinks: "Set Up",
      ppcKeyword: "Set Up",
      organicTraffic: "Set Up",
      socialMedia: "Set Up",
    },
  ];

  const columns = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      width: 120,
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: "bold", color: "#1890ff" }}>{text}</div>
          <div style={{ fontSize: "12px", color: "#999" }}>{record.domain}</div>
        </div>
      ),
    },
    {
      title: "Site Audit & Keyword Vulnerability",
      dataIndex: "siteAudit",
      key: "siteAudit",
      width: 150,
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "Position Tracking",
      dataIndex: "positionTracking",
      key: "positionTracking",
      width: 120,
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "On-page SEO Checker",
      dataIndex: "onPageSEOChecker",
      key: "onPageSEOChecker",
      width: 130,
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "Social Media Tools",
      dataIndex: "socialMediaTools",
      key: "socialMediaTools",
      width: 120,
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "Brand Monitoring",
      dataIndex: "brandMonitoring",
      key: "brandMonitoring",
      width: 120,
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "Backlink Audit & Link Building Tools",
      dataIndex: "backlinkAudit",
      key: "backlinkAudit",
      width: 180,
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "PPC Keyword & Advertising",
      dataIndex: "ppcKeyword",
      key: "ppcKeyword",
      width: 150,
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "Organic Traffic & Organic Sessions",
      dataIndex: "organicTraffic",
      key: "organicTraffic",
      width: 180,
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "Social Media Content Management",
      dataIndex: "socialMedia",
      key: "socialMedia",
      width: 180,
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
  ];

  // Render header with search and country selector
  const renderHeader = () => (
    <div
      style={{
        padding: "16px 24px",
        background: "white",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Search
          placeholder="Enter URL, domain or keyword"
          style={{ width: 400 }}
          size="large"
        />
        <Select
          value={selectedCountry}
          onChange={setSelectedCountry}
          style={{ width: 120 }}
          size="large"
          suffixIcon={<DownOutlined />}
        >
          <Select.Option value="Nig">
            <Space>
              <FlagOutlined style={{ color: "#52c41a" }} />
              Nig
            </Space>
          </Select.Option>
          <Select.Option value="USA">
            <Space>
              <FlagOutlined style={{ color: "#1890ff" }} />
              USA
            </Space>
          </Select.Option>
          <Select.Option value="UK">
            <Space>
              <FlagOutlined style={{ color: "#f5222d" }} />
              UK
            </Space>
          </Select.Option>
        </Select>
      </div>
      <Button type="primary" size="large">
        Search
      </Button>
    </div>
  );

  // Render hero section
  const renderHeroSection = () => (
    <div
      style={{
        height: "200px",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diamond pattern overlay */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20L0 0h40L20 20zM20 20L40 40H0L20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );

  // Render projects section
  const renderProjectsSection = () => (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            My Projects
          </Title>
          <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
            <Text
              style={{
                color: "#f5222d",
                fontWeight: "bold",
                borderBottom: "2px solid #f5222d",
                paddingBottom: "8px",
              }}
            >
              All (2)
            </Text>
            <Text style={{ color: "#999" }}>My Own (3)</Text>
            <Text style={{ color: "#999" }}>Shared (0)</Text>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button icon={<ShareAltOutlined />} style={{ borderRadius: "6px" }}>
            Share
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ borderRadius: "6px" }}
          >
            Create Project
          </Button>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            background: "#fafafa",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text strong>Auto Project Set up Report</Text>
          <div style={{ display: "flex", gap: "16px" }}>
            <Button size="small">Search</Button>
          </div>
        </div>

        <Table
          dataSource={projectsData}
          columns={columns}
          pagination={false}
          size="middle"
          scroll={{ x: 1500 }}
        />
      </div>
    </div>
  );

  // Main dashboard content when projects tab is active
  const renderMainDashboard = () => (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      {renderHeader()}
      {renderHeroSection()}
      {renderProjectsSection()}
    </div>
  );
  return (
    <div
      style={{
        padding: "0",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      {renderMainDashboard()}
    </div>
  );
};

export default Page;
