"use client";

import React from "react";
import { Typography, Button, Input, Switch, Rate } from "antd";
import { FaSearch, FaFacebook, FaReply, FaRobot } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import styles from "./reputation_management_section.module.scss";

const { Title, Text } = Typography;

const ReputationManagementSection: React.FC = () => {
  return (
    <section className={styles.reputation_management_section}>
      <div className={styles.container}>
        <div className={styles.section_header}>
          <Title level={2} className={styles.section_title}>
            Manage reputation & track competitors
          </Title>
          <Text className={styles.section_subtitle}>
            Based on Google Business Profile.
          </Text>
        </div>

        <div className={styles.dashboard_mockup}>
          <div className={styles.dashboard_header}>
            <div className={styles.header_controls}>
              <select className={styles.location_select}>
                <option>All locations</option>
                <option>Location 1</option>
                <option>Location 2</option>
              </select>

              <div className={styles.auto_generate_toggle}>
                <Text>Auto-generate Replies</Text>
                <Switch defaultChecked className={styles.toggle_switch} />
              </div>
            </div>
          </div>

          <div className={styles.reviews_container}>
            <div className={styles.review_card}>
              <div className={styles.review_header}>
                <div className={styles.user_info}>
                  <FaFacebook className={styles.platform_icon} />
                  <Text className={styles.user_name}>William P.</Text>
                  <Rate disabled defaultValue={5} className={styles.rating} />
                </div>
                <Text className={styles.review_date}>Today</Text>
              </div>

              <Text className={styles.review_text}>
                Simply the best pizza in my neighbourhood! Can't go wrong with
                this place.
              </Text>

              <div className={styles.reply_section}>
                <div className={styles.ai_reply_box}>
                  <Text className={styles.ai_reply_text}>
                    Thank you, William! We couldn't have said it better. Have
                    you tried our new flavour of the
                  </Text>
                  <Text className={styles.generating_text}>
                    ⏳ Generating reply...
                  </Text>
                </div>

                <div className={styles.reply_actions}>
                  <Button
                    type="primary"
                    icon={<FaReply />}
                    className={styles.reply_btn}
                  >
                    Reply
                  </Button>
                  <Button icon={<FiEdit />} className={styles.generate_btn}>
                    Generate draft
                  </Button>
                </div>
              </div>
            </div>

            <div className={styles.review_card}>
              <div className={styles.review_header}>
                <div className={styles.user_info}>
                  <div className={styles.google_icon}>G</div>
                  <Text className={styles.user_name}>Anna S.</Text>
                  <Rate disabled defaultValue={4} className={styles.rating} />
                </div>
                <Text className={styles.review_date}>Today</Text>
              </div>

              <Text className={styles.review_text}>
                The service was great and the pizza was to die for. I would
                recommend trying these
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.features_section}>
          <Title level={3} className={styles.features_title}>
            Manage reviews effectively from one place
          </Title>

          <div className={styles.features_grid}>
            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Manage your reputation
              </Title>
              <Text className={styles.feature_card_desc}>
                Monitor new reviews for all your locations and get fast low-star
                review alerts.
              </Text>
            </div>

            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Reply to reviews
              </Title>
              <Text className={styles.feature_card_desc}>
                Respond quickly to reviews from one interface with the help of
                AI.
              </Text>
            </div>

            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Track your competitors
              </Title>
              <Text className={styles.feature_card_desc}>
                See competitors' review base, reply rate and progress.
              </Text>
            </div>
          </div>

          <div className={styles.search_cta}>
            <div className={styles.search_container}>
              <Input
                placeholder="Your business name, website or phone"
                className={styles.search_input}
                suffix={
                  <Button
                    type="primary"
                    icon={<FaSearch />}
                    className={styles.search_button}
                  />
                }
              />
            </div>
            <Button type="link" className={styles.advanced_search}>
              Advanced search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReputationManagementSection;
