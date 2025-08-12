"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface AdminRedirectProps {
  children: React.ReactNode;
}

const AdminRedirect: React.FC<AdminRedirectProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isSuperAdmin } = useAuth();

  useEffect(() => {
    // Auto redirect super_admin to dashboard when they access non-admin pages
    if (isAuthenticated && user && isSuperAdmin) {
      // Don't redirect if already on dashboard, auth pages, api routes, or test pages
      if (
        !pathname.startsWith("/dashboard") &&
        !pathname.startsWith("/auth") &&
        !pathname.startsWith("/api") &&
        !pathname.startsWith("/test")
      ) {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, user, isSuperAdmin, pathname, router]);

  // For super_admin, show loading while redirecting (except for dashboard pages)
  if (isAuthenticated && user && isSuperAdmin) {
    if (
      !pathname.startsWith("/dashboard") &&
      !pathname.startsWith("/auth") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/test")
    ) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "16px",
          }}
        >
          Redirecting to admin dashboard...
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default AdminRedirect;
