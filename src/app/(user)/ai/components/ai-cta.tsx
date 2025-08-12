"use client";

import { useState } from "react";
import styles from "../page.module.scss";

export default function AiCta() {
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Starting analysis for domain:", domain);
  };

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2>Pioneer the AI-driven markets</h2>
        <p>
          Dig deep into LLM insights and take the lead while others are still
          guessing.
        </p>

        <form onSubmit={handleSubmit} className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Enter your domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <button type="submit">Get Started</button>
        </form>
      </div>
    </section>
  );
}
