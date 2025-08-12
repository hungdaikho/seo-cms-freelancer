"use client";

import Enterprise from "@/components/layout/enterprise/enterprise";
import HeroSite from "@/components/layout/hero/hero.site";
import Quote from "@/components/layout/quote/quote";
import { useGoogleAuthRedirect } from "@/hooks/useGoogleAuthRedirect";

export default function Page() {
  // Xử lý Google OAuth redirect
  useGoogleAuthRedirect();

  return (
    <>
      <HeroSite />
      <Enterprise />
      <Quote />
    </>
  );
}
