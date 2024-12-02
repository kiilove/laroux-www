import React, { useCallback } from "react";
import { Input, DatePicker, Button } from "antd";
import { useFormHandler } from "../../hooks/useForm/index";

const validate = (values) => {
  const errors = {};
  if (!values.title) errors.title = "제목은 필수 입력 항목입니다.";
  if (!values.location) errors.location = "장소는 필수 입력 항목입니다.";
  if (!values.address) errors.address = "주소를 입력해주세요.";
  if (!values.startDate) errors.startDate = "시작일을 선택해주세요.";
  if (!values.endDate) errors.endDate = "종료일을 선택해주세요.";
  if (values.startDate && values.endDate && values.startDate > values.endDate) {
    errors.endDate = "종료일은 시작일 이후여야 합니다.";
  }
  return errors;
};

const PopupEventForm = ({ onSubmit, initialValues }) => {
  const {
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
  } = useFormHandler(initialValues, validate, {
    enableFileUpload: true,
    uploadPath: "popupEvents", // 업로드 경로 설정
  });

  // useCallback으로 handleFormSubmit 참조 고정
  const handleFormSubmit = useCallback(
    (e) => handleSubmit(onSubmit)(e),
    [onSubmit, handleSubmit]
  );

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* 제목 입력 */}
      <div>
        <label className="block font-semibold mb-1">행사 제목</label>
        <Input
          name="title"
          value={formValues.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      {/* 설명 입력 */}
      <div>
        <label className="block font-semibold mb-1">행사 설명</label>
        <Input.TextArea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          rows={4}
          placeholder="행사에 대한 설명을 입력하세요"
        />
      </div>

      {/* 위치 입력 */}
      <div>
        <label className="block font-semibold mb-1">위치 (장소 이름)</label>
        <Input
          name="location"
          value={formValues.location}
          onChange={handleChange}
          placeholder="예: 금정역 SKV1 1차 1층"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}
      </div>

      {/* 주소 입력 */}
      <div>
        <label className="block font-semibold mb-1">주소</label>
        <Input
          name="address"
          value={formValues.address}
          onChange={handleChange}
          placeholder="예: 경기도 군포시 금정동 123-45"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>

      {/* 날짜 입력 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">시작일</label>
          <DatePicker
            value={formValues.startDate}
            onChange={(date) => handleDateChange("startDate", date)}
            format="YYYY-MM-DD"
            className="w-full"
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">종료일</label>
          <DatePicker
            value={formValues.endDate}
            onChange={(date) => handleDateChange("endDate", date)}
            format="YYYY-MM-DD"
            className="w-full"
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* 이미지 업로드 */}
      <div>
        <label className="block font-semibold mb-1">이미지 업로드</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleImageAdd(Array.from(e.target.files))}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {tempImages.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 text-red-500"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="text-center">
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting || uploadLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          저장하기
        </Button>
      </div>
    </form>
  );
};

export default PopupEventForm;