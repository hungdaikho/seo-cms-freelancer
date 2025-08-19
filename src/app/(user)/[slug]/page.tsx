"use client";
import React from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import CmsPageRenderer from "@/components/cms/CmsPageRenderer";

const DynamicCmsPage: NextPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <CmsPageRenderer slug={slug} />
    </div>
  );
};

export default DynamicCmsPage;
