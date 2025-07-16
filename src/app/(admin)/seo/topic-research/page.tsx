"use client";

import React from "react";
import { Input, Select, Button } from "antd";
import styles from "./page.module.scss";
import TrustedBy from "./components/trusted_by/trusted_by";
import ExportIdeas from "./components/export_ideas/export_ideas";
import LearnMore from "./components/learn_more/learn_more";
import ContentFeatures from "./components/content_features/content_features";

type Props = {};

const { Option } = Select;

const Page = (props: Props) => {
  return (
    <div className={styles.page}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Topic Research</h1>
        <p className={styles.subtitle}>
          Win your readers' hearts and minds with a topic finder that helps you
          generate ideas for engaging content.
        </p>
      </div>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <Input
            placeholder="Enter topic"
            className={styles.searchInput}
            size="large"
          />
          <Select
            defaultValue="US"
            className={styles.countrySelect}
            size="large"
          >
            <Option value="US">🇺🇸 US</Option>
            <Option value="UK">🇬🇧 UK</Option>
            <Option value="CA">🇨🇦 CA</Option>
          </Select>
        </div>
        <div className={styles.domainLink}>
          + Enter domain to find content on
        </div>
        <Button type="primary" size="large" className={styles.getIdeasBtn}>
          Get content ideas
        </Button>
      </div>

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Explore Tool Section */}
      <div className={styles.exploreSection}>
        <h2>Explore the Topic Research Tool by Semrush</h2>
        <p>
          Discover ideas for content that will resonate with your customers —
          starting now!
        </p>
        <Button type="primary" className={styles.collectBtn}>
          Collect content ideas
        </Button>
      </div>

      {/* Export Ideas Section */}
      <ExportIdeas />

      {/* Learn More Section */}
      <LearnMore />

      {/* Content Features Section */}
      <ContentFeatures />
    </div>
  );
};

export default Page;
