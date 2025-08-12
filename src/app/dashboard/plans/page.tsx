"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CrownOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useAdmin } from "@/stores/hooks/useAdmin";
import AdminLayout from "@/components/layout/AdminLayout";
import type {
  SubscriptionPlan,
  CreatePlanData,
} from "@/services/admin.service";

const { TextArea } = Input;

const PlansManagement = () => {
  const {
    subscriptionPlans,
    plansLoading,
    selectedPlan,
    operationLoading,
    fetchSubscriptionPlans,
    fetchSubscriptionPlanById,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    clearSelectedPlan,
  } = useAdmin();

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Monthly Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
      sorter: true,
    },
    {
      title: "Yearly Price",
      dataIndex: "yearlyPrice",
      key: "yearlyPrice",
      render: (price: number) => `$${price}`,
      sorter: true,
    },
    {
      title: "Projects",
      dataIndex: ["features", "projects"],
      key: "projects",
      sorter: true,
    },
    {
      title: "Keywords",
      dataIndex: ["features", "keywords"],
      key: "keywords",
      sorter: true,
    },
    {
      title: "Support",
      dataIndex: ["features", "support"],
      key: "support",
      render: (support: string) => (
        <Tag color={support === "priority" ? "gold" : "blue"}>{support}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right" as const,
      width: 200,
      render: (_: any, record: SubscriptionPlan) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewPlan(record.id)}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditPlan(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this plan?"
            onConfirm={() => handleDeletePlan(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
              loading={operationLoading}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleViewPlan = (planId: string) => {
    fetchSubscriptionPlanById(planId);
    setViewModalVisible(true);
  };

  const handleEditPlan = (plan: SubscriptionPlan) => {
    editForm.setFieldsValue({
      name: plan.name,
      slug: plan.slug,
      description: plan.description,
      price: plan.price,
      yearlyPrice: plan.yearlyPrice,
      projects: plan.features.projects,
      keywords: plan.features.keywords,
      support: plan.features.support,
      keywords_tracking: plan.limits.keywords_tracking,
      api_requests_daily: plan.limits.api_requests_daily,
    });
    fetchSubscriptionPlanById(plan.id);
    setEditModalVisible(true);
  };

  const handleCreatePlan = async (values: any) => {
    const planData: CreatePlanData = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      price: values.price,
      yearlyPrice: values.yearlyPrice,
      features: {
        projects: values.projects,
        keywords: values.keywords,
        support: values.support,
      },
      limits: {
        projects: values.projects,
        keywords_tracking: values.keywords_tracking,
        api_requests_daily: values.api_requests_daily,
      },
    };

    try {
      await createSubscriptionPlan(planData);
      message.success("Plan created successfully!");
      setCreateModalVisible(false);
      createForm.resetFields();
      fetchSubscriptionPlans();
    } catch (error) {
      message.error("Failed to create plan");
    }
  };

  const handleUpdatePlan = async (values: any) => {
    if (!selectedPlan) return;

    const planData = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      price: values.price,
      yearlyPrice: values.yearlyPrice,
      features: {
        projects: values.projects,
        keywords: values.keywords,
        support: values.support,
      },
      limits: {
        projects: values.projects,
        keywords_tracking: values.keywords_tracking,
        api_requests_daily: values.api_requests_daily,
      },
    };

    try {
      await updateSubscriptionPlan(selectedPlan.id, planData);
      message.success("Plan updated successfully!");
      setEditModalVisible(false);
      editForm.resetFields();
      clearSelectedPlan();
      fetchSubscriptionPlans();
    } catch (error) {
      message.error("Failed to update plan");
    }
  };

  const handleDeletePlan = async (planId: string) => {
    try {
      await deleteSubscriptionPlan(planId);
      message.success("Plan deleted successfully!");
      fetchSubscriptionPlans();
    } catch (error) {
      message.error("Failed to delete plan");
    }
  };

  const handleRefresh = () => {
    fetchSubscriptionPlans();
  };

  return (
    <AdminLayout>
      <div>
        {/* Summary Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Plans"
                value={subscriptionPlans.length}
                prefix={<CrownOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Active Plans"
                value={subscriptionPlans.filter((p) => p.isActive).length}
                prefix={<CrownOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Inactive Plans"
                value={subscriptionPlans.filter((p) => !p.isActive).length}
                prefix={<CrownOutlined />}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Plans Table */}
        <Card
          title="Subscription Plans Management"
          extra={
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={plansLoading}
              >
                Refresh
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCreateModalVisible(true)}
              >
                Create Plan
              </Button>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={subscriptionPlans}
            loading={plansLoading}
            rowKey="id"
            pagination={false}
            scroll={{ x: 1200 }}
          />
        </Card>

        {/* Create Plan Modal */}
        <Modal
          title="Create Subscription Plan"
          open={createModalVisible}
          onCancel={() => {
            setCreateModalVisible(false);
            createForm.resetFields();
          }}
          footer={null}
          width={800}
        >
          <Form form={createForm} layout="vertical" onFinish={handleCreatePlan}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Plan Name"
                  rules={[
                    { required: true, message: "Please input plan name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="slug"
                  label="Slug"
                  rules={[{ required: true, message: "Please input slug!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <TextArea rows={3} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Monthly Price ($)"
                  rules={[
                    { required: true, message: "Please input monthly price!" },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="yearlyPrice"
                  label="Yearly Price ($)"
                  rules={[
                    { required: true, message: "Please input yearly price!" },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="projects"
                  label="Projects Limit"
                  rules={[
                    { required: true, message: "Please input projects limit!" },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="keywords"
                  label="Keywords Limit"
                  rules={[
                    { required: true, message: "Please input keywords limit!" },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="support"
                  label="Support Level"
                  rules={[
                    { required: true, message: "Please select support level!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="keywords_tracking"
                  label="Keywords Tracking Limit"
                  rules={[
                    {
                      required: true,
                      message: "Please input keywords tracking limit!",
                    },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="api_requests_daily"
                  label="Daily API Requests Limit"
                  rules={[
                    {
                      required: true,
                      message: "Please input API requests limit!",
                    },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={operationLoading}
                >
                  Create Plan
                </Button>
                <Button
                  onClick={() => {
                    setCreateModalVisible(false);
                    createForm.resetFields();
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Plan Modal */}
        <Modal
          title="Edit Subscription Plan"
          open={editModalVisible}
          onCancel={() => {
            setEditModalVisible(false);
            editForm.resetFields();
            clearSelectedPlan();
          }}
          footer={null}
          width={800}
        >
          <Form form={editForm} layout="vertical" onFinish={handleUpdatePlan}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Plan Name"
                  rules={[
                    { required: true, message: "Please input plan name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="slug"
                  label="Slug"
                  rules={[{ required: true, message: "Please input slug!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <TextArea rows={3} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Monthly Price ($)"
                  rules={[
                    { required: true, message: "Please input monthly price!" },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="yearlyPrice"
                  label="Yearly Price ($)"
                  rules={[
                    { required: true, message: "Please input yearly price!" },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="projects"
                  label="Projects Limit"
                  rules={[
                    { required: true, message: "Please input projects limit!" },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="keywords"
                  label="Keywords Limit"
                  rules={[
                    { required: true, message: "Please input keywords limit!" },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="support"
                  label="Support Level"
                  rules={[
                    { required: true, message: "Please select support level!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="keywords_tracking"
                  label="Keywords Tracking Limit"
                  rules={[
                    {
                      required: true,
                      message: "Please input keywords tracking limit!",
                    },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="api_requests_daily"
                  label="Daily API Requests Limit"
                  rules={[
                    {
                      required: true,
                      message: "Please input API requests limit!",
                    },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={operationLoading}
                >
                  Update Plan
                </Button>
                <Button
                  onClick={() => {
                    setEditModalVisible(false);
                    editForm.resetFields();
                    clearSelectedPlan();
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* View Plan Modal */}
        <Modal
          title="Plan Details"
          open={viewModalVisible}
          onCancel={() => {
            setViewModalVisible(false);
            clearSelectedPlan();
          }}
          footer={[
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              Close
            </Button>,
          ]}
          width={700}
        >
          {selectedPlan && (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <strong>Name:</strong> {selectedPlan.name}
                </Col>
                <Col span={12}>
                  <strong>Slug:</strong> {selectedPlan.slug}
                </Col>
                <Col span={24}>
                  <strong>Description:</strong> {selectedPlan.description}
                </Col>
                <Col span={12}>
                  <strong>Monthly Price:</strong> ${selectedPlan.price}
                </Col>
                <Col span={12}>
                  <strong>Yearly Price:</strong> ${selectedPlan.yearlyPrice}
                </Col>
                <Col span={8}>
                  <strong>Projects:</strong> {selectedPlan.features.projects}
                </Col>
                <Col span={8}>
                  <strong>Keywords:</strong> {selectedPlan.features.keywords}
                </Col>
                <Col span={8}>
                  <strong>Support:</strong> {selectedPlan.features.support}
                </Col>
                <Col span={12}>
                  <strong>Keywords Tracking:</strong>{" "}
                  {selectedPlan.limits.keywords_tracking}
                </Col>
                <Col span={12}>
                  <strong>Daily API Requests:</strong>{" "}
                  {selectedPlan.limits.api_requests_daily}
                </Col>
                <Col span={12}>
                  <strong>Status:</strong>
                  <Tag color={selectedPlan.isActive ? "green" : "red"}>
                    {selectedPlan.isActive ? "Active" : "Inactive"}
                  </Tag>
                </Col>
                <Col span={12}>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedPlan.createdAt).toLocaleString()}
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default PlansManagement;
