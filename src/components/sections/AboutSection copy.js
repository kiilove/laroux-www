import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDevice } from "../../context/DeviceContext";

// 이미지 상수
const IMAGES = {
  hero: {
    main: "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_dramatic_and_elegant_scene_featuring_a_korean_woman_wearing_flowy_trousers_that_highlight_texture_mbd3o5k4im4j1tajpmex_2.png?alt=media&token=4fc3a90e-9868-4473-9b29-a553e1cf5ca5",
  },
  brandStory: {
    workspace:
      "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_creative_workspace_showcasing_the_essence_of_fashion_design_a_well-lit_wooden_table_is_covered_wi_anauw738nw6qpz5ebzed_2.png?alt=media&token=33d4b816-c7b3-4e5a-8586-67b6ca7a2861",
    nature: [
      "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_serene_and_vibrant_lavender_field_stretching_out_under_a_soft_golden_sunset_the_scene_is_bathed_i_aaopr3we5mmxvvnu9bm2_3.png?alt=media&token=f6ac374f-8147-4e9c-965c-8d8e718f9f8b",
      "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fan_endless_field_of_golden_wheat_stretching_towards_the_horizon_under_a_bright_afternoon_sky_the_wh_oxn1aopwhqr8axfj6pha_0.png?alt=media&token=4f813d28-a648-417d-9bed-7996d10ec347",
      "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_serene_landscape_bathed_in_soft_morning_light_featuring_layers_of_rolling_hills_extending_into_th_aqz06b9q1ad4ndf52wtq_1.png?alt=media&token=c4037953-e71e-4ee0-a956-b464567e22ac",
    ],
  },

  slogan: {
    peaceful:
      "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fan_artistic_oil_painting_inspired_by_the_empress_card_from_the_tarot_a_regal_woman_sits_gracefully__d1zixxdss2ec1gzkf5va_1.png?alt=media&token=fb654d3e-cf45-4b5e-9032-2053fca86dc8",
    collection: "collection_highlight_url",
    beauty: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_fresh_morning_scene_of_a_beautiful_korean_woman_in_her_early_30s_walking_down_a_clean_city_street_vff4h8lhx8onrtahgw0g_3.png?alt=media&token=4f653056-4289-4670-9689-daa046c408bc",
        message: "Express Your Inner Beauty",
        description: "일상의 모든 순간이 예술이 되는 당신만의 이야기",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fae542b9c-1934-4f5d-aaf9-c9df3d7fdca0-enhanced.png?alt=media&token=e28365cc-b0b6-4f57-abf3-09c28c1ac43b",
        message: "Find your balance",
        description: "고요 속에서 찾는 내면의 균형",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_bold_and_sophisticated_korean_woman_in_her_early_30s_descending_a_striking_geometric_staircase_in_2dvd8ew9rgbilcdli1jk_1.png?alt=media&token=2a48f8ed-5524-419a-b7e0-4e437dd241e7",
        message: "Bold elegance",
        description: "당신만의 강인한 아름다움을 표현하세요",
      },
    ],
  },
  collection: [
    "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_casual_and_modern_scene_featuring_a_korean_woman_wearing_a_pair_of_stylish_trousers_and_a_simple_e_3a038bf1-f1fa-4428-9750-cd62eb96f51d.png?alt=media&token=4f657a91-9518-4ea6-8fe2-ada8976e4312",
    "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_casual_and_modern_scene_featuring_a_korean_woman_wearing_a_pair_of_stylish_trousers_and_a_simple_e_b2332d40-7c95-4148-ab45-dcfefb762418.png?alt=media&token=623ee83f-c893-4447-9fb0-ae80cfaeed66",
    "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_serene_portrait_of_a_woman_with_a_background_featuring_gentle_waves_and_a_clear_blue_sky_the_compo_1dbf0220-651e-4f64-a306-c0d1840ca6a7.png?alt=media&token=b3d79f46-f4bc-41e4-95b9-08a5effa0331",
    "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_casual_and_modern_scene_featuring_a_korean_woman_wearing_a_pair_of_stylish_trousers_and_a_simple_e_9490dada-a2b5-45c9-9b05-72cf6bfd9296.png?alt=media&token=47a681ff-a204-4d25-aa3b-e27ebf7ac6b7",
  ],
  final: "final_cta_image_url",
};

