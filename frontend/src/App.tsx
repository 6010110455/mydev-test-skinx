import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* เพิ่ม Route สำหรับหน้าอื่นๆ */}
            </Routes>
        </Router>
    );
};

export default App;
