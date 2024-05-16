import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import MainPage from './main';
import RegisterPage from './Register';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* เพิ่ม Route สำหรับหน้าอื่นๆ */}
            </Routes>
        </Router>
    );
};

export default App;
