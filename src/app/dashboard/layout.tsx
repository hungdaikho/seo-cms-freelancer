"use client";

import React from "react";
import DashboardGuard from "@/components/auth/DashboardGuard";
import ReduxProvider from "@/provider/redux_provider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
        <ReduxProvider>
          <DashboardGuard>{children}</DashboardGuard>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default DashboardLayout;
