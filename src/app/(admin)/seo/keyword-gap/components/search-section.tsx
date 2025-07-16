"use client";
import React, { useState } from "react";
import { Input, Button, Select, Tag } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { FiFlag } from "react-icons/fi";
import styles from "./search-section.module.scss";

const { Option } = Select;

interface SearchSectionProps {
  onCompare: (domains: string[], location: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onCompare }) => {
  const [domains, setDomains] = useState<string[]>([""]);
  const [location, setLocation] = useState("VN");

  const addDomain = () => {
    if (domains.length < 5) {
      setDomains([...domains, ""]);
    }
  };

  const removeDomain = (index: number) => {
    if (domains.length > 1) {
      const newDomains = domains.filter((_, i) => i !== index);
      setDomains(newDomains);
    }
  };

  const updateDomain = (index: number, value: string) => {
    const newDomains = [...domains];
    newDomains[index] = value;
    setDomains(newDomains);
  };

  const handleCompare = () => {
    const filteredDomains = domains.filter((domain) => domain.trim() !== "");
    onCompare(filteredDomains, location);
  };

  const remainingSlots = 5 - domains.length;

  return (
    <div className={styles.searchSection}>
      <div className={styles.header}>
        <h1>Keyword Gap</h1>
        <p>
          A tool that helps you compare your keyword profile with your
          competitors.
        </p>
      </div>

      <div className={styles.comparisonForm}>
        <div className={styles.domainsContainer}>
          {domains.map((domain, index) => (
            <div key={index} className={styles.domainRow}>
              <div className={styles.domainLabel}>
                {index === 0 ? (
                  <Tag color="blue" className={styles.youTag}>
                    You
                  </Tag>
                ) : (
                  <span className={styles.domainIcon}>⚪</span>
                )}
              </div>
              <Input
                placeholder="Add domain"
                value={domain}
                onChange={(e) => updateDomain(index, e.target.value)}
                className={styles.domainInput}
              />
              <Select value="Root domain" className={styles.typeSelect}>
                <Option value="Root domain">Root domain</Option>
                <Option value="Subdomain">Subdomain</Option>
                <Option value="Subfolder">Subfolder</Option>
              </Select>
              <Select value="Organic keywords" className={styles.keywordSelect}>
                <Option value="Organic keywords">Organic keywords</Option>
                <Option value="Paid keywords">Paid keywords</Option>
                <Option value="PLA keywords">PLA keywords</Option>
              </Select>
              {index > 0 && (
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => removeDomain(index)}
                  className={styles.removeButton}
                />
              )}
            </div>
          ))}

          {remainingSlots > 0 && (
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addDomain}
              className={styles.addButton}
            >
              Add up to {remainingSlots} competitors
            </Button>
          )}
        </div>

        <div className={styles.compareControls}>
          <Select
            value={location}
            onChange={setLocation}
            className={styles.locationSelect}
            suffixIcon={<FiFlag />}
          >
            <Option value="VN">🇻🇳 VN</Option>
            <Option value="US">🇺🇸 US</Option>
            <Option value="UK">🇬🇧 UK</Option>
            <Option value="CA">🇨🇦 CA</Option>
          </Select>
          <Button
            type="primary"
            onClick={handleCompare}
            className={styles.compareButton}
          >
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
