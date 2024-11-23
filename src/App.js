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
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import OAuth2Callback from "./components/auth/OAuth2Callback";
import BlogEditor from "./components/mediaBlog/BlogEditor";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 기존 App 내용 */}
          <Route path="/" element={<MainApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth2callback" element={<OAuth2Callback />} />

          {/* 어드민 대시보드 */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            {/* AdminDashboard의 서브 메뉴 경로 */}
            <Route path="newblog" element={<BlogEditor />} />
          </Route>

          {/* 잘못된 URL은 홈으로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
