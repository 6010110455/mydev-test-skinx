import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Login";
import MainPage from "./main";
import RegisterPage from "./Register";
import LogoutPage from "./LogoutPage";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/logout"
          element={<LogoutPage setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* เพิ่ม Route สำหรับหน้าอื่นๆ */}
      </Routes>
    </Router>
  );
};

export default App;
