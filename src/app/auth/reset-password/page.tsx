"use client";

import React, { Suspense } from "react";
import ResetPasswordHandler from "@/components/auth/ResetPasswordHandler";

const ResetPasswordPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordHandler />
    </Suspense>
  );
};

export default ResetPasswordPage;
