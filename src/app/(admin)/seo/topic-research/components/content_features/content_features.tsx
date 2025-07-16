"use client";

import React from "react";
import { Card, Tag } from "antd";
import styles from "./content_features.module.scss";

const ContentFeatures = () => {
  return (
    <div className={styles.contentFeatures}>
      {/* Untapped Ideas Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Get Thousands of Untapped, Instant Ideas for Valuable Content
        </h2>

        <div className={styles.featuresGrid}>
          <div className={styles.featureBox}>
            <h3>Design high-performing content plans</h3>
            <p>
              Simply enter any topic or phrase to explore dozens of related
              subtopics and build powerful topic clusters.
            </p>
            <div className={styles.mockup}>
              <div className={styles.searchExample}>
                <Tag color="blue">content trends</Tag>
                <span>United States ▼</span>
              </div>
            </div>
          </div>

          <div className={styles.featureBox}>
            <h3>Find content ideas for specific locations</h3>
            <p>
              Discover what's trending on the country, region, or city level,
              making your content more targeted to your customers' needs.
            </p>
            <div className={styles.locationExample}>
              <div className={styles.topicCard}>
                <Tag color="purple">Virtual Reality</Tag>
                <span>Topic Efficiency: High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outrank Competitors Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Outrank your competitors</h2>

        <div className={styles.competitorFeatures}>
          <div className={styles.textContent}>
            <ul className={styles.featureList}>
              <li>
                <strong>Discover what's trending among your customers</strong>
                <p>
                  Add a filter to show topics that are trending in your industry
                  and consider them to further your growth.
                </p>
              </li>
              <li>
                <strong>Run a content gap</strong>
                <p>
                  Reveal topics that your competitors rank for and generate
                  ideas for your own content.
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.visualization}>
            <div className={styles.mindMap}>
              <div className={styles.centerNode}>content trends</div>
              <div className={styles.branches}>
                <div className={styles.branch}>seo reporting</div>
                <div className={styles.branch}>Trending</div>
                <div className={styles.branch}>Competitors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Any Topic Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Cover any topic fully</h2>

        <div className={styles.topicCoverage}>
          <div className={styles.textContent}>
            <ul className={styles.featureList}>
              <li>
                <strong>Give your readers exactly what they want</strong>
                <p>
                  Analyze the most popular questions and headlines related to
                  your topics and subtopics to understand the pain points of
                  your audience.
                </p>
              </li>
              <li>
                <strong>Structure your content to maximize coverage</strong>
                <p>
                  Use subtopics and related questions to map out winning blog
                  post outlines.
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.contentStructure}>
            <Card className={styles.topicCard}>
              <div className={styles.cardHeader}>
                <Tag color="green">Digital media</Tag>
                <span>Topic Efficiency: High</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.section}>
                  <h4>Subtopics Volume</h4>
                  <div className={styles.volumeBars}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                  </div>
                </div>
                <div className={styles.section}>
                  <h4>Headlines</h4>
                  <div className={styles.headlines}>
                    <div className={styles.headline}></div>
                    <div className={styles.headline}></div>
                  </div>
                </div>
                <div className={styles.section}>
                  <h4>Questions</h4>
                  <div className={styles.questions}>
                    <div className={styles.question}></div>
                    <div className={styles.question}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentFeatures;
