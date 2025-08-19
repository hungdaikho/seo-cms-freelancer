import React, { useState } from "react";
import styles from "./header.dashboard.module.scss";
import { Button, Dropdown, MenuProps, Input, AutoComplete } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { useAuth } from "@/stores/hooks/useAuth";
import { useRouter } from "next/navigation";
import useSearch from "@/hooks/useSearch";
import { IoIosNotifications } from "react-icons/io";
type Props = {};

const HeaderDashBorad = ({}: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    handleSearch,
    navigateToPage,
  } = useSearch();
  const [showDropdown, setShowDropdown] = useState(false);
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
    ...(user?.role === "super_admin"
      ? [
          {
            key: "3",
            label: "Manage users",
            onClick: () => {
              router.push("/manage-user");
            },
          },
        ]
      : []),
    ...(user?.role === "super_admin"
      ? [
          {
            key: "5",
            label: "CMS Infomation",
            onClick: () => {
              router.push("/cms-admin");
            },
          },
        ]
      : []),
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
        <AutoComplete
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
            setShowDropdown(value.length > 0);
          }}
          onSelect={(value, option) => {
            if (option && option.route) {
              navigateToPage(option.route);
              setShowDropdown(false);
            }
          }}
          onSearch={(value) => {
            setSearchQuery(value);
            setShowDropdown(value.length > 0);
          }}
          options={searchResults.map((item) => ({
            label: (
              <div style={{ padding: "8px 0" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {item.description}
                </div>
              </div>
            ),
            value: item.title,
            route: item.route,
            key: item.key,
          }))}
          open={showDropdown && searchResults.length > 0}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 200);
          }}
          onFocus={() => {
            if (searchQuery.length > 0) {
              setShowDropdown(true);
            }
          }}
          style={{ width: "100%" }}
        >
          <Input
            placeholder="Search pages, features..."
            prefix={<SearchOutlined />}
            className={styles.searchInput}
            onPressEnter={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.trim()) {
                handleSearch(target.value);
                setShowDropdown(false);
              }
            }}
          />
        </AutoComplete>
      </div>

      {/* Navigation Menu */}
      <div className={styles.navSection}>
        <Button
          type="text"
          className={styles.navButton}
          onClick={() => router.push("/pricing")}
        >
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
          style={{ fontSize: "24px" }}
          icon={<IoIosNotifications />}
          className={styles.iconButton}
        />

        {/* User Profile */}
        <Dropdown menu={{ items: userAction }} trigger={["click"]}>
          <Button
            type="text"
            icon={
              <img
                style={{ objectFit: "contain", width: "16px" }}
                src="/user.png"
                alt=""
              />
            }
            className={styles.userButton}
          ></Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderDashBorad;
