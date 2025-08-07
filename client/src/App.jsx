import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* ADD THIS NEW LINE: When the URL is the main "/", show the LoginPage */}
        <Route path="/" element={<LoginPage />} />

        {/* This route is also correct */}
        <Route path="/login" element={<LoginPage />} />

        {/* This route is for the registration page */}
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}

export default App;