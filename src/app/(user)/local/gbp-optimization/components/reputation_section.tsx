"use client";
import React from "react";
import { Button, Rate } from "antd";
import { FaUser } from "react-icons/fa";
import styles from "./reputation_section.module.scss";

type Props = {};

const ReputationSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <h3 className={styles.sectionTitle}>
              Strengthen your online reputation
            </h3>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                Centralize all GBP reviews in one place and save time
              </li>
              <li className={styles.featureItem}>
                Use AI to generate prompt and personalized responses to reviews,
                or automate the process with AI auto-reply
              </li>
              <li className={styles.featureItem}>
                Gain insights into competitors' review strategies and
                performances to stay ahead
              </li>
            </ul>

            <Button type="primary" className={styles.connectBtn}>
              Connect your business
            </Button>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.reviewsPanel}>
              <div className={styles.panelHeader}>
                <div className={styles.filters}>
                  <select className={styles.locationFilter}>
                    <option>All locations</option>
                  </select>
                  <div className={styles.statusFilters}>
                    <button className={styles.filterBtn}>All</button>
                    <button className={styles.filterBtn}>Not Replied</button>
                  </div>
                  <select className={styles.ratingFilter}>
                    <option>Any rating</option>
                  </select>
                </div>
              </div>

              <div className={styles.reviewsList}>
                <div className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        <FaUser />
                      </div>
                      <div className={styles.userDetails}>
                        <span className={styles.userName}>Brad S.</span>
                        <Rate
                          disabled
                          defaultValue={5}
                          className={styles.rating}
                        />
                      </div>
                    </div>
                    <span className={styles.reviewDate}>Today</span>
                  </div>
                  <p className={styles.reviewText}>
                    John was easy to work with, helped with insurance, and
                    excellently installed the roof.
                  </p>
                  <div className={styles.replyBox}>
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      className={styles.replyInput}
                    />
                    <Button type="primary" className={styles.generateBtn}>
                      ✨ Generate draft
                    </Button>
                  </div>
                </div>

                <div className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        <FaUser />
                      </div>
                      <div className={styles.userDetails}>
                        <span className={styles.userName}>Mark J.</span>
                        <Rate
                          disabled
                          defaultValue={5}
                          className={styles.rating}
                        />
                      </div>
                    </div>
                    <span className={styles.reviewDate}>Today</span>
                  </div>
                  <p className={styles.reviewText}>
                    They were very responsive and professional.
                  </p>
                </div>

                <div className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        <FaUser />
                      </div>
                      <div className={styles.userDetails}>
                        <span className={styles.userName}>Anna S.</span>
                        <Rate
                          disabled
                          defaultValue={4}
                          className={styles.rating}
                        />
                      </div>
                    </div>
                    <span className={styles.reviewDate}>Yesterday</span>
                  </div>
                  <p className={styles.reviewText}>
                    Quite expensive for the work that has been done.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReputationSection;
