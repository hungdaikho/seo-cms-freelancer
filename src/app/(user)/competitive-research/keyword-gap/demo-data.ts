// Demo data for testing keyword gap analysis
export const demoKeywordGapData = {
  overview: {
    targetDomain: "example.com",
    competitors: ["competitor1.com", "competitor2.com"],
    comparison: {
      shared: 15420,
      missing: 8932,
      weak: 12650,
      strong: 18750,
      untapped: 5230,
      unique: 23480,
    },
  },
  keywordDetails: [
    {
      keyword: "web design",
      intent: "commercial",
      targetDomain: {
        position: 15,
        traffic: 1250,
        volume: 50000,
        cpc: 2.45,
        result: "15M",
      },
      competitor1: {
        position: 8,
        traffic: 2100,
        volume: 50000,
        cpc: 2.45,
        result: "15M",
      },
      competitor2: {
        position: 12,
        traffic: 1650,
        volume: 50000,
        cpc: 2.45,
        result: "15M",
      },
      kd: 72,
      status: "weak",
    },
    {
      keyword: "website builder",
      intent: "informational",
      targetDomain: {
        position: 3,
        traffic: 3200,
        volume: 120000,
        cpc: 1.85,
        result: "25M",
      },
      competitor1: {
        position: 7,
        traffic: 1800,
        volume: 120000,
        cpc: 1.85,
        result: "25M",
      },
      kd: 65,
      status: "strong",
    },
    {
      keyword: "responsive design",
      intent: "informational",
      targetDomain: {
        position: null,
        traffic: 0,
        volume: 35000,
        cpc: 3.2,
        result: "0",
      },
      competitor1: {
        position: 5,
        traffic: 2450,
        volume: 35000,
        cpc: 3.2,
        result: "8M",
      },
      competitor2: {
        position: 9,
        traffic: 1200,
        volume: 35000,
        cpc: 3.2,
        result: "8M",
      },
      kd: 58,
      status: "missing",
    },
  ],
  opportunities: [
    {
      category: "High Volume Missing",
      keywords: 125,
      estimatedTraffic: 45600,
    },
    {
      category: "Low Competition",
      keywords: 89,
      estimatedTraffic: 23400,
    },
    {
      category: "Weak Positions",
      keywords: 234,
      estimatedTraffic: 67800,
    },
  ],
  totalKeywords: 45678,
  exportUrl: "/api/export/keyword-gap/12345",
};

export const demoKeywordOverlapData = {
  overview: {
    domains: ["example.com", "competitor1.com", "competitor2.com"],
    totalUnique: 89750,
    overlap: {
      "competitor1.com": 15420,
      "competitor2.com": 12350,
    },
  },
  vennDiagram: {
    "example.com": {
      total: 34500,
      unique: 19080,
      shared: 15420,
    },
    "competitor1.com": {
      total: 42300,
      unique: 26880,
      shared: 15420,
    },
    "competitor2.com": {
      total: 38900,
      unique: 26550,
      shared: 12350,
    },
  },
  topOpportunities: [
    {
      keyword: "website templates",
      volume: 85000,
      missing: "example.com",
      competitors: {
        "competitor1.com": 4,
        "competitor2.com": 7,
      },
    },
    {
      keyword: "e-commerce design",
      volume: 62000,
      missing: "example.com",
      competitors: {
        "competitor1.com": 2,
        "competitor2.com": null,
      },
    },
    {
      keyword: "landing page optimization",
      volume: 45000,
      missing: "example.com",
      competitors: {
        "competitor1.com": 6,
        "competitor2.com": 9,
      },
    },
    {
      keyword: "mobile first design",
      volume: 38000,
      missing: "example.com",
      competitors: {
        "competitor1.com": 8,
        "competitor2.com": 12,
      },
    },
    {
      keyword: "user experience design",
      volume: 34000,
      missing: "example.com",
      competitors: {
        "competitor1.com": 3,
        "competitor2.com": 5,
      },
    },
  ],
};

// Test function to simulate API responses
export const simulateKeywordGapAPI = async (requestData: any) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return demo data with some customization based on request
  return {
    ...demoKeywordGapData,
    overview: {
      ...demoKeywordGapData.overview,
      targetDomain: requestData.targetDomain,
      competitors: requestData.competitors,
    },
  };
};

export const simulateKeywordOverlapAPI = async (requestData: any) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return demo data with customization
  return {
    ...demoKeywordOverlapData,
    overview: {
      ...demoKeywordOverlapData.overview,
      domains: requestData.domains,
    },
  };
};
