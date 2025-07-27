"use client";
import "../../config/i18n";
import ReduxProvider from "@/provider/redux_provider";
import AuthGuard from "@/components/layout/auth_guard";
import "../globals.css";
import { useTranslation } from "react-i18next";
import HeaderSite from "@/components/layout/header/header.site";
import FooterSite from "@/components/layout/footer/footer.site";
import { useEffect } from "react";
import suppressAntdReact19Warning from "@/utils/suppress-warnings";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = useTranslation();

  // Suppress Ant Design React 19 compatibility warnings
  useEffect(() => {
    suppressAntdReact19Warning();
  }, []);

  return (
    <html lang={i18n.language}>
      <body
        style={{ fontSize: "16px", fontFamily: "inherit", background: "#000" }}
      >
        <ReduxProvider>
          <AuthGuard requireAuth={false} redirectTo="/projects">
            <HeaderSite />
            {children}
            <FooterSite />
          </AuthGuard>
        </ReduxProvider>
      </body>
    </html>
  );
}
