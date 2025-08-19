"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  message,
  Card,
  Tabs,
  Badge,
  Row,
  Col,
  Statistic,
  Tag,
  Typography,
  Tooltip,
  Drawer,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
  MailOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useCms } from "@/hooks/useCms";
import {
  CmsPage,
  CmsPageType,
  CmsPageStatus,
  ContactSubmissionResponse,
} from "@/types/cms.type";
import styles from "./cms-admin.module.scss";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

interface PageFormData {
  title: string;
  slug: string;
  pageType: CmsPageType;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  status: CmsPageStatus;
  sortOrder: number;
}

const CmsAdminPage: React.FC = () => {
  const {
    pages,
    contacts,
    statistics,
    loading,
    error,
    fetchPages,
    createPage,
    updatePage,
    deletePage,
    fetchContacts,
    markContactAsRead,
    markContactAsReplied,
    deleteContact,
    fetchStatistics,
  } = useCms();

  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const [selectedContact, setSelectedContact] =
    useState<ContactSubmissionResponse | null>(null);
  const [pageForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState("pages");

  // Load data on component mount
  useEffect(() => {
    fetchPages();
    fetchContacts();
    fetchStatistics();
  }, []);

  // Page management functions
  const handleCreatePage = () => {
    setEditingPage(null);
    pageForm.resetFields();
    setIsPageModalOpen(true);
  };

  const handleEditPage = (page: CmsPage) => {
    setEditingPage(page);
    pageForm.setFieldsValue({
      title: page.title,
      slug: page.slug,
      pageType: page.pageType,
      content: page.content,
      excerpt: page.excerpt || "",
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      metaKeywords: page.metaKeywords || "",
      status: page.status,
      sortOrder: page.sortOrder,
    });
    setIsPageModalOpen(true);
  };

  const handleDeletePage = async (pageId: string) => {
    try {
      await deletePage(pageId);
      message.success("Page deleted successfully");
    } catch (error) {
      message.error("Failed to delete page");
    }
  };

  const handlePageSubmit = async (values: PageFormData) => {
    try {
      if (editingPage) {
        await updatePage(editingPage.id, values);
        message.success("Page updated successfully");
      } else {
        await createPage(values);
        message.success("Page created successfully");
      }
      setIsPageModalOpen(false);
      pageForm.resetFields();
    } catch (error) {
      message.error("Failed to save page");
    }
  };

  // Contact management functions
  const handleViewContact = (contact: ContactSubmissionResponse) => {
    setSelectedContact(contact);
    setIsContactDrawerOpen(true);
    if (!contact.isRead) {
      markContactAsRead(contact.id);
    }
  };

  const handleMarkContactReplied = async (
    contactId: string,
    notes?: string
  ) => {
    try {
      await markContactAsReplied(contactId, notes);
      message.success("Contact marked as replied");
    } catch (error) {
      message.error("Failed to mark contact as replied");
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      await deleteContact(contactId);
      message.success("Contact deleted successfully");
    } catch (error) {
      message.error("Failed to delete contact");
    }
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Page columns for table
  const pageColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: CmsPage) => (
        <div>
          <div className={styles.pageTitle}>{text}</div>
          <div className={styles.pageSlug}>/{record.slug}</div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "pageType",
      key: "pageType",
      render: (type: CmsPageType) => (
        <Tag color="blue">{type.replace("_", " ").toUpperCase()}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: CmsPageStatus) => (
        <Tag
          color={
            status === "published"
              ? "green"
              : status === "draft"
              ? "orange"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: CmsPage) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditPage(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this page?"
            onConfirm={() => handleDeletePage(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                disabled={record.isSystem}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Contact columns for table
  const contactColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: ContactSubmissionResponse) => (
        <div>
          <div className={styles.contactName}>
            {text}
            {!record.isRead && <Badge status="processing" />}
          </div>
          <div className={styles.contactEmail}>{record.email}</div>
        </div>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text: string) => text || "No subject",
    },
    {
      title: "Type",
      dataIndex: "contactType",
      key: "contactType",
      render: (type: string) => <Tag color="cyan">{type.toUpperCase()}</Tag>,
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: ContactSubmissionResponse) => (
        <Space>
          {record.isRead ? (
            <Tag color="green">Read</Tag>
          ) : (
            <Tag color="orange">Unread</Tag>
          )}
          {record.isReplied && <Tag color="blue">Replied</Tag>}
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ContactSubmissionResponse) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewContact(record)}
          >
            View
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => handleDeleteContact(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.cmsAdmin}>
      <div className={styles.header}>
        <Title level={2}>CMS Administration</Title>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => {
            fetchPages();
            fetchContacts();
            fetchStatistics();
          }}
          loading={loading.pages || loading.contacts || loading.statistics}
        >
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <Row gutter={16} className={styles.statsRow}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Pages"
                value={statistics.pages.total}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Published Pages"
                value={statistics.pages.published}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Contacts"
                value={statistics.contacts.total}
                prefix={<MailOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Unread Contacts"
                value={statistics.contacts.unread}
                prefix={<MailOutlined />}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className={styles.mainTabs}
      >
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              Pages ({pages.length})
            </span>
          }
          key="pages"
        >
          <Card
            title="CMS Pages"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreatePage}
              >
                Create Page
              </Button>
            }
          >
            <Table
              columns={pageColumns}
              dataSource={pages}
              rowKey="id"
              loading={loading.pages}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} pages`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <MailOutlined />
              Contacts (
              {contacts.filter((c) => !c.isRead).length > 0 && (
                <Badge count={contacts.filter((c) => !c.isRead).length} />
              )}
              {contacts.length})
            </span>
          }
          key="contacts"
        >
          <Card title="Contact Submissions">
            <Table
              columns={contactColumns}
              dataSource={contacts}
              rowKey="id"
              loading={loading.contacts}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} contacts`,
              }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Page Create/Edit Modal */}
      <Modal
        title={editingPage ? "Edit Page" : "Create Page"}
        open={isPageModalOpen}
        onCancel={() => setIsPageModalOpen(false)}
        footer={null}
        width={800}
        className={styles.pageModal}
      >
        <Form
          form={pageForm}
          layout="vertical"
          onFinish={handlePageSubmit}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter page title" }]}
              >
                <Input
                  placeholder="Enter page title"
                  onChange={(e) => {
                    const slug = generateSlug(e.target.value);
                    pageForm.setFieldsValue({ slug });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="slug"
                label="Slug"
                rules={[{ required: true, message: "Please enter page slug" }]}
              >
                <Input placeholder="page-slug" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pageType"
                label="Page Type"
                rules={[{ required: true, message: "Please select page type" }]}
              >
                <Select placeholder="Select page type">
                  <Option value="about_us">About Us</Option>
                  <Option value="legal_info">Legal Info</Option>
                  <Option value="privacy_policy">Privacy Policy</Option>
                  <Option value="cookie_settings">Cookie Settings</Option>
                  <Option value="security_info">Security Info</Option>
                  <Option value="contact_us">Contact Us</Option>
                  <Option value="terms_of_service">Terms of Service</Option>
                  <Option value="custom">Custom</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select status">
                  <Option value="draft">Draft</Option>
                  <Option value="published">Published</Option>
                  <Option value="archived">Archived</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="sortOrder" label="Sort Order" initialValue={0}>
                <Input type="number" placeholder="0" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="excerpt" label="Excerpt">
            <TextArea rows={2} placeholder="Brief description of the page" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter page content" }]}
          >
            <TextArea
              rows={8}
              placeholder="Enter page content (HTML allowed)"
            />
          </Form.Item>

          <Title level={4}>SEO Settings</Title>

          <Form.Item name="metaTitle" label="Meta Title">
            <Input placeholder="SEO title for search engines" />
          </Form.Item>

          <Form.Item name="metaDescription" label="Meta Description">
            <TextArea
              rows={2}
              placeholder="SEO description for search engines"
            />
          </Form.Item>

          <Form.Item name="metaKeywords" label="Meta Keywords">
            <Input placeholder="Comma-separated keywords" />
          </Form.Item>

          <div className={styles.modalFooter}>
            <Space>
              <Button onClick={() => setIsPageModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading.pages}>
                {editingPage ? "Update" : "Create"} Page
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Contact View Drawer */}
      <Drawer
        title="Contact Details"
        placement="right"
        onClose={() => setIsContactDrawerOpen(false)}
        open={isContactDrawerOpen}
        width={500}
      >
        {selectedContact && (
          <div className={styles.contactDetails}>
            <div className={styles.contactHeader}>
              <Title level={4}>{selectedContact.name}</Title>
              <Space>
                {!selectedContact.isRead && (
                  <Badge status="processing" text="Unread" />
                )}
                {selectedContact.isReplied && (
                  <Badge status="success" text="Replied" />
                )}
              </Space>
            </div>

            <div className={styles.contactInfo}>
              <p>
                <strong>Email:</strong> {selectedContact.email}
              </p>
              {selectedContact.phone && (
                <p>
                  <strong>Phone:</strong> {selectedContact.phone}
                </p>
              )}
              {selectedContact.company && (
                <p>
                  <strong>Company:</strong> {selectedContact.company}
                </p>
              )}
              {selectedContact.website && (
                <p>
                  <strong>Website:</strong> {selectedContact.website}
                </p>
              )}
              <p>
                <strong>Type:</strong> <Tag>{selectedContact.contactType}</Tag>
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedContact.createdAt).toLocaleString()}
              </p>
            </div>

            {selectedContact.subject && (
              <div className={styles.contactSubject}>
                <strong>Subject:</strong>
                <p>{selectedContact.subject}</p>
              </div>
            )}

            <div className={styles.contactMessage}>
              <strong>Message:</strong>
              <Paragraph>{selectedContact.message}</Paragraph>
            </div>

            {selectedContact.notes && (
              <div className={styles.contactNotes}>
                <strong>Notes:</strong>
                <Paragraph>{selectedContact.notes}</Paragraph>
              </div>
            )}

            <div className={styles.contactActions}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {!selectedContact.isReplied && (
                  <Button
                    type="primary"
                    block
                    onClick={() => handleMarkContactReplied(selectedContact.id)}
                  >
                    Mark as Replied
                  </Button>
                )}
                <Button
                  block
                  onClick={() => window.open(`mailto:${selectedContact.email}`)}
                >
                  Send Email
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default CmsAdminPage;
