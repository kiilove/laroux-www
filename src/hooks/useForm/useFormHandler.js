import { useState } from "react";
import { useImageHandler } from "./useImageHandler";

export const useFormHandler = (initialState, validate, options = {}) => {
  const { enableFileUpload = false, uploadPath = "default" } = options;

  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태

  // 이미지 처리 훅 초기화
  const {
    images,
    tempImages,
    deletedImages,
    isUploading,
    uploadProgress,
    handleAdd,
    handleRemove,
    processImages,
  } = useImageHandler(initialState.images || [], uploadPath);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  // 날짜 변경 핸들러
  const handleDateChange = (name, date) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: date ?? "",
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (onSubmit, values) => {
    setIsSubmitting(true); // 제출 상태 활성화

    const validationErrors = validate ? validate(values) : {}; // 값 검증
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // 이미지 처리
        const finalImages = enableFileUpload ? await processImages() : images;

        // 값 정리
        const cleanedValues = Object.entries(values).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value ?? "",
          }),
          {}
        );

        const finalValues = { ...cleanedValues, images: finalImages }; // 최종 데이터 생성
        await onSubmit(finalValues); // 상위 컴포넌트로 데이터 전달
        resetForm(); // 폼 초기화
      } catch (error) {
        console.error("폼 제출 실패:", error);
        setErrors({ global: "폼 제출 중 문제가 발생했습니다." });
      }
    }

    setIsSubmitting(false); // 제출 상태 비활성화
  };

  // 폼 초기화
  const resetForm = () => {
    setFormValues(initialState);
    setErrors({});
  };

  return {
    formValues,
    errors,
    images, // 최종 이미지 URL 리스트
    tempImages, // 업로드 전 파일 리스트
    deletedImages, // 삭제된 이미지 URL 리스트
    isSubmitting,
    isUploading, // 업로드 상태
    uploadProgress, // 업로드 진행 상황
    handleChange,
    handleDateChange,
    handleImageAdd: handleAdd, // 이미지 추가 핸들러
    handleImageRemove: handleRemove, // 이미지 삭제 핸들러
    handleSubmit,
    resetForm,
  };
};
