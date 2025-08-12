"use client";

import { useState } from "react";
import styles from "../page.module.scss";

export default function AiHero() {
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Analyzing domain:", domain);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1>
          Turn AI Mentions Into Your
          <br />
          Next Strategic Move
        </h1>
        <p className={styles.subtitle}>
          Analyze how LLMs like ChatGPT feature your brand and get actionable
          recommendations to improve your business strategy, products, and
          market position.
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

        <p>
          Want to see it in action?{" "}
          <a href="#demo" className={styles.demoLink}>
            Check out the interactive demo
          </a>
        </p>
      </div>
    </section>
  );
}
