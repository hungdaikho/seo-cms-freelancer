"use client";

import React, { useState } from "react";
import { Button, Card, Row, Col, Table, Typography, Tag } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import styles from "./pricing.module.css";

const { Title, Text, Paragraph } = Typography;

type Props = {};

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonType: "primary" | "secondary";
  isCurrentPlan?: boolean;
  popular?: boolean;
}

const Page = (props: Props) => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">(
    "monthly"
  );

  const pricingPlans: PricingPlan[] = [
    {
      id: "individual",
      name: "Individual",
      price: billingPeriod === "monthly" ? 12 : 120,
      period: billingPeriod === "monthly" ? "month" : "year",
      description: "Lorem ipsum dolor sit amet, consectetur",
      features: [
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
      ],
      buttonText: "Current Plan",
      buttonType: "secondary",
      isCurrentPlan: true,
    },
    {
      id: "business",
      name: "Business",
      price: billingPeriod === "monthly" ? 20 : 200,
      period: billingPeriod === "monthly" ? "month" : "year",
      description: "Lorem ipsum dolor sit amet, consectetur",
      features: [
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
      ],
      buttonText: "Upgrade",
      buttonType: "primary",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: billingPeriod === "monthly" ? 40 : 400,
      period: billingPeriod === "monthly" ? "month" : "year",
      description: "Lorem ipsum dolor sit amet, consectetur",
      features: [
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
        "sit amet, consectetur",
      ],
      buttonText: "Upgrade",
      buttonType: "primary",
    },
  ];

  const comparisonFeatures = [
    "SEO Training & Support",
    "Reports Per Day",
    "Projects",
    "Chrome Extension Search Limits",
    "Rank Tracking",
    "Site Audit",
    "Keyword Research",
    "Competitive Analysis",
    "Backlinks",
  ];

  const comparisonData = comparisonFeatures.map((feature, index) => ({
    key: index,
    feature,
    individual: true,
    business: true,
    enterprise: true,
  }));

  return (
    <div className={styles.pricingContainer}>
      {/* Header Section */}
      <div className={styles.pricingHeader}>
        <Title level={1} className={styles.pricingTitle}>
          Pricing
        </Title>
      </div>

      {/* Billing Toggle */}
      <div className={styles.toggleContainer}>
        <div className={styles.planToggle}>
          <button
            className={`${styles.toggleButton} ${
              billingPeriod === "monthly" ? styles.inactive : styles.active
            }`}
            onClick={() => setBillingPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            className={`${styles.toggleButton} ${
              billingPeriod === "annually" ? styles.active : styles.inactive
            }`}
            onClick={() => setBillingPeriod("annually")}
          >
            Annually
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className={styles.cardsContainer}>
        {pricingPlans.map((plan) => (
          <div key={plan.id} className={styles.pricingCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.planIcon} ${styles[plan.id]}`}></div>
              <div className={styles.planName}>{plan.name}</div>
              <div>
                <span className={styles.planPrice}>${plan.price}</span>
                <span className={styles.planPriceSmall}> / {plan.period}</span>
              </div>
              <div className={styles.planDescription}>{plan.description}</div>
            </div>

            {plan.isCurrentPlan && (
              <div className={styles.currentPlanTag}>Current Plan</div>
            )}

            <Button
              type={plan.buttonType === "primary" ? "primary" : "default"}
              size="large"
              className={`${styles.upgradeButton} ${styles[plan.buttonType]}`}
              block
            >
              {plan.buttonText}
            </Button>

            <ul className={styles.featuresList}>
              {plan.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className={styles.comparisonContainer}>
        <div className={styles.comparisonHeader}>
          <Title level={2} className={styles.comparisonTitle}>
            Shoot for the stars with your SEO performance
          </Title>
          <Paragraph className={styles.comparisonSubtitle}>
            Lorem ipsum dolor sit amet, consectetur
          </Paragraph>
        </div>

        <div className={styles.comparisonTable}>
          {/* Table Header */}
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderCell}></div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.planHeaderInfo}>
                <div className={styles.planHeaderName}>Individual</div>
                <div className={styles.planHeaderPrice}>
                  ${billingPeriod === "monthly" ? "12" : "120"}
                  <span className={styles.planHeaderPeriod}>
                    {" "}
                    / {billingPeriod === "monthly" ? "month" : "year"}
                  </span>
                </div>
                <div className={styles.planHeaderDescription}>
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.planHeaderInfo}>
                <div className={styles.planHeaderName}>Business</div>
                <div className={styles.planHeaderPrice}>
                  ${billingPeriod === "monthly" ? "20" : "200"}
                  <span className={styles.planHeaderPeriod}>
                    {" "}
                    / {billingPeriod === "monthly" ? "month" : "year"}
                  </span>
                </div>
                <div className={styles.planHeaderDescription}>
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.planHeaderInfo}>
                <div className={styles.planHeaderName}>Enterprise</div>
                <div className={styles.planHeaderPrice}>
                  ${billingPeriod === "monthly" ? "40" : "400"}
                  <span className={styles.planHeaderPeriod}>
                    {" "}
                    / {billingPeriod === "monthly" ? "month" : "year"}
                  </span>
                </div>
                <div className={styles.planHeaderDescription}>
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
            </div>
          </div>

          {/* Feature Rows */}
          {comparisonData.map((row) => (
            <div key={row.key} className={styles.tableRow}>
              <div className={styles.tableCell}>{row.feature}</div>
              <div className={styles.tableCell}>
                {row.individual && <div className={styles.checkIcon}>✓</div>}
              </div>
              <div className={styles.tableCell}>
                {row.business && <div className={styles.checkIcon}>✓</div>}
              </div>
              <div className={styles.tableCell}>
                {row.enterprise && <div className={styles.checkIcon}>✓</div>}
              </div>
            </div>
          ))}

          {/* Action Buttons Row */}
          <div className={styles.tableActionRow}>
            <div className={styles.tableActionCell}></div>
            <div className={styles.tableActionCell}>
              <button
                className={`${styles.tableActionButton} ${styles.current}`}
              >
                Current Plan
              </button>
            </div>
            <div className={styles.tableActionCell}>
              <button
                className={`${styles.tableActionButton} ${styles.upgrade}`}
              >
                Upgrade
              </button>
            </div>
            <div className={styles.tableActionCell}>
              <button
                className={`${styles.tableActionButton} ${styles.upgrade}`}
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
