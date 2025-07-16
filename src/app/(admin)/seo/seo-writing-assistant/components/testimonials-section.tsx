"use client";

import React from "react";
import { Card, Avatar, Button } from "antd";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowRight as FiArrowRightCTA,
} from "react-icons/fi";
import styles from "./testimonials-section.module.scss";

interface TestimonialsSectionProps {}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  const testimonial = {
    quote:
      "The SEO Writing Assistant has a lot of features that make the writing process simpler for marketers and content creators. Many times, we divorce content ideation and creation from SEO principles, doing the first two and then later working on SEO. With this tool, content creators can do it all at once. Even better to have that kind of access in a Google Doc as opposed to just the CMS.",
    author: "Ronell Smith",
    position: "Content and Brand Strategist, RS Consulting",
    avatar: "/Mario_Leon_Rojas.webp", // Using existing avatar from public folder
  };

  return (
    <div className={styles.testimonialsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Trusted By</h2>
      </div>

      <div className={styles.testimonialContainer}>
        <div className={styles.navigationButtons}>
          <Button
            icon={<FiArrowLeft />}
            type="text"
            className={styles.navButton}
          />
          <span className={styles.pagination}>5 / 5</span>
          <Button
            icon={<FiArrowRight />}
            type="text"
            className={styles.navButton}
          />
        </div>

        <Card className={styles.testimonialCard}>
          <blockquote className={styles.quote}>
            "{testimonial.quote}"
          </blockquote>

          <div className={styles.authorInfo}>
            <Avatar
              src={testimonial.avatar}
              size={60}
              className={styles.authorAvatar}
            />
            <div className={styles.authorDetails}>
              <h4 className={styles.authorName}>{testimonial.author}</h4>
              <p className={styles.authorPosition}>{testimonial.position}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.ctaIcon}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <rect width="60" height="60" rx="12" fill="#FF4D4F" />
            <path
              d="M20 30L26 36L40 22"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className={styles.ctaTitle}>Get started!</h2>

        <p className={styles.ctaSubtitle}>
          A smart writing editor that helps you optimize your copy for
          <br />
          engagement and SEO.
        </p>

        <Button
          type="primary"
          size="large"
          className={styles.ctaButton}
          icon={<FiArrowRightCTA />}
        >
          Analyze my text
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsSection;
