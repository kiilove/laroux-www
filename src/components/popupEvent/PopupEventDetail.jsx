import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css"; // Quill의 기본 테마
import { useFirestoreGetDocument } from "../../hooks/useFirestore";
import { message, Spin, Button, Carousel } from "antd";
import { ArrowLeftOutlined, CopyOutlined } from "@ant-design/icons";
import { copyToClipboard } from "../utils/copyClipboard";

const PopupEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventInfo, setEventInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const eventDocument = useFirestoreGetDocument();

  const fetchEventDocument = async (id) => {
    try {
      setIsLoading(true);
      await eventDocument.getDocument("popupEvents", id, (data) => {
        setEventInfo(data);
      });
    } catch (error) {
      message.error("데이터를 로드하는데 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    } else {
      fetchEventDocument(id);
    }
  }, [id]);

  const backgroundImage =
    eventInfo?.images?.length > 0
      ? eventInfo.images[0]
      : "https://via.placeholder.com/800x400.png?text=DEFAULT+IMAGE";

  return (
    <>
      {isLoading ? (
        <div
          className="w-full h-screen flex items-center justify-center"
          style={{ margin: 0, padding: 0 }}
        >
          <Spin />
        </div>
      ) : (
        <div
          className="relative min-h-screen bg-cover bg-center bg-no-repeat  flex justify-center items-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* 배경 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* 본문 컨테이너 */}
          <div
            className="relative mx-auto py-6 px-4 bg-white shadow-lg lg:max-w-3xl lg:py-16 lg:px-8"
            style={{
              borderRadius: window.innerWidth <= 768 ? "0" : "0.5rem",
              padding: window.innerWidth <= 768 ? "1rem" : "2rem",
              minWidth: window.innerWidth <= 768 ? "200px" : "800px",
            }}
          >
            {/* 제목과 뒤로가기 버튼 */}
            <div
              className="flex justify-center items-center "
              style={{ height: "100px" }}
            >
              <div className="flex w-1/5 justify-start items-start ">
                <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate(-1)}
                  className="text-gray-700 hover:text-black mb-2 lg:mb-0"
                />
              </div>
              <div className="flex w-3/5 justify-start lg:justify-center items-center">
                <h1 className="text-lg lg:text-2xl font-bold mb-0 text-center w-full lg:w-auto">
                  {eventInfo?.title}
                </h1>
              </div>
              <div className="w-1/5 "></div>
            </div>

            {eventInfo?.images?.length > 0 && (
              <div className="w-full h-64 mb-6 relative">
                <Carousel
                  arrows
                  draggable
                  infinite={false}
                  dots={false}
                  autoplay
                  autoplaySpeed={3000} // 자동 스크롤: 3초 간격
                >
                  {eventInfo.images.map((image, index) => (
                    <div key={index} className="h-full">
                      <img
                        src={image}
                        alt={`${eventInfo?.title} 이미지 ${index + 1}`}
                        className="object-cover rounded-md"
                        style={{ width: "100%", height: "350px" }}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}

            <div
              className="prose bg-white p-4 rounded-md shadow-lg relative"
              style={{ zIndex: 10 }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(eventInfo?.description),
                }}
              />
            </div>

            <div
              className="mt-4 text-base text-white p-4 rounded-md"
              style={{ backgroundColor: "#971f33" }}
            >
              <p className="mb-2 font-bold">위치: {eventInfo?.location}</p>
              <p className="mb-2 font-bold">
                주소: {eventInfo?.address}
                <span className="ml-2">
                  <Button
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(eventInfo?.address)}
                  >
                    주소복사
                  </Button>
                </span>
              </p>
              <p className="font-bold">
                날짜: {eventInfo?.startDate} ~ {eventInfo?.endDate}
              </p>
            </div>
            {/* 할인 쿠폰 받기 버튼 */}
            <div className="mt-8 text-center">
              <Button
                type="primary"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              >
                할인 쿠폰 받기
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupEventDetail;
