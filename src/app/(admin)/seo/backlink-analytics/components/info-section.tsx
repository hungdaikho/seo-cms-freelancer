"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import styles from "./info-section.module.scss";

interface InfoSectionProps {}

const InfoSection: React.FC<InfoSectionProps> = () => {
  return (
    <div className={styles.infoSection}>
      <Row gutter={[48, 48]}>
        <Col xs={24} lg={12}>
          <Card className={styles.infoCard}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>What Is Backlink Analytics?</h2>
              <div className={styles.cardText}>
                <p>
                  Backlink Analytics is a free backlink checker tool that allows
                  you to examine your own and your competitors' backlink
                  profiles in detail.
                </p>
                <p>
                  This powerful tool helps you discover who's linking to any
                  website, analyze link quality, monitor new and lost backlinks,
                  and find valuable link building opportunities to improve your
                  SEO strategy.
                </p>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className={styles.infoCard}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>
                What Are Backlinks, and Why Do They Matter?
              </h2>
              <div className={styles.cardText}>
                <p>
                  Backlinks are links from other websites that point to your
                  site. They act as "votes of confidence" that help indicate to
                  search engines your content is valuable and trustworthy.
                </p>
                <p>
                  According to Google, content and links are two of the most
                  important ranking factors for SEO.
                </p>
                <p>
                  However, not all backlinks are equal. Low-quality or spammy
                  backlinks can actually harm your site. That's why you need a
                  reliable backlink checker to analyze and monitor your link
                  profile.
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InfoSection;
