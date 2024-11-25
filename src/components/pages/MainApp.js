import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext"; // AppContext를 가져옴
import BackgroundVideo from "../layout/BackgroundVideo";
import Navbar from "../layout/Navbar";
import HeroSection from "../sections/HeroSection"; // HeroSection 이름 명확히 사용
import Events from "../sections/Events";
import AboutSection from "../sections/AboutSection"; // AboutSection 불러오기
import { Element, scroller } from "react-scroll"; // React Scroll의 Element와 scroller 사용

const MainApp = () => {
  const { state, actions } = useApp(); // state와 actions를 context에서 가져옴
  const [activeSection, setActiveSection] = useState("hero"); // 활성화된 섹션

  const handleScroll = () => {
    // 스크롤 여부 업데이트
    actions.setScrolled(window.scrollY > 50);
  };

  const scrollToSection = (section) => {
    console.log("[MainApp] Scrolling to section:", section); // 디버깅 로그
    setActiveSection(section);
    scroller.scrollTo(section, {
      duration: 500,
      smooth: true,
    });
  };

  useEffect(() => {
    console.log("[MainApp] Active section is now:", activeSection); // Active 상태 디버깅
  }, [activeSection]);

  useEffect(() => {
    // 스크롤 이벤트 추가 및 정리
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar scrollToSection={scrollToSection} />

      <Element name="hero">
        <HeroSection active={activeSection === "hero"} />
        {/* HeroSection에 active 전달 */}
      </Element>

      <Element name="about">
        <AboutSection active={activeSection === "about"} />
        {/* AboutSection에 active 전달 */}
      </Element>

      <Element name="events">
        <Events />
      </Element>
    </>
  );
};

export default MainApp;
