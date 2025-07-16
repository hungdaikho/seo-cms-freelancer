import React from "react";
import { Row, Col, Card, Progress, Select } from "antd";
import { FaExternalLinkAlt, FaLightbulb } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import styles from "./content-briefs.module.scss";

const { Option } = Select;

const ContentBriefs = () => {
  const recommendations = [
    { label: "Semantically related words", progress: 85 },
    { label: "Backlinks", progress: 70 },
    { label: "Readability", progress: 92 },
    { label: "Text length", progress: 65 },
  ];

  const basicRecommendations = [
    { label: "Page title", progress: 88 },
    { label: "Meta description", progress: 75 },
    { label: "H1", progress: 90 },
    { label: "Text", progress: 68 },
  ];

  return (
    <div className={styles.contentBriefs}>
      <h2 className={styles.title}>
        Automate the Creation of SEO Content Briefs
      </h2>

      <Row gutter={[32, 32]}>
        <Col span={12}>
          <div className={styles.analysisSection}>
            <div className={styles.templateBox}>
              <div className={styles.templateHeader}>
                <FaLightbulb className={styles.templateIcon} />
                <div>
                  <h3>Generate SEO templates</h3>
                  <p>
                    Enter your target keywords (up to 30 at once!) and receive
                    tailored, easy-to-understand SEO recommendations for your
                    copy.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.analysisBox}>
              <h4>SEO recommendations for your content</h4>
              <p className={styles.analysisDesc}>
                Our analysis is based on your Google top 10 rivals
              </p>

              <Row gutter={24}>
                <Col span={12}>
                  <div className={styles.keywordBox}>
                    <h5>keyword 1</h5>
                    <div className={styles.urlItem}>
                      <span>1</span>
                      <span>https://domain.com/article...</span>
                      <FaExternalLinkAlt />
                    </div>
                    <div className={styles.urlItem}>
                      <span>2</span>
                      <span>...</span>
                      <FaExternalLinkAlt />
                    </div>
                    <div className={styles.urlItem}>
                      <span>...</span>
                      <span>...</span>
                      <FaExternalLinkAlt />
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.keywordBox}>
                    <h5>keyword 2</h5>
                    <div className={styles.urlItem}>
                      <span>1</span>
                      <span>https://domain.com/article...</span>
                      <FaExternalLinkAlt />
                    </div>
                    <div className={styles.urlItem}>
                      <span>2</span>
                      <span>...</span>
                      <FaExternalLinkAlt />
                    </div>
                    <div className={styles.urlItem}>
                      <span>...</span>
                      <span>...</span>
                      <FaExternalLinkAlt />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>

        <Col span={12}>
          <div className={styles.recommendationsSection}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card className={styles.recommendationCard}>
                  <h4>Key recommendations</h4>
                  {recommendations.map((item, index) => (
                    <div key={index} className={styles.recommendationItem}>
                      <span>{item.label}</span>
                      <Progress
                        percent={item.progress}
                        showInfo={false}
                        strokeColor="#9c88ff"
                      />
                    </div>
                  ))}
                  <div className={styles.advancedBox}>
                    <MdTrendingUp className={styles.advancedIcon} />
                    <div>
                      <h5>Discover advanced SEO recommendations</h5>
                      <p>
                        Get a list of semantically related keywords, see
                        recommended text length and optimal readability score.
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card className={styles.recommendationCard}>
                  <h4>Basic recommendations</h4>
                  {basicRecommendations.map((item, index) => (
                    <div key={index} className={styles.recommendationItem}>
                      <span>{item.label}</span>
                      <Progress
                        percent={item.progress}
                        showInfo={false}
                        strokeColor="#9c88ff"
                      />
                    </div>
                  ))}
                  <div className={styles.optimizationBox}>
                    <div>
                      <h5>Ensure smooth on-page optimization</h5>
                      <p>
                        Receive useful recommendations for your page title, meta
                        description, and H1 tag to help your writers.
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className={styles.competitionSection}>
        <h3>Get ahead of the competition</h3>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <div className={styles.competitionBox}>
              <Select
                defaultValue="United States (Desktop)"
                className={styles.countrySelect}
              >
                <Option value="United States (Desktop)">
                  United States (Desktop)
                </Option>
                <Option value="United Kingdom">United Kingdom</Option>
                <Option value="Canada">Canada</Option>
              </Select>
              <div className={styles.competitorList}>
                <div className={styles.competitorItem}>
                  <span className={styles.rank}>1</span>
                  <span className={styles.url}>
                    Virtual Reality, the technology of
                  </span>
                  <span className={styles.label}>Virtual Reality</span>
                </div>
                <div className={styles.competitorItem}>
                  <span className={styles.rank}>2</span>
                  <span className={styles.url}>
                    Virtual Reality, the technology of
                  </span>
                  <span className={styles.label}>Virtual Reality</span>
                </div>
              </div>
              <div className={styles.deviceOptions}>
                <span>Device:</span>
                <label>
                  <input type="radio" name="device" defaultChecked /> Desktop
                </label>
                <label>
                  <input type="radio" name="device" /> Mobile
                </label>
              </div>
            </div>
          </Col>
          <Col span={16}>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <h4>• Learn from your competitors</h4>
                <p>
                  Identify your top 10 rivals and see where and how they use
                  target keywords in their content.
                </p>
              </div>
              <div className={styles.benefitItem}>
                <h4>• Outrank your local rivals</h4>
                <p>
                  from country to region and city—and get targeted
                  recommendations to outrank your competitors in that area.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContentBriefs;
