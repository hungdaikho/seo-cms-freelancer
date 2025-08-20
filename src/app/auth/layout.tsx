"use client";
import "../../config/i18n";
import ReduxProvider from "@/provider/redux_provider";
import "../globals.css";
import { IBM_Plex_Mono } from "next/font/google";
import { useEffect } from "react";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});
import suppressAntdReact19Warning from "@/utils/suppress-warnings";
import { ConfigProvider, App } from "antd";
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
        className={`${ibmPlexMono.variable} font-mono`}
        style={{
          fontSize: "16px",
          background: "#f5f5f5",
        }}
      >
        <ReduxProvider>
          <ConfigProvider {...antdConfig}>
            <App>{children}</App>
          </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
