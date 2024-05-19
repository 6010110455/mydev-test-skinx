import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // คุณสามารถเพิ่มคำขอ logout ไปที่เซิร์ฟเวอร์ได้ที่นี่ถ้าจำเป็น
      // await axios.post('http://localhost:5000/logout');

      // ลบ token หรือข้อมูลการเข้าสู่ระบบ
      localStorage.removeItem("token");

      // อัปเดตสถานะการเข้าสู่ระบบ
      setIsAuthenticated(false);

      // นำผู้ใช้ไปที่หน้า login
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
