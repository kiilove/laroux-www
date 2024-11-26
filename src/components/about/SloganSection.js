import React from "react";
import { motion } from "framer-motion";

const SloganSection = () => {
  const sloganData = [
    {
      headline: "그녀를 평온하게 하라",
      subtext: "라루의 철학은 내면과 외면의 아름다움을 모두 아우릅니다.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fan_artistic_oil_painting_inspired_by_the_empress_card_from_the_tarot_a_regal_woman_sits_gracefully__d1zixxdss2ec1gzkf5va_1.png?alt=media&token=fb654d3e-cf45-4b5e-9032-2053fca86dc8", // 실제 이미지 경로로 변경 필요
      direction: "right", // 애니메이션 방향
    },
    {
      headline: "Feel your beauty",
      subtext: "라루는 당신의 내면의 빛을 비춥니다.",
      image: "path_to_beauty_image.jpg", // 실제 이미지 경로로 변경 필요
      direction: "left",
    },
  ];

  return (
    <div className="w-full bg-white">
      {sloganData.map((slogan, index) => (
        <motion.section
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`
            relative min-h-screen flex items-center
            ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
          `}
        >
          {/* 이미지 컨테이너 */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            variants={{
              hidden: { opacity: 0, scale: 1.2 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-black/30 z-10" />{" "}
            {/* 오버레이 */}
            <img
              src={slogan.image}
              alt={slogan.headline}
              className="w-full h-full object-cover"
            />
            {/* 물결 효과 (첫 번째 섹션에만) */}
            {index === 0 && (
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 10px,
                      rgba(255,255,255,0.1) 10px,
                      rgba(255,255,255,0.1) 20px
                    )
                  `,
                }}
                animate={{
                  backgroundPosition: ["0px 0px", "20px 20px"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </motion.div>

          {/* 텍스트 컨테이너 */}
          <div className="container mx-auto px-4 relative z-20">
            <motion.div
              className={`
                max-w-2xl mx-auto text-white
                ${slogan.direction === "right" ? "ml-auto" : "mr-auto"}
              `}
              variants={{
                hidden: {
                  opacity: 0,
                  x: slogan.direction === "right" ? 100 : -100,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut",
              }}
            >
              {/* 헤드라인 */}
              <motion.h2
                className="text-5xl md:text-7xl font-bold mb-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {slogan.headline}
              </motion.h2>

              {/* 서브텍스트 */}
              <motion.p
                className="text-xl md:text-2xl font-light"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {slogan.subtext}
              </motion.p>
            </motion.div>
          </div>

          {/* 스크롤 가이드 (마지막 섹션 제외) */}
          {index !== sloganData.length - 1 && (
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1 h-16 bg-white/30 rounded-full" />
            </motion.div>
          )}
        </motion.section>
      ))}
    </div>
  );
};

export default SloganSection;
