"use client";

import React from "react";
import { Typography, Button, Input, Carousel } from "antd";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./gbp_management_section.module.scss";

const { Title, Text } = Typography;

const GbpManagementSection: React.FC = () => {
  return (
    <section className={styles.gbp_management_section}>
      <div className={styles.container}>
        <div className={styles.section_header}>
          <Title level={2} className={styles.section_title}>
            Power up your Google Business Profile
          </Title>
          <Text className={styles.section_subtitle}>
            GBP post scheduling | Advanced insights | AI recommendations
          </Text>
        </div>

        <div className={styles.carousel_wrapper}>
          <Carousel
            dots={true}
            arrows={true}
            prevArrow={<FaArrowLeft />}
            nextArrow={<FaArrowRight />}
            className={styles.gbp_carousel}
          >
            <div className={styles.carousel_slide}>
              <div className={styles.slide_content}>
                <div className={styles.mockup_container}>
                  <div className={styles.business_hours_card}>
                    <div className={styles.card_header}>
                      <Text className={styles.card_title}>Business hours</Text>
                      <div className={styles.action_buttons}>
                        <Button size="small" type="link">
                          Edit all days
                        </Button>
                        <Button size="small" type="link">
                          Edit Mon-Fri
                        </Button>
                        <Button size="small" type="link">
                          Edit Sat-Sun
                        </Button>
                      </div>
                    </div>
                    <div className={styles.hours_list}>
                      <div className={styles.hours_row}>
                        <Text>Monday</Text>
                        <Text>24 hours</Text>
                      </div>
                      <div className={styles.hours_row}>
                        <Text>Tuesday</Text>
                        <Text>Open</Text>
                      </div>
                    </div>

                    <div className={styles.holiday_hours}>
                      <Text className={styles.holiday_title}>
                        Holiday hours
                      </Text>
                      <div className={styles.holiday_row}>
                        <Text>🗓️ Jan 18, 2024</Text>
                        <select className={styles.time_select}>
                          <option>09:00</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.business_details_card}>
                  <Text className={styles.details_title}>Business details</Text>
                  <Text className={styles.details_subtitle}>
                    Collected from your Google account
                  </Text>

                  <div className={styles.details_tabs}>
                    <Button type="link" className={styles.active_tab}>
                      General Info
                    </Button>
                    <Button type="link">Business Categories</Button>
                    <Button type="link">Description</Button>
                    <Button type="link">Hours</Button>
                  </div>

                  <div className={styles.details_form}>
                    <div className={styles.form_row}>
                      <Text className={styles.label}>Business name</Text>
                      <Input value="Semrush" className={styles.form_input} />
                    </div>

                    <div className={styles.form_row}>
                      <Text className={styles.label}>Address</Text>
                      <Input
                        value="3800 Horizon Blvd, Trevose, PA"
                        className={styles.form_input}
                      />
                    </div>

                    <div className={styles.form_row}>
                      <Text className={styles.label}>Service area</Text>
                      <div className={styles.service_options}>
                        <label>
                          <input type="radio" name="service" />
                          <Text>Help our address</Text>
                        </label>
                        <label>
                          <input type="radio" name="service" defaultChecked />
                          <Text>We deliver to local customers</Text>
                        </label>
                      </div>
                      <Input
                        placeholder="Try county, region, postal code, etc."
                        className={styles.location_input}
                      />
                      <Text className={styles.location_suggestion}>
                        New Westminster, BC, Canada →
                      </Text>
                    </div>

                    <div className={styles.form_row}>
                      <Text className={styles.label}>Phone number</Text>
                      <Input
                        value="+1 800-815-9959"
                        className={styles.form_input}
                      />
                    </div>

                    <div className={styles.form_row}>
                      <Text className={styles.label}>Website</Text>
                      <Input
                        value="https://www.semrush.com/listings-management/"
                        className={styles.form_input}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>

        <div className={styles.features_section}>
          <Title level={3} className={styles.features_title}>
            Take charge of your GBP and lead the pack in local search
          </Title>

          <div className={styles.features_grid}>
            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Boost engagement
              </Title>
              <Text className={styles.feature_card_desc}>
                Generate engaging content in seconds with AI. Plan and schedule
                posts for weeks.
              </Text>
            </div>

            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Go deeper
              </Title>
              <Text className={styles.feature_card_desc}>
                Learn from 24 months of local search and Google Maps performance
                data.
              </Text>
            </div>

            <div className={styles.feature_card}>
              <Title level={4} className={styles.feature_card_title}>
                Single dashboard
              </Title>
              <Text className={styles.feature_card_desc}>
                Streamline GBP management from one user-friendly interface.
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

export default GbpManagementSection;
