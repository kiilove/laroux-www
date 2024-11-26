import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import HeroSection from "../about/HeroSection";
import BrandStorySection from "../about/BrandStroySection";
import SloganSection from "../about/SloganSection";

const AboutSection = () => {
  const [isHeroEnd, setIsHeroEnd] = useState(false);
  const heroEnd = () => {
    setIsHeroEnd(true);
  };
  return (
    <div className="relative">
      {/* 스크롤 영역 확보 */}
      <div style={{ height: "250vh" }}>
        <HeroSection onAnimationEnd={heroEnd} />
      </div>
      <div style={{ height: "120vh" }}>
        <BrandStorySection />
      </div>
      <div style={{ height: "250vh" }}>
        <SloganSection />
      </div>
    </div>
  );
};

export default AboutSection;
