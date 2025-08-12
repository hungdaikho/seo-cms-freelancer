import React from "react";
import { Row, Col, Card } from "antd";
import styles from "./category-scores.module.scss";

const CategoryScores = () => {
  const categories = [
    { name: "All categories", score: 9.4 },
    { name: "Arts & Entertainment", score: 9.4 },
    { name: "Autos & Vehicles", score: 9.4 },
    { name: "Beauty & Fitness", score: 9.4 },
    { name: "Books & Literature", score: 9.2 },
    { name: "Business & Industrial", score: 9.4 },
    { name: "Computers & Electronics", score: 9.4 },
    { name: "Finance", score: 9.4 },
    { name: "Food & Drink", score: 9.4 },
    { name: "Games", score: 9.4 },
    { name: "Health", score: 8.8 },
    { name: "Hobbies & Leisure", score: 9.4 },
    { name: "Home & Garden", score: 9.4 },
    { name: "Internet & Telecom", score: 9.3 },
    { name: "Jobs & Education", score: 9.3 },
    { name: "Law & Government", score: 9.3 },
    { name: "News", score: 9.4 },
    { name: "Online Communities", score: 9.1 },
    { name: "People & Society", score: 9.2 },
    { name: "Pets & Animals", score: 9.3 },
    { name: "Real Estate", score: 8.8 },
    { name: "Reference", score: 8.8 },
    { name: "Science", score: 9.3 },
    { name: "Shopping", score: 9.4 },
    { name: "Sports", score: 9.4 },
    { name: "Travel", score: 9.3 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 9.3) return "#ff4d4f";
    if (score >= 9.0) return "#faad14";
    return "#52c41a";
  };

  return (
    <div className={styles.categoryScores}>
      <Row gutter={[16, 16]}>
        {categories.map((category, index) => (
          <Col span={6} key={index}>
            <Card className={styles.categoryCard}>
              <div className={styles.cardContent}>
                <span className={styles.categoryName}>{category.name}</span>
                <span
                  className={styles.score}
                  style={{ color: getScoreColor(category.score) }}
                >
                  {category.score}
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryScores;
