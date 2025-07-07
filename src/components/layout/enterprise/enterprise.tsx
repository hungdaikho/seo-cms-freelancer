import React from "react";
import styles from "./enterprise.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { GoDotFill } from "react-icons/go";
type Props = {};

const Enterprise = ({}: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.enterprise}>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.logo}>
            <img src="/enterprise-logo.svg" alt="" />
          </div>
          <div className={styles.title}>{t("enterprise_title")}</div>
          <div className={styles.btn}>
            <Button>{t("enterprise-btn")}</Button>
          </div>
        </div>
        <div className={styles.item2}>
          <div className={styles.title2}>
            <span className={styles.icon}>
              <GoDotFill />
            </span>
            <span className={styles.text}>{t("enterprise-1")}</span>
          </div>
          <div className={styles.title2}>
            <span className={styles.icon}>
              <GoDotFill />
            </span>
            <span className={styles.text}>{t("enterprise-2")}</span>
          </div>
          <div className={styles.title2}>
            <span className={styles.icon}>
              <GoDotFill />
            </span>
            <span className={styles.text}>{t("enterprise-2")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enterprise;
