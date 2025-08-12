"use client";
import React from "react";
import { Button } from "antd";
import styles from "./elevate_gbp_section.module.scss";

type Props = {};

const ElevateGbpSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Elevate your GBP to the next level—the simple way
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.dashboardMockup}>
              <div className={styles.mockupHeader}>
                <div className={styles.headerTabs}>
                  <span className={styles.activeTab}>Business Report</span>
                </div>
                <div className={styles.headerActions}>
                  <span className={styles.headerLink}>Edit data</span>
                  <span className={styles.headerLink}>Edit this chart</span>
                </div>
              </div>

              <div className={styles.mockupContent}>
                <div className={styles.reportSection}>
                  <h4>Tracking Report</h4>
                  <div className={styles.reportItem}>
                    <span className={styles.reportDate}>Jan 13, 2024</span>
                    <span className={styles.reportType}>Website</span>
                    <span className={styles.reportStatus}>OK Profile</span>
                    <span className={styles.reportViews}>16 Total</span>
                  </div>

                  <div className={styles.reportItem}>
                    <span className={styles.reportDate}>Jan 2, 2024</span>
                    <span className={styles.reportType}>Business</span>
                    <span className={styles.reportStatus}>Complete</span>
                    <span className={styles.reportViews}>Total</span>
                  </div>
                </div>

                <div className={styles.businessDetails}>
                  <h4>Business details</h4>
                  <div className={styles.detailsForm}>
                    <div className={styles.formGroup}>
                      <label>Selected from your Google account</label>
                      <select className={styles.formSelect}>
                        <option>Business Categories</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Business name</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        defaultValue="Semrush UG"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Address</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        defaultValue="1600 Harrison Blvd, Trevose, PA"
                      />
                      <div className={styles.checkboxGroup}>
                        <input type="checkbox" id="hideAddress" />
                        <label htmlFor="hideAddress">Hide my address</label>
                      </div>
                      <div className={styles.checkboxGroup}>
                        <input type="checkbox" id="clearAddress" />
                        <label htmlFor="clearAddress">
                          This address is local audience
                        </label>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Service area</label>
                      <select className={styles.formSelect}>
                        <option>-- Choose service area --</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Phone number</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        defaultValue="+1 800-673-4624"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <h3 className={styles.sectionTitle}>
              Manage your Google Business Profile(s) effortlessly
            </h3>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                Seamlessly connect your GBP to Semrush Local and manage all your
                business information from one central location
              </li>
              <li className={styles.featureItem}>
                Receive custom recommendations for your business to enhance your
                local search visibility and attract more customers
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

export default ElevateGbpSection;
