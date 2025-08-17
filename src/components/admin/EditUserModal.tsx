import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Switch, Button, message } from "antd";
import { AdminUser, AdminUpdateUserData } from "@/types/admin.type";

const { Option } = Select;

interface EditUserModalProps {
  visible: boolean;
  user: AdminUser | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (userId: string, data: AdminUpdateUserData) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  user,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user && visible) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        phone: user.phone,
        timezone: user.timezone,
      });
    }
  }, [user, visible, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (user) {
        onSubmit(user.id, values);
        message.success("User updated successfully");
        onClose();
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Update User
        </Button>,
      ]}
      width={600}
    >
      <Form form={form} layout="vertical" name="editUserForm">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the user name!" }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select user role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
            <Option value="super_admin">Super Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item label="Timezone" name="timezone">
          <Select placeholder="Select timezone">
            <Option value="UTC">UTC</Option>
            <Option value="America/New_York">America/New_York</Option>
            <Option value="America/Los_Angeles">America/Los_Angeles</Option>
            <Option value="Europe/London">Europe/London</Option>
            <Option value="Asia/Tokyo">Asia/Tokyo</Option>
            <Option value="Asia/Shanghai">Asia/Shanghai</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="isActive" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
