"use client";
import React, { useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const handleSearch = () => {
    console.log("Search email:", email);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>CONTACT US</h3>

            <div className={styles.topRow}>
              <div className={styles.searchContainer}>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                  Search
                </button>
              </div>

              <div className={styles.workingHours}>
                10:00 AM - 6:00 PM (EST/EDT), Monday
                <br />- Friday
              </div>

              <div className={styles.getStartedSection}>
                <Button
                  type="primary"
                  size="large"
                  className={styles.getStartedButton}
                >
                  Get Started
                </Button>
              </div>
            </div>

            <div className={styles.bottomInfo}>
              <div className={styles.address}>
                USA, 25 ayo idiaghe Street Suite
                <br />
                2475 Boston, MA 02199
              </div>

              <div className={styles.email}>📧 Mail@example.com</div>

              <div className={styles.phoneSection}>
                <span className={styles.phoneNumber}></span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>COMPANY</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/legal-info">Legal Info</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookie-settings">Cookie Settings</Link>
              </li>
              <li>
                <Link href="/security-info">Security Info</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>FEATURES</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#success">Success Stories</a>
              </li>
              <li>
                <a href="#stats">Stats and Facts</a>
              </li>
              <li>
                <a href="#studies">Data Studies</a>
              </li>
              <li>
                <a href="#news">News</a>
              </li>
              <li>
                <a href="#reports">Custom Report</a>
              </li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>TOOLS</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#keyword">Keyword research</a>
              </li>
              <li>
                <a href="#domain">Domain analysis</a>
              </li>
              <li>
                <a href="#onpage">On page analysis</a>
              </li>
              <li>
                <a href="#backlinks">backlinks</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
