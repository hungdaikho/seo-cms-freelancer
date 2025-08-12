"use client";

import React from "react";
import { Typography, Button, Input } from "antd";
import {
  FaGoogle,
  FaFacebook,
  FaInstagram,
  FaFoursquare,
} from "react-icons/fa";
import { SiTripadvisor, SiApple, SiGooglemaps, SiWaze } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import styles from "./directory_visibility_section.module.scss";

const { Title, Text } = Typography;

const DirectoryVisibilitySection: React.FC = () => {
  return (
    <section className={styles.directory_visibility_section}>
      <div className={styles.container}>
        <div className={styles.content_wrapper}>
          <div className={styles.left_content}>
            <div className={styles.dashboard_mockup}>
              <div className={styles.phone_mockup}>
                <div className={styles.screen}>
                  <div className={styles.screen_content}>
                    <div className={styles.chart_area}>
                      <div className={styles.chart_bars}>
                        <div
                          className={styles.bar}
                          style={{ height: "60%" }}
                        ></div>
                        <div
                          className={styles.bar}
                          style={{ height: "80%" }}
                        ></div>
                        <div
                          className={styles.bar}
                          style={{ height: "45%" }}
                        ></div>
                        <div
                          className={styles.bar}
                          style={{ height: "70%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.desktop_mockup}>
                <div className={styles.desktop_screen}>
                  <div className={styles.desktop_content}>
                    <div className={styles.data_rows}>
                      <div className={styles.data_row}>
                        <div className={styles.row_icon}></div>
                        <div className={styles.row_text}></div>
                        <div className={styles.row_status}></div>
                      </div>
                      <div className={styles.data_row}>
                        <div className={styles.row_icon}></div>
                        <div className={styles.row_text}></div>
                        <div className={styles.row_status}></div>
                      </div>
                      <div className={styles.data_row}>
                        <div className={styles.row_icon}></div>
                        <div className={styles.row_text}></div>
                        <div className={styles.row_status}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.right_content}>
            <Title level={2} className={styles.section_title}>
              Stay visible with business listings in top directories
            </Title>

            <Text className={styles.section_subtitle}>
              Automatic NAP Management | Google Business Profile Integration.
            </Text>

            <div className={styles.directories_info}>
              <Title level={3} className={styles.directories_title}>
                150+ globally supported directories
              </Title>

              <Text className={styles.directories_subtitle}>
                Top directories
              </Text>

              <div className={styles.directories_grid}>
                <div className={styles.directory_row}>
                  <div className={styles.directory_item}>
                    <FaGoogle className={styles.google} />
                    <Text>Google</Text>
                  </div>
                  <div className={styles.directory_item}>
                    <SiApple className={styles.apple} />
                    <Text>Apple</Text>
                  </div>
                  <div className={styles.directory_item}>
                    <FaInstagram className={styles.instagram} />
                    <Text>Instagram</Text>
                  </div>
                </div>

                <div className={styles.directory_row}>
                  <div className={styles.directory_item}>
                    <FaFacebook className={styles.facebook} />
                    <Text>Facebook</Text>
                  </div>
                  <div className={styles.directory_item}>
                    <FaFoursquare className={styles.foursquare} />
                    <Text>Foursquare</Text>
                  </div>
                  <div className={styles.directory_item}>
                    <SiTripadvisor className={styles.tripadvisor} />
                    <Text>Tripadvisor</Text>
                  </div>
                </div>

                <Text className={styles.nav_services_label}>
                  Navigation services
                </Text>

                <div className={styles.directory_row}>
                  <div className={styles.directory_item}>
                    <SiGooglemaps className={styles.google_maps} />
                    <Text>Google Maps</Text>
                  </div>
                  <div className={styles.directory_item}>
                    <div className={styles.ndrive_icon}>N</div>
                    <Text>NDrive</Text>
                  </div>
                  <div className={styles.directory_item}>
                    <SiWaze className={styles.waze} />
                    <Text>Waze</Text>
                  </div>
                </div>

                <Text className={styles.search_engines_label}>
                  Voice search sources
                </Text>

                <div className={styles.directory_row}>
                  <div className={styles.directory_item}>
                    <div className={styles.assistant_icon}>G</div>
                    <Text>Assistant</Text>
                  </div>
                  <div className={styles.directory_item}>
                    <div className={styles.alexa_icon}>A</div>
                    <Text>Alexa</Text>
                  </div>
                  <div className={styles.directory_item}>
                    <div className={styles.siri_icon}>S</div>
                    <Text>Siri</Text>
                  </div>
                </div>

                <Text className={styles.search_engines_label}>
                  Search engines
                </Text>

                <div className={styles.directory_row}>
                  <div className={styles.directory_item}>
                    <div className={styles.bing_icon}>B</div>
                    <Text>Bing</Text>
                  </div>
                  <div className={styles.directory_item}>
                    <div className={styles.yahoo_icon}>Y!</div>
                    <Text>Yahoo!</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.features_section}>
          <Title level={3} className={styles.features_title}>
            Let your local visibility soar
          </Title>

          <div className={styles.features_grid}>
            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Automatic NAP Management
              </Title>
              <Text className={styles.feature_card_desc}>
                Update business name, address, and phone number across all
                listings from one place.
              </Text>
            </div>

            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Google Business Profile Integration
              </Title>
              <Text className={styles.feature_card_desc}>
                Connect to Google Business Profile to sync your data with
                Facebook and local directories.
              </Text>
            </div>

            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Duplicate deletion
              </Title>
              <Text className={styles.feature_card_desc}>
                Eliminate errors with duplicates for all your locations in one
                place.
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

export default DirectoryVisibilitySection;
