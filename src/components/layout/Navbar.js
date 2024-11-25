import { Link } from "react-scroll"; // React Scroll 사용
import { useApp } from "../../context/AppContext";

const Navbar = ({ scrollToSection }) => {
  const { state } = useApp();
  const { isScrolled } = state;

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-6"
  }`;

  const linkClasses = `transition-colors duration-300 ${
    isScrolled
      ? "text-gray-800 hover:text-black"
      : "text-white hover:text-gray-200"
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${linkClasses}`}>la' ROUX</h1>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className={linkClasses}
            >
              홈
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={linkClasses}
            >
              회사 소개
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className={linkClasses}
            >
              행사 일정
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
