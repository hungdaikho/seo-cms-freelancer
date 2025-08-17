import React from "react";
import {
  Modal,
  Button,
  Descriptions,
  Timeline,
  Tag,
  Card,
  Row,
  Col,
  Progress,
  Statistic,
  Badge,
  Avatar,
  Space,
  Divider,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  StopOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  DatabaseOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  CrownOutlined,
  ClockCircleOutlined,
  StarOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import { AdminUser } from "@/types/admin.type";
import styles from "../../app/(user)/manage-user/page.module.scss";

const { Title, Text } = Typography;

interface UserDetailModalProps {
  visible: boolean;
  user: AdminUser | null;
  loading: boolean;
  onClose: () => void;
  onEdit: (user: AdminUser) => void;
  onDelete: (userId: string) => void;
  onActivate: (userId: string) => void;
  onDeactivate: (userId: string) => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  visible,
  user,
  loading,
  onClose,
  onEdit,
  onDelete,
  onActivate,
  onDeactivate,
}) => {
  if (!user) return null;

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "expired":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const timelineData = [
    {
      color: "#52c41a",
      dot: <CheckCircleOutlined style={{ fontSize: "16px" }} />,
      children: (
        <div className={styles.timelineItem}>
          <div className={styles.timelineContent}>
            <Title level={5} className={styles.timelineTitle}>
              Upgraded to Professional Plan
            </Title>
            <Text className={styles.timelineDescription}>
              User upgraded from Basic to Professional plan with enhanced
              features
            </Text>
          </div>
          <div className={styles.timelineDate}>
            <ClockCircleOutlined />
            <span>2 days ago</span>
          </div>
        </div>
      ),
    },
    {
      color: "#1890ff",
      dot: <StarOutlined style={{ fontSize: "16px" }} />,
      children: (
        <div className={styles.timelineItem}>
          <div className={styles.timelineContent}>
            <Title level={5} className={styles.timelineTitle}>
              Account Verified
            </Title>
            <Text className={styles.timelineDescription}>
              Email verification completed successfully
            </Text>
          </div>
          <div className={styles.timelineDate}>
            <ClockCircleOutlined />
            <span>5 days ago</span>
          </div>
        </div>
      ),
    },
    {
      color: "#faad14",
      dot: <UserOutlined style={{ fontSize: "16px" }} />,
      children: (
        <div className={styles.timelineItem}>
          <div className={styles.timelineContent}>
            <Title level={5} className={styles.timelineTitle}>
              Account Created
            </Title>
            <Text className={styles.timelineDescription}>
              User registered and created account
            </Text>
          </div>
          <div className={styles.timelineDate}>
            <ClockCircleOutlined />
            <span>12 days ago</span>
          </div>
        </div>
      ),
    },
  ];

  const getSubscriptionStatus = () => {
    if (!user.subscription)
      return { status: "No subscription", color: "#d9d9d9" };

    const expiresAt = new Date(user.subscription.expiresAt || "");
    const now = new Date();
    const daysLeft = Math.ceil(
      (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
      return { status: "Expired", color: "#ff4d4f" };
    } else if (daysLeft <= 7) {
      return { status: "Expiring Soon", color: "#faad14" };
    } else {
      return { status: "Active", color: "#52c41a" };
    }
  };

  const subscriptionStatus = getSubscriptionStatus();

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      className={styles.userDetailModal}
      style={{ top: 20 }}
    >
      {/* Enhanced Header */}
      <div className={styles.modalHeader}>
        <div className={styles.userAvatarSection}>
          <Badge
            dot
            status={user.isActive ? "success" : "error"}
            offset={[-8, 8]}
          >
            <Avatar
              size={100}
              className={styles.userAvatarLarge}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              {getUserInitials(user.name)}
            </Avatar>
          </Badge>
        </div>

        <div className={styles.userMainInfo}>
          <div className={styles.userNameSection}>
            <Title level={2} className={styles.userNameLarge}>
              {user.name}
              {user.role === "admin" && (
                <CrownOutlined
                  style={{ color: "#faad14", marginLeft: "8px" }}
                />
              )}
            </Title>
            <Space size="middle">
              <Tag
                color={user.isActive ? "success" : "error"}
                className={styles.statusTagLarge}
              >
                {user.isActive ? "Active" : "Inactive"}
              </Tag>
              <Tag color="blue" className={styles.roleTag}>
                {user.role.toUpperCase()}
              </Tag>
            </Space>
          </div>

          <div className={styles.userContactInfo}>
            <Space direction="vertical" size="small">
              <div className={styles.contactItem}>
                <MailOutlined />
                <span>{user.email}</span>
              </div>
              <div className={styles.contactItem}>
                <PhoneOutlined />
                <span>(878) 537-63</span>
              </div>
            </Space>
          </div>
        </div>

        <div className={styles.userActionsEnhanced}>
          <Space direction="vertical" size="large">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="large"
              className={styles.actionButton}
              onClick={() => onEdit(user)}
            >
              Edit Profile
            </Button>

            {user.isActive ? (
              <Button
                icon={<StopOutlined />}
                size="large"
                className={styles.actionButton}
                onClick={() => onDeactivate(user.id)}
              >
                Deactivate
              </Button>
            ) : (
              <Button
                icon={<CheckCircleOutlined />}
                size="large"
                className={styles.actionButton}
                onClick={() => onActivate(user.id)}
              >
                Activate
              </Button>
            )}

            <Button
              danger
              icon={<DeleteOutlined />}
              size="large"
              className={styles.actionButton}
              onClick={() => onDelete(user.id)}
            >
              Delete User
            </Button>
          </Space>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <Row gutter={[20, 20]} className={styles.statsSection}>
        <Col span={6}>
          <Card className={styles.statCardEnhanced}>
            <Statistic
              title="Monthly Revenue"
              value={44400}
              precision={0}
              prefix={<DollarOutlined style={{ color: "#52c41a" }} />}
              suffix="USD"
              valueStyle={{
                color: "#52c41a",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
            <div className={styles.statTrendPositive}>
              <RiseOutlined /> +12.5%
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card className={styles.statCardEnhanced}>
            <Statistic
              title="Annual Profit"
              value={112300}
              precision={0}
              prefix={<TrophyOutlined style={{ color: "#1890ff" }} />}
              suffix="USD"
              valueStyle={{
                color: "#1890ff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
            <div className={styles.statTrendPositive}>
              <RiseOutlined /> +8.3%
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card className={styles.statCardEnhanced}>
            <Statistic
              title="Projects"
              value={23}
              prefix={<DatabaseOutlined style={{ color: "#faad14" }} />}
              valueStyle={{
                color: "#faad14",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
            <div className={styles.statTrendNeutral}>
              <span>Total count</span>
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card className={styles.statCardEnhanced}>
            <Statistic
              title="Team Members"
              value={5}
              prefix={<TeamOutlined style={{ color: "#722ed1" }} />}
              valueStyle={{
                color: "#722ed1",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            />
            <div className={styles.statTrendPositive}>
              <RiseOutlined /> +2 this month
            </div>
          </Card>
        </Col>
      </Row>

      {/* Enhanced User Details */}
      <Card className={styles.detailsCard} title="Personal Information">
        <Row gutter={[32, 16]}>
          <Col span={12}>
            <div className={styles.detailItem}>
              <Text strong className={styles.detailLabel}>
                Username
              </Text>
              <Text className={styles.detailValue}>
                @{user.email.split("@")[0]}
              </Text>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.detailItem}>
              <Text strong className={styles.detailLabel}>
                Country
              </Text>
              <Text className={styles.detailValue}>🇺🇸 United States</Text>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.detailItem}>
              <Text strong className={styles.detailLabel}>
                Registration Date
              </Text>
              <Text className={styles.detailValue}>December 12, 2021</Text>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.detailItem}>
              <Text strong className={styles.detailLabel}>
                Last Login
              </Text>
              <Text className={styles.detailValue}>2 hours ago</Text>
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.detailItem}>
              <Text strong className={styles.detailLabel}>
                Bio
              </Text>
              <Text className={styles.detailValue}>
                Experienced digital marketer and SEO specialist with over 5
                years of experience in helping businesses grow their online
                presence.
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Enhanced Current Plan */}
      <Card className={styles.planCard} title="Current Subscription">
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <div className={styles.planMainInfo}>
              <div className={styles.planHeader}>
                <Title level={3} className={styles.planName}>
                  {user.subscription?.plan?.name || "Basic Plan"}
                </Title>
                <Tag
                  color={subscriptionStatus.color}
                  className={styles.planStatus}
                >
                  {subscriptionStatus.status}
                </Tag>
              </div>

              <Row gutter={[16, 16]} className={styles.planFeatures}>
                <Col span={6}>
                  <div className={styles.planFeature}>
                    <CalendarOutlined />
                    <div>
                      <div className={styles.featureLabel}>Expires</div>
                      <div className={styles.featureValue}>Dec 12, 2024</div>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className={styles.planFeature}>
                    <TeamOutlined />
                    <div>
                      <div className={styles.featureLabel}>Users</div>
                      <div className={styles.featureValue}>5 Members</div>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className={styles.planFeature}>
                    <DatabaseOutlined />
                    <div>
                      <div className={styles.featureLabel}>Storage</div>
                      <div className={styles.featureValue}>10 GB</div>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className={styles.planFeature}>
                    <StarOutlined />
                    <div>
                      <div className={styles.featureLabel}>Support</div>
                      <div className={styles.featureValue}>Premium</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={8}>
            <div className={styles.planUpgrade}>
              <div className={styles.usageChart}>
                <Text strong>Storage Usage</Text>
                <Progress
                  type="circle"
                  percent={65}
                  format={(percent) => `${percent}%`}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                  size={80}
                />
              </div>
              <Button
                type="primary"
                size="large"
                className={styles.upgradeButton}
                block
              >
                Upgrade Plan
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Enhanced Timeline */}
      <Card className={styles.timelineCard} title="Activity Timeline">
        <Timeline className={styles.enhancedTimeline} items={timelineData} />
      </Card>
    </Modal>
  );
};

export default UserDetailModal;
