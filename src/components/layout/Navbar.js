import { useApp } from "../../context/AppContext";

const Navbar = () => {
  const { state } = useApp();
  const { isScrolled, activeSection } = state;

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
          <h1
            className={`text-3xl font-bold ${linkClasses}`}
            style={{ fontFamily: "sans-serif" }}
          >
            la' ROUX
          </h1>

          <div className="hidden md:flex space-x-8">
            <a
              href="#events"
              className={`${linkClasses} ${
                activeSection === "events" ? "font-bold" : ""
              }`}
            >
              행사 일정
            </a>
            <a
              href="#coupons"
              className={`${linkClasses} ${
                activeSection === "coupons" ? "font-bold" : ""
              }`}
            >
              쿠폰 다운로드
            </a>
            <a
              href="#about"
              className={`${linkClasses} ${
                activeSection === "about" ? "font-bold" : ""
              }`}
            >
              회사 소개
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
