"use client";

import React from "react";
import { Typography, Button } from "antd";
import styles from "./map_analytics_section.module.scss";

const { Title, Text } = Typography;

const MapAnalyticsSection: React.FC = () => {
  return (
    <section className={styles.map_analytics_section}>
      <div className={styles.container}>
        <div className={styles.section_header}>
          <Title level={2} className={styles.section_title}>
            See where your business stands on Google Maps by area, against
            competitors, and over time
          </Title>

          <Text className={styles.section_description}>
            98% of consumers look for local goods and services online. What they
            see can vary widely depending on their location. Uncover what
            they're seeing keyword by keyword across your service area.
          </Text>
        </div>

        <div className={styles.analytics_dashboard}>
          <div className={styles.left_panel}>
            <div className={styles.metrics_overview}>
              <div className={styles.metric_item}>
                <Text className={styles.metric_label}>Avg. Rank</Text>
                <Text className={styles.metric_value}>10.73</Text>
              </div>
              <div className={styles.metric_item}>
                <Text className={styles.metric_label}>Share of Voice</Text>
                <Text className={styles.metric_value}>6.95%</Text>
              </div>
              <div className={styles.metric_item}>
                <Text className={styles.metric_label}>Good</Text>
                <Text className={styles.metric_value}>33%</Text>
                <div className={styles.metric_icon + " " + styles.good}></div>
              </div>
              <div className={styles.metric_item}>
                <Text className={styles.metric_label}>Average</Text>
                <Text className={styles.metric_value}>20%</Text>
                <div
                  className={styles.metric_icon + " " + styles.average}
                ></div>
              </div>
              <div className={styles.metric_item}>
                <Text className={styles.metric_label}>Poor</Text>
                <Text className={styles.metric_value}>18%</Text>
                <div className={styles.metric_icon + " " + styles.poor}></div>
              </div>
              <div className={styles.metric_item}>
                <Text className={styles.metric_label}>Out of Top 20</Text>
                <Text className={styles.metric_value}>29%</Text>
                <div
                  className={styles.metric_icon + " " + styles.out_of_top}
                ></div>
              </div>
            </div>

            <div className={styles.business_list}>
              <div className={styles.business_item + " " + styles.highlighted}>
                <div className={styles.business_info}>
                  <Text className={styles.business_name}>Crusty Heaven</Text>
                  <div className={styles.rating}>
                    <span>4.6 ⭐⭐⭐⭐⭐ (470)</span>
                  </div>
                </div>
                <div className={styles.rank_badge}>AR: 10.7</div>
                <span className={styles.you_label}>You</span>
              </div>

              <div className={styles.business_item}>
                <div className={styles.business_info}>
                  <Text className={styles.business_name}>
                    Sizzle Slice Pizzeria
                  </Text>
                  <div className={styles.rating}>
                    <span>4.1 ⭐⭐⭐⭐⭐ (196)</span>
                  </div>
                </div>
                <div className={styles.rank_badge}>AR: 10.8</div>
              </div>

              <div className={styles.business_item + " " + styles.highlighted}>
                <div className={styles.business_info}>
                  <Text className={styles.business_name}>Crusty Heaven</Text>
                  <div className={styles.rating}>
                    <span>4.6 ⭐⭐⭐⭐⭐ (470)</span>
                  </div>
                </div>
                <div className={styles.rank_badge}>AR: 10.7</div>
                <span className={styles.you_label}>You</span>
              </div>

              <div className={styles.business_item}>
                <div className={styles.business_info}>
                  <Text className={styles.business_name}>Sereno's Pizza</Text>
                  <div className={styles.rating}>
                    <span>4.4 ⭐⭐⭐⭐⭐ (3,637)</span>
                  </div>
                </div>
                <div className={styles.rank_badge}>AR: 13.0</div>
              </div>

              <div className={styles.business_item}>
                <div className={styles.business_info}>
                  <Text className={styles.business_name}>Pizza Palace</Text>
                  <div className={styles.rating}>
                    <span>4.5 ⭐⭐⭐⭐⭐ (404)</span>
                  </div>
                </div>
                <div className={styles.rank_badge}>AR: 13.4</div>
              </div>

              <div className={styles.business_item}>
                <div className={styles.business_info}>
                  <Text className={styles.business_name}>Crust & Co.</Text>
                  <div className={styles.rating}>
                    <span>3.9 ⭐⭐⭐⭐⭐ (74)</span>
                  </div>
                </div>
                <div className={styles.rank_badge}>AR: 14.5</div>
              </div>

              <div className={styles.business_item}>
                <div className={styles.business_info}>
                  <Text className={styles.business_name}>
                    Basil Bliss Pizza
                  </Text>
                  <div className={styles.rating}>
                    <span>4.6 ⭐⭐⭐⭐⭐ (282)</span>
                  </div>
                </div>
                <div className={styles.rank_badge}>AR: 15.2</div>
              </div>

              <div className={styles.business_item}>
                <div className={styles.business_info}>
                  <Text className={styles.business_name}>La Dolce Pizza</Text>
                  <div className={styles.rating}>
                    <span>4.2 ⭐⭐⭐⭐⭐ (1,530)</span>
                  </div>
                </div>
                <div className={styles.rank_badge}>AR: 15.7</div>
              </div>
            </div>
          </div>

          <div className={styles.right_panel}>
            <div className={styles.map_container}>
              <div className={styles.map_header}>
                <div className={styles.map_controls}>
                  <div className={styles.filter_button}>📍 Avg. Rank ▼</div>
                  <div className={styles.settings_button}>⚙️</div>
                </div>
              </div>

              <div className={styles.google_map}>
                <div className={styles.map_grid}>
                  {Array.from({ length: 7 }, (_, row) => (
                    <div key={row} className={styles.map_row}>
                      {Array.from({ length: 10 }, (_, col) => {
                        const position = row * 10 + col + 1;
                        let className = styles.map_pin;

                        // Color coding based on ranking
                        if (position <= 3) className += ` ${styles.rank_1_3}`;
                        else if (position <= 10)
                          className += ` ${styles.rank_4_10}`;
                        else if (position <= 20)
                          className += ` ${styles.rank_11_20}`;
                        else className += ` ${styles.rank_20_plus}`;

                        // Special pins for demo
                        const specialPins = [
                          5, 12, 18, 23, 31, 38, 45, 52, 59, 66,
                        ];
                        const pinNumber =
                          specialPins[
                            Math.floor(Math.random() * specialPins.length)
                          ];

                        return (
                          <div key={col} className={className}>
                            <span className={styles.pin_number}>
                              {Math.floor(Math.random() * 20) + 1}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className={styles.map_overlays}>
                  <div
                    className={
                      styles.location_marker + " " + styles.main_location
                    }
                  >
                    📍
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.features_callouts}>
          <div className={styles.callout_left}>
            <div className={styles.callout_arrow}>↙️</div>
            <Text className={styles.callout_title}>
              Measure progress over time
            </Text>
            <Text className={styles.callout_desc}>
              Get feedback on your local efforts seeing ranking changes for a
              selected date range.
            </Text>
          </div>

          <div className={styles.callout_right}>
            <div className={styles.callout_arrow}>↗️</div>
            <Text className={styles.callout_title}>
              See local rankings, area by area
            </Text>
            <Text className={styles.callout_desc}>
              View your search positions by keyword and location, with AI help
              to simplify your search.
            </Text>
          </div>

          <div className={styles.callout_bottom_left}>
            <div className={styles.callout_arrow}>↖️</div>
            <Text className={styles.callout_title}>
              Gather competitive intel
            </Text>
            <Text className={styles.callout_desc}>
              See your list of top competitors and a heatmap of their rankings
              in the area.
            </Text>
          </div>

          <div className={styles.callout_bottom_right}>
            <div className={styles.callout_arrow}>↗️</div>
            <Text className={styles.callout_title}>Set your map size</Text>
            <Text className={styles.callout_desc}>
              Zoom in or out and set your pins to customize your map grid.
            </Text>
          </div>
        </div>

        <div className={styles.cta_section}>
          <Button type="primary" size="large" className={styles.track_button}>
            Track your local rankings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapAnalyticsSection;
