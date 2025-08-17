"use client";
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateProjectModal from './CreateProjectModal';

const CreateProjectModalDemo: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleProjectCreated = () => {
    console.log('Project created successfully!');
    // You can add additional logic here like:
    // - Refreshing the projects list
    // - Navigating to the new project
    // - Showing a success notification
  };

  return (
    <div style={{ padding: '20px' }}>
      <Space direction="vertical" size="middle">
        <h2>Create Project Modal Demo</h2>
        <p>Click the button below to open the Create Project Modal:</p>
        
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleShowModal}
          size="large"
        >
          Create New Project
        </Button>
      </Space>

      <CreateProjectModal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onSuccess={handleProjectCreated}
      />
    </div>
  );
};

export default CreateProjectModalDemo;
