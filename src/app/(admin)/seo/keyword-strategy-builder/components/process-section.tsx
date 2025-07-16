"use client";

import { Card } from "antd";
import styles from "./process-section.module.scss";

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

const ProcessSection = () => {
  const processSteps: ProcessStep[] = [
    {
      icon: "🧠",
      title: "Save hours of manual work with AI assistance",
      description:
        "Instantly collect the most relevant keywords and topics based on Semrush data",
    },
    {
      icon: "🗂️",
      title: "Navigate faster",
      description:
        "Jump between related topics where your keywords will be automatically organized",
    },
    {
      icon: "🚀",
      title: "Hit the ground running",
      description:
        "Take the pillar page and subpage suggestions for your content plan and start creating",
    },
  ];

  return (
    <div className={styles.processSection}>
      <div className={styles.sectionHeader}>
        <h2>Streamline your keyword research process</h2>
      </div>

      <div className={styles.processGrid}>
        {processSteps.map((step, index) => (
          <Card key={index} className={styles.processCard}>
            <div className={styles.cardContent}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.demoSection}>
        <Card className={styles.demoCard}>
          <div className={styles.demoHeader}>
            <div className={styles.demoInfo}>
              <span className={styles.topicsCount}>7 topics, 40 pages</span>
            </div>
            <div className={styles.demoActions}>
              <span className={styles.actionIcon}>🔄</span>
              <span className={styles.actionIcon}>⚙️</span>
              <span className={styles.actionIcon}>🗑️</span>
            </div>
          </div>

          <div className={styles.demoTable}>
            <div className={styles.tableHeader}>
              <span className={styles.pillarColumn}>Pillar page</span>
              <span className={styles.intentColumn}>Intent</span>
              <span className={styles.kdColumn}>KD %</span>
              <span className={styles.keywordsColumn}>Keywords</span>
              <span className={styles.volumeColumn}>Volume</span>
              <span className={styles.actionColumn}></span>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.rowContent}>
                <div className={styles.expandIcon}>▶</div>
                <div className={styles.pillarInfo}>
                  <span className={styles.pillarTitle}>
                    where can you get f...
                  </span>
                </div>
                <div className={styles.intentBar}>
                  <div
                    className={styles.intentGradient}
                    style={{
                      background:
                        "linear-gradient(90deg, #f59e0b 0%, #f97316 100%)",
                    }}
                  ></div>
                </div>
                <div className={styles.kdValue}>
                  <span
                    className={styles.kdDot}
                    style={{ backgroundColor: "#ef4444" }}
                  ></span>
                  <span>69</span>
                </div>
                <div className={styles.keywordCount}>26</div>
                <div className={styles.volumeValue}>654K</div>
                <div className={styles.writeContent}>
                  <span>Write content</span>
                </div>
              </div>

              <div className={styles.subpagesInfo}>
                <span>
                  Subpages: <strong>9</strong>
                </span>
              </div>

              <div className={styles.subpageRow}>
                <div className={styles.subpageContent}>
                  <div className={styles.expandIcon}>▶</div>
                  <div className={styles.subpageTitle}>—————</div>
                  <div className={styles.intentBar}>
                    <div
                      className={styles.intentGradient}
                      style={{
                        background:
                          "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
                      }}
                    ></div>
                  </div>
                  <div className={styles.kdValue}>
                    <span
                      className={styles.kdDot}
                      style={{ backgroundColor: "#f59e0b" }}
                    ></span>
                    <span>52</span>
                  </div>
                  <div className={styles.keywordCount}>12</div>
                  <div className={styles.volumeValue}>354K</div>
                  <div className={styles.writeContent}>
                    <span>Write content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProcessSection;
