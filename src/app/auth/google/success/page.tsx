"use client";

import React, { Suspense } from "react";
import SimpleGoogleAuthCallback from "@/components/auth/SimpleGoogleAuthCallback";
import { Spin } from "antd";

const GoogleAuthSuccessPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      }
    >
      <SimpleGoogleAuthCallback />
    </Suspense>
  );
};

export default GoogleAuthSuccessPage;
