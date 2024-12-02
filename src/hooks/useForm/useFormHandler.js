import { useState } from "react";
import { useStorageUpload } from "../useStorage/index";

export const useFormHandler = (initialState, validate, options = {}) => {
  const { enableFileUpload = false, uploadPath = "default" } = options;

  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [tempImages, setTempImages] = useState(enableFileUpload ? [] : null);
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태
  const { uploadFile, loading: uploadLoading } = useStorageUpload();

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 날짜 변경 핸들러
  const handleDateChange = (name, date) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  // 이미지 추가 핸들러
  const handleImageAdd = (files) => {
    if (enableFileUpload) {
      setTempImages((prev) => [...prev, ...files]);
    }
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (index) => {
    if (enableFileUpload) {
      setTempImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 이미지 업로드 처리
  const uploadImages = async () => {
    if (!enableFileUpload || !tempImages?.length) return [];
    const uploadedImages = [];
    for (const file of tempImages) {
      const path = `${uploadPath}/${file.name}`; // 동적 경로 설정
      const { url } = await uploadFile(path, file);
      uploadedImages.push(url);
    }
    return uploadedImages;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true);
    const validationErrors = validate ? validate(formValues) : {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const uploadedImages = enableFileUpload ? await uploadImages() : [];
        const finalValues = { ...formValues, images: uploadedImages };
        onSubmit(finalValues); // 상위 컴포넌트로 최종 데이터 전달
        resetForm();
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        setErrors({ global: "이미지 업로드 중 문제가 발생했습니다." });
      }
    }
    setIsSubmitting(false);
  };

  // 폼 초기화
  const resetForm = () => {
    // setFormValues(initialState);
    // setErrors({});
    // setTempImages(enableFileUpload ? [] : null);
  };

  return {
    formValues,
    errors,
    tempImages,
    isSubmitting,
    uploadLoading,
    handleChange,
    handleDateChange,
    handleImageAdd,
    handleImageRemove,
    handleSubmit,
    resetForm,
  };
};
