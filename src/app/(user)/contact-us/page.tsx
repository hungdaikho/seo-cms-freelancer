"use client";
import React from "react";
import { NextPage } from "next";
import { Row, Col, Card } from "antd";
import CmsPageRenderer from "@/components/cms/CmsPageRenderer";
import ContactForm from "@/components/cms/ContactForm";

const ContactUsPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Row gutter={[24, 24]}>
        {/* CMS Content */}
        <Col span={24} lg={14}>
          <CmsPageRenderer slug="contact-us" />
        </Col>

        {/* Contact Form */}
        <Col span={24} lg={10}>
          <Card title="Send Message" className="h-fit">
            <ContactForm
              onSuccess={() => {
                // Additional logic can be added after successful submission
                console.log("Contact form submitted successfully");
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUsPage;
