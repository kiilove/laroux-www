import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleTokenExchange } from "../../services/googleAuth";

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const processAuth = async () => {
      try {
        // URL에서 인증 코드 추출
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const errorParam = params.get("error");

        // 에러 파라미터 체크
        if (errorParam) {
          throw new Error(`Google 인증 오류: ${errorParam}`);
        }

        // 인증 코드 체크
        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        // 토큰 교환
        const tokenData = await handleTokenExchange(code);

        // 토큰 저장
        sessionStorage.setItem("access_token", tokenData.access_token);

        // 대시보드로 이동
        navigate("/dashboard", {
          replace: true,
          state: { authSuccess: true },
        });
      } catch (error) {
        console.error("인증 처리 실패:", error);
        setError(error.message);

        // 3초 후 대시보드로 이동
        setTimeout(() => {
          navigate("/dashboard", {
            replace: true,
            state: { authError: error.message },
          });
        }, 3000);
      }
    };

    processAuth();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full">
          <p className="text-red-600 font-medium">인증 오류</p>
          <p className="mt-2 text-gray-600">{error}</p>
          <p className="mt-4 text-sm text-gray-500">
            잠시 후 대시보드로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4" />
          <p className="text-gray-600">Google 인증 처리 중...</p>
        </div>
      </div>
    </div>
  );
};

export default OAuth2Callback;
