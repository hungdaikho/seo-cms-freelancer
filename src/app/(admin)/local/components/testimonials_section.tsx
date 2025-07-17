"use client";
import React from "react";
import { Button, Avatar } from "antd";
import { FaQuoteLeft } from "react-icons/fa";
import styles from "./testimonials_section.module.scss";

type Props = {};

const TestimonialsSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Join thousands of business owners and agencies who thrive with
            Semrush Local
          </h2>
          <div className={styles.rating}>
            <div className={styles.ratingBadge}>
              <span className={styles.ratingIcon}>G4</span>
              <div className={styles.ratingText}>
                <span>
                  See why Semrush is #1 for local SEO on review sites like G2,
                </span>
                <span>with 4.5 out of 5 stars from 2,086 users</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.categories}>
          <Button type="primary" className={styles.activeCategory}>
            Small businesses
          </Button>
          <Button type="default" className={styles.category}>
            Franchises
          </Button>
          <Button type="default" className={styles.category}>
            Multi-location brands
          </Button>
          <Button type="default" className={styles.category}>
            Agencies
          </Button>
        </div>

        <div className={styles.testimonialCard}>
          <div className={styles.navigation}>
            <Button type="text" className={styles.navBtn}>
              ←
            </Button>
            <span className={styles.pagination}>1 / 7</span>
            <Button type="text" className={styles.navBtn}>
              →
            </Button>
          </div>

          <div className={styles.testimonialContent}>
            <FaQuoteLeft className={styles.quoteIcon} />
            <blockquote className={styles.quote}>
              I've never seen a local practice in the world with as much traffic
              as we have.
            </blockquote>

            <div className={styles.author}>
              <Avatar
                src="/Mario_Leon_Rojas.webp"
                size={64}
                className={styles.avatar}
              />
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>Ed Challinor</h4>
                <p className={styles.authorTitle}>CEO, Smileworks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
