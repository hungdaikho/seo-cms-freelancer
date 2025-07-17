"use client";

import { Suspense } from "react";
import ContentPageContent from "./components/content-page-content";

export default function ContentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentPageContent />
    </Suspense>
  );
}
