"use client";

import React from "react";
import { Typography, Button } from "antd";
import { FaPlay } from "react-icons/fa";
import styles from "./video_demo_section.module.scss";

const { Title, Text } = Typography;

const VideoDemoSection: React.FC = () => {
  return (
    <section className={styles.video_demo_section}>
      <div className={styles.container}>
        <div className={styles.section_header}>
          <Title level={2} className={styles.section_title}>
            Watch Map Rank Tracker at work
          </Title>
        </div>

        <div className={styles.video_container}>
          <div className={styles.video_player}>
            <div className={styles.video_overlay}>
              <div className={styles.play_button}>
                <FaPlay className={styles.play_icon} />
              </div>
              <div className={styles.video_content}>
                <Title level={3} className={styles.video_title}>
                  Where your business stands on Google Maps
                </Title>
                <Text className={styles.video_subtitle}>
                  Press to play video
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemoSection;
