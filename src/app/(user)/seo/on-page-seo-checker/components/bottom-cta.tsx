"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./bottom-cta.module.scss";

interface BottomCTAProps {}

const BottomCTA: React.FC<BottomCTAProps> = () => {
  const [domain, setDomain] = useState("");

  const handleSubmit = () => {
    console.log("Get ideas for:", domain);
  };

  return (
    <div className={styles.bottomCTA}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          Gather new ideas to optimize your website
        </h2>

        <div className={styles.searchForm}>
          <Input
            placeholder="Enter domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className={styles.domainInput}
            size="large"
          />
          <Button
            type="primary"
            onClick={handleSubmit}
            className={styles.submitButton}
            size="large"
          >
            Get ideas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomCTA;
