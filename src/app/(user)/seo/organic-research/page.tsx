"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import OrganicResearchDashboard from "../features/organic-research-dashboard";

const OrganicResearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  return (
    <div style={{ padding: "24px" }}>
      <OrganicResearchDashboard selectedProjectId={projectId || undefined} />
    </div>
  );
};

export default OrganicResearchPage;
