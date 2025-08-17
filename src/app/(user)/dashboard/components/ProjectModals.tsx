"use client";

import React, { memo } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Space,
  Button,
  Row,
  Col,
  Checkbox,
  Card,
  Statistic,
  Tag,
  Spin,
} from "antd";
import {
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import { getSortedCountries, popularCountries } from "@/utils/countries";
import { getSortedLanguages, popularLanguages } from "@/utils/languages";

interface ProjectModalsProps {
  // Create Modal
  isCreateModalVisible: boolean;
  createForm: any;
  createLoading: boolean;
  selectedCountry: string;
  onCreateProject: (values: any) => void;
  onCloseCreateModal: () => void;

  // View Modal  
  isViewModalVisible: boolean;
  selectedProject: any;
  viewLoading: boolean;
  onCloseViewModal: () => void;
  onEditFromView: () => void;

  // Edit Modal
  isEditModalVisible: boolean;
  editForm: any;
  updateLoading: boolean;
  onUpdateProject: (values: any) => void;
  onCloseEditModal: () => void;
}

const ProjectModals = memo(({
  isCreateModalVisible,
  createForm,
  createLoading,
  selectedCountry,
  onCreateProject,
  onCloseCreateModal,
  isViewModalVisible,
  selectedProject,
  viewLoading,
  onCloseViewModal,
  onEditFromView,
  isEditModalVisible,
  editForm,
  updateLoading,
  onUpdateProject,
  onCloseEditModal,
}: ProjectModalsProps) => {

  // Get status tag based on setup progress
  const getStatusTag = (project: any) => {
    if (!project) return null;
    
    const hasKeywords = project._count?.keywords > 0;
    const hasAudits = project._count?.audits > 0;
    const hasCompetitors = project._count?.competitors > 0;
    
    if (hasKeywords && hasAudits && hasCompetitors) {
      return <Tag color="green">Complete</Tag>;
    } else if (hasKeywords || hasAudits) {
      return <Tag color="orange">In Progress</Tag>;
    } else {
      return <Tag color="red">Setup Required</Tag>;
    }
  };

  return (
    <>
      {/* Create Project Modal */}
      <Modal
        title="Create New Project"
        open={isCreateModalVisible}
        onCancel={onCloseCreateModal}
        footer={null}
        width={600}
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={onCreateProject}
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          
          <Form.Item
            name="domain"
            label="Domain"
            rules={[
              { required: true, message: 'Please enter domain' },
              { 
                pattern: /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/,
                message: 'Please enter a valid domain'
              }
            ]}
          >
            <Input placeholder="example.com" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Country"
                initialValue={selectedCountry}
              >
                <Select
                  showSearch
                  placeholder="Select country"
                  filterOption={(input, option) => {
                    const label = option?.label;
                    if (typeof label === 'string') {
                      return label.toLowerCase().includes(input.toLowerCase());
                    }
                    return false;
                  }}
                >
                  <Select.OptGroup label="Popular Countries">
                    {popularCountries.map((country) => (
                      <Select.Option 
                        key={country.code} 
                        value={country.code}
                        label={`${country.flag} ${country.name}`}
                      >
                        <Space>
                          <span>{country.flag}</span>
                          {country.name}
                        </Space>
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                  <Select.OptGroup label="All Countries">
                    {getSortedCountries()
                      .filter(country => !popularCountries.find(p => p.code === country.code))
                      .map((country) => (
                        <Select.Option 
                          key={country.code} 
                          value={country.code}
                          label={`${country.flag} ${country.name}`}
                        >
                          <Space>
                            <span>{country.flag}</span>
                            {country.name}
                          </Space>
                        </Select.Option>
                      ))}
                  </Select.OptGroup>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="language"
                label="Language"
                initialValue="en"
              >
                <Select
                  showSearch
                  placeholder="Select language"
                  filterOption={(input, option) => {
                    const label = option?.label;
                    if (typeof label === 'string') {
                      return label.toLowerCase().includes(input.toLowerCase());
                    }
                    return false;
                  }}
                >
                  <Select.OptGroup label="Popular Languages">
                    {popularLanguages.map((language) => (
                      <Select.Option 
                        key={language.code} 
                        value={language.code}
                        label={`${language.name} (${language.nativeName})`}
                      >
                        {language.name} ({language.nativeName})
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                  <Select.OptGroup label="All Languages">
                    {getSortedLanguages()
                      .filter(language => !popularLanguages.find(p => p.code === language.code))
                      .map((language) => (
                        <Select.Option 
                          key={language.code} 
                          value={language.code}
                          label={`${language.name} (${language.nativeName})`}
                        >
                          {language.name} ({language.nativeName})
                        </Select.Option>
                      ))}
                  </Select.OptGroup>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={onCloseCreateModal}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={createLoading}>
                Create Project
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Project Modal */}
      <Modal
        title="Project Details"
        open={isViewModalVisible}
        onCancel={onCloseViewModal}
        footer={[
          <Button key="close" onClick={onCloseViewModal}>
            Close
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            onClick={onEditFromView}
            disabled={!selectedProject}
          >
            Edit Project
          </Button>
        ]}
        width={800}
      >
        <Spin spinning={viewLoading}>
          {selectedProject && (
            <div>
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="Basic Information" size="small" style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Project Name: </strong>
                      {selectedProject.name}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Domain: </strong>
                      <a href={`https://${selectedProject.domain}`} target="_blank" rel="noopener noreferrer">
                        {selectedProject.domain}
                      </a>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Created: </strong>
                      {new Date(selectedProject.createdAt).toLocaleDateString()}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Status: </strong>
                      {getStatusTag(selectedProject)}
                    </div>
                    <div>
                      <strong>Active: </strong>
                      <Tag color={selectedProject.isActive ? 'green' : 'red'}>
                        {selectedProject.isActive ? 'Yes' : 'No'}
                      </Tag>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Settings" size="small" style={{ marginBottom: 16 }}>
                    {(() => {
                      const countryInfo = getSortedCountries().find(c => c.code === selectedProject.settings?.country);
                      const languageInfo = getSortedLanguages().find(l => l.code === selectedProject.settings?.language);
                      return (
                        <>
                          <div style={{ marginBottom: 8 }}>
                            <strong>Country: </strong>
                            {countryInfo ? (
                              <Space>
                                <span>{countryInfo.flag}</span>
                                {countryInfo.name}
                              </Space>
                            ) : (
                              'Not set'
                            )}
                          </div>
                          <div style={{ marginBottom: 8 }}>
                            <strong>Language: </strong>
                            {languageInfo ? 
                              `${languageInfo.name} (${languageInfo.nativeName})` : 
                              'Not set'
                            }
                          </div>
                          <div style={{ marginBottom: 8 }}>
                            <strong>Tracking: </strong>
                            <Tag color={selectedProject.settings?.trackingEnabled ? 'green' : 'red'}>
                              {selectedProject.settings?.trackingEnabled ? 'Enabled' : 'Disabled'}
                            </Tag>
                          </div>
                          <div>
                            <strong>Last Update: </strong>
                            {selectedProject.stats?.lastUpdate ? 
                              new Date(selectedProject.stats.lastUpdate).toLocaleString() : 
                              'Never'
                            }
                          </div>
                        </>
                      );
                    })()}
                  </Card>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={6}>
                  <Card size="small">
                    <Statistic 
                      title="Keywords" 
                      value={selectedProject._count?.keywords || 0} 
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic 
                      title="Competitors" 
                      value={selectedProject._count?.competitors || 0} 
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic 
                      title="Audits" 
                      value={selectedProject._count?.audits || 0} 
                      valueStyle={{ color: '#faad14' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic 
                      title="Backlinks" 
                      value={selectedProject._count?.backlinks || 0} 
                      valueStyle={{ color: '#722ed1' }}
                    />
                  </Card>
                </Col>
              </Row>

              {selectedProject.stats && (
                <Card title="Performance Statistics" size="small" style={{ marginTop: 16 }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Statistic 
                        title="Average Ranking" 
                        value={selectedProject.stats.averageRanking?.toFixed(1) || 'N/A'} 
                        valueStyle={{ color: '#1890ff' }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic 
                        title="Improved Keywords" 
                        value={selectedProject.stats.improvedKeywords || 0} 
                        valueStyle={{ color: '#52c41a' }}
                        prefix={<RiseOutlined />}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic 
                        title="Declined Keywords" 
                        value={selectedProject.stats.declinedKeywords || 0} 
                        valueStyle={{ color: '#f5222d' }}
                        prefix={<FallOutlined />}
                      />
                    </Col>
                  </Row>
                </Card>
              )}
            </div>
          )}
        </Spin>
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        title="Edit Project"
        open={isEditModalVisible}
        onCancel={onCloseEditModal}
        footer={null}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={onUpdateProject}
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          
          <Form.Item
            label="Domain"
          >
            <Input value={selectedProject?.domain} disabled />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Country"
              >
                <Select
                  showSearch
                  placeholder="Select country"
                  filterOption={(input, option) => {
                    const label = option?.label;
                    if (typeof label === 'string') {
                      return label.toLowerCase().includes(input.toLowerCase());
                    }
                    return false;
                  }}
                >
                  <Select.OptGroup label="Popular Countries">
                    {popularCountries.map((country) => (
                      <Select.Option 
                        key={country.code} 
                        value={country.code}
                        label={`${country.flag} ${country.name}`}
                      >
                        <Space>
                          <span>{country.flag}</span>
                          {country.name}
                        </Space>
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                  <Select.OptGroup label="All Countries">
                    {getSortedCountries()
                      .filter(country => !popularCountries.find(p => p.code === country.code))
                      .map((country) => (
                        <Select.Option 
                          key={country.code} 
                          value={country.code}
                          label={`${country.flag} ${country.name}`}
                        >
                          <Space>
                            <span>{country.flag}</span>
                            {country.name}
                          </Space>
                        </Select.Option>
                      ))}
                  </Select.OptGroup>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="language"
                label="Language"
              >
                <Select
                  showSearch
                  placeholder="Select language"
                  filterOption={(input, option) => {
                    const label = option?.label;
                    if (typeof label === 'string') {
                      return label.toLowerCase().includes(input.toLowerCase());
                    }
                    return false;
                  }}
                >
                  <Select.OptGroup label="Popular Languages">
                    {popularLanguages.map((language) => (
                      <Select.Option 
                        key={language.code} 
                        value={language.code}
                        label={`${language.name} (${language.nativeName})`}
                      >
                        {language.name} ({language.nativeName})
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                  <Select.OptGroup label="All Languages">
                    {getSortedLanguages()
                      .filter(language => !popularLanguages.find(p => p.code === language.code))
                      .map((language) => (
                        <Select.Option 
                          key={language.code} 
                          value={language.code}
                          label={`${language.name} (${language.nativeName})`}
                        >
                          {language.name} ({language.nativeName})
                        </Select.Option>
                      ))}
                  </Select.OptGroup>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="trackingEnabled"
            valuePropName="checked"
          >
            <Checkbox>Enable position tracking</Checkbox>
          </Form.Item>
          
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={onCloseEditModal}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={updateLoading}>
                Update Project
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

ProjectModals.displayName = 'ProjectModals';

export default ProjectModals;
