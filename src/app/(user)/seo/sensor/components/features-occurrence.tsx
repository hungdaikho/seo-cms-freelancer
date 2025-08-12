import React from "react";
import { Card, Row, Col, Progress } from "antd";
import {
  FaStar,
  FaQuestionCircle,
  FaNewspaper,
  FaImage,
  FaPlay,
  FaTrophy,
  FaMapMarkerAlt,
  FaBook,
  FaUtensils,
  FaTwitter,
  FaSearch,
  FaLayerGroup,
} from "react-icons/fa";
import styles from "./features-occurrence.module.scss";

const FeaturesOccurrence = () => {
  const leftFeatures = [
    { icon: <FaStar />, name: "Featured snippet", percentage: 1.22, change: 0 },
    { icon: <FaStar />, name: "Sitelinks", percentage: 71.41, change: -0.23 },
    {
      icon: <FaQuestionCircle />,
      name: "FAQ",
      percentage: 0.54,
      change: -0.02,
    },
    {
      icon: <FaQuestionCircle />,
      name: "AI Overview",
      percentage: 16.48,
      change: -0.22,
    },
    { icon: <FaStar />, name: "Reviews", percentage: 10.08, change: 0.61 },
    {
      icon: <FaQuestionCircle />,
      name: "Instant answer",
      percentage: 2.69,
      change: -0.06,
    },
    { icon: <FaNewspaper />, name: "News", percentage: 0.03, change: 0.01 },
    { icon: <FaImage />, name: "Image", percentage: 38.87, change: -0.26 },
    { icon: <FaImage />, name: "Image pack", percentage: 65.15, change: -0.39 },
    { icon: <FaPlay />, name: "Video", percentage: 50.72, change: -0.06 },
  ];

  const rightFeatures = [
    {
      icon: <FaTrophy />,
      name: "Top stories",
      percentage: 4.98,
      change: -0.24,
    },
    { icon: <FaNewspaper />, name: "Events", percentage: 0.77, change: -0.03 },
    {
      icon: <FaUtensils />,
      name: "Hotels pack",
      percentage: 0.73,
      change: -0.02,
    },
    {
      icon: <FaMapMarkerAlt />,
      name: "Flights",
      percentage: 0.04,
      change: -0.01,
    },
    { icon: <FaBook />, name: "Recipes", percentage: 1.87, change: -0.22 },
    { icon: <FaTwitter />, name: "Twitter", percentage: 0.15, change: -0.01 },
    {
      icon: <FaTwitter />,
      name: "Twitter carousel",
      percentage: 1.93,
      change: -0.04,
    },
    {
      icon: <FaMapMarkerAlt />,
      name: "Address Pack",
      percentage: 0.01,
      change: 0,
    },
    {
      icon: <FaSearch />,
      name: "See results about",
      percentage: 5.03,
      change: -0.17,
    },
    {
      icon: <FaLayerGroup />,
      name: "Related searches",
      percentage: 95.62,
      change: -0.09,
    },
  ];

  const getChangeColor = (change: number) => {
    if (change > 0) return "#52c41a";
    if (change < 0) return "#ff4d4f";
    return "#666";
  };

  const getChangePrefix = (change: number) => {
    if (change > 0) return "+";
    return "";
  };

  const FeatureItem = ({ feature }: { feature: any }) => (
    <div className={styles.featureItem}>
      <div className={styles.featureLeft}>
        <span className={styles.featureIcon}>{feature.icon}</span>
        <span className={styles.featureName}>{feature.name}</span>
      </div>
      <div className={styles.featureRight}>
        <span className={styles.percentage}>{feature.percentage}%</span>
        <span
          className={styles.change}
          style={{ color: getChangeColor(feature.change) }}
        >
          {getChangePrefix(feature.change)}
          {feature.change.toFixed(2)}
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.featuresOccurrence}>
      <Card className={styles.featuresCard}>
        <div className={styles.cardHeader}>
          <h3>SERP Features Occurrence</h3>
          <p>
            Percentage of SERPs where this feature appears in top 20 results
          </p>
        </div>

        <Row gutter={[32, 0]}>
          <Col span={12}>
            <div className={styles.featuresColumn}>
              {leftFeatures.map((feature, index) => (
                <FeatureItem key={index} feature={feature} />
              ))}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.featuresColumn}>
              {rightFeatures.map((feature, index) => (
                <FeatureItem key={index} feature={feature} />
              ))}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FeaturesOccurrence;
