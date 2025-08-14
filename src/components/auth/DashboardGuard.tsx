"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { checkAuthToken } from "@/stores/slices/auth.slice";

interface DashboardGuardProps {
  children: React.ReactNode;
}

const DashboardGuard: React.FC<DashboardGuardProps> = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated, canAccessDashboard } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAccess = () => {
      // Wait for auth state to be loaded
      const token = localStorage.getItem("accessToken");
      if (token && !isAuthenticated && !user) {
        // Have token but not authenticated, check if token is valid
        dispatch(checkAuthToken() as any);
      } else if (isAuthenticated === undefined) {
        return;
      } else if (!isAuthenticated) {
        router.push("/");
        return;
      } else if (!canAccessDashboard()) {
        router.push("/dashboard");
        return;
      }

      setIsChecking(false);
    };

    checkAccess();
  }, [isAuthenticated, user, canAccessDashboard, router]);

  // Show loading spinner while checking permissions
  if (isChecking || !isAuthenticated || !canAccessDashboard()) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default DashboardGuard;
