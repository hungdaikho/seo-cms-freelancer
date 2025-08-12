"use client";

import React from "react";
import { Typography } from "antd";
import styles from "./seo_content_section.module.scss";

const { Title, Text } = Typography;

const SeoContentSection: React.FC = () => {
  return (
    <section className={styles.seo_content_section}>
      <div className={styles.container}>
        <div className={styles.content_wrapper}>
          <div className={styles.content_text}>
            <Title level={2} className={styles.section_title}>
              Long-form SEO content, made easy
            </Title>
          </div>

          <div className={styles.testimonial_section}>
            <div className={styles.testimonial_card}>
              <div className={styles.user_avatar}>
                <img
                  src="/placeholder-avatar.jpg"
                  alt="Chiara Brancato"
                  className={styles.avatar_image}
                />
              </div>
              <div className={styles.testimonial_content}>
                <Text className={styles.testimonial_quote}>
                  "The Semrush Content Toolkit creates a long-form piece right
                  away! It's trustworthy and simple to use for content
                  marketing, which makes it much better than ChatGPT."
                </Text>
                <div className={styles.user_info}>
                  <Text className={styles.user_name}>Chiara Brancato</Text>
                  <Text className={styles.user_title}>
                    Founder at the Museum Creative
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoContentSection;
