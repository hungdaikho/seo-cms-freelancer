"use client";

import React from "react";
import { Typography, Button, Input, Select, DatePicker } from "antd";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import styles from "./maps_ranking_section.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

const MapsRankingSection: React.FC = () => {
  return (
    <section className={styles.maps_ranking_section}>
      <div className={styles.container}>
        <div className={styles.section_header}>
          <Title level={2} className={styles.section_title}>
            Monitor your Google Maps rankings with pinpoint accuracy
          </Title>
          <Text className={styles.section_subtitle}>with Map Rank Tracker</Text>
        </div>

        <div className={styles.dashboard_mockup}>
          <div className={styles.dashboard_header}>
            <div className={styles.filter_controls}>
              <DatePicker
                placeholder="June 21, 2023"
                suffixIcon={<FaCalendarAlt />}
                className={styles.date_picker}
              />
              <Select
                defaultValue="hair care"
                className={styles.keyword_select}
              >
                <Option value="hair care">Keyword: hair care</Option>
                <Option value="beauty salon">Keyword: beauty salon</Option>
              </Select>
            </div>
          </div>

          <div className={styles.dashboard_content}>
            <div className={styles.left_panel}>
              <div className={styles.metrics_section}>
                <div className={styles.metric_card}>
                  <Text className={styles.metric_label}>Avg. Rank</Text>
                  <div className={styles.metric_value}>
                    <Text className={styles.main_number}>8.22</Text>
                    <div className={styles.trend_chart}>
                      <svg width="60" height="20" viewBox="0 0 60 20">
                        <path
                          d="M0,15 Q15,8 30,10 T60,5"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      <Text className={styles.change_text}>+0.32</Text>
                    </div>
                  </div>
                </div>

                <div className={styles.metric_card}>
                  <Text className={styles.metric_label}>Share of Voice</Text>
                  <div className={styles.metric_value}>
                    <Text className={styles.main_number}>7.39%</Text>
                    <div className={styles.trend_chart}>
                      <svg width="60" height="20" viewBox="0 0 60 20">
                        <path
                          d="M0,12 Q15,6 30,8 T60,4"
                          stroke="#10B981"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      <Text className={styles.change_text}>+6.19</Text>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.business_list}>
                <div className={styles.business_item}>
                  <div className={styles.rank_badge}>2.8</div>
                  <div className={styles.business_info}>
                    <Text className={styles.business_name}>
                      Central Style Studios
                    </Text>
                    <Text className={styles.business_address}>
                      54 Balcarres Boulevard
                    </Text>
                    <div className={styles.rating}>
                      <span>4.5 ⭐⭐⭐⭐⭐ (1,803)</span>
                    </div>
                  </div>
                </div>

                <div className={styles.business_item}>
                  <div className={styles.rank_badge}>5.8</div>
                  <div className={styles.business_info}>
                    <Text className={styles.business_name}>
                      Beauty Queen Salon
                    </Text>
                    <Text className={styles.business_address}>
                      61 West Grove Street
                    </Text>
                    <div className={styles.rating}>
                      <span>3.9 ⭐⭐⭐⭐⭐ (962)</span>
                    </div>
                  </div>
                </div>

                <div
                  className={styles.business_item + " " + styles.highlighted}
                >
                  <div className={styles.rank_badge}>9.2</div>
                  <div className={styles.business_info}>
                    <Text className={styles.business_name}>
                      Uptown Hair Salon
                    </Text>
                    <Text className={styles.business_address}>
                      173 Cheswalk Avenue
                    </Text>
                    <div className={styles.rating}>
                      <span>4.6 ⭐⭐⭐⭐⭐ (1,638)</span>
                    </div>
                  </div>
                  <div className={styles.you_badge}>You</div>
                </div>

                <div className={styles.business_item}>
                  <div className={styles.rank_badge}>11.6</div>
                  <div className={styles.business_info}>
                    <Text className={styles.business_name}>
                      Kate's Hair & Beauty Palace
                    </Text>
                    <Text className={styles.business_address}>
                      8.55 Marina Street
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.right_panel}>
              <div className={styles.rank_decomposition}>
                <Text className={styles.panel_title}>Rank decomposition</Text>

                <div className={styles.rank_stats}>
                  <div className={styles.rank_stat}>
                    <Text className={styles.stat_label}>Good:</Text>
                    <Text className={styles.stat_value}>28.57%</Text>
                    <div className={styles.stat_bar}>
                      <div
                        className={styles.stat_fill}
                        style={{ width: "28.57%", background: "#10B981" }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.rank_stat}>
                    <Text className={styles.stat_label}>Average:</Text>
                    <Text className={styles.stat_value}>38.78%</Text>
                    <div className={styles.stat_bar}>
                      <div
                        className={styles.stat_fill}
                        style={{ width: "38.78%", background: "#F59E0B" }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.rank_stat}>
                    <Text className={styles.stat_label}>Poor:</Text>
                    <Text className={styles.stat_value}>30.61%</Text>
                    <div className={styles.stat_bar}>
                      <div
                        className={styles.stat_fill}
                        style={{ width: "30.61%", background: "#EF4444" }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.rank_stat}>
                    <Text className={styles.stat_label}>Out Top 20:</Text>
                    <Text className={styles.stat_value}>2.04%</Text>
                    <div className={styles.stat_bar}>
                      <div
                        className={styles.stat_fill}
                        style={{ width: "2.04%", background: "#6B7280" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.heatmap_grid}>
                {Array.from({ length: 8 }, (_, row) => (
                  <div key={row} className={styles.heatmap_row}>
                    {Array.from({ length: 6 }, (_, col) => {
                      const position = row * 6 + col + 1;
                      let className = styles.grid_cell;

                      // Color coding based on ranking
                      if (position <= 3) className += ` ${styles.excellent}`;
                      else if (position <= 10) className += ` ${styles.good}`;
                      else if (position <= 20)
                        className += ` ${styles.average}`;
                      else className += ` ${styles.poor}`;

                      // Highlight specific positions for demo
                      if ([5, 12, 18, 23, 31, 38].includes(position)) {
                        className += ` ${styles.highlighted_cell}`;
                      }

                      return (
                        <div key={col} className={className}>
                          <Text className={styles.position_number}>
                            {position}
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

        <div className={styles.features_section}>
          <Title level={3} className={styles.features_title}>
            See how you rank from every corner of your city
          </Title>

          <div className={styles.features_grid}>
            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Track rankings for any business
              </Title>
              <Text className={styles.feature_card_desc}>
                Instantly see position rankings for any keyword or business,
                whether it's your own or a competitor's.
              </Text>
            </div>

            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Enhance your rank monitoring
              </Title>
              <Text className={styles.feature_card_desc}>
                Choose from the various map grid options to explore your
                visibility in specific areas.
              </Text>
            </div>

            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Run scans as needed
              </Title>
              <Text className={styles.feature_card_desc}>
                Track progress in position changes daily, weekly, monthly, or on
                demand.
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

export default MapsRankingSection;
