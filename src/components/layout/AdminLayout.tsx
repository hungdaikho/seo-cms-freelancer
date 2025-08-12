"use client";

import React from "react";
import { Layout, Menu, Avatar, Dropdown, Button, theme, Space } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  CrownOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isSuperAdmin } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Menu items for admin navigation
  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/dashboard/users",
      icon: <UserOutlined />,
      label: "User Management",
    },
    {
      key: "/dashboard/plans",
      icon: <CrownOutlined />,
      label: "Subscription Plans",
    },
    {
      key: "/dashboard/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  // Dropdown menu for user profile
  const profileMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: () => {
        localStorage.setItem("accessToken", "");
        router.push("/");
      },
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  const handleProfileMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      // Handle logout logic here
      console.log("Logout clicked");
    } else {
      console.log("Profile menu item clicked:", key);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
        }}
        width={260}
        collapsedWidth={80}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? "0" : "0 24px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {!collapsed ? (
            <h2 style={{ margin: 0, color: "#1890ff", fontWeight: "bold" }}>
              SEO CMS Admin
            </h2>
          ) : (
            <div
              style={{
                width: 32,
                height: 32,
                background: "#1890ff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              A
            </div>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            border: "none",
            marginTop: 16,
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Space>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 40,
                height: 40,
              }}
            />
            <h3 style={{ margin: 0, color: "#262626" }}>Admin Dashboard</h3>
          </Space>

          <Dropdown
            menu={{
              items: profileMenuItems,
              onClick: handleProfileMenuClick,
            }}
            placement="bottomRight"
            arrow
          >
            <Space style={{ cursor: "pointer" }}>
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff" }}
              />
              <span style={{ color: "#262626" }}>{user?.name || "Admin"}</span>
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
