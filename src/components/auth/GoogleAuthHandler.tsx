"use client";

import { useGoogleAuthRedirect } from "@/hooks/useGoogleAuthRedirect";

export default function GoogleAuthHandler() {
  useGoogleAuthRedirect();
  return null; // This component doesn't render anything
}
