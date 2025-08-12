import React, { useEffect, useState } from "react";
import { Tabs, Button, Space, Typography } from "antd";
import { PlusOutlined, HistoryOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjectAudits } from "@/stores/slices/on-page-seo.slice";
import OnPageSEOAnalyzer from "./OnPageSEOAnalyzer";
import OnPageSEOHistory from "./OnPageSEOHistory";

const { Title, Text } = Typography;

interface OnPageSEOManagerProps {
  projectId: string;
}

const OnPageSEOManager: React.FC<OnPageSEOManagerProps> = ({ projectId }) => {
  const dispatch = useAppDispatch();
  const { audits = [], loading } = useAppSelector((state) => state.onPageSEO);
  const [activeTab, setActiveTab] = useState<string>("analyzer");

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectAudits({ projectId }));
    }
  }, [dispatch, projectId]);

  const tabItems = [
    {
      key: "analyzer",
      label: (
        <Space>
          <PlusOutlined />
          New Analysis
        </Space>
      ),
      children: <OnPageSEOAnalyzer projectId={projectId} />,
    },
    {
      key: "history",
      label: (
        <Space>
          <HistoryOutlined />
          History ({audits?.length || 0})
        </Space>
      ),
      children: <OnPageSEOHistory projectId={projectId} />,
    },
  ];

  return (
    <div style={{ padding: "0" }}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        tabBarExtraContent={
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setActiveTab("analyzer")}
            >
              New Analysis
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default OnPageSEOManager;
