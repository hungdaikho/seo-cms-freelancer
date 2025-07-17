"use client";

import { Typography, Button, Row, Col, Tag } from "antd";
import {
  FaRobot,
  FaMagic,
  FaBrain,
  FaLightbulb,
  FaChartLine,
  FaEdit,
} from "react-icons/fa";
import { BiCheckCircle } from "react-icons/bi";
import styles from "./ai_writing_section.module.scss";

const { Title, Text } = Typography;

export default function AiWritingSection() {
  const aiFeatures = [
    {
      icon: <FaRobot />,
      title: "AI Content Generator",
      description:
        "Create high-quality articles, blog posts, and web copy in seconds",
      features: ["Long-form content", "Multiple formats", "Custom tone"],
    },
    {
      icon: <FaBrain />,
      title: "Smart Topic Research",
      description:
        "AI discovers trending topics and content ideas for your niche",
      features: ["Competitor analysis", "Search trends", "Content gaps"],
    },
    {
      icon: <FaMagic />,
      title: "Auto SEO Optimization",
      description:
        "Automatically optimizes content for search engines and readability",
      features: ["Keyword integration", "Meta tags", "Content structure"],
    },
  ];

  const writingSteps = [
    {
      step: 1,
      title: "Input Your Topic",
      description: "Enter keywords or topics you want to write about",
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "AI analyzes competitors and search trends",
    },
    {
      step: 3,
      title: "Content Generation",
      description: "High-quality content created with SEO optimization",
    },
    {
      step: 4,
      title: "Review & Publish",
      description: "Edit, refine and publish your optimized content",
    },
  ];

  return (
    <section className={styles.ai_writing_section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.section_header}>
          <Title level={2} className={styles.section_title}>
            <FaRobot className={styles.title_icon} />
            AI-Powered Content Creation
          </Title>
          <Text className={styles.section_subtitle}>
            Harness the power of artificial intelligence to create compelling,
            SEO-optimized content that ranks higher and converts better
          </Text>
        </div>

        {/* AI Features Grid */}
        <Row gutter={[32, 32]} className={styles.features_grid}>
          {aiFeatures.map((feature, index) => (
            <Col xs={24} lg={8} key={index}>
              <div className={styles.feature_card}>
                <div className={styles.feature_icon}>{feature.icon}</div>
                <Title level={4} className={styles.feature_title}>
                  {feature.title}
                </Title>
                <Text className={styles.feature_description}>
                  {feature.description}
                </Text>
                <div className={styles.feature_list}>
                  {feature.features.map((item, idx) => (
                    <div key={idx} className={styles.feature_item}>
                      <BiCheckCircle className={styles.check_icon} />
                      <Text>{item}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* AI Writing Process */}
        <div className={styles.process_section}>
          <Title level={3} className={styles.process_title}>
            How AI Content Creation Works
          </Title>
          <div className={styles.process_timeline}>
            {writingSteps.map((step, index) => (
              <div key={index} className={styles.process_step}>
                <div className={styles.step_number}>{step.step}</div>
                <div className={styles.step_content}>
                  <Title level={5} className={styles.step_title}>
                    {step.title}
                  </Title>
                  <Text className={styles.step_description}>
                    {step.description}
                  </Text>
                </div>
                {index < writingSteps.length - 1 && (
                  <div className={styles.step_connector}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Demo Preview */}
        <div className={styles.demo_section}>
          <Row gutter={[40, 40]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.demo_content}>
                <Title level={3} className={styles.demo_title}>
                  See AI in Action
                </Title>
                <Text className={styles.demo_description}>
                  Watch how our AI creates comprehensive, SEO-optimized content
                  from just a simple keyword or topic input.
                </Text>
                <div className={styles.demo_stats}>
                  <div className={styles.stat_item}>
                    <FaChartLine className={styles.stat_icon} />
                    <div>
                      <Text strong>95% SEO Score</Text>
                      <Text className={styles.stat_label}>
                        Average Content Quality
                      </Text>
                    </div>
                  </div>
                  <div className={styles.stat_item}>
                    <FaLightbulb className={styles.stat_icon} />
                    <div>
                      <Text strong>3x Faster</Text>
                      <Text className={styles.stat_label}>
                        Content Creation Speed
                      </Text>
                    </div>
                  </div>
                </div>
                <Button
                  type="primary"
                  size="large"
                  className={styles.try_ai_button}
                >
                  <FaEdit /> Try AI Writing Now
                </Button>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className={styles.ai_demo_mockup}>
                <div className={styles.demo_window}>
                  <div className={styles.window_header}>
                    <div className={styles.window_controls}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <Text className={styles.window_title}>
                      AI Content Generator
                    </Text>
                  </div>
                  <div className={styles.demo_interface}>
                    <div className={styles.input_section}>
                      <Text strong>Input Keyword:</Text>
                      <Tag color="blue" className={styles.keyword_tag}>
                        "Digital Marketing Trends 2024"
                      </Tag>
                    </div>
                    <div className={styles.ai_processing}>
                      <div className={styles.processing_step}>
                        <BiCheckCircle className={styles.completed_icon} />
                        <Text>Analyzing search trends...</Text>
                      </div>
                      <div className={styles.processing_step}>
                        <BiCheckCircle className={styles.completed_icon} />
                        <Text>Researching competitors...</Text>
                      </div>
                      <div className={styles.processing_step}>
                        <div className={styles.loading_icon}></div>
                        <Text>Generating content...</Text>
                      </div>
                    </div>
                    <div className={styles.output_preview}>
                      <Text strong>Generated Title:</Text>
                      <Text className={styles.generated_title}>
                        "15 Digital Marketing Trends That Will Dominate 2024:
                        Expert Insights & Strategies"
                      </Text>
                      <div className={styles.content_metrics}>
                        <Tag color="green">SEO Score: 94%</Tag>
                        <Tag color="blue">Readability: Excellent</Tag>
                        <Tag color="purple">Word Count: 2,847</Tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}
