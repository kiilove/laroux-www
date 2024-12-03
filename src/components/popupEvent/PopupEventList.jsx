// src/components/features/PopupEventList.js

import React, { useEffect, useState } from "react";
import {
  useFirestoreQuery,
  useFirestoreDeleteData,
} from "../../hooks/useFirestore/index";
import { message, Spin, Table, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PopupEventList = ({ onEdit }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const popupEventQuery = useFirestoreQuery();
  const popupEventDelete = useFirestoreDeleteData();
  const navigate = useNavigate();

  const fetchPopupEvents = async () => {
    try {
      setIsLoading(true);
      await popupEventQuery.getDocuments(
        "popupEvents",
        (data) => {
          setEvents(data);
        },
        { orderByField: "startDate", orderByDirection: "desc" }
      );
    } catch (error) {
      message.error("데이터를 로드하는데 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "정말로 삭제하시겠습니까?",
      content: "삭제된 데이터는 복구할 수 없습니다.",
      okText: "삭제",
      cancelText: "취소",
      okType: "danger",
      onOk: async () => {
        try {
          await popupEventDelete.deleteDocument("popupEvents", id);
          message.success("행사가 삭제되었습니다.");
          fetchPopupEvents(); // 삭제 후 목록 갱신
        } catch (error) {
          message.error("삭제 중 문제가 발생했습니다.");
        }
      },
    });
  };

  useEffect(() => {
    fetchPopupEvents();
  }, []);

  const columns = [
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "시작일",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "종료일",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "위치",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "주소",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "작업",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() =>
              navigate("/dashboard/popupeventedit", { state: { ...record } })
            }
          >
            수정
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center bg-white">
          <Spin />
        </div>
      ) : (
        <Table
          dataSource={events.map((event) => ({ ...event, key: event.id }))}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      )}
    </>
  );
};

export default PopupEventList;
