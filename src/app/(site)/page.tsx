"use client";

import { Suspense } from "react";
import Enterprise from "@/components/layout/enterprise/enterprise";
import HeroSite from "@/components/layout/hero/hero.site";
import Quote from "@/components/layout/quote/quote";
import GoogleAuthHandler from "@/components/auth/GoogleAuthHandler";

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <GoogleAuthHandler />
      </Suspense>
      <HeroSite />
      <Enterprise />
      <Quote />
    </>
  );
}
