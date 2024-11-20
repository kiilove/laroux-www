// src/App.js
import { useEffect } from "react";
import { useApp } from "./context/AppContext";
import BackgroundVideo from "./components/layout/BackgroundVideo";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Events from "./components/sections/Events";

function App() {
  const { actions } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      actions.setScrolled(window.scrollY > 50);

      // 현재 섹션 감지
      const sections = ["home", "events", "coupons", "about"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            actions.setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [actions]);

  return (
    <div className="relative">
      <BackgroundVideo />
      <Navbar />
      <Hero />
      <Events />
    </div>
  );
}

export default App;
