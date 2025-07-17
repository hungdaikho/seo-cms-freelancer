import React from "react";
import styles from "./sider.dashboard.module.scss";
import { FaHome } from "react-icons/fa";
import { TbReport, TbSettingsSearch } from "react-icons/tb";
import { Dropdown, Menu } from "antd";
import { BsBarChart } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { TbEditCircle, TbTargetArrow } from "react-icons/tb";
import { GoStar } from "react-icons/go";
import { IoShareSocial } from "react-icons/io5";
import { RiApps2AiFill } from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";
const SiderDashBoard = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Helper function to check if a menu item is active
  const isActive = (path: string) => {
    if (path === "/projects") {
      return pathname === "/projects";
    }
    return pathname.startsWith(path);
  };

  // Helper function to check if any submenu item is active
  const isMenuActive = (routes: string[]) => {
    return routes.some((route) => pathname.startsWith(route));
  };

  // Mapping menu keys to routes
  const routeMap: { [key: string]: string } = {
    // SEO routes
    "seo-dashboard": "/seo",
    "domain-overview": "/seo/domain-overview",
    "organic-research": "/seo/organic-research",
    "keyword-gap": "/seo/keyword-gap",
    "backlink-gap": "/seo/backlink-gap",
    "keyword-overview": "/seo/keyword-overview",
    "keyword-magic-tool": "/seo/keyword-magic-tool",
    "keyword-strategy-builder": "/seo/keyword-strategy-builder",
    "position-tracking": "/seo/position-tracking",
    "organic-traffic-insights": "/seo/organic-traffic-insights",
    "backlink-analytics": "/seo/backlink-analytics",
    "backlink-audit": "/seo/backlink-audit",
    "link-building-tool": "/seo/link-building-tool",
    "bulk-analysis": "/seo/bulk-analysis",
    "site-audit": "/seo/site-audit",
    "on-page-seo-checker": "/seo/on-page-seo-checker",
    "log-file-analyzer": "/seo/log-file-analyzer",
    "seo-writing-assistant": "/seo/seo-writing-assistant",
    "topic-research": "/seo/topic-research",
    "seo-content-template": "/seo/seo-content-template",
    sensor: "/seo/sensor",

    // Traffic & Market routes
    "get-started": "/traffic",
    "insider-knowledge": "/traffic/insider-knowledge",
    "traffic-analytics": "/traffic/traffic-analytics",
    "daily-trends": "/traffic/daily-trends",
    "ai-traffic": "/traffic/ai-traffic",
    referral: "/traffic/referral",
    "organic-search": "/traffic/organic-search",
    "paid-search": "/traffic/paid-search",
    "organic-social": "/traffic/organic-social",
    "paid-social": "/traffic/paid-social",
    email: "/traffic/email",
    "display-ads": "/traffic/display-ads",
    "sources-destinations": "/traffic/sources-destinations",
    "top-pages": "/traffic/top-pages",
    subfolders: "/traffic/subfolders",
    usa: "/traffic/usa",
    countries: "/traffic/countries",
    "business-regions": "/traffic/business-regions",
    "geo-regions": "/traffic/geo-regions",
    "audience-overlap": "/traffic/audience-overlap",
    demographics: "/traffic/demographics",
    "market-overview": "/traffic/market-overview",
    "trending-websites": "/traffic/trending-websites",
    eyeon: "/traffic/eyeon",
    "trends-api": "/traffic/trends-api",

    // Local routes
    "local-dashboard": "/local",
    "gbp-optimization": "/local/gbp-optimization",
    "listing-management": "/local/listing-management",
    "map-rank-tracker": "/local/map-rank-tracker",
    "review-management": "/local/review-management",

    // Content routes
    "content-dashboard": "/content",
    "topic-finder": "/content?topic-finder",
    "seo-brief-generator": "/content?seo-brief-generator",
    "ai-article-generator": "/content?ai-article-generator",
    "content-optimizer": "/content?content-optimizer",
    "my-content": "/content?my-content",

    // AI routes
    "brand-performance": "/ai",
    visibility: "/ai",
    perception: "/ai",
    questions: "/ai",

    // Social routes
    "social-dashboard": "/social",
    "social-media-tracker": "/social?media-tracker",
    "social-media-poster": "/social?media-poster",
    "social-analytics": "/social?analytics",

    // AD routes
    "ad-dashboard": "/ad",
    "ppc-keyword-tool": "/ad/ppc-keyword-tool",
    "advertising-research": "/ad/advertising-research",
    "display-advertising": "/ad/display-advertising",

    // Report routes
    "report-dashboard": "/report",
    "my-reports": "/report/my-reports",
    "report-templates": "/report/templates",

    // App Center routes
    "app-center": "/app-center",
    marketplace: "/app-center/marketplace",
    "my-apps": "/app-center/my-apps",
  };

  // Get selected keys for menu highlighting
  const getSelectedKeys = () => {
    // Find which menu item matches current pathname
    for (const [key, route] of Object.entries(routeMap)) {
      // Exact match first
      if (pathname === route) {
        return [key];
      }
      // For non-root paths, check if pathname starts with route
      if (route !== "/" && pathname.startsWith(route + "/")) {
        return [key];
      }
    }
    return [];
  };

  const handleMenuClick = (key: string) => {
    const route = routeMap[key];
    if (route) {
      router.push(route);
    }
  };

  const menu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={getSelectedKeys()}
      items={[
        {
          key: "seo-dashboard",
          label: "SEO Dashboard",
        },
        {
          type: "group",
          label: "Competitive Research",
          children: [
            { key: "domain-overview", label: "Domain Overview" },
            { key: "organic-research", label: "Organic Research" },
            { key: "keyword-gap", label: "Keyword Gap" },
            { key: "backlink-gap", label: "Backlink Gap" },
          ],
        },
        {
          type: "group",
          label: "Keyword Research",
          children: [
            { key: "keyword-overview", label: "Keyword Overview" },
            { key: "keyword-magic-tool", label: "Keyword Magic Tool" },
            {
              key: "keyword-strategy-builder",
              label: "Keyword Strategy Builder",
            },
            { key: "position-tracking", label: "Position Tracking" },
            {
              key: "organic-traffic-insights",
              label: "Organic Traffic Insights",
            },
          ],
        },
        {
          type: "group",
          label: "Link Building",
          children: [
            { key: "backlink-analytics", label: "Backlink Analytics" },
            { key: "backlink-audit", label: "Backlink Audit" },
            { key: "link-building-tool", label: "Link Building Tool" },
            { key: "bulk-analysis", label: "Bulk Analysis" },
          ],
        },
        {
          type: "group",
          label: "On Page & Tech SEO",
          children: [
            { key: "site-audit", label: "Site Audit" },
            { key: "on-page-seo-checker", label: "On Page SEO Checker" },
            { key: "log-file-analyzer", label: "Log File Analyzer" },
          ],
        },
        {
          type: "group",
          label: "Content Ideas",
          children: [
            { key: "seo-writing-assistant", label: "SEO Writing Assistant" },
            { key: "topic-research", label: "Topic Research" },
            { key: "seo-content-template", label: "SEO Content Template" },
          ],
        },
        {
          type: "group",
          label: "Extras",
          children: [{ key: "sensor", label: "Sensor" }],
        },
      ]}
    />
  );
  const trafficMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={getSelectedKeys()}
      items={[
        {
          type: "group",
          label: "Traffic & Market (.Trends)",
          children: [
            { key: "get-started", label: "Get Started" },
            { key: "insider-knowledge", label: "Insider Knowledge" },
            { key: "traffic-analytics", label: "Traffic Analytics" },
            { key: "daily-trends", label: "Daily Trends" },
          ],
        },
        {
          type: "group",
          label: "Traffic Distribution",
          children: [
            {
              key: "ai-traffic",
              label: (
                <span>
                  AI Traffic{" "}
                  <span
                    style={{ color: "#52c41a", fontSize: 10, marginLeft: 6 }}
                  >
                    NEW
                  </span>
                </span>
              ),
            },
            { key: "referral", label: "Referral" },
            { key: "organic-search", label: "Organic Search" },
            { key: "paid-search", label: "Paid Search" },
            { key: "organic-social", label: "Organic Social" },
            { key: "paid-social", label: "Paid Social" },
            { key: "email", label: "Email" },
            { key: "display-ads", label: "Display Ads" },
            { key: "sources-destinations", label: "Sources & Destinations" },
          ],
        },
        {
          type: "group",
          label: "Pages and Categories",
          children: [
            { key: "top-pages", label: "Top Pages" },
            { key: "subfolders", label: "Subfolders & Subdomains" },
          ],
        },
        {
          type: "group",
          label: "Regional Trends",
          children: [
            { key: "usa", label: "USA" },
            { key: "countries", label: "Countries" },
            { key: "business-regions", label: "Business Regions" },
            { key: "geo-regions", label: "Geographical Regions" },
          ],
        },
        {
          type: "group",
          label: "Audience Profile",
          children: [
            { key: "audience-overlap", label: "Audience Overlap" },
            { key: "demographics", label: "Demographics" },
          ],
        },
        {
          type: "group",
          label: "Market",
          children: [
            { key: "market-overview", label: "Market Overview" },
            { key: "trending-websites", label: "Trending Websites" },
            { key: "bulk-analysis", label: "Bulk Analysis" },
            { key: "eyeon", label: "EyeOn" },
            { key: "trends-api", label: "Trends API" },
          ],
        },
      ]}
    />
  );
  const localMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={getSelectedKeys()}
      items={[
        {
          type: "group",
          label: "Local",
          children: [
            { key: "local-dashboard", label: "Local Dashboard" },
            { key: "gbp-optimization", label: "GBP Optimization" },
            { key: "listing-management", label: "Listing Management" },
            { key: "map-rank-tracker", label: "Map Rank Tracker" },
            { key: "review-management", label: "Review Management" },
          ],
        },
      ]}
    />
  );
  const contentMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={getSelectedKeys()}
      items={[
        {
          type: "group",
          label: "Content",
          children: [
            { key: "content-dashboard", label: "Content Dashboard" },
            { key: "topic-finder", label: "Topic Finder" },
            { key: "seo-brief-generator", label: "SEO Brief Generator" },
            { key: "ai-article-generator", label: "AI Article Generator" },
            { key: "content-optimizer", label: "Content Optimizer" },
            { key: "my-content", label: "My Content" },
          ],
        },
      ]}
    />
  );
  const aiMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={getSelectedKeys()}
      items={[
        {
          type: "group",
          label: "AI",
          children: [
            {
              key: "big-picture-header",
              label: "See the Big Picture",
              disabled: true,
              style: { fontStyle: "italic", opacity: 0.7 },
            },
            { key: "brand-performance", label: "Brand Performance" },
            {
              key: "dive-deeper-header",
              label: "Dive Deeper",
              disabled: true,
              style: { fontStyle: "italic", opacity: 0.7 },
            },
            { key: "visibility", label: "Visibility" },
            { key: "perception", label: "Perception" },
            { key: "questions", label: "Questions" },
          ],
        },
      ]}
    />
  );

  const socialMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={getSelectedKeys()}
      items={[
        {
          type: "group",
          label: "Social Media",
          children: [
            { key: "social-dashboard", label: "Social Dashboard" },
            { key: "social-media-tracker", label: "Social Media Tracker" },
            { key: "social-media-poster", label: "Social Media Poster" },
            { key: "social-analytics", label: "Social Analytics" },
          ],
        },
      ]}
    />
  );

  const adMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={getSelectedKeys()}
      items={[
        {
          type: "group",
          label: "Advertising",
          children: [
            { key: "ad-dashboard", label: "AD Dashboard" },
            { key: "ppc-keyword-tool", label: "PPC Keyword Tool" },
            { key: "advertising-research", label: "Advertising Research" },
            { key: "display-advertising", label: "Display Advertising" },
          ],
        },
      ]}
    />
  );

  const reportMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={getSelectedKeys()}
      items={[
        {
          type: "group",
          label: "Reports",
          children: [
            { key: "report-dashboard", label: "Report Dashboard" },
            { key: "my-reports", label: "My Reports" },
            { key: "report-templates", label: "Report Templates" },
          ],
        },
      ]}
    />
  );

  const appCenterMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={getSelectedKeys()}
      items={[
        {
          type: "group",
          label: "App Center",
          children: [
            { key: "app-center", label: "App Center" },
            { key: "marketplace", label: "Marketplace" },
            { key: "my-apps", label: "My Apps" },
          ],
        },
      ]}
    />
  );

  return (
    <div className={styles.sider}>
      <div
        className={`${styles.menuItem} ${
          isActive("/projects") ? styles.active : ""
        }`}
        onClick={() => router.push("/projects")}
      >
        <FaHome />
        <span>Home</span>
      </div>

      <Dropdown
        popupRender={() => (
          <div
            style={{
              maxHeight: `800px`,
              overflowY: "auto",
              borderRadius: 8,
              background: "#fff",
              padding: 8,
              position: "absolute",
              top: "-140px",
              left: "100%", // để menu hiện bên phải icon
              zIndex: 1000,
              minWidth: 240,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {menu}
          </div>
        )}
        trigger={["hover"]}
      >
        <div
          className={`${styles.menuItem} ${
            isActive("/seo") ? styles.active : ""
          }`}
          onClick={() => router.push("/seo")}
        >
          <TbSettingsSearch />
          <span>SEO</span>
        </div>
      </Dropdown>
      <Dropdown
        popupRender={() => (
          <div
            style={{
              maxHeight: `auto`,
              overflowY: "auto",
              borderRadius: 8,
              background: "#fff",
              padding: 8,
              position: "absolute",
              top: "-240px",
              left: "100%", // để menu hiện bên phải icon
              zIndex: 1000,
              minWidth: 240,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {trafficMenu}
          </div>
        )}
        trigger={["hover"]}
      >
        <div
          className={`${styles.menuItem} ${
            isActive("/traffic") ? styles.active : ""
          }`}
          onClick={() => router.push("/traffic")}
        >
          <BsBarChart />
          <span>Traffic & Market</span>
        </div>
      </Dropdown>
      <Dropdown
        popupRender={() => (
          <div
            style={{
              overflowY: "auto",
              borderRadius: 8,
              background: "#fff",
              padding: 8,
              position: "absolute",
              top: "-160px",
              left: "100%", // để menu hiện bên phải icon
              zIndex: 1000,
              minWidth: 240,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {localMenu}
          </div>
        )}
        trigger={["hover"]}
      >
        <div
          className={`${styles.menuItem} ${
            isActive("/local") ? styles.active : ""
          }`}
          onClick={() => router.push("/local")}
        >
          <CiLocationOn />
          <span>Local</span>
        </div>
      </Dropdown>
      <Dropdown
        popupRender={() => (
          <div
            style={{
              overflowY: "auto",
              borderRadius: 8,
              background: "#fff",
              padding: 8,
              position: "absolute",
              top: "-160px",
              left: "100%", // để menu hiện bên phải icon
              zIndex: 1000,
              minWidth: 240,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {contentMenu}
          </div>
        )}
        trigger={["hover"]}
      >
        <div
          className={`${styles.menuItem} ${
            isActive("/content") ? styles.active : ""
          }`}
          onClick={() => router.push("/content")}
        >
          <TbEditCircle />
          <span>Content</span>
        </div>
      </Dropdown>
      <Dropdown
        popupRender={() => (
          <div
            style={{
              overflowY: "auto",
              borderRadius: 8,
              background: "#fff",
              padding: 8,
              position: "absolute",
              top: "-160px",
              left: "100%", // để menu hiện bên phải icon
              zIndex: 1000,
              minWidth: 240,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {aiMenu}
          </div>
        )}
        trigger={["hover"]}
      >
        <div
          className={`${styles.menuItem} ${
            isActive("/ai") ? styles.active : ""
          }`}
          onClick={() => router.push("/ai")}
        >
          <GoStar />
          <span>AI</span>
        </div>
      </Dropdown>
      <Dropdown
        popupRender={() => (
          <div
            style={{
              overflowY: "auto",
              borderRadius: 8,
              background: "#fff",
              padding: 8,
              position: "absolute",
              top: "-160px",
              left: "100%", // để menu hiện bên phải icon
              zIndex: 1000,
              minWidth: 240,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {socialMenu}
          </div>
        )}
        trigger={["hover"]}
      >
        <div
          className={`${styles.menuItem} ${
            isActive("/social") ? styles.active : ""
          }`}
          onClick={() => router.push("/social")}
        >
          <IoShareSocial />
          <span>Social</span>
        </div>
      </Dropdown>
      <Dropdown
        popupRender={() => (
          <div
            style={{
              overflowY: "auto",
              borderRadius: 8,
              background: "#fff",
              padding: 8,
              position: "absolute",
              top: "-160px",
              left: "100%", // để menu hiện bên phải icon
              zIndex: 1000,
              minWidth: 240,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {adMenu}
          </div>
        )}
        trigger={["hover"]}
      >
        <div
          className={`${styles.menuItem} ${
            isActive("/ad") ? styles.active : ""
          }`}
        >
          <TbTargetArrow />
          <span>AD</span>
        </div>
      </Dropdown>
      <Dropdown
        popupRender={() => (
          <div
            style={{
              overflowY: "auto",
              borderRadius: 8,
              background: "#fff",
              padding: 8,
              position: "absolute",
              top: "-160px",
              left: "100%", // để menu hiện bên phải icon
              zIndex: 1000,
              minWidth: 240,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {reportMenu}
          </div>
        )}
        trigger={["hover"]}
      >
        <div
          className={`${styles.menuItem} ${
            isActive("/report") ? styles.active : ""
          }`}
        >
          <TbReport />
          <span>Report</span>
        </div>
      </Dropdown>
      <Dropdown
        popupRender={() => (
          <div
            style={{
              overflowY: "auto",
              borderRadius: 8,
              background: "#fff",
              padding: 8,
              position: "absolute",
              top: "-160px",
              left: "100%", // để menu hiện bên phải icon
              zIndex: 1000,
              minWidth: 240,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {appCenterMenu}
          </div>
        )}
        trigger={["hover"]}
      >
        <div
          className={`${styles.menuItem} ${
            isActive("/app-center") ? styles.active : ""
          }`}
        >
          <RiApps2AiFill />
          <span>App Center</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default SiderDashBoard;
