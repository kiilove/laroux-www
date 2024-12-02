// src/components/features/EventCard.js

import React from "react";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const {
    id, // 고유 식별자 (리다이렉트에 필요)
    title,
    description, // Quill HTML 출력이 들어갈 부분
    location,
    address,
    startDate,
    endDate,
    images,
    tags = [],
  } = event;

  const navigate = useNavigate();

  // Quill HTML을 안전하게 렌더링
  const renderDescription = (html, truncate = false) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    if (truncate) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = sanitizedHtml;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      return (
        textContent.slice(0, 100) + (textContent.length > 100 ? "..." : "")
      );
    }
    return sanitizedHtml;
  };

  const handleReadMore = () => {
    console.log(id);
    navigate(`/events/${id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative">
        {images?.length > 0 ? (
          <img
            src={images[0]} // Show the first image
            alt={`${title} 이미지`}
            className="w-full h-52 object-cover"
          />
        ) : (
          <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500">
            이미지 없음
          </div>
        )}
        {/* 태그 표시 */}
        <div className="absolute top-2 left-2 flex gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {/* Quill HTML 요약 렌더링 */}
        <p className="text-sm text-gray-700">
          {renderDescription(description, true)}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>위치: {location}</p>
          <p>주소: {address}</p>
          <p>
            날짜: {startDate} ~ {endDate}
          </p>
        </div>
        <div className="text-right">
          <button
            onClick={handleReadMore}
            className="text-purple-600 hover:underline"
          >
            자세히 보기 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
