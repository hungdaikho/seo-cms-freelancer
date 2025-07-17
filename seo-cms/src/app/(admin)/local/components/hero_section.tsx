import React from "react";
import styles from "./hero_section.module.scss";
import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.heroTitle}>Welcome to Our Service</h1>
      <p className={styles.heroDescription}>
        We provide the best solutions for your business needs.
      </p>
      <Button type="primary" className={styles.heroButton}>
        Get Started <FaArrowRight />
      </Button>
    </div>
  );
};

export default HeroSection;