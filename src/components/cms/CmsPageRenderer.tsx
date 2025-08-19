"use client";
import React from "react";
import { Spin, Alert, Typography, Divider } from "antd";
import { useCmsPage } from "@/hooks/useCms";
import { CmsPage, CmsPageSection } from "@/types/cms.type";
import CmsSeo from "./CmsSeo";

const { Title, Paragraph } = Typography;

interface CmsPageRendererProps {
  slug: string;
  className?: string;
}

interface SectionRendererProps {
  section: CmsPageSection;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  if (!section.isActive) return null;

  const renderSectionContent = () => {
    switch (section.sectionType) {
      case "text":
        return (
          <div
            dangerouslySetInnerHTML={{ __html: section.content }}
            className="prose max-w-none"
          />
        );

      case "image":
        const imageSettings = section.settings;
        return (
          <div className="text-center">
            <img
              src={imageSettings.src || section.content}
              alt={section.title}
              className={`max-w-full h-auto ${imageSettings.className || ""}`}
              style={imageSettings.style}
            />
            {section.title && (
              <p className="text-gray-600 mt-2 text-sm">{section.title}</p>
            )}
          </div>
        );

      case "video":
        const videoSettings = section.settings;
        return (
          <div className="text-center">
            <video
              controls
              className={`max-w-full h-auto ${videoSettings.className || ""}`}
              style={videoSettings.style}
            >
              <source
                src={videoSettings.src || section.content}
                type="video/mp4"
              />
              Your browser does not support video.
            </video>
            {section.title && (
              <p className="text-gray-600 mt-2 text-sm">{section.title}</p>
            )}
          </div>
        );

      case "faq":
        try {
          const faqData = JSON.parse(section.content);
          return (
            <div className="space-y-4">
              {faqData.map((item: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">
                    {item.question}
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                    className="text-gray-700"
                  />
                </div>
              ))}
            </div>
          );
        } catch {
          return <div className="text-red-500">FAQ format error</div>;
        }

      default:
        return (
          <div
            dangerouslySetInnerHTML={{ __html: section.content }}
            className="prose max-w-none"
          />
        );
    }
  };

  const sectionStyle = {
    backgroundColor: section.settings.backgroundColor,
    textAlign: section.settings.textAlign || "left",
    padding: section.settings.padding,
    margin: section.settings.margin,
    ...section.settings.style,
  };

  return (
    <section
      className={`mb-8 ${section.settings.className || ""}`}
      style={sectionStyle}
    >
      {section.title && (
        <Title level={3} className="mb-4">
          {section.title}
        </Title>
      )}
      {renderSectionContent()}
    </section>
  );
};

const CmsPageRenderer: React.FC<CmsPageRendererProps> = ({
  slug,
  className,
}) => {
  const { page, loading, error } = useCmsPage(slug);

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center py-20 ${className || ""}`}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Alert
          message="Error loading page"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!page) {
    return (
      <div className={className}>
        <Alert
          message="Page not found"
          description="The page you are looking for does not exist or has been deleted."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* SEO Meta tags */}
      <CmsSeo page={page} />

      {/* Page Header */}
      <div className="mb-8">
        <Title level={1} className="mb-4">
          {page.title}
        </Title>

        {page.excerpt && (
          <>
            <Paragraph className="text-lg text-gray-600 mb-6">
              {page.excerpt}
            </Paragraph>
            <Divider />
          </>
        )}
      </div>

      {/* Main Content */}
      {page.content && (
        <div className="mb-8">
          <div
            dangerouslySetInnerHTML={{ __html: page.content }}
            className="prose max-w-none"
          />
        </div>
      )}

      {/* Sections */}
      {page.sections && page.sections.length > 0 && (
        <div className="space-y-8">
          {page.sections
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((section) => (
              <SectionRenderer key={section.id} section={section} />
            ))}
        </div>
      )}

      {/* Last updated info */}
      {page.updatedAt && (
        <div className="mt-12 pt-6 border-t text-sm text-gray-500">
          Last updated: {new Date(page.updatedAt).toLocaleDateString("en-US")}
        </div>
      )}
    </div>
  );
};

export default CmsPageRenderer;
