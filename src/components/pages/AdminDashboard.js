import React from "react";
import { Menu, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("로그아웃!");
    // 로그아웃 로직 추가
  };

  const menuItems = [
    {
      key: "event-management",
      label: "행사관리",
      children: [
        {
          key: "event-registration",
          label: "행사등록",
          onClick: () => navigate("/dashboard/newpopupevent"),
        },
        { key: "event-end", label: "행사종료" },
        {
          key: "new-blog",
          label: "새 블로그 작성",
          onClick: () => navigate("/dashboard/newblog"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 메뉴바 */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* 메뉴 */}
          <Menu
            mode="horizontal"
            items={menuItems}
            onClick={(menuInfo) => {
              const item = menuItems
                .flatMap((item) => (item.children ? item.children : item))
                .find((child) => child.key === menuInfo.key);
              if (item && item.onClick) item.onClick();
            }}
          />

          {/* 로그아웃 버튼 */}
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </div>

      {/* 서브 콘텐츠 표시 */}
      <div className="container mx-auto py-6 px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
