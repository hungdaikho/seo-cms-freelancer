import React, { useState } from "react";
import styles from "./header.site.module.scss";
import Image from "next/image";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
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
  const { t } = useTranslation();
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
