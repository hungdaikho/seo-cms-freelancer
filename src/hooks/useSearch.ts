import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export interface SearchItem {
  key: string;
  title: string;
  description: string;
  route: string;
  keywords: string[];
}

const useSearch = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Define searchable pages (excluding manage-user)
  const searchablePages: SearchItem[] = useMemo(
    () => [
      {
        key: "dashboard",
        title: "Dashboard",
        description: "Overview and comprehensive statistics of SEO projects",
        route: "/dashboard",
        keywords: [
          "dashboard",
          "overview",
          "statistics",
          "home",
          "main",
          "reports",
          "analytics",
          "analysis",
          "summary",
          "metrics",
          "data",
          "insights",
        ],
      },
      {
        key: "backlink-research",
        title: "Backlink Research",
        description: "Research and analyze backlinks, incoming links",
        route: "/backlink-research",
        keywords: [
          "backlink",
          "research",
          "link building",
          "external links",
          "incoming links",
          "inbound links",
          "link analysis",
          "domain authority",
          "page authority",
          "link profile",
          "anchor text",
          "referring domains",
          "link quality",
        ],
      },
      {
        key: "competitive-research",
        title: "Competitive Research",
        description: "Research and analyze competitors",
        route: "/competitive-research",
        keywords: [
          "competitive",
          "competitor",
          "competition",
          "research",
          "analysis",
          "competitor analysis",
          "market research",
          "competitive intelligence",
          "benchmark",
          "comparison",
          "rival",
          "market",
        ],
      },
      {
        key: "keyword-research",
        title: "Keyword Research",
        description: "SEO keyword research and search trend analysis",
        route: "/keyword-research",
        keywords: [
          "keyword",
          "research",
          "seo",
          "search terms",
          "search volume",
          "keyword difficulty",
          "cpc",
          "search intent",
          "long tail keywords",
          "seed keywords",
          "related keywords",
          "keyword analysis",
          "search queries",
        ],
      },
      {
        key: "on-page-tech-audit",
        title: "On-page Tech Audit",
        description: "On-page SEO technical audit and website optimization",
        route: "/on-page-tech-audit",
        keywords: [
          "audit",
          "on-page",
          "technical",
          "seo audit",
          "page audit",
          "technical seo",
          "site audit",
          "performance",
          "page speed",
          "meta tags",
          "schema markup",
          "crawl errors",
          "optimization",
          "website health",
        ],
      },
      {
        key: "rank-tracking",
        title: "Rank Tracking",
        description: "Track keyword rankings and SERP positions",
        route: "/rank-tracking",
        keywords: [
          "rank",
          "ranking",
          "tracking",
          "position",
          "serp",
          "search engine results",
          "keyword position",
          "rank monitoring",
          "search visibility",
          "organic traffic",
          "search performance",
          "position tracking",
          "serp tracking",
        ],
      },
    ],
    []
  );

  // Function to calculate relevance score for search results
  const calculateRelevance = (item: SearchItem, query: string): number => {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Exact match in title gets highest score
    if (item.title.toLowerCase() === queryLower) score += 100;
    else if (item.title.toLowerCase().includes(queryLower)) score += 50;

    // Match in description
    if (item.description.toLowerCase().includes(queryLower)) score += 30;

    // Match in keywords
    const matchingKeywords = item.keywords.filter((keyword) =>
      keyword.toLowerCase().includes(queryLower)
    );
    score += matchingKeywords.length * 20;

    // Bonus for exact keyword match
    if (item.keywords.some((keyword) => keyword.toLowerCase() === queryLower)) {
      score += 40;
    }

    // Bonus for starting with query
    if (item.title.toLowerCase().startsWith(queryLower)) score += 25;
    if (
      item.keywords.some((keyword) =>
        keyword.toLowerCase().startsWith(queryLower)
      )
    ) {
      score += 15;
    }

    return score;
  };

  // Advanced search function with improved algorithm
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();

    const results = searchablePages
      .map((page) => ({
        ...page,
        relevance: calculateRelevance(page, query),
      }))
      .filter((page) => page.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 6); // Limit to top 6 results

    return results;
  }, [searchQuery, searchablePages]);

  // Function to handle search and navigation
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      const queryLower = query.toLowerCase().trim();
      const results = searchablePages
        .map((page) => ({
          ...page,
          relevance: calculateRelevance(page, queryLower),
        }))
        .filter((page) => page.relevance > 0)
        .sort((a, b) => b.relevance - a.relevance);

      // If results found, navigate to the first result
      if (results.length > 0) {
        router.push(results[0].route);
        setSearchQuery(""); // Clear search after navigation
      }
    }
  };

  // Function for direct navigation
  const navigateToPage = (route: string) => {
    router.push(route);
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchablePages,
    handleSearch,
    navigateToPage,
  };
};

export default useSearch;
