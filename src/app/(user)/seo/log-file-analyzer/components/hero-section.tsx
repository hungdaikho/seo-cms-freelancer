"use client";

import React, { useState, useRef } from "react";
import { Button, Upload, message } from "antd";
import { FiUpload, FiPlus } from "react-icons/fi";
import styles from "./hero-section.module.scss";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files: File[]) => {
    console.log("Files uploaded:", files);
    message.success(`${files.length} file(s) uploaded successfully`);
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Log File Analyzer</h1>
        <p className={styles.heroSubtitle}>
          We're offering you an exclusive opportunity to try our new tool that
          will give you
          <br />
          an exact understanding of how search engines are interacting with your
          <br />
          website. Be the first to try it!
        </p>

        <div
          className={`${styles.uploadArea} ${
            isDragOver ? styles.dragOver : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.uploadIcon}>
            <FiPlus />
          </div>
          <div className={styles.uploadText}>
            Drag & drop your log files* here
          </div>
          <div className={styles.uploadOr}>or</div>
          <Button
            type="primary"
            onClick={handleBrowseFiles}
            className={styles.browseButton}
            icon={<FiUpload />}
          >
            Browse for log files
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".log,.txt"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>

        <div className={styles.fileInfo}>
          <span className={styles.fileInfoText}>
            *{" "}
            <a href="#" className={styles.accessLink}>
              Access log files
            </a>
            , uncompressed, less than 1 GB in size.
          </span>
        </div>

        <div className={styles.disclaimer}>
          <p className={styles.disclaimerText}>
            We need information from your log files in order to provide you with
            analysis services in line with the Log File Analyzer. You don't need
            to provide any personal information to use our services.
          </p>
          <p className={styles.disclaimerText}>
            Before uploading log files, make sure they do not contain personal
            data. If we detect personal data in your log files, we will delete
            it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
