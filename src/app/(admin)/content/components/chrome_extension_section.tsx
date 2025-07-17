"use client";

import { Typography, Button, Row, Col, Card, Tag, Rate } from "antd";
import {
  FaChrome,
  FaWordpress,
  FaShopify,
  FaGoogle,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { BiDownload, BiExtension, BiCheckCircle } from "react-icons/bi";
import { MdSpeed, MdSecurity, MdCloudSync } from "react-icons/md";
import styles from "./chrome_extension_section.module.scss";

const { Title, Text } = Typography;

export default function ChromeExtensionSection() {
  const extensionFeatures = [
    {
      icon: <MdSpeed />,
      title: "Real-time SEO Analysis",
      description:
        "Analyze any webpage instantly for SEO opportunities and improvements",
    },
    {
      icon: <BiExtension />,
      title: "Content Optimization",
      description:
        "Get suggestions to improve content readability and search rankings",
    },
    {
      icon: <MdCloudSync />,
      title: "Cloud Sync",
      description:
        "All your data syncs seamlessly across devices and platforms",
    },
    {
      icon: <MdSecurity />,
      title: "Privacy Protected",
      description: "Your browsing data stays private and secure at all times",
    },
  ];

  const integrations = [
    { icon: <FaWordpress />, name: "WordPress", color: "#21759B" },
    { icon: <FaShopify />, name: "Shopify", color: "#96BF48" },
    { icon: <FaGoogle />, name: "Google Analytics", color: "#FF6600" },
    { icon: <SiGoogleanalytics />, name: "Search Console", color: "#4285F4" },
    { icon: <FaFacebook />, name: "Facebook Ads", color: "#1877F2" },
    { icon: <FaLinkedin />, name: "LinkedIn", color: "#0A66C2" },
  ];

  const userReviews = [
    {
      name: "Sarah Johnson",
      role: "Digital Marketer",
      rating: 5,
      review:
        "This extension has revolutionized how I analyze websites. The real-time insights are incredibly valuable.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b3d9?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "Mike Chen",
      role: "SEO Specialist",
      rating: 5,
      review:
        "Love how it integrates with all my favorite tools. Makes my workflow so much more efficient.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "Emma Davis",
      role: "Content Creator",
      rating: 5,
      review:
        "The content optimization suggestions have helped me improve my blog's search rankings significantly.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
  ];

  return (
    <section className={styles.chrome_extension_section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.section_header}>
          <div className={styles.chrome_icon_wrapper}>
            <FaChrome className={styles.chrome_icon} />
          </div>
          <Title level={2} className={styles.section_title}>
            Powerful Chrome Extension
          </Title>
          <Text className={styles.section_subtitle}>
            Bring the power of our SEO toolkit directly to your browser. Analyze
            any website, optimize content, and track performance without leaving
            the page you're on.
          </Text>
        </div>

        {/* Extension Preview */}
        <div className={styles.extension_preview}>
          <Row gutter={[40, 40]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.preview_content}>
                <Title level={3} className={styles.preview_title}>
                  SEO Analysis at Your Fingertips
                </Title>
                <Text className={styles.preview_description}>
                  Our Chrome extension provides instant SEO insights for any
                  webpage you visit. Get real-time recommendations, track
                  keyword performance, and optimize content on the fly.
                </Text>

                <div className={styles.extension_stats}>
                  <div className={styles.stat_item}>
                    <Text strong className={styles.stat_number}>
                      100K+
                    </Text>
                    <Text className={styles.stat_label}>Active Users</Text>
                  </div>
                  <div className={styles.stat_item}>
                    <Text strong className={styles.stat_number}>
                      4.9★
                    </Text>
                    <Text className={styles.stat_label}>
                      Chrome Store Rating
                    </Text>
                  </div>
                  <div className={styles.stat_item}>
                    <Text strong className={styles.stat_number}>
                      50M+
                    </Text>
                    <Text className={styles.stat_label}>Pages Analyzed</Text>
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  className={styles.install_button}
                >
                  <BiDownload /> Install Chrome Extension
                </Button>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className={styles.browser_mockup}>
                <div className={styles.browser_window}>
                  <div className={styles.browser_header}>
                    <div className={styles.browser_controls}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className={styles.address_bar}>
                      <Text>https://example-website.com</Text>
                    </div>
                  </div>
                  <div className={styles.extension_panel}>
                    <div className={styles.panel_header}>
                      <FaChrome className={styles.panel_icon} />
                      <Text strong>SEO Content Toolkit</Text>
                    </div>
                    <div className={styles.panel_content}>
                      <div className={styles.seo_score}>
                        <Text strong>SEO Score</Text>
                        <div className={styles.score_circle}>
                          <Text className={styles.score_number}>87</Text>
                        </div>
                      </div>
                      <div className={styles.quick_stats}>
                        <div className={styles.quick_stat}>
                          <Text>Keywords: 12</Text>
                          <BiCheckCircle className={styles.good_icon} />
                        </div>
                        <div className={styles.quick_stat}>
                          <Text>Meta Tags: Complete</Text>
                          <BiCheckCircle className={styles.good_icon} />
                        </div>
                        <div className={styles.quick_stat}>
                          <Text>Readability: Good</Text>
                          <BiCheckCircle className={styles.good_icon} />
                        </div>
                      </div>
                      <Button size="small" type="primary" block>
                        View Full Analysis
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Extension Features */}
        <div className={styles.features_section}>
          <Title level={3} className={styles.features_title}>
            Everything You Need in One Extension
          </Title>
          <Row gutter={[24, 24]}>
            {extensionFeatures.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className={styles.feature_card} bordered={false}>
                  <div className={styles.feature_icon}>{feature.icon}</div>
                  <Title level={5} className={styles.feature_title}>
                    {feature.title}
                  </Title>
                  <Text className={styles.feature_description}>
                    {feature.description}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Integrations */}
        <div className={styles.integrations_section}>
          <Title level={3} className={styles.integrations_title}>
            Works with Your Favorite Tools
          </Title>
          <div className={styles.integrations_grid}>
            {integrations.map((integration, index) => (
              <div key={index} className={styles.integration_item}>
                <div
                  className={styles.integration_icon}
                  style={{ color: integration.color }}
                >
                  {integration.icon}
                </div>
                <Text className={styles.integration_name}>
                  {integration.name}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* User Reviews */}
        <div className={styles.reviews_section}>
          <Title level={3} className={styles.reviews_title}>
            What Users Are Saying
          </Title>
          <Row gutter={[24, 24]}>
            {userReviews.map((review, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card className={styles.review_card} bordered={false}>
                  <div className={styles.review_header}>
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className={styles.user_avatar}
                    />
                    <div className={styles.user_info}>
                      <Text strong className={styles.user_name}>
                        {review.name}
                      </Text>
                      <Text className={styles.user_role}>{review.role}</Text>
                    </div>
                  </div>
                  <Rate
                    disabled
                    defaultValue={review.rating}
                    className={styles.review_rating}
                  />
                  <Text className={styles.review_text}>"{review.review}"</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Download CTA */}
        <div className={styles.download_cta}>
          <Title level={3} className={styles.cta_title}>
            Ready to Supercharge Your SEO?
          </Title>
          <Text className={styles.cta_description}>
            Join over 100,000 professionals who use our Chrome extension to
            optimize their content and boost their search rankings.
          </Text>
          <div className={styles.cta_buttons}>
            <Button type="primary" size="large" className={styles.primary_cta}>
              <FaChrome /> Add to Chrome - It's Free
            </Button>
            <Button size="large" className={styles.secondary_cta}>
              View All Features
            </Button>
          </div>
          <div className={styles.download_info}>
            <Tag color="green">✓ Free Forever</Tag>
            <Tag color="blue">✓ No Credit Card Required</Tag>
            <Tag color="purple">✓ 30-Second Setup</Tag>
          </div>
        </div>
      </div>
    </section>
  );
}
