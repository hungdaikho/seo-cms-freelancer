"use client";
import "../../config/i18n";
import ReduxProvider from "@/provider/redux_provider";
import AuthGuard from "@/components/layout/auth_guard";
import "../globals.css";
import { useTranslation } from "react-i18next";
import { Content, Header } from "antd/es/layout/layout";
import { Layout, ConfigProvider } from "antd";
import Sider from "antd/es/layout/Sider";
import HeaderDashboard from "@/components/layout/dashboard/header/header.dashboard";
import SiderDashBoard from "@/components/layout/dashboard/sider/sider.dashboard";
import { useEffect } from "react";
import suppressAntdReact19Warning from "@/utils/suppress-warnings";
import { antdConfig } from "@/config/antd.config";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = useTranslation();
  // Suppress Ant Design React 19 compatibility warnings
  useEffect(() => {
    suppressAntdReact19Warning();
  }, []);

  return (
    <html lang={i18n.language}>
      <body
        style={{
          fontSize: "16px",
          fontFamily: "inherit",
          background:
            "linear-gradient(135deg, #f8f9ff 0%, rgba(255, 145, 77, 0.05) 100%)",
          color: "#000",
        }}
      >
        <ReduxProvider>
          <ConfigProvider {...antdConfig}>
            <AuthGuard requireAuth={true} redirectTo="/">
              <Layout
                style={{
                  width: "100vw",
                  height: "100vh",
                  position: "relative",
                }}
              >
                <Header
                  style={{
                    height: "50px",
                    padding: "0px",
                    margin: "0px",
                    background: "transparent",
                  }}
                >
                  <HeaderDashboard />
                </Header>
                <Layout
                  style={{
                    width: "100%",
                    height: "calc(100% - 50px)",
                    overflow: "hidden",
                  }}
                >
                  <Sider width={76} style={{ background: "transparent" }}>
                    <SiderDashBoard />
                  </Sider>
                  <Content style={{ maxHeight: "100%", overflow: "auto" }}>
                    {children}
                  </Content>
                </Layout>
              </Layout>
            </AuthGuard>
          </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
