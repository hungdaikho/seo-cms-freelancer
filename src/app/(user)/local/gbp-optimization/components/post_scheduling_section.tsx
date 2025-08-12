"use client";
import React from "react";
import { Button } from "antd";
import { FaCalendarAlt, FaEdit, FaImage } from "react-icons/fa";
import styles from "./post_scheduling_section.module.scss";

type Props = {};

const PostSchedulingSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.postMockup}>
              <div className={styles.postCard}>
                <div className={styles.postHeader}>
                  <div className={styles.businessInfo}>
                    <div className={styles.businessAvatar}></div>
                    <div className={styles.businessDetails}>
                      <h4>New post for Happy Days</h4>
                      <p>
                        Marketing like art is the long coffee brew, can
                        influence our coffee game. Here's the scoop
                      </p>
                    </div>
                  </div>
                  <div className={styles.postActions}>
                    <span className={styles.actionBtn}>👍 Like review</span>
                    <span className={styles.actionBtn}>💬 Post images</span>
                    <span className={styles.actionBtn}>➕ Add button</span>
                  </div>
                </div>

                <div className={styles.postImages}>
                  <div className={styles.imageGrid}>
                    <div className={styles.postImage}></div>
                    <div className={styles.postImage}></div>
                    <div className={styles.postImage}></div>
                  </div>
                </div>

                <div className={styles.postFooter}>
                  <div className={styles.engagement}>
                    <span className={styles.likes}>👍 8 reviews</span>
                    <span className={styles.comments}>💬 Comments</span>
                  </div>
                  <div className={styles.postMeta}>
                    <span className={styles.postDate}>August 24, 2024</span>
                    <span className={styles.postTime}>4:54</span>
                    <span className={styles.postPlatform}>GBP</span>
                  </div>
                </div>
              </div>

              <div className={styles.schedulingPanel}>
                <div className={styles.panelHeader}>
                  <h4>Posts</h4>
                  <div className={styles.panelTabs}>
                    <span className={styles.activeTab}>Published</span>
                    <span className={styles.tab}>Scheduled</span>
                  </div>
                </div>

                <div className={styles.postsList}>
                  <div className={styles.postItem}>
                    <div className={styles.postIcon}>📝</div>
                    <div className={styles.postContent}>
                      <h5>Happy Days</h5>
                      <p>New 2-4 PM</p>
                    </div>
                    <span className={styles.postStatus}>Published</span>
                  </div>

                  <div className={styles.postItem}>
                    <div className={styles.postIcon}>☕</div>
                    <div className={styles.postContent}>
                      <h5>
                        Start your morning with our brand-new selection where
                        fresh grounds for breakfast traditional
                      </h5>
                      <p>August 24, 2024 4:54</p>
                    </div>
                    <span className={styles.postStatus}>Published</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <h3 className={styles.sectionTitle}>
              Turn search views into foot traffic with GBP post scheduling
            </h3>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                Create tailored GBP posts instantly with AI-driven content
                personalized for your business
              </li>
              <li className={styles.featureItem}>
                Save time with posts scheduled weeks in advance—consistent local
                content without the daily hassle!
              </li>
              <li className={styles.featureItem}>
                Manage posts for all locations from a single user-friendly
                dashboard
              </li>
            </ul>

            <Button type="primary" className={styles.connectBtn}>
              Connect your business
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSchedulingSection;
