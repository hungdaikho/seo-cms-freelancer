import React from "react";
import { Button, Progress, Tooltip, Badge } from "antd";
import {
  ShareAltOutlined,
  PlusOutlined,
  SettingOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import styles from "./seo_project.module.scss";

type Props = {};

const SeoProject = (props: Props) => {
  return (
    <div className={styles.seoProject}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>SEO Projects</h1>
        <div className={styles.headerActions}>
          <Button icon={<ShareAltOutlined />} className={styles.shareBtn}>
            Share
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className={styles.createBtn}
          >
            Create SEO Project
          </Button>
        </div>
      </div>

      {/* Project Card */}
      <div className={styles.projectCard}>
        <div className={styles.projectHeader}>
          <div className={styles.projectInfo}>
            <div className={styles.projectUrl}>
              <LinkOutlined className={styles.linkIcon} />
              <span className={styles.urlText}>vanhungtran.com</span>
            </div>
            <div className={styles.ascore}>
              <span className={styles.ascoreLabel}>AScore:</span>
              <Badge count={2} className={styles.ascoreBadge} />
            </div>
          </div>
          <Button icon={<SettingOutlined />} className={styles.settingsBtn} />
        </div>

        {/* Metrics */}
        <div className={styles.metrics}>
          {/* Site Health */}
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h3 className={styles.metricTitle}>Site Health</h3>
              <Button type="primary" size="small" className={styles.setupBtn}>
                Set up
              </Button>
            </div>
            <p className={styles.metricDescription}>Check website issues.</p>
          </div>

          {/* Visibility */}
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h3 className={styles.metricTitle}>Visibility</h3>
            </div>
            <div className={styles.metricValue}>0%</div>
            <div className={styles.metricSubtext}>
              <span>0%</span>
              <span className={styles.timeAgo}>5 hours ago</span>
            </div>
          </div>

          {/* Organic Traffic */}
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h3 className={styles.metricTitle}>Organic Traffic</h3>
            </div>
            <div className={styles.metricValue}>0</div>
            <div className={styles.metricSubtext}>
              <span>0%</span>
            </div>
          </div>

          {/* Organic Keywords */}
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h3 className={styles.metricTitle}>Organic Keywords</h3>
            </div>
            <div className={styles.metricValue}>2</div>
            <div className={styles.metricSubtext}>
              <span>0%</span>
            </div>
          </div>

          {/* Backlinks */}
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h3 className={styles.metricTitle}>Backlinks</h3>
            </div>
            <div className={styles.metricValue}>107</div>
            <div className={styles.metricSubtext}>
              <span>0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoProject;
