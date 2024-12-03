import React from "react";
import PopupEventForm from "./PopupEventForm";
import { useFirestoreAddData } from "../../hooks/useFirestore/index";
import dayjs from "dayjs";

const AddPopupEvent = () => {
  const addPopup = useFirestoreAddData();
  const handleSubmit = async (data) => {
    console.log(data);
    try {
      await addPopup.addData("popupEvents", data); // Firestore에 추가
      alert("팝업 행사가 저장되었습니다.");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <PopupEventForm
      initialValues={{
        title: "",
        description: "",
        location: "",
        address: "",
        startDate: "",
        endDate: "",
        images: [],
        isActive: true,
        createdAt: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default AddPopupEvent;
