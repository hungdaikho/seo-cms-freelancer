import React from "react";
import { Layout } from "antd";
import { BusinessProfile } from "./components/business_profile";
import { ReviewManagement } from "./components/review_management";
import { MapRankTracker } from "./components/map_rank_tracker";
import { GbpOptimization } from "./components/gbp_optimization";
import { ListingManagement } from "./components/listing_management";
import { HeroSection } from "./components/hero_section";
import { FaqSection } from "./components/faq_section";
import { Testimonials } from "./components/testimonials";
import styles from "./page.module.scss";

const { Content } = Layout;

const Page = () => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <HeroSection />
        <BusinessProfile />
        <ReviewManagement />
        <MapRankTracker />
        <GbpOptimization />
        <ListingManagement />
        <FaqSection />
        <Testimonials />
      </Content>
    </Layout>
  );
};

export default Page;