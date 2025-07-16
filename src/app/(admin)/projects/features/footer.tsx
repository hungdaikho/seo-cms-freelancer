import React from "react";
import { Button, Select, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import styles from "./footer.module.scss";

type Props = {};

const { Option } = Select;

const FooterProject = (props: Props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Left section - Navigation links */}
        <div className={styles.leftSection}>
          <Space size={24}>
            <a href="#" className={styles.link}>
              Contact us
            </a>
            <a href="#" className={styles.link}>
              About us
            </a>
            <a href="#" className={styles.link}>
              Blog
            </a>
            <div className={styles.languageSelector}>
              <GlobalOutlined className={styles.globeIcon} />
              <Select
                defaultValue="English"
                variant="borderless"
                className={styles.languageSelect}
              >
                <Option value="en">English</Option>
                <Option value="vi">Tiếng Việt</Option>
                <Option value="es">Español</Option>
              </Select>
            </div>
          </Space>
        </div>

        {/* Right section - Action buttons */}
        <div className={styles.rightSection}>
          <Space size={12}>
            <Button type="text" className={styles.planButton}>
              See plans and pricing
            </Button>
            <Button type="primary" className={styles.startButton}>
              Get started with Semrush
            </Button>
          </Space>
        </div>
      </div>

      {/* Bottom section - Legal links and copyright */}
      <div className={styles.bottomSection}>
        <div className={styles.legalLinks}>
          <Space size={16}>
            <a href="#" className={styles.legalLink}>
              Cookie settings
            </a>
            <a href="#" className={styles.legalLink}>
              Legal info
            </a>
            <a href="#" className={styles.legalLink}>
              Privacy policy
            </a>
            <a href="#" className={styles.legalLink}>
              Do not sell my personal info
            </a>
          </Space>
        </div>
        <div className={styles.copyright}>
          © 2008 - 2025 Semrush. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterProject;
