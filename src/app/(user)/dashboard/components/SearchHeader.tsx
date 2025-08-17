"use client";

import React, { memo } from "react";
import { Button, Select, Space, Typography, Input } from "antd";
import {
  DownOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { getSortedCountries, popularCountries } from "@/utils/countries";

const { Search } = Input;
const { Text } = Typography;

interface SearchHeaderProps {
  searchValue: string;
  selectedCountry: string;
  filteredCount: number;
  totalCount: number;
  loading: boolean;
  onSearch: (value: string) => void;
  onCountryChange: (value: string) => void;
  onAdvancedSearch: () => void;
  onClearSearch: () => void;
  onRefresh: () => void;
}

const SearchHeader = memo(({
  searchValue,
  selectedCountry,
  filteredCount,
  totalCount,
  loading,
  onSearch,
  onCountryChange,
  onAdvancedSearch,
  onClearSearch,
  onRefresh,
}: SearchHeaderProps) => {
  const hasActiveFilters = searchValue || selectedCountry !== "ALL";

  return (
    <div
      style={{
        padding: "16px 24px",
        background: "white",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
        <Search
          placeholder="Search by name, domain, or country..."
          style={{ width: 400 }}
          size="large"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          onSearch={onAdvancedSearch}
          loading={loading}
          allowClear
          enterButton={<SearchOutlined />}
        />
        <Select
          value={selectedCountry}
          onChange={onCountryChange}
          style={{ width: 180 }}
          size="large"
          suffixIcon={<DownOutlined />}
          showSearch
          placeholder="Filter by country"
          filterOption={(input, option) => {
            const label = option?.label;
            if (typeof label === 'string') {
              return label.toLowerCase().includes(input.toLowerCase());
            }
            return false;
          }}
        >
          <Select.Option key="ALL" value="ALL" label="🌍 All Countries">
            <Space>
              <span>🌍</span>
              All Countries
            </Space>
          </Select.Option>
          <Select.OptGroup label="Popular Countries">
            {popularCountries.map((country) => (
              <Select.Option 
                key={country.code} 
                value={country.code} 
                label={`${country.flag} ${country.name}`}
              >
                <Space>
                  <span>{country.flag}</span>
                  {country.name}
                </Space>
              </Select.Option>
            ))}
          </Select.OptGroup>
          <Select.OptGroup label="All Countries">
            {getSortedCountries()
              .filter(country => !popularCountries.find(p => p.code === country.code))
              .map((country) => (
                <Select.Option 
                  key={country.code} 
                  value={country.code} 
                  label={`${country.flag} ${country.name}`}
                >
                  <Space>
                    <span>{country.flag}</span>
                    {country.name}
                  </Space>
                </Select.Option>
              ))}
          </Select.OptGroup>
        </Select>
        
        {hasActiveFilters && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              Showing {filteredCount} of {totalCount} projects
            </Text>
            <Button 
              type="link" 
              size="small" 
              onClick={onClearSearch}
              style={{ padding: "0 4px" }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
      
      <div style={{ display: "flex", gap: "8px" }}>
        {hasActiveFilters && (
          <Button 
            size="large" 
            icon={<SearchOutlined />}
            onClick={onAdvancedSearch}
            loading={loading}
          >
            Search Server
          </Button>
        )}
        <Button 
          type="primary" 
          size="large" 
          icon={<ReloadOutlined />}
          onClick={onRefresh}
          loading={loading}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
});

SearchHeader.displayName = 'SearchHeader';

export default SearchHeader;
