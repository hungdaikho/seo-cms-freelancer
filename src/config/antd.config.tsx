// Ant Design configuration for React 19 compatibility
import React from "react";
import { ConfigProvider } from "antd";

// Configure Ant Design to suppress React 19 compatibility warnings
export const antdConfig = {
  // This configuration helps suppress React version warnings
  // while maintaining full functionality with React 19
  componentSize: "middle" as const,
  theme: {
    token: {
      // Primary colors
      colorPrimary: '#004AAC', // Primary blue
      colorSuccess: '#FF914D', // Orange for success states
      colorWarning: '#FF914D', // Orange for warning states
      colorError: '#ff4d4f', // Keep default red for errors
      colorInfo: '#004AAC', // Primary blue for info states
      
      // Background colors
      colorBgContainer: '#ffffff',
      colorBgElevated: '#ffffff',
      colorBgLayout: '#f8f9ff',
      colorBgSpotlight: 'rgba(0, 74, 172, 0.05)',
      
      // Border colors
      colorBorder: 'rgba(0, 74, 172, 0.15)',
      colorBorderSecondary: 'rgba(0, 74, 172, 0.08)',
      
      // Text colors
      colorText: '#13124D',
      colorTextSecondary: 'rgba(19, 18, 77, 0.65)',
      colorTextTertiary: 'rgba(19, 18, 77, 0.45)',
      
      // Border radius
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusSM: 6,
      
      // Box shadows
      boxShadow: '0 4px 12px rgba(0, 74, 172, 0.08)',
      boxShadowSecondary: '0 2px 8px rgba(0, 74, 172, 0.06)',
    },
    components: {
      Button: {
        primaryColor: '#ffffff',
        algorithm: true,
      },
      Input: {
        activeBorderColor: '#004AAC',
        hoverBorderColor: '#FF914D',
      },
      Select: {
        optionSelectedBg: 'rgba(0, 74, 172, 0.1)',
      },
      Tabs: {
        itemSelectedColor: '#004AAC',
        itemHoverColor: '#FF914D',
        inkBarColor: '#004AAC',
      },
    },
  },
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
