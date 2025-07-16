"use client";

import React from "react";
import { Input, Button } from "antd";
import styles from "./hero_sources_destinations.module.scss";

const HeroSourcesDestinations: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.badge}>Sources & Destinations</div>
            <h1 className={styles.title}>Analyze Competitor Traffic Flows</h1>
            <p className={styles.description}>
              See which sources send traffic to competitors — and where visitors
              go next.
            </p>

            <div className={styles.inputSection}>
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputLabel}>Main</span>
                  <Input
                    placeholder="Enter your domain, subdomain or subfolder"
                    className={styles.mainInput}
                    size="large"
                  />
                </div>
                <Input
                  placeholder="Enter competitor domain, subdomain or subfolder"
                  className={styles.competitorInput}
                  size="large"
                />
                <button className={styles.addCompetitor}>
                  + Add more competitors
                </button>
              </div>
              <Button
                type="primary"
                size="large"
                className={styles.analyzeButton}
              >
                Analyze
              </Button>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.flowVisualization}>
              <div className={styles.funnelContainer}>
                <svg
                  className={styles.funnel}
                  viewBox="0 0 200 160"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Funnel shape */}
                  <path
                    d="M40 20 L160 20 L140 60 L60 60 Z"
                    fill="url(#funnelGradient1)"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                  />
                  <path
                    d="M60 60 L140 60 L120 100 L80 100 Z"
                    fill="url(#funnelGradient2)"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                  />
                  <path
                    d="M80 100 L120 100 L110 140 L90 140 Z"
                    fill="url(#funnelGradient3)"
                    stroke="#e6f3ff"
                    strokeWidth="2"
                  />

                  {/* Traffic flow dots */}
                  <circle cx="50" cy="40" r="3" fill="#1890ff" opacity="0.8">
                    <animate
                      attributeName="cy"
                      values="40;50;60"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.4;0.1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="100" cy="40" r="3" fill="#722ed1" opacity="0.8">
                    <animate
                      attributeName="cy"
                      values="40;50;60"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.4;0.1"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="150" cy="40" r="3" fill="#f759ab" opacity="0.8">
                    <animate
                      attributeName="cy"
                      values="40;50;60"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.4;0.1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <circle cx="70" cy="80" r="2.5" fill="#1890ff" opacity="0.6">
                    <animate
                      attributeName="cy"
                      values="80;90;100"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0.3;0.1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="130" cy="80" r="2.5" fill="#722ed1" opacity="0.6">
                    <animate
                      attributeName="cy"
                      values="80;90;100"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0.3;0.1"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <circle cx="100" cy="120" r="2" fill="#52c41a" opacity="0.7">
                    <animate
                      attributeName="cy"
                      values="120;130;140"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.7;0.4;0.1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Gradients */}
                  <defs>
                    <linearGradient
                      id="funnelGradient1"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#e6f3ff" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#bae0ff"
                        stopOpacity="0.6"
                      />
                    </linearGradient>
                    <linearGradient
                      id="funnelGradient2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#bae0ff" stopOpacity="0.6" />
                      <stop
                        offset="100%"
                        stopColor="#91caff"
                        stopOpacity="0.4"
                      />
                    </linearGradient>
                    <linearGradient
                      id="funnelGradient3"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#91caff" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#69b1ff"
                        stopOpacity="0.3"
                      />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Flow labels */}
                <div className={styles.flowLabels}>
                  <div className={styles.sourceLabel}>Traffic Sources</div>
                  <div className={styles.destinationLabel}>Destinations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSourcesDestinations;
