import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import { checkAuthToken } from "@/stores/slices/auth.slice";
import { Spin } from "antd";
import { useAuth } from "@/hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true = require login, false = guest only
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = false,
  redirectTo,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isSuperAdmin, isLoading }: any = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !isAuthenticated && !user) {
      // Have token but not authenticated, check if token is valid
      dispatch(checkAuthToken());
    } else if (!token && requireAuth) {
      // No token and require auth, redirect to home
      router.push(redirectTo || "/");
    } else if (token && isAuthenticated && isSuperAdmin) {
      // Have valid token and is super admin, redirect to admin dashboard
      router.push("/dashboard");
    } else if (token && isAuthenticated && !requireAuth) {
      // Have valid token but on guest page, redirect to projects
      router.push(redirectTo || "/projects");
    }
  }, [
    dispatch,
    isAuthenticated,
    user,
    requireAuth,
    router,
    redirectTo,
    isSuperAdmin,
  ]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Spin size="large" />
        <p style={{ color: "#666", fontSize: "14px" }}>
          Checking authentication...
        </p>
      </div>
    );
  }

  // For pages that require authentication
  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // For guest-only pages (like homepage with login)
  if (!requireAuth && isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default AuthGuard;
