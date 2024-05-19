import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Login";
import HomePage from "./main";
import RegisterPage from "./Register";
import LogoutPage from "./LogoutPage";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  console.log("isAuthenticated", isAuthenticated);

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
        <Route
          path="/"
          element={<HomePage isAuthenticated={isAuthenticated} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/logout"
          element={<LogoutPage setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
