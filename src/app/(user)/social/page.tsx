"use client";

import { Suspense } from "react";
import SocialPageContent from "./components/social-page-content";

export default function SocialPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SocialPageContent />
    </Suspense>
  );
}
