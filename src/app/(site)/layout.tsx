"use client";
import '../../config/i18n';
import ReduxProvider from "@/provider/redux_provider";
import "../globals.css";
import { useTranslation } from 'react-i18next';
import HeaderSite from '@/components/layout/header/header.site';
import FooterSite from '@/components/layout/footer/footer.site';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = useTranslation();
  return (
    <html lang={i18n.language}>
      <body>
        <ReduxProvider>
          <HeaderSite />
          {children}
          <FooterSite />
        </ReduxProvider>
      </body>
    </html>
  );
}
