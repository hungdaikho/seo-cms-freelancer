"use client";
import React from "react";
import styles from "./list_tool.module.scss";
import { TbSettingsSearch } from "react-icons/tb";
import { BsBarChart } from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { GoStar } from "react-icons/go";
import { useRouter } from "next/navigation";
type Props = {};

const ListTool = (props: Props) => {
  const router = useRouter();
  const tools = [
    {
      icon: <TbSettingsSearch style={{ color: "green" }} />,
      title: "SEO",
      des: "Boost your trffic with AI-powered SEO tools and workflows.",
      link: "/seo",
    },
    {
      icon: <BsBarChart style={{ color: "#2596be" }} />,
      title: "Traffic & Market",
      des: "Track competitors, analyze markets, uncover growth opportunities.",
      link: "/traffic",
    },
    // {
    //   icon: <CiLocationOn style={{ color: "#eab676" }} />,
    //   title: "Local",
    //   des: "Manage reviews, boost local search visibility, track local competitors.",
    // },
    {
      icon: <TbEditCircle style={{ color: "#abdbe3" }} />,
      title: "Content",
      des: "Create SEO-friendly content with AI and competitive data.",
      link: "/content",
    },
    {
      icon: <GoStar style={{ color: "#0e345b" }} />,
      title: "AI",
      des: "Grow your visibility in AI search tools like ChatGPT and Google’s AI Overviews.",
      link: "/ai",
    },
    // {
    //   icon: <IoShareSocial style={{ color: "#4ebdd8" }} />,
    //   title: "Social",
    //   des: "Find influencers and manage the entire social media cycle in one place.",
    // },
    // {
    //   icon: <TbTargetArrow />,
    //   title: "Advertising",
    //   des: "Research competitors, launch and optimize Google and Meta ads.",
    // },
  ];
  return (
    <div className={styles.listTool}>
      {tools.map((tool, index) => (
        <div
          className={styles.tool}
          key={index}
          onClick={() => {
            router.push(tool.link);
          }}
        >
          <div className={styles.title}>
            {tool.icon} <span>{tool.title}</span>
          </div>
          <div className={styles.content}>{tool.des}</div>
        </div>
      ))}
    </div>
  );
};

export default ListTool;
