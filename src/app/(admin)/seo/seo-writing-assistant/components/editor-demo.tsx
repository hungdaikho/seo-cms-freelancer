"use client";

import React from "react";
import { Row, Col, Tag, Button } from "antd";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import styles from "./editor-demo.module.scss";

interface EditorDemoProps {}

const EditorDemo: React.FC<EditorDemoProps> = () => {
  const targetKeywords = [
    "how to write good content",
    "seo strategy",
    "website content",
  ];

  const recommendedKeywords = [
    "keyword research",
    "content creation",
    "competitor's content",
  ];

  return (
    <div className={styles.editorDemo}>
      <Row gutter={[48, 48]} align="middle">
        <Col xs={24} lg={14}>
          <div className={styles.editorInterface}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.toolbarGroup}>
                <button className={styles.toolBtn}>H1</button>
                <button className={styles.toolBtn}>H2</button>
                <button className={styles.toolBtn}>
                  <strong>B</strong>
                </button>
                <button className={styles.toolBtn}>
                  <em>I</em>
                </button>
              </div>
              <div className={styles.toolbarGroup}>
                <button className={styles.toolBtn}>≡</button>
                <button className={styles.toolBtn}>≡</button>
                <button className={styles.toolBtn}>🔗</button>
                <button className={styles.toolBtn}>
                  f<sub>x</sub>
                </button>
              </div>
            </div>

            {/* Editor Content */}
            <div className={styles.editorContent}>
              <p className={styles.editorText}>
                Content creation is a pillar of a successful SEO strategy and
                has important because it's one of the few elements of your{" "}
                <span className={styles.highlight}>SEO strategy</span> you have
                direct control over.
              </p>
              <p className={styles.editorText}>
                With proper strategy and insight, it can be a fun, illuminating
                process for you and your team. But if you're new to{" "}
                <span className={styles.highlight}>content creation</span>, try
                our guide below.
              </p>
              <p className={styles.editorText}>
                Start with{" "}
                <span className={styles.highlight}>Keyword Research</span>. One
                of the first things you should do when...
              </p>
            </div>

            {/* Navigation arrows */}
            <div className={styles.navigation}>
              <Button
                icon={<FiArrowLeft />}
                className={styles.navBtn}
                type="text"
              />
              <Button
                icon={<FiArrowRight />}
                className={styles.navBtn}
                type="text"
              />
            </div>
          </div>
        </Col>

        <Col xs={24} lg={10}>
          <div className={styles.sidePanel}>
            {/* Target Keywords */}
            <div className={styles.keywordSection}>
              <h3 className={styles.sectionTitle}>Target keywords</h3>
              <p className={styles.sectionDescription}>
                Target keywords are phrases that summarize your text. They are
                what people type into Google search.
              </p>
              <div className={styles.keywordTags}>
                {targetKeywords.map((keyword, index) => (
                  <Tag key={index} className={styles.keywordTag} color="cyan">
                    {keyword}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Recommended Keywords */}
            <div className={styles.keywordSection}>
              <h3 className={styles.sectionTitle}>Recommended keywords</h3>
              <p className={styles.sectionDescription}>
                Enrich your text with these keywords to get better SEO results.
              </p>
              <div className={styles.keywordTags}>
                {recommendedKeywords.map((keyword, index) => (
                  <Tag key={index} className={styles.keywordTag} color="green">
                    {keyword}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Quick tip */}
            <div className={styles.quickTip}>
              <p className={styles.tipText}>
                Get quick tips on which related keywords to include and how to
                optimize your images, tags, and links.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EditorDemo;
