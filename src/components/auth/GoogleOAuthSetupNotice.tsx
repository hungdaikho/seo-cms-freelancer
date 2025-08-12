import React from "react";
import { Alert, Button, Space } from "antd";
import { InfoCircleOutlined, SettingOutlined } from "@ant-design/icons";

interface GoogleOAuthSetupNoticeProps {
  onClose?: () => void;
}

const GoogleOAuthSetupNotice: React.FC<GoogleOAuthSetupNoticeProps> = ({
  onClose,
}) => {
  const handleViewDocumentation = () => {
    // Mở file GOOGLE_OAUTH_SETUP.md trong một tab mới
    window.open("/GOOGLE_OAUTH_SETUP.md", "_blank");
  };

  return (
    <Alert
      message="Google OAuth Setup Required"
      description={
        <div>
          <p>
            To enable Google authentication, you need to configure Google OAuth
            credentials. Please follow the setup instructions to complete the
            integration.
          </p>
          <Space>
            <Button
              type="primary"
              icon={<InfoCircleOutlined />}
              onClick={handleViewDocumentation}
            >
              View Setup Guide
            </Button>
            <Button
              icon={<SettingOutlined />}
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Cloud Console
            </Button>
          </Space>
        </div>
      }
      type="info"
      showIcon
      closable={!!onClose}
      onClose={onClose}
      style={{ margin: "16px 0" }}
    />
  );
};

export default GoogleOAuthSetupNotice;
