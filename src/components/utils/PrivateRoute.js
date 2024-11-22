import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // 로딩 상태일 때 애니메이션 화면 표시
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <ClipLoader color="#4caf50" size={50} />
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          style={{ marginTop: "20px", fontSize: "16px", color: "#4caf50" }}
        >
          인증 상태를 확인하는 중입니다...
        </motion.p>
      </motion.div>
    );
  }

  // 인증되지 않은 경우 리다이렉트
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // 인증된 경우 자식 컴포넌트를 렌더링
  return children;
};

export default PrivateRoute;
