import React from "react";
import HeroSection from "../about/HeroSection";

const AboutSection = ({ active }) => {
  // active를 상위에서 받아옴
  return (
    <div>
      <HeroSection active={active} /> {/* 받은 active를 HeroSection으로 전달 */}
      {/* Add more sections or components here if needed */}
    </div>
  );
};

export default AboutSection;
