"use client";

import React from "react";
import GoogleOAuthTest from "@/components/debug/GoogleOAuthTest";
import TestRedirect from "@/components/debug/TestRedirect";
import CreateProjectModalDemo from "@/components/rank-tracking/CreateProjectModalDemo";
import { Divider } from "antd";

const TestPage: React.FC = () => {
  return (
    <div>
      <CreateProjectModalDemo />
      <Divider />
      <TestRedirect />
      <Divider />
      <GoogleOAuthTest />
    </div>
  );
};

export default TestPage;
