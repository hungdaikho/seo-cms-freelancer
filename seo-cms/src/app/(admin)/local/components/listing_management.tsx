import React from "react";
import { Table, Button } from "antd";
import { FaPlus } from "react-icons/fa";
import styles from "./listing_management.module.scss";

const ListingManagement = () => {
  const dataSource = [
    {
      key: "1",
      name: "Listing 1",
      status: "Active",
    },
    {
      key: "2",
      name: "Listing 2",
      status: "Inactive",
    },
    // Add more listings as needed
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="primary" icon={<FaPlus />}>
          Add Listing
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h2>Listing Management</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ListingManagement;
