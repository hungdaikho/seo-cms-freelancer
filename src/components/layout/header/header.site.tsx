import React, { useState } from "react";
import styles from "./header.site.module.scss";
import Image from "next/image";
import { Button, Dropdown } from "antd";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import AuthModal from "@/components/ui/modal/auth_modal_new";

const menu = [
  { label: "features", href: "#" },
  { label: "pricing", href: "#" },
  { label: "blogs", href: "#" },
  { label: "aboutus", href: "#" },
  { label: "contactus", href: "#" },
  { label: "news", href: "#", tag: "New" },
];

const HeaderSite = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  return (
    <header className={styles.headerSite}>
      <div className={styles.logo}>✨ SEO BOOST</div>
      <nav className={styles.navMenu}>
        <ul className={styles.menu}>
          {menu.map((item) => (
            <li key={item.label}>
              <a href={item.href}>
                {t(item.label)}
                {item.tag && <span className={styles.tag}>{item.tag}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.actions}>
        {/* <Dropdown
          menu={{
            items: [
              {
                key: "en",
                label: (
                  <span onClick={() => i18n.changeLanguage("en")}>English</span>
                ),
              },
              {
                key: "ph",
                label: (
                  <span onClick={() => i18n.changeLanguage("ph")}>PH</span>
                ),
              },
            ],
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button type="text" className={styles.langBtn}>
            <Image src="/globe.svg" alt="Lang" width={20} height={20} />
            <span
              style={{
                color: "#fff",
                marginLeft: 4,
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              {i18n.language}
            </span>
            <DownOutlined
              style={{ color: "#fff", fontSize: 10, marginLeft: 2 }}
            />
          </Button>
        </Dropdown> */}
        <Button
          type="default"
          className={styles.loginBtn}
          onClick={() => {
            setAuthModalTab("login");
            setAuthModalOpen(true);
          }}
        >
          {t("login")}
        </Button>
        <Button
          type="primary"
          className={styles.signupBtn}
          onClick={() => {
            setAuthModalTab("signup");
            setAuthModalOpen(true);
          }}
        >
          {t("signup")}
        </Button>
        {/* Hamburger icon for mobile */}
        <Button
          type="text"
          className={styles.menuMobileBtn}
          onClick={() => setMobileMenuOpen(true)}
          style={{ display: "none" }}
          aria-label="Open menu"
        >
          <MenuOutlined style={{ fontSize: 22, color: "#fff" }} />
        </Button>
      </div>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenuHeader}>
            <Image src="/next.svg" alt="Logo" width={100} height={28} />
            <Button
              type="text"
              className={styles.closeMobileMenuBtn}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <CloseOutlined style={{ fontSize: 24 }} />
            </Button>
          </div>
          <ul className={styles.mobileMenuList}>
            {menu.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {t(item.label)}
                  {item.tag && <span className={styles.tag}>{item.tag}</span>}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.mobileMenuActions}>
            <Button
              type="default"
              block
              className={styles.loginBtn}
              onClick={() => {
                setAuthModalTab("login");
                setAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              {t("login")}
            </Button>
            <Button
              type="primary"
              block
              className={styles.signupBtn}
              onClick={() => {
                setAuthModalTab("signup");
                setAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              {t("signup")}
            </Button>
            {/* <div style={{ marginTop: 16 }}>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "en",
                      label: (
                        <span
                          onClick={() => {
                            i18n.changeLanguage("en");
                            setMobileMenuOpen(false);
                          }}
                        >
                          English
                        </span>
                      ),
                    },
                    {
                      key: "ph",
                      label: (
                        <span
                          onClick={() => {
                            i18n.changeLanguage("ph");
                            setMobileMenuOpen(false);
                          }}
                        >
                          PH
                        </span>
                      ),
                    },
                  ],
                }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Button type="text" className={styles.langBtn} block>
                  <Image src="/globe.svg" alt="Lang" width={20} height={20} />
                  <span
                    style={{
                      color: "#222",
                      marginLeft: 4,
                      fontWeight: 500,
                      fontSize: 15,
                    }}
                  >
                    {i18n.language}
                  </span>
                  <DownOutlined
                    style={{ color: "#222", fontSize: 10, marginLeft: 2 }}
                  />
                </Button>
              </Dropdown>
            </div> */}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </header>
  );
};

export default HeaderSite;
