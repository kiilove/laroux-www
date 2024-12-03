import React, { useEffect, useState } from "react";
import PopupEventForm from "./PopupEventForm";
import {
  useFirestoreGetDocument,
  useFirestoreUpdateData,
} from "../../hooks/useFirestore/index";
import dayjs from "dayjs";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { message, Spin } from "antd";

const EditPopupEvent = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 뒤로가기 또는 다른 화면으로 이동하기 위해 사용
  const getPopup = useFirestoreGetDocument();
  const updatePopup = useFirestoreUpdateData();
  const [initialValues, setInitialValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(location);
    if (location?.state) {
      setInitialValues({
        ...location.state,
        startDate: dayjs(location.state.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(location.state.endDate).format("YYYY-MM-DD"),
      });
      setIsLoading(false);
    }
  }, [location]);

  const handleSubmit = async (data) => {
    console.log("수정 데이터:", data);
    try {
      await updatePopup.updateData("popupEvents", location?.state?.id, {
        ...data,
        editedAt: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      }); // Firestore에 수정 요청
      message.success("팝업 행사가 수정되었습니다.");
      navigate(-1); // 수정 완료 후 이전 화면으로 이동
    } catch (error) {
      console.error("수정 실패:", error);
      message.error("수정 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  return (
    <PopupEventForm initialValues={initialValues} onSubmit={handleSubmit} />
  );
};

export default EditPopupEvent;
