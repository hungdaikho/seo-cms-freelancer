"use client";
import "../../config/i18n";
import ReduxProvider from "@/provider/redux_provider";
import AuthGuard from "@/components/layout/auth_guard";
import "../globals.css";
import { useTranslation } from "react-i18next";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { Layout, ConfigProvider, App } from "antd";
import Sider from "antd/es/layout/Sider";
import HeaderDashboard from "@/components/layout/dashboard/header/header.dashboard";
import SiderDashBoard from "@/components/layout/dashboard/sider/sider.dashboard";
import FooterComponent from "@/components/layout/footer/footer";
import { useEffect } from "react";
import suppressAntdReact19Warning from "@/utils/suppress-warnings";
import { antdConfig } from "@/config/antd.config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = useTranslation();

  // Suppress Ant Design React 19 compatibility warnings immediately
  if (typeof window !== "undefined") {
    suppressAntdReact19Warning();
  }

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
            <App>
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
                    <Sider width={320} style={{ background: "transparent" }}>
                      <SiderDashBoard />
                    </Sider>
                    <Content style={{ overflow: "auto" }}>
                      <div style={{ minHeight: "100%" }}>
                        {children}
                        <Footer
                          style={{ padding: 0, background: "transparent" }}
                        >
                          <FooterComponent />
                        </Footer>
                      </div>
                    </Content>
                  </Layout>
                </Layout>
              </AuthGuard>
            </App>
          </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
