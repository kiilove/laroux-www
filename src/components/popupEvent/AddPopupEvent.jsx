import React from "react";
import PopupEventForm from "./PopupEventForm";
import { useFirestoreAddData } from "../../hooks/useFirestore/index";

const AddPopupEvent = () => {
  const handleSubmit = async (data) => {
    console.log(data);
    // try {
    //   await useFirestoreAddData.addData("popupEvents", data); // Firestore에 추가
    //   alert("팝업 행사가 저장되었습니다.");
    // } catch (error) {
    //   console.error("저장 실패:", error);
    //   alert("저장 중 오류가 발생했습니다.");
    // }
  };

  return (
    <PopupEventForm
      initialValues={{
        title: "",
        description: "",
        location: "",
        address: "",
        startDate: null,
        endDate: null,
        images: [],
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default AddPopupEvent;
