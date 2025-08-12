"use client";

import React from "react";
import { Button, Typography } from "antd";
import styles from "./content_hero_section.module.scss";

const { Title, Text } = Typography;

const ContentHeroSection: React.FC = () => {
  return (
    <section className={styles.content_hero_section}>
      <div className={styles.container}>
        <div className={styles.hero_content}>
          <Title level={1} className={styles.hero_title}>
            Create content that brings traffic
          </Title>

          <Text className={styles.hero_subtitle}>
            The Content Toolkit helps you write articles that rank high—even if
            you're not an SEO pro.
          </Text>

          <div className={styles.cta_section}>
            <Button type="primary" size="large" className={styles.trial_button}>
              Start your free trial
            </Button>
            <Text className={styles.trial_info}>
              7-day free trial, then $60/month
            </Text>
          </div>

          <div className={styles.editor_preview}>
            <div className={styles.left_panel}>
              <div className={styles.panel_header}>
                <Text className={styles.panel_title}>Competitor data</Text>
              </div>
              <div className={styles.panel_content}>
                <div className={styles.filter_tabs}>
                  <span className={styles.tab + " " + styles.active}>
                    🗂️ Topics
                  </span>
                  <span className={styles.tab}>📊 Structure</span>
                </div>
                <div className={styles.filter_options}>
                  <div className={styles.filter_item}>📷 Images</div>
                  <div className={styles.filter_item}>🔗 Links</div>
                </div>
                <div className={styles.topics_section}>
                  <Text className={styles.section_title}>
                    Best-performing Topics
                  </Text>
                  <div className={styles.topic_item}>
                    <div className={styles.topic_badge}>dog food</div>
                  </div>
                </div>
                <div className={styles.seo_booster}>
                  <div className={styles.booster_badge}>🚀 Add SEO Booster</div>
                </div>
                <Button type="primary" className={styles.create_button}>
                  ✓ Create article
                </Button>
              </div>
            </div>

            <div className={styles.center_panel}>
              <div className={styles.editor_header}>
                <div className={styles.editor_controls}>
                  <span>H1 H2 H3</span>
                  <span>B I</span>
                  <span>📝 📄</span>
                  <span>🤖 AI chat</span>
                </div>
              </div>
              <div className={styles.editor_content}>
                <Title level={2} className={styles.article_title}>
                  Best Puppy Dry Food Brands
                </Title>
                <div className={styles.target_keywords}>
                  <Text className={styles.keywords_label}>
                    Target keywords:
                  </Text>
                  <span className={styles.keyword_tag}>puppy food</span>
                  <span className={styles.add_keyword}>+ Add keyword</span>
                </div>
                <div className={styles.article_image}>
                  <img
                    src="/placeholder-image.jpg"
                    alt="Best Puppy Food"
                    className={styles.content_image}
                  />
                  <div className={styles.readability_score}>
                    <div className={styles.score_circle}>4.5/5</div>
                    <div className={styles.score_details}>
                      <Text>Rephrase</Text>
                      <Text>Simplify</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.right_panel}>
              <div className={styles.publish_section}>
                <div className={styles.domain_input}>
                  <span>🌐 domain.com</span>
                </div>
                <Button className={styles.publish_button}>
                  📤 Publish article
                </Button>
              </div>
              <div className={styles.improvements_panel}>
                <Text className={styles.improvements_title}>
                  Article Improvements
                </Text>
                <div className={styles.score_display}>
                  <div className={styles.score_circle + " " + styles.large}>
                    86%
                  </div>
                  <Text className={styles.score_label}>Perfect</Text>
                </div>
                <div className={styles.boost_badge}>✅ SEO Boosted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHeroSection;
