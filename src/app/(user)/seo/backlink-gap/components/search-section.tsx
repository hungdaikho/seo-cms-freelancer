"use client";
import React, { useState } from "react";
import { Input, Button, Select, Tag } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./search-section.module.scss";

const { Option } = Select;

interface SearchSectionProps {
  onFindProspects: (domains: string[]) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onFindProspects }) => {
  const [domains, setDomains] = useState<string[]>([""]);

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

  const handleFindProspects = () => {
    const filteredDomains = domains.filter((domain) => domain.trim() !== "");
    onFindProspects(filteredDomains);
  };

  const remainingSlots = 5 - domains.length;

  return (
    <div className={styles.searchSection}>
      <div className={styles.header}>
        <h1>Backlink Gap</h1>
        <p>Find prospects for domain or URL</p>
      </div>

      <div className={styles.prospectForm}>
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
              <Select value="Root Domain" className={styles.typeSelect}>
                <Option value="Root Domain">Root Domain</Option>
                <Option value="Subdomain">Subdomain</Option>
                <Option value="Subfolder">Subfolder</Option>
                <Option value="Exact URL">Exact URL</Option>
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

        <div className={styles.findControls}>
          <Button
            type="primary"
            onClick={handleFindProspects}
            className={styles.findButton}
          >
            Find prospects
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
