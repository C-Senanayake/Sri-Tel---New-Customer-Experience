import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OTP from './pages/OPT';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/packages" element={<HomePage />} />
        <Route path="/add_otp" element={<OTP />} />
      </Routes>
    </div>
  );
}

export default App;
