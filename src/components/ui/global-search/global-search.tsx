"use client";

import React, { useRef, useEffect } from "react";
import { Input, Spin, Empty, Typography, Tag } from "antd";
import { IoSearchOutline, IoTimeOutline } from "react-icons/io5";
import {
  FaKeyboard,
  FaGlobe,
  FaTasks,
  FaChartLine,
  FaFileAlt,
  FaCogs,
  FaBrain,
  FaRocket,
} from "react-icons/fa";
import { useGlobalSearch } from "@/stores/hooks/useGlobalSearch";
import styles from "./global-search.module.scss";

const { Text } = Typography;

interface GlobalSearchProps {
  placeholder?: string;
  className?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  placeholder = "Enter your task, website, or keyword",
  className = "",
}) => {
  const inputRef = useRef<any>(null);

  const {
    query,
    results,
    recentSearches,
    loading,
    isOpen,
    search,
    openSearch,
    closeSearch,
    selectResult,
    selectRecentSearch,
  } = useGlobalSearch();

  // Handle input focus
  const handleFocus = () => {
    openSearch();
  };

  // Handle input blur (with delay to allow clicks on results)
  const handleBlur = () => {
    setTimeout(() => {
      closeSearch();
    }, 200);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeSearch();
      inputRef.current?.blur();
    }
  };

  // Get icon for result type
  const getResultIcon = (type: string, category?: string) => {
    switch (type) {
      case "feature":
        // Return different icons based on category
        if (category?.toLowerCase().includes("seo")) {
          return <FaRocket className={styles.resultIcon} />;
        } else if (category?.toLowerCase().includes("traffic")) {
          return <FaChartLine className={styles.resultIcon} />;
        } else if (category?.toLowerCase().includes("content")) {
          return <FaFileAlt className={styles.resultIcon} />;
        } else if (category?.toLowerCase().includes("ai")) {
          return <FaBrain className={styles.resultIcon} />;
        }
        return <FaCogs className={styles.resultIcon} />;
      case "domain":
        return <FaGlobe className={styles.resultIcon} />;
      case "task":
        return <FaTasks className={styles.resultIcon} />;
      default:
        return <IoSearchOutline className={styles.resultIcon} />;
    }
  };

  return (
    <div className={`${styles.globalSearch} ${className}`}>
      <div className={styles.searchContainer}>
        <Input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
          suffix={
            loading ? (
              <Spin size="small" />
            ) : (
              <IoSearchOutline className={styles.searchIcon} />
            )
          }
        />

        {/* Search Results Dropdown */}
        {isOpen && (
          <div className={styles.searchDropdown}>
            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className={styles.searchSection}>
                <div className={styles.sectionHeader}>
                  <IoTimeOutline />
                  <Text className={styles.sectionTitle}>Recent Searches</Text>
                </div>
                {recentSearches.map((recentQuery, index) => (
                  <div
                    key={index}
                    className={styles.searchItem}
                    onClick={() => selectRecentSearch(recentQuery)}
                  >
                    <IoTimeOutline className={styles.resultIcon} />
                    <Text className={styles.resultTitle}>{recentQuery}</Text>
                  </div>
                ))}
              </div>
            )}

            {/* Search Results */}
            {query && (
              <div className={styles.searchSection}>
                {loading ? (
                  <div className={styles.loadingContainer}>
                    <Spin />
                    <Text>Searching...</Text>
                  </div>
                ) : results.length > 0 ? (
                  <>
                    <div className={styles.sectionHeader}>
                      <IoSearchOutline />
                      <Text className={styles.sectionTitle}>
                        Search Results
                      </Text>
                    </div>
                    {results.map((result) => (
                      <div
                        key={result.id}
                        className={styles.searchItem}
                        onClick={() => selectResult(result)}
                      >
                        {getResultIcon(result.type, result.category)}
                        <div className={styles.resultContent}>
                          <div className={styles.resultHeader}>
                            <Text className={styles.resultTitle}>
                              {result.title}
                            </Text>
                            {result.category && (
                              <Tag
                                className={styles.categoryTag}
                                color={
                                  result.category.toLowerCase().includes("seo")
                                    ? "green"
                                    : result.category
                                        .toLowerCase()
                                        .includes("traffic")
                                    ? "blue"
                                    : result.category
                                        .toLowerCase()
                                        .includes("content")
                                    ? "orange"
                                    : result.category
                                        .toLowerCase()
                                        .includes("ai")
                                    ? "purple"
                                    : "default"
                                }
                              >
                                {result.category}
                              </Tag>
                            )}
                          </div>
                          {result.description && (
                            <Text className={styles.resultDescription}>
                              {result.description}
                            </Text>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className={styles.emptyContainer}>
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="No results found"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Search Tips */}
            {!query && recentSearches.length === 0 && (
              <div className={styles.searchSection}>
                <div className={styles.sectionHeader}>
                  <IoSearchOutline />
                  <Text className={styles.sectionTitle}>Search Tips</Text>
                </div>
                <div className={styles.tipsList}>
                  <Text className={styles.tip}>
                    • Search for features like "keyword research" or "traffic
                    analytics"
                  </Text>
                  <Text className={styles.tip}>
                    • Type tool names like "position tracking" or "site audit"
                  </Text>
                  <Text className={styles.tip}>
                    • Enter domains (e.g., example.com) to analyze
                  </Text>
                  <Text className={styles.tip}>
                    • Search by category like "SEO", "Content", or "Traffic"
                  </Text>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
