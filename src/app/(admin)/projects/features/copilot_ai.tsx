"use client";
import React from "react";
import styles from "./copilot_ai.module.scss";
import { Button } from "antd";
import { FaCheck, FaCopy } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { IoCaretDown } from "react-icons/io5";
import { ArrowRight } from "lucide-react";
import { BiLike, BiDislike } from "react-icons/bi";
type Props = {};

const CopilotAI = (props: Props) => {
  const [showContent, setShowContent] = React.useState(true);
  return (
    <div className={styles.copilotAI}>
      <div className={styles.contentAI}>
        <div className={styles.title}>
          <b>CopilotAI</b>{" "}
          <span style={{ color: "#6c6e79" }}>
            — your personal recommendations
          </span>
          <div className={styles.button}>
            <Button icon={<FaCopy />} size="small">
              Copy All
            </Button>
            <Button icon={<IoShareSocial />} size="small">
              Share Copilot
            </Button>
            <Button
              onClick={() => setShowContent(!showContent)}
              icon={<IoCaretDown />}
              size="small"
            ></Button>
          </div>
        </div>
        <div
          className={`${styles.description} ${showContent ? "" : styles.hide}`}
        >
          <div className={styles.content}>
            <div className={styles.contentLeft}>
              <div className={styles.title}>Competitor Rankings</div>
              <div className={styles.domain}>vanhungtran.com</div>
            </div>
            <div className={styles.contentCenter}>
              <p>
                We have detected a potential new competitor for your chosen set
                of keywords. figma.com has increased their Visibility by 16.76%
                in Vietnam. Add this domain as a competitor to take a closer
                look.
              </p>
            </div>
            <div className={styles.contentRight}>
              <Button>
                <FaCheck /> Position Tracking <ArrowRight />
              </Button>
            </div>
            <div className={styles.contentBtn}>
              <Button icon={<BiLike />} size="small" />
              <Button icon={<BiDislike />} size="small" />
              <Button icon={<FaCopy />} size="small" />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentLeft}>
              <div className={styles.title}>Technical Audit</div>
              <div className={styles.domain}>vanhungtran.com</div>
            </div>
            <div className={styles.contentCenter}>
              <p>
                Ready to dive deeper into your website's technical performance?
                Set up your first project now and uncover insights such as your
                Site Health and the presence of over 140 potential technical
                issues. Let's get started! 🚀
              </p>
            </div>
            <div className={styles.contentRight}>
              <Button>
                Site Audit <ArrowRight />
              </Button>
            </div>
            <div className={styles.contentBtn}>
              <Button icon={<BiLike />} size="small" />
              <Button icon={<BiDislike />} size="small" />
              <Button icon={<FaCopy />} size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotAI;
