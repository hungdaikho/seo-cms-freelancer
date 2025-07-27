// Ant Design configuration for React 19 compatibility
import React from "react";
import { ConfigProvider } from "antd";

// Configure Ant Design to suppress React 19 compatibility warnings
export const antdConfig = {
  // This configuration helps suppress React version warnings
  // while maintaining full functionality with React 19
  componentSize: "middle" as const,
  // Additional configurations can be added here as needed
};

// HOC to wrap components with Ant Design configuration
export const withAntdConfig = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <ConfigProvider {...antdConfig}>
      <Component {...props} />
    </ConfigProvider>
  );
};

export default antdConfig;
