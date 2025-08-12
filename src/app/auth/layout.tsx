"use client";
import "../../config/i18n";
import ReduxProvider from "@/provider/redux_provider";
import "../globals.css";
import { useEffect } from "react";
import suppressAntdReact19Warning from "@/utils/suppress-warnings";
import { ConfigProvider } from "antd";
import { antdConfig } from "@/config/antd.config";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Suppress Ant Design React 19 compatibility warnings
  useEffect(() => {
    suppressAntdReact19Warning();
  }, []);

  return (
    <html lang="en">
      <body
        style={{
          fontSize: "16px",
          fontFamily: "inherit",
          background: "#f5f5f5",
        }}
      >
        <ReduxProvider>
          <ConfigProvider {...antdConfig}>{children}</ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
