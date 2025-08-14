import React, { useState } from "react";
import styles from "./header.dashboard.module.scss";
import { Button, Dropdown, MenuProps, Input } from "antd";
import { SearchOutlined, BellOutlined, DownOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/stores/hooks/useAuth";
import UserManagerModal from "@/components/modals/UserManagerModal";
type Props = {};

const HeaderDashBorad = ({}: Props) => {
  const { user } = useAuth();
  const [userManagerModalOpen, setUserManagerModalOpen] = useState(false);

  const handleMenuClick = (key: string) => {
    switch (key) {
      case "3":
        setUserManagerModalOpen(true);
        break;
      default:
        break;
    }
  };

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
      onClick: () => handleMenuClick("3"),
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

      <UserManagerModal
        open={userManagerModalOpen}
        onCancel={() => setUserManagerModalOpen(false)}
      />
    </div>
  );
};

export default HeaderDashBorad;
