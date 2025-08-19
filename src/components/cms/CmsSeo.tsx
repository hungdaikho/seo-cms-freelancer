import React from "react";
import Head from "next/head";
import { CmsPage } from "@/types/cms.type";

interface CmsSeoProps {
  page: CmsPage;
  siteName?: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

const CmsSeo: React.FC<CmsSeoProps> = ({
  page,
  siteName = "RankTracker Pro",
  defaultTitle = "RankTracker Pro - SEO Management Platform",
  defaultDescription = "Professional SEO tools for tracking rankings, analyzing competitors, and optimizing your website.",
}) => {
  const title = page.metaTitle || page.title || defaultTitle;
  const description =
    page.metaDescription || page.excerpt || defaultDescription;
  const keywords = page.metaKeywords || "";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteName} />

      {/* Canonical URL */}
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_SITE_URL || ""}/${page.slug}`}
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description: description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${page.slug}`,
            publisher: {
              "@type": "Organization",
              name: siteName,
            },
            datePublished: page.publishedAt,
            dateModified: page.updatedAt,
          }),
        }}
      />
    </Head>
  );
};

export default CmsSeo;
