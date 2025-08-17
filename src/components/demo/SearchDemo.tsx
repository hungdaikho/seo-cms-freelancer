import React from "react";
import useSearch from "@/hooks/useSearch";
import { Input, List, Typography, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const SearchDemo: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResults, handleSearch } =
    useSearch();

  return (
    <Card style={{ maxWidth: 800, margin: "20px auto", padding: "20px" }}>
      <Title level={3}>Search Functionality Demo</Title>

      <Input
        size="large"
        placeholder="Try searching: dashboard, backlink, keyword, audit, rank..."
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onPressEnter={() => handleSearch(searchQuery)}
        style={{ marginBottom: "20px" }}
      />

      {searchResults.length > 0 && (
        <div>
          <Text strong>Search results ({searchResults.length}):</Text>
          <List
            dataSource={searchResults}
            renderItem={(item) => (
              <List.Item
                style={{
                  padding: "12px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => handleSearch(item.title)}
              >
                <List.Item.Meta
                  title={<span style={{ color: "#1890ff" }}>{item.title}</span>}
                  description={
                    <div>
                      <div style={{ marginBottom: "8px" }}>
                        {item.description}
                      </div>
                      <div>
                        <Text type="secondary">Keywords: </Text>
                        {item.keywords.slice(0, 5).map((keyword, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: "#f0f0f0",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              marginRight: "4px",
                              fontSize: "12px",
                            }}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )}

      {searchQuery && searchResults.length === 0 && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Text type="secondary">No results found for "{searchQuery}"</Text>
        </div>
      )}
    </Card>
  );
};

export default SearchDemo;
