import React from "react";
import { Row, Col, Card } from "antd";
import { FaFileAlt, FaSearch, FaPencilAlt } from "react-icons/fa";
import styles from "./benefits.module.scss";

const Benefits = () => {
  const benefits = [
    {
      icon: <FaFileAlt />,
      title: "SEO Content Template Overview",
      description:
        "Learn how to create comprehensive SEO content templates that guide your writers to produce optimized content.",
    },
    {
      icon: <FaSearch />,
      title: "How to Optimize Your Content Using Semrush SEO Content Template",
      description:
        "Discover the step-by-step process of using SEO content templates to improve your content's search engine performance.",
    },
    {
      icon: <FaPencilAlt />,
      title:
        "How to Create an SEO Friendly Brief and Make Sure the Copy is Optimized",
      description:
        "Master the art of creating detailed SEO briefs that ensure your content meets all optimization requirements.",
    },
  ];

  return (
    <div className={styles.benefits}>
      <h2 className={styles.title}>
        Learn More About the SEO Content Template
        <br />
        Tool's Benefits
      </h2>

      <Row gutter={[32, 32]}>
        {benefits.map((benefit, index) => (
          <Col span={8} key={index}>
            <Card className={styles.benefitCard}>
              <div className={styles.iconWrapper}>{benefit.icon}</div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Benefits;
