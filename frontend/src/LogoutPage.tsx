import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutPage: React.FC<LogoutPageProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // ลบ token หรือข้อมูลการเข้าสู่ระบบ
    localStorage.removeItem("token");

    // อัปเดตสถานะการเข้าสู่ระบบ
    setIsAuthenticated(false);

    // นำผู้ใช้ไปที่หน้า login
    navigate("/login");
  }, [navigate, setIsAuthenticated]);

  return null;
};

export default LogoutPage;
