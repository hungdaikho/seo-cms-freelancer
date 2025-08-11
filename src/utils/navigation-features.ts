// Navigation features data for local search
export interface NavigationFeature {
    id: string;
    title: string;
    description: string;
    category: string;
    route: string;
    keywords: string[];
    icon?: string;
}

export const navigationFeatures: NavigationFeature[] = [
    // SEO Features
    {
        id: "seo-dashboard",
        title: "SEO Dashboard",
        description: "Overview of your SEO performance and metrics",
        category: "SEO",
        route: "/seo",
        keywords: ["seo", "dashboard", "overview", "metrics", "performance", "tổng quan", "hiệu suất", "thống kê"],
        icon: "dashboard"
    },
    {
        id: "domain-overview",
        title: "Domain Overview",
        description: "Analyze domain authority, traffic, and competitive metrics",
        category: "SEO - Competitive Research",
        route: "/seo?tab=domain-overview",
        keywords: ["domain", "overview", "authority", "competitive", "analysis"],
        icon: "domain"
    },
    {
        id: "organic-research",
        title: "Organic Research",
        description: "Research organic keywords and competitor strategies",
        category: "SEO - Competitive Research",
        route: "/seo?tab=organic-research",
        keywords: ["organic", "research", "keywords", "competitor", "strategy"],
        icon: "research"
    },
    {
        id: "keyword-gap",
        title: "Keyword Gap",
        description: "Find keyword opportunities your competitors rank for",
        category: "SEO - Competitive Research",
        route: "/seo?tab=keyword-gap",
        keywords: ["keyword", "gap", "competitor", "opportunities", "ranking"],
        icon: "gap"
    },
    {
        id: "backlink-gap",
        title: "Backlink Gap",
        description: "Discover backlink opportunities from competitor analysis",
        category: "SEO - Competitive Research",
        route: "/seo?tab=backlink-gap",
        keywords: ["backlink", "gap", "link", "competitor", "opportunities"],
        icon: "link"
    },
    {
        id: "keyword-overview",
        title: "Keyword Overview",
        description: "Get detailed keyword metrics and SERP analysis",
        category: "SEO - Keyword Research",
        route: "/seo?tab=keyword-overview",
        keywords: ["keyword", "overview", "metrics", "serp", "analysis"],
        icon: "keyword"
    },
    {
        id: "keyword-magic-tool",
        title: "Keyword Magic Tool",
        description: "Find millions of keyword ideas and variations",
        category: "SEO - Keyword Research",
        route: "/seo?tab=keyword-magic-tool",
        keywords: ["keyword", "magic", "tool", "ideas", "variations", "research", "từ khóa", "nghiên cứu", "tìm kiếm"],
        icon: "magic"
    },
    {
        id: "keyword-strategy-builder",
        title: "Keyword Strategy Builder",
        description: "Build comprehensive keyword strategies and content plans",
        category: "SEO - Keyword Research",
        route: "/seo?tab=keyword-strategy-builder",
        keywords: ["keyword", "strategy", "builder", "content", "plan"],
        icon: "strategy"
    },
    {
        id: "position-tracking",
        title: "Position Tracking",
        description: "Track your keyword rankings and monitor SERP changes",
        category: "SEO - Keyword Research",
        route: "/seo?tab=position-tracking",
        keywords: ["position", "tracking", "ranking", "serp", "monitor", "theo dõi", "xếp hạng", "vị trí"],
        icon: "tracking"
    },
    {
        id: "organic-traffic-insights",
        title: "Organic Traffic Insights",
        description: "Analyze organic traffic patterns and opportunities",
        category: "SEO - Keyword Research",
        route: "/seo?tab=organic-traffic-insights",
        keywords: ["organic", "traffic", "insights", "patterns", "opportunities"],
        icon: "insights"
    },
    {
        id: "backlink-analytics",
        title: "Backlink Analytics",
        description: "Analyze backlink profiles and link building opportunities",
        category: "SEO - Link Building",
        route: "/seo?tab=backlink-analytics",
        keywords: ["backlink", "analytics", "link", "building", "profile"],
        icon: "analytics"
    },
    {
        id: "backlink-audit",
        title: "Backlink Audit",
        description: "Audit your backlink profile for toxic links",
        category: "SEO - Link Building",
        route: "/seo?tab=backlink-audit",
        keywords: ["backlink", "audit", "toxic", "links", "clean"],
        icon: "audit"
    },
    {
        id: "link-building-tool",
        title: "Link Building Tool",
        description: "Find and manage link building opportunities",
        category: "SEO - Link Building",
        route: "/seo?tab=link-building-tool",
        keywords: ["link", "building", "tool", "opportunities", "outreach"],
        icon: "building"
    },
    {
        id: "bulk-analysis",
        title: "Bulk Analysis",
        description: "Analyze multiple domains or URLs at once",
        category: "SEO - Link Building",
        route: "/seo?tab=bulk-analysis",
        keywords: ["bulk", "analysis", "multiple", "domains", "urls"],
        icon: "bulk"
    },
    {
        id: "site-audit",
        title: "Site Audit",
        description: "Comprehensive technical SEO audit of your website",
        category: "SEO - On Page & Tech SEO",
        route: "/seo?tab=site-audit",
        keywords: ["site", "audit", "technical", "seo", "website"],
        icon: "audit"
    },
    {
        id: "on-page-seo-checker",
        title: "On Page SEO Checker",
        description: "Check and optimize on-page SEO elements",
        category: "SEO - On Page & Tech SEO",
        route: "/seo?tab=on-page-seo-checker",
        keywords: ["on-page", "seo", "checker", "optimize", "elements"],
        icon: "checker"
    },
    {
        id: "log-file-analyzer",
        title: "Log File Analyzer",
        description: "Analyze server log files for SEO insights",
        category: "SEO - On Page & Tech SEO",
        route: "/seo?tab=log-file-analyzer",
        keywords: ["log", "file", "analyzer", "server", "insights"],
        icon: "analyzer"
    },
    {
        id: "seo-writing-assistant",
        title: "SEO Writing Assistant",
        description: "AI-powered SEO content writing and optimization",
        category: "SEO - Content Ideas",
        route: "/seo?tab=seo-writing-assistant",
        keywords: ["seo", "writing", "assistant", "ai", "content", "optimization"],
        icon: "writing"
    },
    {
        id: "topic-research",
        title: "Topic Research",
        description: "Discover trending topics and content ideas",
        category: "SEO - Content Ideas",
        route: "/seo?tab=topic-research",
        keywords: ["topic", "research", "trending", "content", "ideas"],
        icon: "topic"
    },
    {
        id: "seo-content-template",
        title: "SEO Content Template",
        description: "Create SEO-optimized content templates",
        category: "SEO - Content Ideas",
        route: "/seo?tab=seo-content-template",
        keywords: ["seo", "content", "template", "optimized", "create"],
        icon: "template"
    },

    // Traffic & Market Features
    {
        id: "traffic-get-started",
        title: "Traffic Get Started",
        description: "Get started with traffic analysis and market research",
        category: "Traffic & Market",
        route: "/traffic",
        keywords: ["traffic", "get", "started", "analysis", "market", "research"],
        icon: "start"
    },
    {
        id: "insider-knowledge",
        title: "Insider Knowledge",
        description: "Access insider knowledge and market insights",
        category: "Traffic & Market",
        route: "/traffic?tab=insider-knowledge",
        keywords: ["insider", "knowledge", "market", "insights", "data"],
        icon: "insider"
    },
    {
        id: "traffic-analytics",
        title: "Traffic Analytics",
        description: "Comprehensive traffic analysis and reporting",
        category: "Traffic & Market",
        route: "/traffic?tab=traffic-analytics",
        keywords: ["traffic", "analytics", "analysis", "reporting", "data", "phân tích", "lưu lượng", "dữ liệu"],
        icon: "analytics"
    },
    {
        id: "daily-trends",
        title: "Daily Trends",
        description: "Monitor daily traffic trends and patterns",
        category: "Traffic & Market",
        route: "/traffic?tab=daily-trends",
        keywords: ["daily", "trends", "traffic", "patterns", "monitor"],
        icon: "trends"
    },
    {
        id: "ai-traffic",
        title: "AI Traffic",
        description: "AI-powered traffic analysis and predictions",
        category: "Traffic & Market - Traffic Distribution",
        route: "/traffic?tab=ai-traffic",
        keywords: ["ai", "traffic", "artificial", "intelligence", "predictions"],
        icon: "ai"
    },
    {
        id: "referral-traffic",
        title: "Referral Traffic",
        description: "Analyze referral traffic sources and patterns",
        category: "Traffic & Market - Traffic Distribution",
        route: "/traffic?tab=referral",
        keywords: ["referral", "traffic", "sources", "patterns", "analysis"],
        icon: "referral"
    },
    {
        id: "organic-search-traffic",
        title: "Organic Search",
        description: "Analyze organic search traffic and performance",
        category: "Traffic & Market - Traffic Distribution",
        route: "/traffic?tab=organic-search",
        keywords: ["organic", "search", "traffic", "performance", "seo"],
        icon: "organic"
    },
    {
        id: "paid-search-traffic",
        title: "Paid Search",
        description: "Analyze paid search traffic and ad performance",
        category: "Traffic & Market - Traffic Distribution",
        route: "/traffic?tab=paid-search",
        keywords: ["paid", "search", "traffic", "ads", "ppc"],
        icon: "paid"
    },
    {
        id: "organic-social-traffic",
        title: "Organic Social",
        description: "Analyze organic social media traffic",
        category: "Traffic & Market - Traffic Distribution",
        route: "/traffic?tab=organic-social",
        keywords: ["organic", "social", "media", "traffic", "posts"],
        icon: "social"
    },
    {
        id: "paid-social-traffic",
        title: "Paid Social",
        description: "Analyze paid social media advertising traffic",
        category: "Traffic & Market - Traffic Distribution",
        route: "/traffic?tab=paid-social",
        keywords: ["paid", "social", "media", "advertising", "traffic"],
        icon: "social-ads"
    },
    {
        id: "email-traffic",
        title: "Email Traffic",
        description: "Analyze email marketing traffic and campaigns",
        category: "Traffic & Market - Traffic Distribution",
        route: "/traffic?tab=email",
        keywords: ["email", "traffic", "marketing", "campaigns", "newsletter"],
        icon: "email"
    },
    {
        id: "display-ads-traffic",
        title: "Display Ads",
        description: "Analyze display advertising traffic and performance",
        category: "Traffic & Market - Traffic Distribution",
        route: "/traffic?tab=display-ads",
        keywords: ["display", "ads", "advertising", "traffic", "banners"],
        icon: "display"
    },
    {
        id: "sources-destinations",
        title: "Sources & Destinations",
        description: "Analyze traffic sources and destination patterns",
        category: "Traffic & Market - Traffic Distribution",
        route: "/traffic?tab=sources-destinations",
        keywords: ["sources", "destinations", "traffic", "patterns", "flow"],
        icon: "flow"
    },
    {
        id: "top-pages",
        title: "Top Pages",
        description: "Analyze top performing pages and content",
        category: "Traffic & Market - Pages and Categories",
        route: "/traffic?tab=top-pages",
        keywords: ["top", "pages", "performing", "content", "popular"],
        icon: "pages"
    },
    {
        id: "subfolders",
        title: "Subfolders & Subdomains",
        description: "Analyze subfolder and subdomain performance",
        category: "Traffic & Market - Pages and Categories",
        route: "/traffic?tab=subfolders",
        keywords: ["subfolders", "subdomains", "performance", "structure"],
        icon: "folders"
    },
    {
        id: "usa-traffic",
        title: "USA Traffic",
        description: "Analyze USA-specific traffic patterns",
        category: "Traffic & Market - Regional Trends",
        route: "/traffic?tab=usa",
        keywords: ["usa", "traffic", "america", "regional", "patterns"],
        icon: "usa"
    },
    {
        id: "countries-traffic",
        title: "Countries",
        description: "Analyze traffic patterns by country",
        category: "Traffic & Market - Regional Trends",
        route: "/traffic?tab=countries",
        keywords: ["countries", "traffic", "international", "global", "geo"],
        icon: "countries"
    },
    {
        id: "business-regions",
        title: "Business Regions",
        description: "Analyze traffic by business regions",
        category: "Traffic & Market - Regional Trends",
        route: "/traffic?tab=business-regions",
        keywords: ["business", "regions", "traffic", "commercial", "areas"],
        icon: "business"
    },
    {
        id: "geo-regions",
        title: "Geographical Regions",
        description: "Analyze traffic by geographical regions",
        category: "Traffic & Market - Regional Trends",
        route: "/traffic?tab=geo-regions",
        keywords: ["geographical", "regions", "traffic", "location", "geo"],
        icon: "geo"
    },
    {
        id: "audience-overlap",
        title: "Audience Overlap",
        description: "Analyze audience overlap between websites",
        category: "Traffic & Market - Audience Profile",
        route: "/traffic?tab=audience-overlap",
        keywords: ["audience", "overlap", "websites", "users", "demographics"],
        icon: "overlap"
    },
    {
        id: "demographics",
        title: "Demographics",
        description: "Analyze audience demographics and characteristics",
        category: "Traffic & Market - Audience Profile",
        route: "/traffic?tab=demographics",
        keywords: ["demographics", "audience", "characteristics", "users", "profile"],
        icon: "demographics"
    },
    {
        id: "market-overview",
        title: "Market Overview",
        description: "Get market overview and competitive landscape",
        category: "Traffic & Market - Market",
        route: "/traffic?tab=market-overview",
        keywords: ["market", "overview", "competitive", "landscape", "industry"],
        icon: "market"
    },
    {
        id: "trending-websites",
        title: "Trending Websites",
        description: "Discover trending websites in your industry",
        category: "Traffic & Market - Market",
        route: "/traffic?tab=trending-websites",
        keywords: ["trending", "websites", "industry", "popular", "rising"],
        icon: "trending"
    },
    {
        id: "eyeon",
        title: "EyeOn",
        description: "Monitor competitors and market changes",
        category: "Traffic & Market - Market",
        route: "/traffic?tab=eyeon",
        keywords: ["eyeon", "monitor", "competitors", "market", "changes"],
        icon: "eye"
    },
    {
        id: "trends-api",
        title: "Trends API",
        description: "Access trends data through API",
        category: "Traffic & Market - Market",
        route: "/traffic?tab=trends-api",
        keywords: ["trends", "api", "data", "access", "integration"],
        icon: "api"
    },

    // Content Features
    {
        id: "content-dashboard",
        title: "Content Dashboard",
        description: "Overview of your content performance and strategy",
        category: "Content",
        route: "/content",
        keywords: ["content", "dashboard", "overview", "performance", "strategy", "nội dung", "chiến lược", "tổng quan"],
        icon: "dashboard"
    },
    {
        id: "topic-finder",
        title: "Topic Finder",
        description: "Discover trending topics and content opportunities",
        category: "Content",
        route: "/content?topic-finder",
        keywords: ["topic", "finder", "trending", "content", "opportunities", "ideas"],
        icon: "topic"
    },
    {
        id: "seo-brief-generator",
        title: "SEO Brief Generator",
        description: "Generate SEO briefs for content creation",
        category: "Content",
        route: "/content?seo-brief-generator",
        keywords: ["seo", "brief", "generator", "content", "creation", "outline"],
        icon: "brief"
    },
    {
        id: "ai-article-generator",
        title: "AI Article Generator",
        description: "Generate AI-powered articles and content",
        category: "Content",
        route: "/content?ai-article-generator",
        keywords: ["ai", "article", "generator", "artificial", "intelligence", "writing"],
        icon: "ai-writing"
    },
    {
        id: "content-optimizer",
        title: "Content Optimizer",
        description: "Optimize existing content for better performance",
        category: "Content",
        route: "/content?content-optimizer",
        keywords: ["content", "optimizer", "optimize", "performance", "improve"],
        icon: "optimize"
    },
    {
        id: "my-content",
        title: "My Content",
        description: "Manage and track your content library",
        category: "Content",
        route: "/content?my-content",
        keywords: ["my", "content", "manage", "library", "track", "portfolio"],
        icon: "library"
    },

    // AI Features
    {
        id: "brand-performance",
        title: "Brand Performance",
        description: "Monitor your brand performance in AI search",
        category: "AI",
        route: "/ai",
        keywords: ["brand", "performance", "ai", "search", "monitor"],
        icon: "brand"
    },
    {
        id: "visibility",
        title: "Visibility",
        description: "Track your visibility in AI-powered search results",
        category: "AI",
        route: "/ai",
        keywords: ["visibility", "ai", "search", "results", "track"],
        icon: "visibility"
    },
    {
        id: "perception",
        title: "Perception",
        description: "Analyze how AI perceives your brand",
        category: "AI",
        route: "/ai",
        keywords: ["perception", "ai", "brand", "analyze", "sentiment"],
        icon: "perception"
    },
    {
        id: "questions",
        title: "Questions",
        description: "Discover questions AI answers about your industry",
        category: "AI",
        route: "/ai",
        keywords: ["questions", "ai", "answers", "industry", "discover"],
        icon: "questions"
    }
];

