import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  // 메시지 그룹 및 스크롤 범위 정의
  const messageGroups = [
    {
      messages: [
        <span
          style={{
            color: "gold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            fontSize: "6rem",
            fontWeight: "bold",
          }}
        >
          Feel your beauty
        </span>,
        <span
          style={{
            color: "white",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.9)",
            fontSize: "5rem",
            fontWeight: "bold",
          }}
        >
          Feel La Roux
        </span>,
      ],
      startScroll: 0,
      endScroll: 600,
    },
    {
      messages: [
        <p
          style={{
            fontSize: "3rem",
            fontWeight: "400",
            color: "rgba(255, 255, 255, 0.9)",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
          }}
        >
          라루는 <strong style={{ color: "gold" }}>당신의 일상</strong>에
          평온함과 아름다움을 선사합니다.
        </p>,
      ],
      startScroll: 601,
      endScroll: 1200,
    },
  ];

  const handleScroll = () => {
    setScrollY(window.scrollY); // 현재 스크롤 위치 저장
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getProgress = (start, end) => {
    if (scrollY < start) return 0;
    if (scrollY > end) return 1;
    return (scrollY - start) / (end - start);
  };

  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_dramatic_and_elegant_scene_featuring_a_korean_woman_wearing_flowy_trousers_that_highlight_texture_mbd3o5k4im4j1tajpmex_2.png?alt=media&token=4fc3a90e-9868-4473-9b29-a553e1cf5ca5";

  return (
    <div
      style={{
        position: "relative",
        height: "100vh", // HeroSection만 화면에 꽉 차도록 설정
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* 고정된 배경 이미지 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* 텍스트 콘텐츠 */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {messageGroups.map((group, groupIndex) => {
          const progress = getProgress(group.startScroll, group.endScroll);

          return (
            <motion.div
              key={groupIndex}
              style={{
                opacity: progress,
                transform: `translateY(${(1 - progress) * 50}px)`,
                transition:
                  "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {group.messages.map((message, messageIndex) => {
                const segmentProgress = getProgress(
                  group.startScroll +
                    ((group.endScroll - group.startScroll) /
                      group.messages.length) *
                      messageIndex,
                  group.startScroll +
                    ((group.endScroll - group.startScroll) /
                      group.messages.length) *
                      (messageIndex + 1)
                );

                return (
                  <motion.div
                    key={messageIndex}
                    style={{
                      opacity: segmentProgress,
                      transform: `translateY(${(1 - segmentProgress) * 20}px)`,
                      margin: "20px 0",
                      fontSize: groupIndex === 0 ? "6rem" : "3.5rem",
                      fontWeight: "bold",
                      transition:
                        "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                    }}
                  >
                    {message}
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
