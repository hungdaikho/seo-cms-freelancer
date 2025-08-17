import {
  AuditAPIResponse,
  AuditResultsResponse,
  AuditSummaryResponse,
} from "@/types/api.type";

// Mock data dựa trên AUDIT_API.md
export const mockAuditData: AuditAPIResponse = {
  id: "audit-uuid-123",
  projectId: "project-uuid-456",
  status: "completed",
  results: {
    config: {
      audit_type: "full",
      include_mobile: true,
      check_accessibility: true,
      analyze_performance: true,
      check_seo: true,
      check_content: true,
      check_technical: true,
    },
    started_at: "2025-08-18T10:00:00Z",
    progress: 100,
    overview: {
      score: 64,
      total_issues: 12,
      pages_analyzed: 5,
    },
    technical: {
      score: 85,
      issues: [
        {
          type: "missing_meta_description",
          severity: "warning",
          message: "Meta description missing on 2 pages",
          pages: ["https://designer.com/page1", "https://designer.com/page2"],
          count: 2,
        },
        {
          type: "missing_alt_text",
          severity: "error",
          message: "Images without alt text found",
          count: 11,
        },
      ],
    },
    performance: {
      score: 80,
      metrics: {
        first_contentful_paint: "1.2s",
        largest_contentful_paint: "2.1s",
        cumulative_layout_shift: 0.05,
      },
    },
    content: {
      score: 88,
      issues: [
        {
          type: "thin_content",
          severity: "warning",
          message: "Pages with thin content detected",
          count: 3,
        },
      ],
    },
    accessibility: {
      score: 92,
      issues: [
        {
          type: "color_contrast",
          severity: "warning",
          message: "Low color contrast elements found",
          count: 5,
        },
      ],
    },
  },
  createdAt: "2025-08-18T10:00:00Z",
  completedAt: "2025-08-18T10:02:00Z",
  message: "Audit completed successfully",
  project: {
    id: "project-uuid-456",
    name: "Designer.com Website",
    url: "https://designer.com",
  },
};

export const mockAuditResults: AuditResultsResponse = {
  id: "audit-uuid-123",
  status: "completed",
  results: {
    overview: {
      score: 64,
      total_issues: 12,
      pages_analyzed: 5,
      audit_duration: "2m 15s",
    },
    technical: {
      score: 85,
      issues: [
        {
          type: "missing_meta_description",
          severity: "warning",
          message: "Meta description missing on 2 pages",
          pages: ["https://designer.com/page1", "https://designer.com/page2"],
        },
        {
          type: "duplicate_title_tags",
          severity: "error",
          message: "Duplicate title tags found on multiple pages",
          pages: ["https://designer.com/about", "https://designer.com/contact"],
        },
        {
          type: "missing_h1_tags",
          severity: "warning",
          message: "Pages missing H1 tags",
          pages: ["https://designer.com/services"],
        },
      ],
    },
    performance: {
      score: 80,
      metrics: {
        first_contentful_paint: "1.2s",
        largest_contentful_paint: "2.1s",
        cumulative_layout_shift: 0.05,
      },
    },
    content: {
      score: 88,
      issues: [
        {
          type: "thin_content",
          severity: "warning",
          message: "Pages with thin content (less than 300 words)",
          pages: ["https://designer.com/contact"],
        },
        {
          type: "duplicate_content",
          severity: "error",
          message: "Duplicate content detected across pages",
          pages: ["https://designer.com/page1", "https://designer.com/page2"],
        },
      ],
    },
    accessibility: {
      score: 92,
      issues: [
        {
          type: "missing_alt_text",
          severity: "error",
          message: "Images missing alt text",
          pages: ["https://designer.com", "https://designer.com/about"],
        },
        {
          type: "color_contrast",
          severity: "warning",
          message: "Low color contrast elements",
          pages: ["https://designer.com/services"],
        },
      ],
    },
  },
  createdAt: "2025-08-18T10:00:00Z",
  completedAt: "2025-08-18T10:02:00Z",
};

