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
import AboutSection from "./components/sections/AboutSection";
import Events from "./components/sections/Events";
import { DeviceProvider } from "./context/DeviceContext";
import AddPopupEvent from "./components/popupEvent/AddPopupEvent";
import PopupEventList from "./components/popupEvent/PopupEventList";
import PopupEventDetail from "./components/popupEvent/PopupEventDetail";

const App = () => {
  return (
    <DeviceProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainApp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/oauth2callback" element={<OAuth2Callback />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/events/:id" element={<PopupEventDetail />} />
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

              <Route path="newpopupevent" element={<AddPopupEvent />} />
              <Route path="popuplist" element={<PopupEventList />} />
            </Route>

            {/* 잘못된 URL은 홈으로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </DeviceProvider>
  );
};

export default App;
