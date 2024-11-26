import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = ({ onAnimationEnd }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 체크
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 스크롤 핸들링
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setScrollY(currentScroll);

    if (currentScroll > 2000 && isVisible) {
      setIsVisible(false);
      onAnimationEnd();
    } else if (currentScroll <= 2000 && !isVisible) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  // 애니메이션 스타일
  const getFirstGroupStyle = () => {
    const opacityProgress = Math.min(1, scrollY / 400);
    const moveProgress = Math.min(1, scrollY / 600);

    return {
      transform: `translate(-50%, ${-40 - moveProgress * 20}%)`,
      opacity: 1 - opacityProgress,
      transition: "all 0.3s ease-out",
    };
  };

  const getSecondGroupStyle = () => {
    if (scrollY < 400) {
      return {
        transform: "translate(-50%, 0%)",
        opacity: 0,
      };
    }

    const progress = Math.min(1, (scrollY - 400) / 400);
    return {
      transform: `translate(-50%, ${20 - progress * 20}%)`,
      opacity: progress,
      transition: "all 0.3s ease-out",
    };
  };

  const getThirdGroupStyle = () => {
    if (scrollY < 700) {
      return {
        transform: "translateY(40px)",
        opacity: 0,
      };
    }

    const progress = Math.min(1, (scrollY - 700) / 400);
    return {
      transform: `translateY(${40 - progress * 40}px)`,
      opacity: progress,
      transition: "all 0.5s ease-out",
    };
  };

  // 레이아웃 상수
  const LAYOUT = {
    containerWidth: isMobile ? "90%" : "80%",
    maxWidth: isMobile ? "100%" : "1200px",
    fontSize: {
      primary: isMobile ? "3rem" : "6rem",
      secondary: isMobile ? "2.5rem" : "5rem",
      text: isMobile ? "1.5rem" : "2.5rem",
    },
    spacing: {
      margin: isMobile ? "2rem" : "3rem",
    },
  };

  return (
    <div
      style={{
        position: isVisible ? "fixed" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: isVisible ? 10 : 1,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
        overflow: "hidden",
      }}
    >
      {/* 배경 이미지 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
        }}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_dramatic_and_elegant_scene_featuring_a_korean_woman_wearing_flowy_trousers_that_highlight_texture_mbd3o5k4im4j1tajpmex_2.png?alt=media&token=4fc3a90e-9868-4473-9b29-a553e1cf5ca5"
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* 콘텐츠 컨테이너 */}
      <div
        style={{
          position: "relative",
          width: LAYOUT.containerWidth,
          maxWidth: LAYOUT.maxWidth,
          height: "100%",
          margin: "0 auto",
        }}
      >
        {/* 스크롤 화살표 */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-20 cursor-pointer"
          style={{
            color: "white",
            textAlign: "center",
            display: scrollY === 0 ? "block" : "none",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={48} />
        </motion.div>

        {/* Feel Your Beauty */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            width: "100%",
            textAlign: "center",
            ...getFirstGroupStyle(),
          }}
        >
          <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              color: "gold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              fontSize: LAYOUT.fontSize.primary,
              fontWeight: "900",
              display: "block",
            }}
          >
            Feel Your Beauty
          </motion.span>
        </div>

        {/* Feel la' ROUX */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            width: "100%",
            textAlign: "center",
            ...getSecondGroupStyle(),
          }}
        >
          <span
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              fontSize: LAYOUT.fontSize.secondary,
              fontWeight: "700",
              display: "block",
            }}
          >
            Feel la' ROUX
          </span>
        </div>

        {/* 설명 텍스트와 버튼 */}
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: 0,
            width: "100%",
            ...getThirdGroupStyle(),
          }}
        >
          <p
            style={{
              fontSize: LAYOUT.fontSize.text,
              fontWeight: "400",
              color: "rgba(255, 255, 255, 0.9)",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
              textAlign: "center",
              marginBottom: LAYOUT.spacing.margin,
            }}
          >
            라루는 <strong style={{ color: "gold" }}>당신의 일상</strong>에
            <br />
            평온함과 아름다움을 선사합니다.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "1rem" : "2rem",
              justifyContent: "center",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "1rem" : "2rem",
                justifyContent: "center",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "gold",
                  color: "black",
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: isMobile ? "0.8rem 1.5rem" : "1rem 2rem",
                  fontSize: isMobile ? "0.9rem" : "1.1rem",
                  fontWeight: "500",
                  border: "2px solid gold",
                  borderRadius: "50px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: "gold",
                  width: isMobile ? "100%" : "auto",
                }}
                onClick={() => (window.location.href = "/collection")}
              >
                컬렉션 보기
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "white",
                  color: "black",
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: isMobile ? "0.8rem 1.5rem" : "1rem 2rem",
                  fontSize: isMobile ? "0.9rem" : "1.1rem",
                  fontWeight: "500",
                  border: "2px solid white",
                  borderRadius: "50px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: "white",
                  width: isMobile ? "100%" : "auto",
                }}
                onClick={() =>
                  window.scrollTo({ top: 2000, behavior: "smooth" })
                }
              >
                라루 스토리 더 알아보기
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
