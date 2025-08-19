"use client";

import React, { Suspense } from "react";
import VerifyEmailHandler from "@/components/auth/VerifyEmailHandler";

const VerifyEmailPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailHandler />
    </Suspense>
  );
};

export default VerifyEmailPage;
