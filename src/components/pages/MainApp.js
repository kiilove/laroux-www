import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext"; // AppContext를 가져옴
import Navbar from "../layout/Navbar";
import HeroSection from "../sections/HeroSection"; // HeroSection 이름 명확히 사용
import Events from "../sections/Events";
import { Element, scroller } from "react-scroll"; // React Scroll의 Element와 scroller 사용
import AboutSection from "../sections/AboutSection";

const MainApp = () => {
  const { state } = useApp(); // context에서 state 가져옴
  const [activeSection, setActiveSection] = useState("hero"); // 활성화된 섹션

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 500,
      smooth: true,
    });
  };

  return (
    <>
      <Navbar scrollToSection={scrollToSection} />

      <Element name="hero">
        <HeroSection active={activeSection === "hero"} />
        {/* HeroSection에 active 전달 */}
      </Element>

      <Element name="events">
        <Events />
      </Element>
    </>
  );
};

export default MainApp;
