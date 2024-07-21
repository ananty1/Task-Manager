// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Authentication logic here
    setIsLoggedIn(true);
    toast.success('Logged in successfully!');
  };

  const handleSignup = (user) => {
    // Signup logic here
    setIsLoggedIn(true);
    toast.success('Signed up successfully!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info('Logged out successfully!');
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/tasks" element={<PrivateRoute element={<TaskList />} isAuthenticated={isLoggedIn} />} />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
