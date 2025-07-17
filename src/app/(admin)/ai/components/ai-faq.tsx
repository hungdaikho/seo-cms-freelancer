"use client";

import { useState } from "react";
import styles from "../page.module.scss";

export default function AiFaq() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      question: "What is the Semrush AI Toolkit?",
      answer:
        "The Semrush AI Toolkit is a comprehensive solution that analyzes how large language models (LLMs) like ChatGPT mention and present your brand, providing actionable insights to improve your market position and business strategy.",
    },
    {
      question: "How does it work?",
      answer:
        "Our toolkit analyzes millions of AI conversations across various platforms to understand how your brand is mentioned, compared to competitors, and perceived by AI systems. We then provide detailed reports and recommendations based on this data.",
    },
    {
      question: "Which LLMs does the Semrush AI Toolkit analyze?",
      answer:
        "We analyze major language models including ChatGPT, Claude, Bard, and other leading AI platforms to give you comprehensive coverage of how your brand appears in AI-generated content.",
    },
    {
      question: "How can I access the Semrush AI Toolkit?",
      answer:
        "You can access the AI Toolkit through your Semrush dashboard. Simply enter your domain to get started with the analysis and begin receiving insights about your AI brand presence.",
    },
    {
      question: "How much does it cost?",
      answer:
        "The AI Toolkit is available as part of select Semrush plans. Contact our sales team for detailed pricing information and to find the plan that best fits your needs.",
    },
    {
      question: "How can I unsubscribe?",
      answer:
        "You can manage your subscription through your Semrush account settings. If you need assistance, our customer support team is available to help you with the process.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, we offer a free trial so you can experience the full capabilities of the AI Toolkit before committing to a subscription. Sign up to get started today.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <h2>Frequently asked questions</h2>

        <div className={styles.faqList}>
          {faqItems.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${
                  openItem === index ? styles.open : ""
                }`}
                onClick={() => toggleItem(index)}
              >
                <span>{item.question}</span>
                <span className={styles.icon}>▼</span>
              </button>
              <div
                className={`${styles.faqAnswer} ${
                  openItem === index ? styles.open : ""
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
