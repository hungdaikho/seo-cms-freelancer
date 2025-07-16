"use client";

import { Card, Button } from "antd";
import styles from "./topic-overview-section.module.scss";

const TopicOverviewSection = () => {
  return (
    <div className={styles.topicOverviewSection}>
      <div className={styles.sectionHeader}>
        <h2>Get an in-depth look with topic overviews</h2>
      </div>

      <Card className={styles.overviewCard}>
        <div className={styles.cardContent}>
          <div className={styles.leftPanel}>
            <div className={styles.pageInfo}>
              <div className={styles.infoHeader}>
                <span className={styles.infoLabel}>Page info</span>
              </div>
              <div className={styles.infoStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Total volume</span>
                  <span className={styles.statValue}>30</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Average KD</span>
                  <span className={styles.statValue}>2 300</span>
                </div>
              </div>

              <div className={styles.keywordList}>
                <div className={styles.keywordGroup}>
                  <span className={styles.keywordCount}>14</span>
                  <div className={styles.keywords}>
                    <div className={styles.keywordItem}>
                      • family picture ideas
                    </div>
                    <div className={styles.keywordItem}>
                      • family portrait ideas
                    </div>
                    <div className={styles.keywordItem}>• family pic ideas</div>
                    <div className={styles.keywordItem}>
                      and 9 more keywords
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.visualizationArea}>
              <div className={styles.exportButton}>
                <Button size="small" className={styles.exportBtn}>
                  📤 Export and Share
                </Button>
              </div>

              <div className={styles.topicMap}>
                {/* Central topic cluster */}
                <div
                  className={styles.topicCluster}
                  style={{ position: "absolute", top: "45%", left: "45%" }}
                >
                  <div className={styles.centralTopic}>
                    <div
                      className={styles.topicBubble}
                      style={{
                        backgroundColor: "#3b82f6",
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <span className={styles.topicLabel}>
                        family photo ideas
                      </span>
                      <span className={styles.keywordCount}>19</span>
                    </div>
                  </div>
                </div>

                {/* Connected topics */}
                <div
                  className={styles.connectedTopic}
                  style={{ position: "absolute", top: "20%", left: "20%" }}
                >
                  <div
                    className={styles.topicBubble}
                    style={{
                      backgroundColor: "#8b5cf6",
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <span className={styles.topicLabel}>family poses</span>
                  </div>
                </div>

                <div
                  className={styles.connectedTopic}
                  style={{ position: "absolute", top: "15%", right: "25%" }}
                >
                  <div
                    className={styles.topicBubble}
                    style={{
                      backgroundColor: "#06b6d4",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <span className={styles.topicLabel}>
                      family photograph...
                    </span>
                  </div>
                </div>

                <div
                  className={styles.connectedTopic}
                  style={{ position: "absolute", bottom: "25%", left: "15%" }}
                >
                  <div
                    className={styles.topicBubble}
                    style={{
                      backgroundColor: "#84cc16",
                      width: "65px",
                      height: "65px",
                    }}
                  >
                    <span className={styles.topicLabel}>
                      family picture ideas
                    </span>
                  </div>
                </div>

                <div
                  className={styles.connectedTopic}
                  style={{ position: "absolute", bottom: "20%", right: "20%" }}
                >
                  <div
                    className={styles.topicBubble}
                    style={{
                      backgroundColor: "#f59e0b",
                      width: "55px",
                      height: "55px",
                    }}
                  >
                    <span className={styles.topicLabel}>
                      family portrait pos
                    </span>
                  </div>
                </div>

                <div
                  className={styles.connectedTopic}
                  style={{ position: "absolute", top: "60%", right: "15%" }}
                >
                  <div
                    className={styles.topicBubble}
                    style={{
                      backgroundColor: "#ec4899",
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <span className={styles.topicLabel}>
                      family portrait ideas
                    </span>
                  </div>
                </div>

                {/* Connection lines */}
                <svg className={styles.connectionLines} viewBox="0 0 400 300">
                  <line
                    x1="180"
                    y1="135"
                    x2="120"
                    y2="80"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <line
                    x1="190"
                    y1="125"
                    x2="280"
                    y2="60"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <line
                    x1="170"
                    y1="155"
                    x2="80"
                    y2="220"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <line
                    x1="200"
                    y1="165"
                    x2="320"
                    y2="240"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <line
                    x1="210"
                    y1="140"
                    x2="320"
                    y2="180"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                </svg>
              </div>
            </div>

            <div className={styles.shareInfo}>
              <div className={styles.shareText}>
                <span>Share your keyword lists and work as a team</span>
                <br />
                <span className={styles.subText}>
                  Assign teammates Editor or Viewer
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TopicOverviewSection;
