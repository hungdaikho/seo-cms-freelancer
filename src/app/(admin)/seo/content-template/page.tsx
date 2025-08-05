"use client";

import React from "react";
import ContentTemplateManager from "./components/ContentTemplateManager";

interface ContentTemplatePageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const ContentTemplatePage: React.FC<ContentTemplatePageProps> = async ({
  params,
}) => {
  const { projectId } = await params;
  return <ContentTemplateManager projectId={projectId} />;
};

export default ContentTemplatePage;
