"use client";

import React from "react";
import KeywordMagicTool from "./features/keyword_magic_tool";
import styles from "./page.module.scss";

const KeywordMagicToolPage = () => {
  return (
    <div className={styles.keywordMagicToolPage}>
      <KeywordMagicTool />
    </div>
  );
};

export default KeywordMagicToolPage;
