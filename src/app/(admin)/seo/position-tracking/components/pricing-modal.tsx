"use client";

import React from "react";
import { Modal, Row, Col, Button, Switch } from "antd";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { FiArrowDown } from "react-icons/fi";
import styles from "./pricing-modal.module.scss";

interface PricingModalProps {
  visible: boolean;
  onClose: () => void;
}

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const PricingModal: React.FC<PricingModalProps> = ({ visible, onClose }) => {
  const [isAnnual, setIsAnnual] = React.useState(true);

  const plans: PricingPlan[] = [
    {
      name: "Pro",
      price: 139,
      period: "/mo",
      color: "#10b981",
      features: [
        "Up to 5 projects",
        "Keyword research tools",
        "Competitor analysis tools",
        "Position Tracking",
        "Backlink Analysis",
        "Site Audit",
      ],
    },
    {
      name: "Guru",
      price: 249,
      period: "/mo",
      color: "#10b981",
      popular: true,
      features: [
        "Up to 15 projects",
        "Historical data",
        "Multi-location and device data",
        "Domain topics with AI",
        "Content marketing tools",
      ],
    },
    {
      name: "Business",
      price: 499,
      period: "/mo",
      color: "#10b981",
      features: [
        "Up to 40 projects",
        "Share of Voice",
        "Extended limits",
        "API access",
        "Migration from third-party tools",
      ],
    },
  ];

  const featureComparison = [
    {
      category: "Domain & Keyword Analytics",
      pro: 3,
      guru: 4,
      business: 5,
    },
    {
      category: "Projects",
      pro: 2,
      guru: 3,
      business: 5,
    },
    {
      category: "Reporting",
      pro: 2,
      guru: 3,
      business: 5,
    },
  ];

  const renderDots = (count: number, max: number = 5) => {
    return Array.from({ length: max }, (_, i) => (
      <span
        key={i}
        className={`${styles.dot} ${i < count ? styles.active : ""}`}
      />
    ));
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      className={styles.pricingModal}
      closeIcon={<AiOutlineClose />}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Upgrade your SEO Toolkit</h2>
          <div className={styles.billingToggle}>
            <span className={isAnnual ? styles.active : ""}>
              Pay annually and{" "}
            </span>
            <span className={styles.highlight}>save up to 17%</span>
            <Switch
              checked={isAnnual}
              onChange={setIsAnnual}
              className={styles.switch}
            />
          </div>
        </div>

        <Row gutter={24} className={styles.plansRow}>
          {plans.map((plan, index) => (
            <Col span={8} key={index}>
              <div
                className={`${styles.planCard} ${
                  plan.popular ? styles.popular : ""
                }`}
              >
                <div className={styles.planHeader}>
                  <h3>{plan.name}</h3>
                  <div className={styles.priceSection}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.price}>{plan.price}</span>
                    <span className={styles.period}>{plan.period}</span>
                  </div>
                </div>

                <Button
                  type="primary"
                  className={styles.selectBtn}
                  style={{
                    backgroundColor: plan.color,
                    borderColor: plan.color,
                  }}
                >
                  Select plan
                </Button>

                <div className={styles.featuresSection}>
                  <h4>
                    {index === 0 && "What's inside:"}
                    {index === 1 && "All Pro features plus:"}
                    {index === 2 && "All Guru features plus:"}
                  </h4>
                  <ul className={styles.featuresList}>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <AiOutlineCheck className={styles.checkIcon} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div className={styles.comparisonSection}>
          <h3>Feature comparison</h3>
          <div className={styles.comparisonTable}>
            <div className={styles.comparisonHeader}>
              <div className={styles.featureColumn}></div>
              <div className={styles.planColumn}>Pro</div>
              <div className={styles.planColumn}>Guru</div>
              <div className={styles.planColumn}>Business</div>
            </div>
            {featureComparison.map((item, index) => (
              <div key={index} className={styles.comparisonRow}>
                <div className={styles.featureColumn}>
                  <FiArrowDown className={styles.expandIcon} />
                  {item.category}
                </div>
                <div className={styles.planColumn}>
                  <div className={styles.dotsContainer}>
                    {renderDots(item.pro)}
                  </div>
                </div>
                <div className={styles.planColumn}>
                  <div className={styles.dotsContainer}>
                    {renderDots(item.guru)}
                  </div>
                </div>
                <div className={styles.planColumn}>
                  <div className={styles.dotsContainer}>
                    {renderDots(item.business)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PricingModal;
