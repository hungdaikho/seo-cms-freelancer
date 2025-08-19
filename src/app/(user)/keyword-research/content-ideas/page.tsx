"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Select,
  Button,
  Table,
  Checkbox,
  Input,
  message,
  Alert,
  Spin,
  Tooltip,
  App,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  useContentIdeas,
  useContentIdeasSearch,
  useContentIdeasSelection,
} from "@/stores/hooks/useContentIdeas";
import { ContentIdeaItem } from "@/stores/slices/content-ideas.slice";
import styles from "./ContentIdeas.module.scss";
import { getSortedCountries } from "@/utils/countries";

const { Option } = Select;
const { Search } = Input;

type Props = {};

const ContentIdeasPage = (props: Props) => {
  // Local state
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English/Nigeria");
  const [isExporting, setIsExporting] = useState(false);
  const { notification } = App.useApp();
  // Redux hooks
  const {
    contentIdeas,
    paginatedContentIdeas,
    stats,
    loading,
    isAnyLoading,
    error,
    hasData,
    pagination,
    totalPages,
    currentPageItems,
    filters,
    currentKeyword,
    updateFilters,
    goToPage,
    changePageSize,
    clearErrorState,
  } = useContentIdeas();

  const { search, isLoading: isSearching } = useContentIdeasSearch();

  const {
    selectedIds,
    hasSelection,
    isAllSelected,
    isPartiallySelected,
    select,
    selectAll,
    clearSelection,
  } = useContentIdeasSelection();

  // ====================================================================
  // EFFECTS
  // ====================================================================

  // Auto-search on component mount with default keyword
  useEffect(() => {
    if (!hasData && !isAnyLoading) {
      handleSearch(searchKeyword);
    }
  }, []);

  // Clear errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearErrorState();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearErrorState]);

  // ====================================================================
  // HANDLERS
  // ====================================================================

  const handleSearch = useCallback(
    async (keyword?: string) => {
      const searchTerm = keyword || searchKeyword;
      if (!searchTerm.trim()) {
        notification.warning({ message: "Please enter a keyword to search" });
        return;
      }

      try {
        const country = getCountryCode(selectedLanguage);
        const result = await search(searchTerm, { country, limit: 50 });

        if (result.success) {
          notification.success({
            message: `Found content ideas for "${searchTerm}"`,
          });
        } else {
          notification.error({
            message: result.error || "Failed to search content ideas",
          });
        }
      } catch (error: any) {
        notification.error({ message: "An error occurred while searching" });
      }
    },
    [searchKeyword, selectedLanguage, search]
  );

  const handleLanguageChange = useCallback(
    (value: string) => {
      setSelectedLanguage(value);
      const country = getCountryCode(value);
      updateFilters({ language: value, country });
    },
    [updateFilters]
  );

  const handleExport = useCallback(
    (format: "csv" | "xlsx" = "csv") => {
      if (isExporting) return; // Prevent multiple simultaneous exports

      setIsExporting(true);

      // Use setTimeout to give user visual feedback that something is happening
      setTimeout(() => {
        try {
          // Get data to export
          const dataToExport = hasSelection
            ? contentIdeas.filter((item) => selectedIds.includes(item.key))
            : contentIdeas;

          if (!dataToExport || dataToExport.length === 0) {
            notification.warning({ message: "No data to export" });
            return;
          }

          // Generate CSV content
          const headers = [
            "Page Title",
            "URL",
            "Domain",
            "EST Visits",
            "Backlinks",
            "Facebook Shares",
            "Pinterest Pins",
            "Reddit Posts",
          ];

          const csvContent = [
            headers.join(","),
            ...dataToExport.map((item) =>
              [
                `"${(item.title || "").replace(/"/g, '""')}"`,
                `"${(item.url || "").replace(/"/g, '""')}"`,
                `"${(item.domain || "").replace(/"/g, '""')}"`,
                item.estVisits || 0,
                item.backlinks || 0,
                item.facebook || 0,
                item.pinterest || 0,
                item.reddit || 0,
              ].join(",")
            ),
          ].join("\n");

          // Create and download file
          const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `content-ideas-${
            new Date().toISOString().split("T")[0]
          }.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          notification.success({
            message: `Exported ${dataToExport.length} content ideas to CSV`,
          });
        } catch (error: any) {
          notification.error({
            message: `Failed to export: ${error.message || "Unknown error"}`,
          });
        } finally {
          setIsExporting(false);
        }
      }, 500); // Brief delay for better UX
    },
    [hasSelection, selectedIds, contentIdeas, isExporting]
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        selectAll();
      } else {
        clearSelection();
      }
    },
    [selectAll, clearSelection]
  );

  const handleRowSelection = useCallback(
    (contentId: string) => {
      select(contentId);
    },
    [select]
  );

  const handleRefresh = useCallback(() => {
    if (currentKeyword) {
      handleSearch(currentKeyword);
    }
  }, [currentKeyword, handleSearch]);

  // ====================================================================
  // HELPER FUNCTIONS
  // ====================================================================

  const getCountryCode = (language: string): string => {
    switch (language) {
      case "English/Nigeria":
        return "NG";
      case "English/US":
        return "US";
      case "Vietnamese/Vietnam":
        return "VN";
      default:
        return "NG";
    }
  };

  const getCountryFlag = (language: string): string => {
    switch (language) {
      case "English/Nigeria":
        return "🇳🇬";
      case "English/US":
        return "🇺🇸";
      case "Vietnamese/Vietnam":
        return "🇻🇳";
      default:
        return "🇳🇬";
    }
  };

  // ====================================================================
  // TABLE CONFIGURATION
  // ====================================================================

  const columns = [
    {
      title: (
        <Checkbox
          checked={isAllSelected}
          indeterminate={isPartiallySelected}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: 50,
      className: styles.checkboxCell,
      render: (_: any, record: ContentIdeaItem) => (
        <Checkbox
          checked={selectedIds.includes(record.key)}
          onChange={() => handleRowSelection(record.key)}
        />
      ),
    },
    {
      title: "Page Title URL",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: ContentIdeaItem) => (
        <div className={styles.titleCell}>
          <a
            href={record.url}
            className={styles.titleLink}
            target="_blank"
            rel="noopener noreferrer"
            title={text}
          >
            {text}
          </a>
          <div className={styles.url} title={record.url}>
            {record.url}
          </div>
          {record.domain && (
            <div className={styles.domain}>{record.domain}</div>
          )}
        </div>
      ),
    },
    {
      title: "EST Visits",
      dataIndex: "estVisits",
      key: "estVisits",
      width: 110,
      className: styles.statsCell,
      sorter: (a: ContentIdeaItem, b: ContentIdeaItem) =>
        a.estVisits - b.estVisits,
      render: (value: number) => (
        <div>
          <div className={styles.statValue}>{value?.toLocaleString()}</div>
          <div className={styles.statLabel}>Organic</div>
        </div>
      ),
    },
    {
      title: "Backlinks",
      dataIndex: "backlinks",
      key: "backlinks",
      width: 110,
      className: styles.statsCell,
      sorter: (a: ContentIdeaItem, b: ContentIdeaItem) =>
        a.backlinks - b.backlinks,
      render: (value: number) => (
        <div>
          <div className={styles.statValue}>{value?.toLocaleString()}</div>
          <div className={styles.statLabel}>Links</div>
        </div>
      ),
    },
    {
      title: (
        <Tooltip title="Facebook shares">
          <span>FB</span>
        </Tooltip>
      ),
      dataIndex: "facebook",
      key: "facebook",
      width: 60,
      className: styles.socialCell,
      render: (value: number) => (
        <div className={`${styles.socialIcon} ${styles.facebook}`}>{value}</div>
      ),
    },
    {
      title: (
        <Tooltip title="Pinterest pins">
          <span>PT</span>
        </Tooltip>
      ),
      dataIndex: "pinterest",
      key: "pinterest",
      width: 60,
      className: styles.socialCell,
      render: (value: number) => (
        <div className={`${styles.socialIcon} ${styles.pinterest}`}>
          {value}
        </div>
      ),
    },
    {
      title: (
        <Tooltip title="Reddit posts">
          <span>RD</span>
        </Tooltip>
      ),
      dataIndex: "reddit",
      key: "reddit",
      width: 60,
      className: styles.socialCell,
      render: (value: number) => (
        <div className={`${styles.socialIcon} ${styles.reddit}`}>{value}</div>
      ),
    },
  ];

  // ====================================================================
  // RENDER
  // ====================================================================

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Discover popular content on the Web</h1>

        <div className={styles.searchSection}>
          <div className={styles.leftSection}>
            <div className={styles.description}>
              Find trending content ideas and analyze their performance across
              different platforms
            </div>
            <Search
              placeholder="Enter keyword (e.g., meal delivery, digital marketing)"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onSearch={handleSearch}
              style={{ maxWidth: 400 }}
              loading={isSearching}
              enterButton={
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  loading={isSearching}
                >
                  Search
                </Button>
              }
            />
          </div>

          <div className={styles.rightSection}>
            <div className={styles.languageSelect}>
              <Select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                disabled={isSearching}
                showSearch
              >
                {getSortedCountries().map((country) => (
                  <Option
                    key={country.code}
                    value={`${country.name}/${country.code}`}
                  >
                    {country.flag} {country.name}
                  </Option>
                ))}
              </Select>
            </div>

            <Tooltip title="Refresh content ideas">
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                disabled={!currentKeyword || isSearching}
                loading={isSearching}
              >
                Refresh
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className={styles.versionNotice}>
          You are on free version
          <span className={styles.upgradeButton}>
            <Button size="small">UPGRADE</Button>
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          icon={<ExclamationCircleOutlined />}
          closable
          onClose={clearErrorState}
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Content Ideas Section */}
      <div className={styles.contentIdeas}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Content Ideas
            {hasData && (
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  marginLeft: "8px",
                  color: "#666",
                }}
              >
                ({stats.totalItems} results)
              </span>
            )}
          </h2>

          <div style={{ display: "flex", gap: "8px" }}>
            {hasSelection && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#666",
                  alignSelf: "center",
                  marginRight: "8px",
                }}
              >
                {selectedIds.length} selected
              </span>
            )}

            <Button
              icon={<DownloadOutlined />}
              onClick={() => handleExport("csv")}
              disabled={!hasData}
              loading={isExporting}
              className={styles.exportButton}
            >
              EXPORT TO CSV
            </Button>
          </div>
        </div>

        {currentKeyword && (
          <div className={styles.contentInfo}>
            Content ideas for:{" "}
            <span className={styles.keyword}>{currentKeyword}</span>
            <span className={styles.filters}>
              {filters.language} • {stats.totalItems} results
            </span>
          </div>
        )}

        {/* Content Table */}
        <div className={styles.contentTable}>
          <Spin spinning={isAnyLoading} tip="Loading content ideas...">
            <Table
              columns={columns}
              dataSource={paginatedContentIdeas}
              rowKey="key"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: stats.totalItems,
                onChange: goToPage,
                onShowSizeChange: (current, size) => changePageSize(size),
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                pageSizeOptions: ["10", "25", "50", "100"],
              }}
              size="middle"
              scroll={{ x: 800 }}
              locale={{
                emptyText: isAnyLoading ? (
                  <div style={{ padding: "40px 0" }}>
                    <Spin size="large" />
                    <div style={{ marginTop: "16px" }}>
                      Loading content ideas...
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "40px 0" }}>
                    <div>No content ideas found</div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        marginTop: "8px",
                      }}
                    >
                      Try searching with a different keyword
                    </div>
                  </div>
                ),
              }}
            />
          </Spin>
        </div>

        {/* Stats Summary */}
        {hasData && (
          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              background: "#f8f9ff",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <strong>Summary:</strong> {stats.totalItems} content ideas • Average{" "}
            {stats.avgBacklinks} backlinks • Average{" "}
            {stats.avgTraffic?.toLocaleString()} visits
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentIdeasPage;
