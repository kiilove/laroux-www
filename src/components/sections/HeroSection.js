import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import Button from "../common/Button";
import BackgroundVideo from "../layout/BackgroundVideo"; // BackgroundVideo 불러오기
import logoWhite from "../assets/logos/logo_blank_white.png";
import laroux01 from "../assets/videos/laroux_01.mp4";
import laroux02 from "../assets/videos/laroux_02.mp4";
import laroux03 from "../assets/videos/laroux_03.mp4";
import laroux04 from "../assets/videos/laroux_04.mp4";

const HeroSection = ({ active }) => {
  // 비디오 리스트와 현재 비디오 상태
  const videos = useMemo(() => [laroux01, laroux02, laroux03, laroux04], []);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (active) {
      // 활성화 상태에서만 비디오 전환 로직 실행
      const interval = setInterval(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [active, videos]);

  const scrollToEvents = () => {
    document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-screen text-white">
      {/* BackgroundVideo에 현재 비디오 전달 */}
      <BackgroundVideo videoSrc={videos[currentVideoIndex]} />

      {/* 콘텐츠 */}
      <div className="absolute inset-0 flex items-center justify-center text-white px-6 z-10">
        <div className="text-center space-y-16">
          <div className="flex w-full h-auto justify-center items-center">
            <img
              src={logoWhite}
              className="w-[60%] opacity-20 transition-opacity duration-300 hover:opacity-100"
              alt="Logo"
            />
          </div>

          <p
            className="text-xl md:text-8xl opacity-60"
            style={{ fontFamily: "Parisienne", fontWeight: "bold" }}
          >
            Feel Your Beauty
          </p>
          <Button onClick={scrollToEvents}>최신 행사 보기</Button>
        </div>
      </div>

      {/* 아래로 스크롤 버튼 */}
      <button
        onClick={scrollToEvents}
        className="absolute bottom-8 w-full text-center cursor-pointer hover:opacity-75 transition-opacity"
        aria-label="Scroll to events section"
      >
        <ChevronDown size={32} className="mx-auto animate-bounce" />
      </button>
    </div>
  );
};

export default HeroSection;
