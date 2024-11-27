import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons"; // Ant Design 아이콘 사용
import { useDevice } from "../../context/DeviceContext";

const Navbar = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 드로어 상태 관리
  const navigate = useNavigate();
  const { isMobile } = useDevice(); // 모바일 여부 확인

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-6"
  }`;

  const linkClasses = `transition-colors duration-300 ${
    isScrolled
      ? "text-gray-800 hover:text-black"
      : "text-white hover:text-gray-200"
  }`;

  const iconColor = isScrolled ? "text-gray-800" : "text-white"; // 아이콘 색상 변경

  return (
    <nav className={navClasses}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${linkClasses}`}>la' ROUX</h1>

          {isMobile ? (
            // 모바일 환경: 햄버거 메뉴 버튼
            <>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className={`text-2xl ${iconColor}`}
              >
                <MenuOutlined />
              </button>

              {isDrawerOpen && (
                // 드로어 메뉴
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
                  <div className="fixed top-0 right-0 w-3/4 max-w-xs bg-white h-full z-50 shadow-lg">
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-gray-800 text-2xl p-4"
                    >
                      <CloseOutlined />
                    </button>
                    <nav className="flex flex-col space-y-4 p-6">
                      <button
                        onClick={() => {
                          navigate("/");
                          setIsDrawerOpen(false);
                        }}
                        className="text-gray-800 hover:text-black"
                      >
                        홈
                      </button>
                      <button
                        onClick={() => {
                          navigate("/about");
                          setIsDrawerOpen(false);
                        }}
                        className="text-gray-800 hover:text-black"
                      >
                        회사 소개
                      </button>
                      <button
                        onClick={() => {
                          navigate("/");
                          setIsDrawerOpen(false);
                        }}
                        className="text-gray-800 hover:text-black"
                      >
                        행사 일정
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </>
          ) : (
            // 데스크탑 환경: 기본 네비게이션 메뉴
            <div className="hidden md:flex space-x-8">
              <button onClick={() => navigate("/")} className={linkClasses}>
                홈
              </button>
              <button
                onClick={() => navigate("/about")}
                className={linkClasses}
              >
                회사 소개
              </button>
              <button onClick={() => navigate("/")} className={linkClasses}>
                행사 일정
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
