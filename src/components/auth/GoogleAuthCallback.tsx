import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/store";
import { googleAuthSuccess } from "@/stores/slices/auth.slice";
import { message, Spin, Result, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const GoogleAuthCallback: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
          setError("Google authentication failed. Please try again.");
          setIsProcessing(false);
          return;
        }

        if (token) {
          try {
            await dispatch(googleAuthSuccess(token)).unwrap();
            message.success("Successfully logged in with Google!");

            // Redirect with a small delay to ensure state is updated
            setTimeout(() => {
              // Try to redirect to dashboard, fallback to home if not available
              try {
                router.push("/projects");
              } catch (routerError) {
                window.location.href = "/";
              }
            }, 1000);
          } catch (error: any) {
            setError(error || "Authentication failed");
            setIsProcessing(false);
          }
        } else {
          setError("No authentication token received");
          setIsProcessing(false);
        }
      } catch (err: any) {
        setError("An unexpected error occurred");
        setIsProcessing(false);
      }
    };

    handleGoogleAuth();
  }, [searchParams, router, dispatch]);

  const handleRetry = () => {
    router.push("/");
  };

  if (!isProcessing && error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Result
          status="error"
          title="Authentication Failed"
          subTitle={error}
          extra={[
            <Button type="primary" key="retry" onClick={handleRetry}>
              Go to Home Page
            </Button>,
          ]}
        />
      </div>
    );
  }

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
