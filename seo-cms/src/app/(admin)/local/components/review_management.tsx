import React from "react";
import { Button, Table } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./review_management.module.scss";

const ReviewManagement = () => {
  const dataSource = [
    {
      key: "1",
      reviewer: "John Doe",
      review: "Great service!",
      rating: 5,
    },
    {
      key: "2",
      reviewer: "Jane Smith",
      review: "Very satisfied with the product.",
      rating: 4,
    },
  ];

  const columns = [
    {
      title: "Reviewer",
      dataIndex: "reviewer",
      key: "reviewer",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <span>
          <Button icon={<FaEdit />} className={styles.actionButton} />
          <Button icon={<FaTrash />} className={styles.actionButton} />
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h2>Review Management</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ReviewManagement;
