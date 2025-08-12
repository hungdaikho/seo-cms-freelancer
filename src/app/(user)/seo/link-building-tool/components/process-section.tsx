"use client";

import React from "react";
import { Card, Row, Col, Tag, Progress, Button } from "antd";
import {
  FiSearch,
  FiMail,
  FiBarChart,
  FiEye,
  FiSend,
  FiCheck,
} from "react-icons/fi";
import styles from "./process-section.module.scss";

interface ProcessSectionProps {}

const ProcessSection: React.FC<ProcessSectionProps> = () => {
  return (
    <div className={styles.processSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Just 3 steps to build backlinks</h2>
      </div>

      {/* Step 1 - Research */}
      <div className={styles.stepContainer}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <Card className={styles.demoCard}>
              <div className={styles.prospectsDemo}>
                <div className={styles.demoHeader}>
                  <h4>Prospects</h4>
                  <div className={styles.demoTabs}>
                    <span className={styles.tab}>Title, URL, bloggers</span>
                    <span className={styles.tab}>Rating</span>
                    <span className={styles.tab}>Actions</span>
                  </div>
                </div>

                <div className={styles.prospectsList}>
                  <div className={styles.prospectItem}>
                    <Tag color="green" className={styles.prospectTag}>
                      New
                    </Tag>
                  </div>
                  <div className={styles.prospectItem}>
                    <Tag color="blue" className={styles.prospectTag}>
                      Good
                    </Tag>
                  </div>
                </div>

                <div className={styles.demoFilters}>
                  <div className={styles.filterItem}>
                    <span className={styles.filterLabel}>Domain Quality</span>
                  </div>
                  <div className={styles.filterItem}>
                    <span className={styles.filterLabel}>Domain Relevance</span>
                  </div>
                  <div className={styles.filterItem}>
                    <span className={styles.filterLabel}>Contact Health</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <div className={styles.stepContent}>
              <div className={styles.stepNumber}>Step 1</div>
              <h3 className={styles.stepTitle}>Research</h3>

              <ul className={styles.stepList}>
                <li className={styles.stepListItem}>
                  <span className={styles.bullet}>•</span>
                  Explore new <span className={styles.highlight}>
                    backlink
                  </span>{" "}
                  sources.
                </li>
                <li className={styles.stepListItem}>
                  <span className={styles.bullet}>•</span>
                  Easily flip between sites and add the best backlink
                  opportunities to your in progress list for contact.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      {/* Step 2 - Connect */}
      <div className={styles.stepContainer}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12} className={styles.reverseOrder}>
            <div className={styles.stepContent}>
              <div className={styles.stepNumber}>Step 2</div>
              <h3 className={styles.stepTitle}>Connect</h3>

              <ul className={styles.stepList}>
                <li className={styles.stepListItem}>
                  <span className={styles.bullet}>•</span>
                  View detailed information about the website you are viewing
                  and the people affiliated with it. See contact information,
                  social web info, links to your website, and much more.
                </li>
                <li className={styles.stepListItem}>
                  <span className={styles.bullet}>•</span>
                  Use the outreach module to quickly and easily send
                  personalized, relationship-based messages that get results.
                </li>
                <li className={styles.stepListItem}>
                  <span className={styles.bullet}>•</span>
                  Mark all the backlinks you've acquired as "Done" to start
                  tracking them.
                </li>
              </ul>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <Card className={styles.demoCard}>
              <div className={styles.connectDemo}>
                <div className={styles.progressSection}>
                  <div className={styles.progressHeader}>
                    <span className={styles.progressLabel}>In progress</span>
                  </div>

                  <div className={styles.progressItem}>
                    <div className={styles.progressInfo}>
                      <span className={styles.progressTitle}>
                        Domain, Outreach Strategy, Status
                      </span>
                    </div>
                    <div className={styles.templateSection}>
                      <span className={styles.templateLabel}>
                        Message template
                      </span>
                    </div>
                  </div>

                  <div className={styles.contactProgress}>
                    <div className={styles.progressDots}>
                      <div className={styles.dot}></div>
                      <div className={styles.dot}></div>
                      <div className={styles.dot}></div>
                      <div className={styles.dot}></div>
                    </div>
                    <Button
                      type="primary"
                      size="small"
                      className={styles.sendButton}
                    >
                      Send email
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Step 3 - Track */}
      <div className={styles.stepContainer}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <Card className={styles.demoCard}>
              <div className={styles.trackDemo}>
                <div className={styles.monitorSection}>
                  <h4 className={styles.monitorTitle}>Monitor</h4>

                  <div className={styles.statusList}>
                    <div className={styles.statusItem}>
                      <span className={styles.statusLabel}>Website Status</span>
                      <span className={styles.statusValue}>
                        Referring Domain and URL
                      </span>
                    </div>
                    <div className={styles.statusItem}>
                      <span className={styles.statusLabel}>Undefined</span>
                      <span className={styles.statusValue}>🔗 0</span>
                    </div>
                    <div className={styles.statusItem}>
                      <span className={styles.statusLabel}>Pending</span>
                      <span className={styles.statusValue}>⏳ 0</span>
                    </div>
                    <div className={styles.statusItem}>
                      <span className={styles.statusLabel}>Active</span>
                      <span className={styles.statusValue}>✅ 0</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <div className={styles.stepContent}>
              <div className={styles.stepNumber}>Step 3</div>
              <h3 className={styles.stepTitle}>Track</h3>

              <ul className={styles.stepList}>
                <li className={styles.stepListItem}>
                  <span className={styles.bullet}>•</span>
                  Keep an eye on your backlink profile.
                </li>
                <li className={styles.stepListItem}>
                  <span className={styles.bullet}>•</span>
                  Once you earn a backlink, you can monitor it to make sure it
                  never disappears.
                </li>
                <li className={styles.stepListItem}>
                  <span className={styles.bullet}>•</span>
                  Check if the backlinks you've acquired are still active.
                </li>
                <li className={styles.stepListItem}>
                  <span className={styles.bullet}>•</span>
                  Contact site owners right away if a link has been taken down.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProcessSection;
