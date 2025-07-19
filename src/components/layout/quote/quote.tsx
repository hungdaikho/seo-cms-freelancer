import React from "react";
import styles from "./quote.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
type Props = {};

const Quote = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.quote}>
      <div className={styles.feedBack}>
        <div className={styles.title}>
          “Semrush is like a keyword research tool, Google Trends, Moz,
          Hootsuite and SimilarWeb in one.”
        </div>
        <div className={styles.avatar}>
          <img src="/Mario_Leon_Rojas.webp" alt="" />
          <span>
            <b>Mario León Rojas</b>
          </span>
          <span>Performance Marketing Specialist, Banco del Sol</span>
          <span style={{ opacity: 0.8 }}>Source: Semrush G2 reviews</span>
        </div>
      </div>
      {/* <div className={styles.figures}>
        <div className={styles.title}>{t("figures")}</div>
        <div className={styles.content}>
          <div className={styles.item}>
            <span className={styles.title}>10M</span>
            <span className={styles.figure}>{t("figures_1")}</span>
            <span className={styles.figrue_sub}>{t("figures_1_sub")}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>21</span>
            <span className={styles.figure}>{t("figures_2")}</span>
            <span className={styles.figrue_sub}>{t("figures_2_sub")}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>30%</span>
            <span className={styles.figure}>
              {t("figures_3")}{" "}
              <span
                className={styles.figrue_sub}
                style={{ fontWeight: "300 !important" }}
              >
                {t("figures_3_sub")}
              </span>
            </span>
          </div>
        </div>
      </div> */}
      <div className={styles.stats}>
        <div className={styles.left}>
          <div className={styles.title}>{t("stats")}</div>
          <div className={styles.des}>{t("stats_des")}</div>
          <div className={styles.btn}>
            <Button>{t("stats_btn")}</Button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.item}>
            <span className={styles.title}>26B</span>
            <span className={styles.title_sub}>{t("keywords")}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>43T</span>
            <span className={styles.title_sub}>{t("backlinks")}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>808M</span>
            <span className={styles.title_sub}>{t("domain_profiles")}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>140</span>
            <span className={styles.title_sub}>{t("geo_database")}</span>
          </div>
        </div>
      </div>
      <div className={styles.marketers}>
        <div className={styles.title}>{t("get_start")}</div>
        <div className={styles.try}>{t("try7day")}</div>
        <div className={styles.btn}>
          <Button>{t("freetrial")}</Button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
