import React from "react";
import { motion } from "framer-motion";

const BrandStorySection = () => {
  const sections = [
    {
      title: "디자인, 그 이상의 가치를 담다.",
      subtitle: "라루의 옷은 한 땀 한 땀 정성을 담아 창의적으로 디자인됩니다.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_creative_workspace_showcasing_the_essence_of_fashion_design_a_well-lit_wooden_table_is_covered_wi_anauw738nw6qpz5ebzed_2.png?alt=media&token=33d4b816-c7b3-4e5a-8586-67b6ca7a2861",
      description: "디자이너의 작업 공간: 창의의 시작",
    },
    {
      title: "자연이 전하는 평온과 풍요로움.",
      subtitle: "라루의 디자인은 자연에서 시작됩니다.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_serene_and_vibrant_lavender_field_stretching_out_under_a_soft_golden_sunset_the_scene_is_bathed_i_aaopr3we5mmxvvnu9bm2_3.png?alt=media&token=f6ac374f-8147-4e9c-965c-8d8e718f9f8b",
      description: "풍요로운 자연 이미지: 영감의 원천",
    },
    {
      title: "라루, 당신의 일상에 함께합니다.",
      subtitle: "라루는 단순히 옷을 만드는 브랜드가 아닙니다.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/laroux-1a94f.firebasestorage.app/o/assets%2Fabout%2Fa_casual_and_modern_scene_featuring_a_korean_woman_wearing_a_pair_of_stylish_trousers_and_a_simple_e_b2332d40-7c95-4148-ab45-dcfefb762418.png?alt=media&token=623ee83f-c893-4447-9fb0-ae80cfaeed66",
      description: "브랜드의 가치: 여성의 일상에 집중",
    },
  ];

  return (
    <div className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">브랜드 스토리</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 400 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              {/* 스타일은 이 div에 적용 */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-500 cursor-pointer">
                <div className="relative">
                  <motion.img
                    src={section.image}
                    alt={section.description}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100"
                  >
                    {section.description}
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                  <p className="text-gray-600">{section.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandStorySection;
