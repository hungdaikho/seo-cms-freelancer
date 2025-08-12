"use client";
import "../../config/i18n";
import ReduxProvider from "@/provider/redux_provider";
import { useEffect } from "react";
import suppressAntdReact19Warning from "@/utils/suppress-warnings";
import { ConfigProvider } from "antd";
import { antdConfig } from "@/config/antd.config";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Suppress Ant Design React 19 compatibility warnings
  useEffect(() => {
    suppressAntdReact19Warning();
  }, []);

  return (
    <html>
      <body>
        <ReduxProvider>
          <ConfigProvider {...antdConfig}>{children}</ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
