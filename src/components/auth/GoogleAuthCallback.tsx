import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/store";
import { googleAuthSuccess } from "@/stores/slices/auth.slice";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const GoogleAuthCallback: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error) {
        message.error("Google authentication failed. Please try again.");
        router.push("/");
        return;
      }

      if (token) {
        try {
          await dispatch(googleAuthSuccess(token)).unwrap();
          message.success("Successfully logged in with Google!");
          router.push("/dashboard");
        } catch (error: any) {
          message.error(error || "Authentication failed");
          router.push("/");
        }
      } else {
        message.error("No authentication token received");
        router.push("/");
      }
    };

    handleGoogleAuth();
  }, [searchParams, router, dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 48, color: "#1890ff" }} spin />
        }
        size="large"
      />
      <h2 style={{ marginTop: 24, color: "#666" }}>
        Completing Google Authentication...
      </h2>
      <p style={{ color: "#999", marginTop: 8 }}>
        Please wait while we verify your credentials.
      </p>
    </div>
  );
};

export default GoogleAuthCallback;
