import React from "react";
import styles from "./header.dashboard.module.scss";
import { Button, Dropdown, MenuProps, Input } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/stores/hooks/useAuth";
type Props = {};

const HeaderDashBorad = ({}: Props) => {
  const { user } = useAuth();
  const userAction: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <div>
            <span>My profile </span>
          </div>
          <div>
            <span style={{ opacity: 0.8 }}>{user?.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Manage users",
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.location.reload();
          }}
        >
          Log out
        </div>
      ),
    },
    { type: "divider" },
  ];
  return (
    <div className={styles.headerDashBoard}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <span className={styles.logo}>SEO BOOST</span>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <Input
          placeholder="Search for anything"
          prefix={<SearchOutlined />}
          className={styles.searchInput}
          width={1000}
        />
      </div>

      {/* Navigation Menu */}
      <div className={styles.navSection}>
        <Button type="text" className={styles.navButton}>
          Pricing
        </Button>
        <Button type="text" className={styles.navButton}>
          Consulting
        </Button>
        <Button type="text" className={styles.navButton}>
          Contact
        </Button>
        {/* Notification Bell */}
        <Button
          type="text"
          icon={<BellOutlined />}
          className={styles.iconButton}
        />

        {/* User Profile */}
        <Dropdown menu={{ items: userAction }} trigger={["click"]}>
          <Button type="text" icon={<FaUser />} className={styles.userButton} />
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderDashBorad;