const AboutSection = () => {
  const { isMobile, isTablet } = useDevice();
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // 기본 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // 새로운 애니메이션 variants
  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const staggeredContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src={IMAGES.hero.main}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            variants={staggeredContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={wordAnimation}
              className="font-italiana text-7xl md:text-8xl lg:text-9xl mb-6 font-bold"
            >
              La Roux
            </motion.h1>

            <motion.div variants={wordAnimation} className="mb-8">
              <motion.p
                variants={fadeInUp}
                className="font-cormorant text-2xl md:text-3xl mb-4 font-semibold"
              >
                Feel your beauty, feel La Roux
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="font-montserrat text-lg md:text-xl text-gray-200 font-medium"
              >
                라루는 당신의 일상에 평온함과 아름다움을 선사합니다
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="space-y-4 md:space-y-0 md:space-x-6"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-white text-black px-8 py-3 rounded-full font-montserrat text-lg font-medium transition-colors hover:bg-opacity-90"
              >
                컬렉션 보기
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-montserrat text-lg font-medium transition-colors hover:bg-white hover:bg-opacity-10"
              >
                라루 스토리 더 알아보기
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Brand Story Section */}
      <motion.section
        variants={staggeredContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              className="relative overflow-hidden group"
            >
              <img
                src={IMAGES.brandStory.workspace}
                alt="Designer workspace"
                className="w-full rounded-lg transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="text-center md:text-left"
            >
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl mb-8 font-semibold">
                디자인, 그 이상의 가치
              </h2>
              <p className="font-montserrat text-lg text-gray-600 leading-relaxed font-medium">
                라루의 옷은 한 땀 한 땀 정성을 담아 창의적으로 디자인됩니다.
                자연스러운 실루엣과 세련된 디테일로 당신의 일상에 특별함을
                더합니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Nature Inspiration Section */}
      <motion.section
        variants={staggeredContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={scaleUp} className="text-center mb-16">
            <h2 className="font-cormorant text-5xl md:text-6xl mb-6 font-semibold">
              자연에서 영감을 담다
            </h2>
            <p className="font-montserrat text-lg text-gray-600 font-medium max-w-3xl mx-auto">
              라루는 자연의 순수한 아름다움에서 영감을 받습니다. 라벤더 밭의
              은은한 보라빛 물결, 황금빛으로 물든 들판의 장엄함, 그리고 아침
              햇살에 반짝이는 이슬과 같은 자연의 섬세한 순간들. 이러한 자연의
              순수한 아름다움은 라루의 디자인 철학이 되어 당신의 일상에
              스며듭니다.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggeredContainer}
          >
            {IMAGES.brandStory.nature.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -20 }}
                className="relative overflow-hidden rounded-lg"
              >
                <img
                  src={image}
                  alt={`Nature inspiration ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Slogan Section */}
      <motion.section
        variants={staggeredContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={scaleUp} className="text-center mb-16">
            <h2 className="font-italiana text-5xl md:text-6xl mb-6 font-bold">
              Feel Your Beauty
            </h2>
            <p className="font-cormorant text-xl text-gray-600 font-semibold">
              라루는 당신의 내면의 빛을 비춥니다
            </p>
          </motion.div>

          <motion.div
            variants={staggeredContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {IMAGES.slogan.beauty.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -20 }}
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={item.url}
                  alt={item.message}
                  className="w-full object-cover aspect-[3/4] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <h3 className="text-white font-cormorant text-2xl mb-2 font-semibold">
                      {item.message}
                    </h3>
                    <p className="text-white font-montserrat text-sm font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Collection Preview */}
      <motion.section
        variants={staggeredContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={scaleUp} className="text-center mb-16">
            <h2 className="font-cormorant text-5xl md:text-6xl font-semibold mb-6">
              2024 Pants Collection
            </h2>
            <p className="font-montserrat text-lg text-gray-600 font-medium">
              자연스러운 실루엣으로 완성되는 우아함
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMAGES.collection.map((imageUrl, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-lg aspect-[3/4]"
              >
                <img
                  src={imageUrl}
                  alt={`Collection ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final Call to Action */}
      <motion.section
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src={IMAGES.final}
            alt="Final"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </motion.div>

        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          whileInView="visible"
          className="relative z-10 text-center text-white px-4"
        >
          <motion.h2
            variants={wordAnimation}
            className="font-italiana text-6xl md:text-7xl mb-8 font-bold"
          >
            Feel your la' ROUX
          </motion.h2>
          <motion.p
            variants={wordAnimation}
            className="font-cormorant text-2xl mb-12 font-semibold"
          >
            라루와 함께하는 일상 속 특별함을 경험해보세요
          </motion.p>
          <motion.button
            variants={fadeInUp}
            className="bg-white text-black px-8 py-3 rounded-full font-montserrat font-medium hover:bg-opacity-90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            컬렉션 보기
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutSection;
