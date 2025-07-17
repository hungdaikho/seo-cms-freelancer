"use client";
import React from "react";
import { Button, Rate } from "antd";
import { FaUser, FaReply } from "react-icons/fa";
import { BiTrendingUp } from "react-icons/bi";
import styles from "./review_management_section.module.scss";

type Props = {};

const ReviewManagementSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.badge}>REVIEW MANAGEMENT</div>
            <h2 className={styles.title}>Get a handle on reviews</h2>
            <p className={styles.description}>
              Use AI and automation to swiftly find and answer online reviews,
              build strong social proof, and keep your finger on the pulse of
              your company's performance.
            </p>
            <div className={styles.actions}>
              <Button type="primary" className={styles.getStartedBtn}>
                Get started
              </Button>
              <Button type="link" className={styles.findOutBtn}>
                Find out more
              </Button>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.reviewsPanel}>
              <div className={styles.reviewsHeader}>
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

export default ReviewManagementSection;
