"use client";
import React from "react";
import { Button } from "antd";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./control_updates_section.module.scss";

type Props = {};

const ControlUpdatesSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.updatesPanel}>
              <div className={styles.panelHeader}>
                <div className={styles.tabs}>
                  <span className={styles.activeTab}>Updates 2</span>
                  <span className={styles.tab}>User Suggestions 1</span>
                </div>
              </div>

              <div className={styles.updatesList}>
                <div className={styles.updateHeader}>
                  <span>Old Info</span>
                  <span>New Info</span>
                  <span>Status</span>
                </div>

                <div className={styles.updateItem}>
                  <div className={styles.updateInfo}>
                    <h4>Change "Business Hours"</h4>
                    <div className={styles.timeComparison}>
                      <div className={styles.oldTime}>
                        <span>Mon 09:00 — 18:00</span>
                        <span>Tue 09:00 — 18:00</span>
                      </div>
                      <div className={styles.newTime}>
                        <span>Mon 00:00 - 23:30</span>
                        <span>Tue 06:00 - 15:25</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.updateActions}>
                    <Button
                      type="primary"
                      icon={<FaCheck />}
                      className={styles.acceptBtn}
                      size="small"
                    >
                      Accept
                    </Button>
                    <Button
                      danger
                      icon={<FaTimes />}
                      className={styles.rejectBtn}
                      size="small"
                    >
                      Reject
                    </Button>
                  </div>
                </div>

                <div className={`${styles.updateItem} ${styles.accepted}`}>
                  <div className={styles.updateInfo}>
                    <h4>Change "Address"</h4>
                    <div className={styles.addressComparison}>
                      <div className={styles.oldAddress}>
                        <span>123 York Road,</span>
                        <span>New York, NY</span>
                      </div>
                      <div className={styles.newAddress}>
                        <span>3800 Horizon</span>
                        <span>Blvd, Trevose, PA</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.acceptedStatus}>
                    <FaCheck className={styles.checkIcon} />
                    <span>Accepted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <h3 className={styles.sectionTitle}>
              Control GBP updates and suggestions made by others
            </h3>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                Track and control all updates that Google applies to your
                profiles
              </li>
              <li className={styles.featureItem}>
                Monitor and decide which customer suggestions to accept or
                reject
              </li>
              <li className={styles.featureItem}>
                Keep business information accurate and consistent with one click
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

export default ControlUpdatesSection;
