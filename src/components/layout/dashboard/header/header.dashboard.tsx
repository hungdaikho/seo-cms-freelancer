import React from "react";
import styles from "./header.dashboard.module.scss";
import { Button, Dropdown, MenuProps } from "antd";
import { IoPauseCircle } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { LiaHireAHelper } from "react-icons/lia";
import { useAuth } from "@/stores/hooks/useAuth";
import GlobalSearch from "@/components/ui/global-search/global-search";
type Props = {};

const HeaderDashBorad = ({}: Props) => {
  const { user } = useAuth();
  const userAction: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <div>
            <span>My profile </span>{" "}
            {/* <span style={{ opacity: 0.8 }}>ID: 26180634</span> */}
          </div>
          <div>
            <span style={{ opacity: 0.8 }}>{user?.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Subscription info",
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
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>Pricing</span>,
    },
    {
      key: "2",
      label: <span>Features</span>,
    },
    {
      key: "3",
      label: <span>Blog</span>,
    },
    {
      key: "4",
      label: <span>Resources</span>,
      children: [
        { key: "4-1", label: "Help Center" },
        { key: "4-2", label: "What's News" },
        { key: "4-3", label: "Webinars" },
        { key: "4-4", label: "Insights" },
        { key: "4-5", label: "Hire a Trusted Agency" },
      ],
    },
    {
      key: "5",
      label: "Company",
      children: [
        { key: "5-1", label: "About Us" },
        { key: "5-2", label: "Newsroom" },
        { key: "5-3", label: "Careers" },
        { key: "5-4", label: "Success Stories" },
        { key: "5-5", label: "Affiliate Program" },
        { key: "5-6", label: "For Investors" },
        { key: "5-7", label: "Partner Integrations" },
        { key: "5-8", label: "Contacts" },
        { key: "5-9", label: "Stats and Facts" },
      ],
    },
    { type: "divider" },
    { key: "9", label: "Online demo", icon: <IoPauseCircle /> },
    { key: "10", label: "Hire a digital agency", icon: <LiaHireAHelper /> },
  ];
  return (
    <div className={styles.headerDashBoard}>
      <div className={styles.headerItem}>
        <span className={styles.logo}>SEOCMS</span>
      </div>
      <div className={styles.headerItem}>
        <div className={styles.searchContainer}>
          <GlobalSearch
            placeholder="Enter your task, website, or keyword"
            className={styles.globalSearchWrapper}
          />
        </div>
      </div>
      <div className={styles.headerItem}>
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <Button className={styles.upgrage}>Upgrade</Button>
          </div>
          <div className={styles.menuItem}>
            <Button className={styles.btn}>Pricing</Button>
          </div>
          <div className={styles.menuItem}>
            <Dropdown menu={{ items }}>
              <Button className={styles.btn}>More</Button>
            </Dropdown>
          </div>
          <div className={styles.menuItem}>
            <Dropdown menu={{ items: userAction }}>
              <Button className={styles.btn} icon={<FaUser />}></Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDashBorad;
