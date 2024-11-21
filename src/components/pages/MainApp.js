import React, { useEffect } from "react";
import { useApp } from "../../context/AppContext"; // AppContext를 가져옴
import BackgroundVideo from "../layout/BackgroundVideo";
import Navbar from "../layout/Navbar";
import Hero from "../sections/Hero";
import Events from "../sections/Events";

const MainApp = () => {
  const { state, actions } = useApp(); // state와 actions를 context에서 가져옴

  const handleScroll = () => {
    // 스크롤 여부 업데이트
    actions.setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    // 스크롤 이벤트 추가 및 정리
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 현재 스크롤 상태를 Navbar에 전달하거나 활용 가능 */}
      <BackgroundVideo />
      <Navbar isScrolled={state.isScrolled} />
      <Hero />
      <Events events={state.events} />
    </>
  );
};

export default MainApp;
