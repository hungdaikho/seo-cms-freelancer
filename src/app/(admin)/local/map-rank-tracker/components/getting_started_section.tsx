"use client";

import React from "react";
import { Typography, Button, Input, Select } from "antd";
import { FaSearch } from "react-icons/fa";
import styles from "./getting_started_section.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

const GettingStartedSection: React.FC = () => {
  return (
    <section className={styles.getting_started_section}>
      <div className={styles.container}>
        <div className={styles.section_header}>
          <Title level={2} className={styles.section_title}>
            Get started with Map Rank Tracker
          </Title>
        </div>

        <div className={styles.steps_container}>
          <div className={styles.step_card}>
            <div className={styles.step_number}>1</div>
            <div className={styles.step_content}>
              <Title level={4} className={styles.step_title}>
                Enter a business name
              </Title>
              <div className={styles.step_demo}>
                <div className={styles.search_box}>
                  <Input
                    placeholder="Hair Care"
                    className={styles.demo_input}
                    prefix={<FaSearch className={styles.search_icon} />}
                  />
                </div>
                <div className={styles.suggestions_list}>
                  <div className={styles.suggestion_item}>
                    <div className={styles.suggestion_icon}>🏢</div>
                    <div className={styles.suggestion_text}>
                      <Text className={styles.business_name}>
                        Hair Care Salon
                      </Text>
                      <Text className={styles.business_address}>
                        56 Belladonna Boulevard
                      </Text>
                    </div>
                  </div>
                  <div className={styles.suggestion_item}>
                    <div className={styles.suggestion_icon}>✂️</div>
                    <div className={styles.suggestion_text}>
                      <Text className={styles.business_name}>
                        Hair Care Full Service
                      </Text>
                      <Text className={styles.business_address}>
                        123 Oakwood Avenue
                      </Text>
                    </div>
                  </div>
                  <div className={styles.suggestion_item}>
                    <div className={styles.suggestion_icon}>💇</div>
                    <div className={styles.suggestion_text}>
                      <Text className={styles.business_name}>
                        Hair Care and Shop
                      </Text>
                      <Text className={styles.business_address}>
                        789 Greenfield Road
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.step_card}>
            <div className={styles.step_number}>2</div>
            <div className={styles.step_content}>
              <Title level={4} className={styles.step_title}>
                Set your <span className={styles.highlight}>grid</span> and{" "}
                <span className={styles.highlight}>keywords</span>
              </Title>
              <div className={styles.step_demo}>
                <div className={styles.grid_settings}>
                  <div className={styles.setting_group}>
                    <Text className={styles.setting_label}>Grid size:</Text>
                    <Select defaultValue="9x9" className={styles.grid_select}>
                      <Option value="9x9">9 x 9 Grid</Option>
                      <Option value="7x7">7 x 7 Grid</Option>
                      <Option value="5x5">5 x 5 Grid</Option>
                    </Select>
                  </div>
                  <div className={styles.setting_group}>
                    <Text className={styles.setting_label}>Distance:</Text>
                    <Select
                      defaultValue="1.5"
                      className={styles.distance_select}
                    >
                      <Option value="1.5">1.5 km</Option>
                      <Option value="2.0">2.0 km</Option>
                      <Option value="3.0">3.0 km</Option>
                    </Select>
                  </div>
                </div>
                <div className={styles.keywords_section}>
                  <div className={styles.keyword_tags}>
                    <span className={styles.keyword_tag}>hair care</span>
                    <span className={styles.keyword_tag}>salon hair care</span>
                    <span className={styles.keyword_tag}>
                      hair care products
                    </span>
                    <span className={styles.keyword_tag}>caro hair salon</span>
                    <span className={styles.keyword_tag}>
                      salon hair care brands
                    </span>
                    <span className={styles.keyword_tag}>haircare</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.step_card}>
            <div className={styles.step_number}>3</div>
            <div className={styles.step_content}>
              <Title level={4} className={styles.step_title}>
                Get your{" "}
                <span className={styles.highlight}>heatmap results</span>
              </Title>
              <div className={styles.step_demo}>
                <div className={styles.heatmap_preview}>
                  <div className={styles.heatmap_grid}>
                    {Array.from({ length: 6 }, (_, row) => (
                      <div key={row} className={styles.heatmap_row}>
                        {Array.from({ length: 6 }, (_, col) => {
                          const position = row * 6 + col + 1;
                          let className = styles.heatmap_cell;

                          // Random ranking colors for demo
                          const ranks = [
                            "excellent",
                            "good",
                            "average",
                            "poor",
                          ];
                          const randomRank =
                            ranks[Math.floor(Math.random() * ranks.length)];
                          className += ` ${styles[randomRank]}`;

                          return (
                            <div key={col} className={className}>
                              <Text className={styles.cell_number}>
                                {Math.floor(Math.random() * 20) + 1}
                              </Text>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cta_section}>
          <Button type="primary" size="large" className={styles.try_button}>
            Try it
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GettingStartedSection;
