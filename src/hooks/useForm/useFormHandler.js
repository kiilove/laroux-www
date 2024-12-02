import { useState } from "react";
import { useStorageUpload } from "../useStorage/index";

export const useFormHandler = (initialState, validate, options = {}) => {
  const { enableFileUpload = false, uploadPath = "default" } = options;

  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [tempImages, setTempImages] = useState(enableFileUpload ? [] : null);
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태
  const { uploadFile, loading: uploadLoading } = useStorageUpload();

  // 디버깅 로그 출력
  console.log("Debug: formValues", formValues);
  console.log("Debug: errors", errors);
  console.log("Debug: tempImages", tempImages);
  console.log("Debug: isSubmitting", isSubmitting);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Debug: handleChange - ${name}:`, value);
    setFormValues((prev) => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  // 날짜 변경 핸들러
  const handleDateChange = (name, date) => {
    console.log(`Debug: handleDateChange - ${name}:`, date);
    setFormValues((prev) => ({
      ...prev,
      [name]: date ?? "",
    }));
  };

  // 이미지 추가 핸들러
  const handleImageAdd = (files) => {
    console.log("Debug: handleImageAdd - files:", files);
    if (enableFileUpload) {
      setTempImages((prev) => [...prev, ...files]);
    }
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (index) => {
    console.log("Debug: handleImageRemove - index:", index);
    if (enableFileUpload) {
      setTempImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 이미지 업로드 처리
  const uploadImages = async () => {
    if (!enableFileUpload || !tempImages?.length) return [];
    const uploadedImages = [];
    for (const file of tempImages) {
      try {
        const path = `${uploadPath}/${file.name}`; // 동적 경로 설정
        console.log("Debug: uploadFile - path:", path);
        const { url } = await uploadFile(path, file);
        uploadedImages.push(url);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }
    console.log("Debug: uploadedImages", uploadedImages);
    return uploadedImages;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (onSubmit, values) => {
    console.log("handleSubmit 시작:", values);
    setIsSubmitting(true); // 제출 상태 활성화

    const validationErrors = validate ? validate(values) : {}; // 값 검증
    console.log("Debug: validationErrors", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const uploadedImages = enableFileUpload ? await uploadImages() : []; // 이미지 업로드 처리

        // 값 정리
        const cleanedValues = Object.entries(values).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value ?? "",
          }),
          {}
        );

        const finalValues = { ...cleanedValues, images: uploadedImages }; // 최종 데이터 생성
        console.log("Debug: finalValues", finalValues);

        await onSubmit(finalValues); // 상위 컴포넌트로 데이터 전달
        resetForm(); // 폼 초기화
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        setErrors({ global: "이미지 업로드 중 문제가 발생했습니다." });
      }
    }

    setIsSubmitting(false); // 제출 상태 비활성화
    console.log("Debug: handleSubmit - 종료");
  };

  // 폼 초기화
  const resetForm = () => {
    console.log("Debug: resetForm 호출");
    setFormValues(initialState);
    setErrors({});
    setTempImages(enableFileUpload ? [] : null);
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