export const mockAuditSummary: AuditSummaryResponse = {
  latestAudit: {
    id: "audit-uuid-123",
    status: "completed",
    results: mockAuditData.results,
    createdAt: "2025-08-18T10:00:00Z",
    completedAt: "2025-08-18T10:02:00Z",
  },
  stats: {
    completed: 15,
    running: 1,
    pending: 2,
    failed: 1,
  },
};

// Detailed audit data cho page
export const mockDetailedAuditData = {
  // SEO Issues
  seoIssues: [
    {
      type: "title",
      icon: "BulbOutlined",
      title: "Title Tags",
      description:
        "Issues with page titles including duplicates, missing titles, and length optimization",
      status: "warning",
      issuesCount: 3,
      details: [
        "Duplicate title tags on 2 pages",
        "Title too long on 1 page (over 60 characters)",
        "Missing title tag on 1 page",
      ],
    },
    {
      type: "description",
      icon: "BulbOutlined",
      title: "Meta Descriptions",
      description:
        "Issues with meta descriptions including missing descriptions and length optimization",
      status: "warning",
      issuesCount: 2,
      details: [
        "Missing meta description on 2 pages",
        "Meta description too short on 1 page",
      ],
    },
    {
      type: "headings",
      icon: "BulbOutlined",
      title: "Heading Structure",
      description: "Issues with heading hierarchy and structure across pages",
      status: "info",
      issuesCount: 1,
      details: ["Missing H1 tag on 1 page"],
    },
    {
      type: "images",
      icon: "BulbOutlined",
      title: "Image Optimization",
      description: "Issues with image alt text, file sizes, and optimization",
      status: "error",
      issuesCount: 11,
      details: [
        "Missing alt text on 11 images",
        "Large image files detected (over 1MB)",
        "Images without proper format optimization",
      ],
    },
  ],

  // Heading structure
  headingStructure: [
    { tag: "<H1>", count: 5, percentage: 100, color: "#1890ff" },
    { tag: "<H2>", count: 12, percentage: 80, color: "#52c41a" },
    { tag: "<H3>", count: 18, percentage: 60, color: "#faad14" },
    { tag: "<H4>", count: 8, percentage: 40, color: "#ff4d4f" },
    { tag: "<H5>", count: 3, percentage: 20, color: "#722ed1" },
    { tag: "<H6>", count: 1, percentage: 10, color: "#8c8c8c" },
  ],

  // Links analysis
  linksAnalysis: {
    totalLinks: 97,
    internalLinks: 45,
    externalLinks: 35,
    brokenLinks: 17,
    linkTypes: [
      { type: "Internal Links", color: "#1890ff", percentage: 46.4, count: 45 },
      { type: "External Links", color: "#faad14", percentage: 36.1, count: 35 },
      { type: "Broken Links", color: "#ff4d4f", percentage: 17.5, count: 17 },
    ],
  },

  // External links issues
  externalLinks: [
    {
      url: "Page has outgoing links with malformed href data: 11 pages",
      follow: "Follow",
      anchor: "Video Tutorial",
      status: "error",
      pages: ["https://designer.com/tutorials", "https://designer.com/help"],
    },
    {
      url: "Page has internal links to 3xx pages: 156 pages",
      follow: "Follow",
      anchor: "Log in",
      status: "error",
      pages: ["https://designer.com/login"],
    },
    {
      url: "Page has outbound internal links with meta anchor: 2 pages",
      follow: "Follow",
      anchor: "Open Designer",
      status: "error",
      pages: ["https://designer.com/app"],
    },
  ],

  // Internal links issues
  internalLinks: [
    {
      url: "Page has broken internal links: 5 pages",
      follow: "Follow",
      anchor: "Portfolio",
      status: "error",
      pages: ["https://designer.com/portfolio"],
    },
    {
      url: "Page has no follow internal links: 16 pages",
      follow: "NoFollow",
      anchor: "Design Tools",
      status: "warning",
      pages: ["https://designer.com/tools"],
    },
  ],

  // Content metrics
  contentMetrics: {
    textHtmlRatio: 18.64,
    averageWordsPerPage: 485,
    totalWords: 2425,
    readabilityScore: 75,
  },

  // Indexing checks
  indexingChecks: [
    {
      title: "Pages in Google Top 100",
      description: "297 of the website pages are in Google Top 100",
      status: "success",
      icon: "CheckCircleOutlined",
    },
    {
      title: "Indexing Permission",
      description: "All pages allow indexing",
      status: "success",
      icon: "CheckCircleOutlined",
    },
    {
      title: "Noindex Meta Tag",
      description: "Not found on analyzed pages",
      status: "success",
      icon: "CheckCircleOutlined",
    },
    {
      title: "Canonical Tags",
      description: "Properly implemented on all pages",
      status: "success",
      icon: "CheckCircleOutlined",
    },
    {
      title: "XML Sitemap",
      description: "Sitemap found and accessible",
      status: "success",
      icon: "CheckCircleOutlined",
    },
    {
      title: "Robots.txt",
      description: "Robots.txt file found and properly configured",
      status: "success",
      icon: "CheckCircleOutlined",
    },
  ],

  // Performance metrics
  performanceMetrics: {
    mobile: {
      score: 68,
      loadTime: "2.8s",
      coreWebVitals: {
        lcp: 2.1,
        fid: 85,
        cls: 0.15,
      },
      issues: [
        {
          title: "Avoid chaining critical requests",
          count: "3 chains found",
          severity: "major",
          impact: "high",
        },
        {
          title: "Ensure text remains visible during webfont load",
          count: "2 fonts affected",
          severity: "major",
          impact: "medium",
        },
        {
          title: "Largest contentful paint element",
          count: "1 element found",
          severity: "minor",
          impact: "low",
        },
      ],
    },
    desktop: {
      score: 89,
      loadTime: "1.2s",
      coreWebVitals: {
        lcp: 1.1,
        fid: 12,
        cls: 0.02,
      },
      issues: [
        {
          title: "Unused JavaScript",
          count: "245 KB unused",
          severity: "minor",
          impact: "low",
        },
      ],
    },
  },

  // Analytics integration
  analyticsIntegration: [
    {
      title: "Google Search Console",
      description: "Connected and verified",
      status: "connected",
      icon: "SearchOutlined",
    },
    {
      title: "Google Analytics",
      description: "GA4 property connected",
      status: "connected",
      icon: "BarChartOutlined",
    },
    {
      title: "Facebook Pixel",
      description: "Not detected on pages",
      status: "not-found",
      icon: "GlobalOutlined",
    },
  ],

  // Structured data
  structuredData: [
    {
      title: "Schema.org Markup",
      description: "Organization and WebSite schema detected",
      status: "success",
      icon: "CheckCircleOutlined",
      data: [
        { tag: "Organization", value: "Present" },
        { tag: "WebSite", value: "Present" },
        { tag: "BreadcrumbList", value: "Missing" },
      ],
    },
    {
      title: "Open Graph Protocol",
      description: "Open Graph meta tags found on pages",
      status: "success",
      icon: "CheckCircleOutlined",
      data: [
        { tag: "og:title", value: "Designer.com - Professional Design Tools" },
        {
          tag: "og:description",
          value: "Create stunning designs with our professional tools",
        },
        { tag: "og:image", value: "https://designer.com/og-image.jpg" },
        { tag: "og:url", value: "https://designer.com" },
      ],
    },
  ],

  // Security checks
  securityChecks: [
    {
      title: "SSL Certificate",
      description: "Valid SSL certificate installed",
      status: "success",
      details: {
        issuer: "Let's Encrypt",
        validFrom: "2024-01-15",
        validTo: "2024-04-15",
      },
    },
    {
      title: "Mixed Content",
      description: "No mixed content issues detected",
      status: "success",
    },
    {
      title: "Server Response",
      description: "All pages return 200 OK status",
      status: "success",
    },
  ],
};
