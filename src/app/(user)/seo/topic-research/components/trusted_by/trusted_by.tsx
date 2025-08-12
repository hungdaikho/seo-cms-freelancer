"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import styles from "./trusted_by.module.scss";

const testimonials = [
  {
    quote:
      "I use the topic research tool to develop pillar content, get inside the heads of my target audience and to create high-value lead magnets. It's a fantastic tool. And it definitely works amazing with the whole content marketing toolkit",
    author: "Jimmy Newson",
    position: "Founder, Jimmy Newson Consulting",
    subPosition: "Senior Advisor, New York Marketing Association",
  },
  // Add more testimonials here
];

const TrustedBy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <div className={styles.trustedBy}>
      <h2 className={styles.title}>Trusted By</h2>

      <div className={styles.testimonialContainer}>
        <Button
          icon={<LeftOutlined />}
          className={styles.navButton}
          onClick={prevTestimonial}
        />

        <div className={styles.testimonial}>
          <div className={styles.pagination}>
            {currentIndex + 1}/{testimonials.length}
          </div>

          <blockquote className={styles.quote}>"{current.quote}"</blockquote>

          <div className={styles.author}>
            <div className={styles.avatarIcon}>
              <FaUser />
            </div>
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>{current.author}</div>
              <div className={styles.authorPosition}>{current.position}</div>
              <div className={styles.authorSubPosition}>
                {current.subPosition}
              </div>
            </div>
          </div>
        </div>

        <Button
          icon={<RightOutlined />}
          className={styles.navButton}
          onClick={nextTestimonial}
        />
      </div>
    </div>
  );
};

export default TrustedBy;
