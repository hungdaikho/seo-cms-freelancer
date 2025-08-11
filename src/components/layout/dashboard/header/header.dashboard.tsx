import React, { useState } from "react";
import styles from "./header.dashboard.module.scss";
import { Button, Dropdown, MenuProps } from "antd";
import { IoPauseCircle } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { LiaHireAHelper } from "react-icons/lia";
import { useAuth } from "@/stores/hooks/useAuth";
import GlobalSearch from "@/components/ui/global-search/global-search";
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
        <span className={styles.logo}>SEO BOOST</span>
      </div>
      <div className={styles.headerItem}>
        <div className={styles.searchContainer}>
          <GlobalSearch
            placeholder="Search features: SEO, Traffic, Content, AI..."
            className={styles.globalSearchWrapper}
          />
        </div>
      </div>
      <div className={styles.headerItem}>
        <div className={styles.menu}>
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

      <UserManagerModal
        open={userManagerModalOpen}
        onCancel={() => setUserManagerModalOpen(false)}
      />
    </div>
  );
};

export default HeaderDashBorad;
