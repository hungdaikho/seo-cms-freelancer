"use client";

import React from "react";
import { Row, Col } from "antd";
import styles from "./advantages-section.module.scss";

interface AdvantagesSectionProps {}

const AdvantagesSection: React.FC<AdvantagesSectionProps> = () => {
  const questions = [
    "What errors were found during the crawl?",
    "What pages were not crawled?",
    "Is your crawl budget being spent efficiently?",
    "What are your most crawled pages?",
    "Can you manage Googlebot's crawling",
  ];

  return (
    <div className={styles.advantagesSection}>
      <Row gutter={[48, 48]} align="middle">
        <Col xs={24} lg={12}>
          <div className={styles.contentArea}>
            <h2 className={styles.sectionTitle}>
              Advantages of Log File Analysis
            </h2>
            <p className={styles.sectionDescription}>
              Log file analysis is an extremely valuable source of 100% accurate
              data that allows you to understand what happens when a search
              engine crawls your website.
            </p>
            <div className={styles.toolInfo}>
              <h3 className={styles.toolTitle}>
                Our tool will help you answer questions like:
              </h3>
              <ul className={styles.questionsList}>
                {questions.map((question, index) => (
                  <li key={index} className={styles.questionItem}>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <div className={styles.illustrationArea}>
            <div className={styles.illustration}>
              {/* SVG illustration representing log file analysis */}
              <svg
                width="400"
                height="300"
                viewBox="0 0 400 300"
                className={styles.illustrationSvg}
              >
                {/* Box with documents */}
                <rect
                  x="50"
                  y="80"
                  width="120"
                  height="100"
                  rx="8"
                  fill="#E6E6FA"
                  stroke="#9370DB"
                  strokeWidth="2"
                />
                <rect
                  x="60"
                  y="90"
                  width="80"
                  height="60"
                  rx="4"
                  fill="white"
                />
                <rect
                  x="65"
                  y="95"
                  width="70"
                  height="4"
                  rx="2"
                  fill="#9370DB"
                />
                <rect
                  x="65"
                  y="105"
                  width="50"
                  height="3"
                  rx="1.5"
                  fill="#DDD"
                />
                <rect
                  x="65"
                  y="115"
                  width="60"
                  height="3"
                  rx="1.5"
                  fill="#DDD"
                />
                <rect
                  x="65"
                  y="125"
                  width="40"
                  height="3"
                  rx="1.5"
                  fill="#DDD"
                />
                <rect
                  x="65"
                  y="135"
                  width="55"
                  height="3"
                  rx="1.5"
                  fill="#DDD"
                />

                {/* Multiple documents */}
                <rect
                  x="70"
                  y="85"
                  width="80"
                  height="60"
                  rx="4"
                  fill="white"
                  stroke="#E0E0E0"
                />
                <rect
                  x="80"
                  y="80"
                  width="80"
                  height="60"
                  rx="4"
                  fill="white"
                  stroke="#E0E0E0"
                />

                {/* Magnifying glass */}
                <circle
                  cx="320"
                  cy="120"
                  r="25"
                  fill="none"
                  stroke="#9370DB"
                  strokeWidth="3"
                />
                <circle
                  cx="320"
                  cy="120"
                  r="15"
                  fill="none"
                  stroke="#9370DB"
                  strokeWidth="2"
                />
                <line
                  x1="340"
                  y1="140"
                  x2="355"
                  y2="155"
                  stroke="#9370DB"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Eye icon inside magnifying glass */}
                <ellipse
                  cx="320"
                  cy="120"
                  rx="8"
                  ry="6"
                  fill="none"
                  stroke="#9370DB"
                  strokeWidth="1.5"
                />
                <circle cx="320" cy="120" r="3" fill="#9370DB" />

                {/* Files/documents around */}
                <rect
                  x="200"
                  y="40"
                  width="60"
                  height="80"
                  rx="6"
                  fill="#F0F8FF"
                  stroke="#4169E1"
                  strokeWidth="1.5"
                />
                <rect
                  x="205"
                  y="50"
                  width="50"
                  height="3"
                  rx="1.5"
                  fill="#4169E1"
                />
                <rect x="205" y="60" width="35" height="2" rx="1" fill="#CCC" />
                <rect x="205" y="70" width="40" height="2" rx="1" fill="#CCC" />
                <rect x="205" y="80" width="30" height="2" rx="1" fill="#CCC" />

                <rect
                  x="280"
                  y="180"
                  width="60"
                  height="80"
                  rx="6"
                  fill="#F0FFF0"
                  stroke="#32CD32"
                  strokeWidth="1.5"
                />
                <rect
                  x="285"
                  y="190"
                  width="50"
                  height="3"
                  rx="1.5"
                  fill="#32CD32"
                />
                <rect
                  x="285"
                  y="200"
                  width="35"
                  height="2"
                  rx="1"
                  fill="#CCC"
                />
                <rect
                  x="285"
                  y="210"
                  width="40"
                  height="2"
                  rx="1"
                  fill="#CCC"
                />
                <rect
                  x="285"
                  y="220"
                  width="30"
                  height="2"
                  rx="1"
                  fill="#CCC"
                />

                {/* Connecting arrows */}
                <path
                  d="M170 130 Q210 100 260 110"
                  fill="none"
                  stroke="#9370DB"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <path
                  d="M270 160 Q250 180 280 200"
                  fill="none"
                  stroke="#9370DB"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />

                {/* Arrow marker definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#9370DB" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdvantagesSection;
