import { ChevronDown } from "lucide-react";
import Button from "../common/Button";
import logoWhite from "../assets/logos/logo_blank_white.png";

const Hero = () => {
  const scrollToEvents = () => {
    document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-screen flex items-center justify-center text-white px-6 z-10">
      <div className="text-center space-y-16">
        <div className="flex w-full h-auto justify-center items-center">
          <img
            src={logoWhite}
            className="w-[60%] opacity-20 transition-opacity duration-300 hover:opacity-100"
            alt="Logo"
          />
        </div>

        <p
          className="text-xl md:text-8xl opacity-60"
          style={{ fontFamily: "Parisienne", fontWeight: "bold" }}
        >
          Feel Your Beauty
        </p>
        <Button onClick={scrollToEvents}>최신 행사 보기</Button>
      </div>
      <button
        onClick={scrollToEvents}
        className="absolute bottom-8 w-full text-center cursor-pointer hover:opacity-75 transition-opacity"
        aria-label="Scroll to events section"
      >
        <ChevronDown size={32} className="mx-auto animate-bounce" />
      </button>
    </div>
  );
};

export default Hero;
