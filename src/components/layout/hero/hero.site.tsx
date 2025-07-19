"use client";
import { useTranslation } from "react-i18next";
import styles from "./hero.site.module.scss";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GoDotFill } from "react-icons/go";
import { FaChartLine, FaSearch, FaFileAlt, FaRobot } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
interface ITab {
  label: string;
  key: string;
  active: boolean;
}
const brands = [
  {
    img: "/hero/amazon.png",
  },
  {
    img: "/hero/shopify.png",
  },
  {
    img: "/hero/hubspot.png",
  },
  {
    img: "/hero/mailchimp.png",
  },
];
export default function Hero() {
  const swiperRef = useRef<any>(null);
  const { t } = useTranslation();
  const cards = [
    {
      title: t("traffic"),
      icon: <FaChartLine />,
      text_1: t("traffic_1"),
      text_2: t("traffic_2"),
      text_3: t("traffic_3"),
      image: "/hero/traffic.svg",
    },
    {
      title: t("SEO"),
      icon: <FaSearch />,
      text_1: t("SEO_1"),
      text_2: t("SEO_2"),
      text_3: t("SEO_3"),
      image: "/hero/seo.svg",
    },
    // {
    //   title: t("Local"),
    //   icon: <CiLocationOn />,
    //   text_1: t("Local_1"),
    //   text_2: t("Local_2"),
    //   text_3: t("Local_3"),
    //   image: "/hero/local.svg",
    // },
    {
      title: t("Content"),
      icon: <FaFileAlt />,
      text_1: t("Content_1"),
      text_2: t("Content_2"),
      text_3: t("Content_3"),
      image: "/hero/content.svg",
    },
    {
      title: t("AI"),
      icon: <FaRobot />,
      text_1: t("AI_1"),
      text_2: t("AI_2"),
      text_3: t("AI_3"),
      image: "/hero/ai.svg",
    },
    // {
    //   title: t("Social"),
    //   icon: <IoShareSocialOutline />,
    //   text_1: t("Social_1"),
    //   text_2: t("Social_2"),
    //   text_3: t("Social_3"),
    //   image: "/hero/social.svg",
    // },
    // {
    //   title: t("Advertising"),
    //   icon: <GiArcheryTarget />,
    //   text_1: t("Advertising_1"),
    //   text_2: t("Advertising_2"),
    //   text_3: t("Advertising_3"),
    //   image: "/hero/ppc.svg",
    // },
  ];
  const menu = [
    {
      label: "traffic",
      key: "traffic",
      active: true,
    },
    {
      label: "SEO",
      key: "SEO",
      active: false,
    },
    // {
    //   label: "Local",
    //   key: "Local",
    //   active: false,
    // },
    {
      label: "Content",
      key: "Content",
      active: false,
    },
    {
      label: "AI",
      key: "AI",
      active: false,
    },
    // {
    //   label: "Social",
    //   key: "Social",
    //   active: false,
    // },
    // {
    //   label: "Advertising",
    //   key: "Advertising",
    //   active: false,
    // },
  ];
  const [tab, setTab] = useState<Array<ITab>>(menu);
  return (
    <section className={styles.heroSection}>
      <div className={styles.bgCircle1}></div>
      <div className={styles.bgCircle2}></div>
      <div className={styles.heroTitle}>
        <span>{t("hero_title")}</span>
        <span className={styles.gradientText}>{t("hero_subtitle")}</span>
      </div>
      <div className={styles.heroUrlSite}>
        <div className={styles.heroSearch}>
          <Input placeholder={t("hero_placeholder")} className={styles.input} />
          {/* <Select className={styles.input}  /> */}
        </div>
        <div className={styles.btn}>
          <Button>{t("hero_start")}</Button>
        </div>
      </div>

      <div className={styles.toolkit}>
        <div className={styles.toolkit_title}>{t("toolkit_title")}</div>
        <div className={styles.toolkit_tab}>
          {tab.map((item: ITab, index) => {
            return (
              <div
                className={`${styles.tabItem} ${item.active && styles.active}`}
                onClick={() => {
                  const currentTab: Array<ITab> = [...tab];
                  currentTab.map((i) => {
                    i.active = i.key === item.key;
                  });
                  setTab(currentTab);
                  swiperRef.current?.slideToLoop(index);
                }}
              >
                {t(item.label)}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.slide}>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            const currentIndex = swiper.realIndex; // 🔥 slide thật (không tính clone)
            setTab((prevTab) =>
              prevTab.map((item, idx) => ({
                ...item,
                active: idx === currentIndex,
              }))
            );
          }}
          spaceBetween={50}
          slidesPerView={1.5}
          centeredSlides={true}
          loop={true}
          className={styles.mySwiper}
          breakpoints={{
            768: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 2.2,
            },
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className={styles.cardSlide}>
                <div className={styles.top}>
                  <span className={styles.icon}>{card.icon}</span>{" "}
                  <h3>{card.title}</h3>
                </div>
                <div className={styles.listText}>
                  <div className={styles.textItem}>
                    <span className={styles.iconText}>
                      <GoDotFill />
                    </span>
                    <span className={styles.value}>{card.text_1}</span>
                  </div>
                  <div className={styles.textItem}>
                    <span className={styles.iconText}>
                      <GoDotFill />
                    </span>
                    <span className={styles.value}>{card.text_2}</span>
                  </div>
                  <div className={styles.textItem}>
                    <span className={styles.iconText}>
                      <GoDotFill />
                    </span>
                    <span className={styles.value}>{card.text_3}</span>
                  </div>
                </div>
                <div className={styles.img}>
                  <span className={styles.cardIcon}>{card.icon}</span>
                </div>
                <div className={styles.btn}>
                  <Button>{t("try")}</Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.brands}>
        <div className={styles.brandsTitle}>{t("brandTitle")}</div>
        <div className={styles.brandsLogos}>
          {brands.map((img: any) => {
            return <img src={img.img}></img>;
          })}
        </div>
      </div>
    </section>
  );
}
