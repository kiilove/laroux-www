import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainApp from "./components/pages/MainApp";
import AdminDashboard from "./components/pages/AdminDashboard";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/utils/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 기존 App 내용 */}
          <Route path="/" element={<MainApp />} />

          {/* 어드민 대시보드 */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* 잘못된 URL은 홈으로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
