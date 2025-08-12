"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import styles from "./performance-section.module.scss";

interface PerformanceFeature {
  title: string;
  description: string;
}

interface PerformanceSectionProps {}

const PerformanceSection: React.FC<PerformanceSectionProps> = () => {
  const features: PerformanceFeature[] = [
    {
      title: "Boost Page Speed 🔥",
      description:
        "Site Audit checks for performance issues that could be slowing down your site. It will identify slow-loading pages, large image files, unoptimized code, and other factors that could be impacting your page load times.",
    },
    {
      title: "Ensure Mobile-Friendliness",
      description:
        "Our SEO audit tool checks for factors that affect mobile usability, including responsive design, viewport configuration, and mobile page speed. You'll find out if any pages have issues on mobile, which is critical now that most searches happen on mobile.",
    },
    {
      title: "Improve Crawlability",
      description:
        "A clear, well-structured website is easier for both users and search engines to navigate. Site Audit will alert you to crawlability problems like broken navigation links, improper redirects, or pages too deep in your site's structure. The audit will also check your robots.txt file and your sitemap for errors, ensuring your website is optimized for users and for search engines.",
    },
    {
      title: "Optimize User Experience",
      description:
        "Checking for technical issues like page loading speeds and mobile friendliness helps ensure that users have a good experience on your website. Users who have a good experience tend to stay on the page longer and bounce back to Google less often. These engagement signals can indirectly benefit your SEO.",
    },
  ];

  return (
    <div className={styles.performanceSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Optimize Site Performance and UX for Better SEO
        </h2>
        <p className={styles.sectionSubtitle}>
          SEO is much more than keywords and content on the page, it's also
          about your site's technical performance and the user experience (UX)
          you provide for visitors.
        </p>
      </div>

      <Row gutter={[32, 32]}>
        {features.map((feature, index) => (
          <Col xs={24} md={12} key={index}>
            <Card className={styles.featureCard}>
              <div className={styles.cardContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PerformanceSection;
