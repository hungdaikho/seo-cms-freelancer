import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message, Row, Col } from "antd";
import { useContactForm } from "@/hooks/useCms";
import { ContactType } from "@/types/cms.type";

const { TextArea } = Input;
const { Option } = Select;

interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, className }) => {
  const [form] = Form.useForm();
  const { submitForm, clearSuccess, loading, error, success } =
    useContactForm();

  useEffect(() => {
    if (success) {
      message.success(
        "Contact submitted successfully! We will respond to you as soon as possible."
      );
      form.resetFields();
      clearSuccess();
      onSuccess?.();
    }
  }, [success, form, clearSuccess, onSuccess]);

  useEffect(() => {
    if (error) {
      message.error(
        "An error occurred while submitting contact. Please try again!"
      );
    }
  }, [error]);

  const handleSubmit = async (values: any) => {
    await submitForm(values);
  };

  return (
    <div className={className}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        size="large"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name!" },
                {
                  max: 100,
                  message: "Full name must not exceed 100 characters!",
                },
              ]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email format!" },
                { max: 255, message: "Email must not exceed 255 characters!" },
              ]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  max: 20,
                  message: "Phone number must not exceed 20 characters!",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contactType"
              label="Contact Type"
              initialValue="general"
            >
              <Select placeholder="Select contact type">
                <Option value="general">General</Option>
                <Option value="support">Technical Support</Option>
                <Option value="sales">Sales Consultation</Option>
                <Option value="partnership">Business Partnership</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="company"
              label="Company"
              rules={[
                {
                  max: 100,
                  message: "Company name must not exceed 100 characters!",
                },
              ]}
            >
              <Input placeholder="Enter your company name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="website"
              label="Website"
              rules={[
                { type: "url", message: "Invalid website URL!" },
                {
                  max: 255,
                  message: "Website URL must not exceed 255 characters!",
                },
              ]}
            >
              <Input placeholder="https://example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="subject"
          label="Subject"
          rules={[
            { max: 200, message: "Subject must not exceed 200 characters!" },
          ]}
        >
          <Input placeholder="Enter the subject for your message" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[
            { required: true, message: "Please enter your message!" },
            { max: 2000, message: "Message must not exceed 2000 characters!" },
          ]}
        >
          <TextArea
            rows={6}
            placeholder="Enter your message content..."
            showCount
            maxLength={2000}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className="w-full"
          >
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
