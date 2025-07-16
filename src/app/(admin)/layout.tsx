"use client";
import "../../config/i18n";
import ReduxProvider from "@/provider/redux_provider";
import "../globals.css";
import { useTranslation } from "react-i18next";
import { Content, Header } from "antd/es/layout/layout";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import HeaderDashBorad from "@/components/layout/dashboard/header/header.dashboard";
import SiderDashBoard from "@/components/layout/dashboard/sider/sider.dashboard";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = useTranslation();
  return (
    <html lang={i18n.language}>
      <body
        style={{
          fontSize: "16px",
          fontFamily: "inherit",
          background: "transparent",
          color: "#000",
        }}
      >
        <ReduxProvider>
          <Layout
            style={{ width: "100vw", height: "100vh", position: "relative" }}
          >
            <Header
              style={{
                height: "50px",
                padding: "0px",
                margin: "0px",
                background: "transparent",
              }}
            >
              <HeaderDashBorad />
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
        </ReduxProvider>
      </body>
    </html>
  );
}
