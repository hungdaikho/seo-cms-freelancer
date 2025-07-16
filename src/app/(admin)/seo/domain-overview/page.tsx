"use client";
import React from "react";
import SearchSection from "./components/search-section";
import MetricsOverview from "./components/metrics-overview";
import AnalysisSection from "./components/analysis-section";
import ChartVisualization from "./components/chart-visualization";
import CTASection from "./components/cta-section";
import styles from "./page.module.scss";

type Props = {};

const Page = (props: Props) => {
  // Mock data for demonstration
  const metricsData = {
    authorityScore: 91,
    organicTraffic: "169.2M",
    keyTopics: [
      { topic: "Movies", traffic: "High", category: "Entertainment" },
      { topic: "Books", traffic: "Medium", category: "Literature" },
      { topic: "Series", traffic: "Low", category: "Entertainment" },
    ],
  };

  const handleSearch = (domain: string, location: string) => {
    console.log("Searching for:", domain, "in", location);
    // Implement search logic here
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SearchSection onSearch={handleSearch} />

        <MetricsOverview data={metricsData} />

        <AnalysisSection
          title="Get a complete analysis"
          description="Save time spent on summary analysis. Compare up to five competitors within one report"
          features={[
            "Get a full overview of a domain and its online visibility",
            "Analyze a domain's growth trend over time",
            "See the markets where a domain has the leading representation",
            "Discover the topics and keywords that bring organic and paid search traffic to a domain",
          ]}
        >
          <ChartVisualization chartData={{ type: "comparison", data: {} }} />
        </AnalysisSection>

        <AnalysisSection
          title="Compare Domains"
          description="Uncover and analyze the key metrics either for a specific country or globally: organic search traffic, paid search traffic, and number of backlinks"
          features={[
            "Save time spent on summary analysis. Compare up to five competitors within one report",
            "Uncover and analyze the key metrics either for a specific country or globally: organic search traffic, paid search traffic, and number of backlinks",
            "Choose domain type: root domain, subdomain, subfolder",
          ]}
        >
          <ChartVisualization chartData={{ type: "growth", data: {} }} />
        </AnalysisSection>

        <AnalysisSection
          title="Growth Report"
          description="Evaluate a domain's progress for organic traffic, paid traffic, and backlinks for a specific period: three months, a quarter, 6 months, a season, or 1 year"
          features={[
            "Save time on reporting by getting the key data on a domain's growth trend in one place",
            "Evaluate a domain's progress for organic traffic, paid traffic, and backlinks for a specific period: three months, a quarter, 6 months, a season, or 1 year",
            "Easily export the report to xls or csv",
          ]}
        >
          <ChartVisualization chartData={{ type: "countries", data: {} }} />
        </AnalysisSection>

        <AnalysisSection
          title="Compare by Countries"
          description="Compare organic and paid performance of a domain in different countries"
          features={[
            "Compare organic and paid performance of a domain in different countries",
            "See the organic share of a domain for specific markets",
            "Export the trends to xls or csv",
          ]}
        >
          <ChartVisualization chartData={{ type: "countries", data: {} }} />
        </AnalysisSection>

        <CTASection />
      </div>
    </div>
  );
};

export default Page;
