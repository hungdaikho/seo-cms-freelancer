"use client";

import Link from "next/link";
import { socialNavigationConfig } from "@/utils/social-navigation";

interface SocialNavLinkProps {
  section: keyof typeof socialNavigationConfig;
  children: React.ReactNode;
  className?: string;
}

export default function SocialNavLink({
  section,
  children,
  className,
}: SocialNavLinkProps) {
  const url = socialNavigationConfig[section];

  return (
    <Link href={url} className={className}>
      {children}
    </Link>
  );
}

// Example usage component
export function SocialNavigationMenu() {
  return (
    <nav className="social-nav">
      <SocialNavLink section="social-dashboard">Social Dashboard</SocialNavLink>
      <SocialNavLink section="social-media-tracker">
        Media Tracker
      </SocialNavLink>
      <SocialNavLink section="social-media-poster">Media Poster</SocialNavLink>
      <SocialNavLink section="social-analytics">Analytics</SocialNavLink>
    </nav>
  );
}
