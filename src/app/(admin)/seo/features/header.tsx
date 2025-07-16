import React from "react";
import { Button, Space, Select, DatePicker } from "antd";
import {
  PlusOutlined,
  ShareAltOutlined,
  SettingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import styles from "./header.module.scss";

const { RangePicker } = DatePicker;

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.breadcrumb}>
          <span>Home</span>
          <span className={styles.separator}>〉</span>
          <span>SEO</span>
        </div>
        <Button
          type="link"
          icon={<MessageOutlined />}
          className={styles.feedbackBtn}
        >
          Send feedback
        </Button>
      </div>

      <div className={styles.headerMain}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            SEO Dashboard:{" "}
            <span className={styles.domain}>vanhungtran.com</span>
            <Button type="link" size="small" className={styles.linkBtn}>
              🔗
            </Button>
          </h1>
        </div>

        <div className={styles.actions}>
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              Create SEO Project
            </Button>
            <Button icon={<ShareAltOutlined />}>Share</Button>
            <Button icon={<SettingOutlined />} />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Header;
