import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 인증된 사용자는 원하는 컴포넌트를 렌더링
  return children;
};

export default PrivateRoute;