// Utility functions for search
export const searchFeatures = (query: string): NavigationFeature[] => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();
    const searchWords = searchTerm.split(' ').filter(word => word.length > 0);

    return navigationFeatures.filter(feature => {
        // Exact match gets highest priority
        if (feature.title.toLowerCase().includes(searchTerm)) return true;
        if (feature.description.toLowerCase().includes(searchTerm)) return true;
        if (feature.category.toLowerCase().includes(searchTerm)) return true;

        // Word-by-word search for partial matches
        const allText = `${feature.title} ${feature.description} ${feature.category} ${feature.keywords.join(' ')}`.toLowerCase();
        const matchedWords = searchWords.filter(word => allText.includes(word));

        // Return true if at least half of the search words are found
        if (searchWords.length > 1 && matchedWords.length >= Math.ceil(searchWords.length / 2)) {
            return true;
        }

        // Single word partial match
        if (searchWords.length === 1 && matchedWords.length > 0) {
            return true;
        }

        return false;
    }).sort((a, b) => {
        // Sort by relevance - exact title matches first
        const aExactTitle = a.title.toLowerCase().includes(searchTerm);
        const bExactTitle = b.title.toLowerCase().includes(searchTerm);

        if (aExactTitle && !bExactTitle) return -1;
        if (!aExactTitle && bExactTitle) return 1;

        // Then by category matches
        const aExactCategory = a.category.toLowerCase().includes(searchTerm);
        const bExactCategory = b.category.toLowerCase().includes(searchTerm);

        if (aExactCategory && !bExactCategory) return -1;
        if (!aExactCategory && bExactCategory) return 1;

        // Finally alphabetical
        return a.title.localeCompare(b.title);
    }).slice(0, 10); // Limit to 10 results
};

export const getFeatureByRoute = (route: string): NavigationFeature | undefined => {
    return navigationFeatures.find(feature => feature.route === route);
};

export const getFeaturesbyCategory = (category: string): NavigationFeature[] => {
    return navigationFeatures.filter(feature =>
        feature.category.toLowerCase().includes(category.toLowerCase())
    );
};
