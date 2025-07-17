import React from "react";
import { Layout as AntLayout } from "antd";
import styles from "./layout.module.scss";

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <h1>Local Management</h1>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>© 2023 Your Company</Footer>
    </AntLayout>
  );
};

export default Layout;
