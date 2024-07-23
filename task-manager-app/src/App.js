// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, signupUser } from './utils/api';
import { removeToken, saveToken, getToken } from './utils/auth';

const PrivateRoute = ({ element, isAuthenticated }) => {
  const token =getToken()

  return token ? element : <Navigate to="/login" />;
};

const AppContent = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      saveToken(response.token);
      setIsLoggedIn(true);
      toast.success('Logged in successfully!');
      navigate('/tasks');
    } catch (error) {
      toast.error('Login failed: ' + error.message);
    }
  };

  const handleSignup = async (user) => {
    try {
      const response = await signupUser(user);
      saveToken(response.token);
      setIsLoggedIn(true);
      toast.success(response.message);
      navigate('/tasks');
    } catch (error) {
      toast.error('Signup failed: ' + error.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info('Logged out successfully!');
    removeToken();
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/" element={<PrivateRoute element={<TaskList />} isAuthenticated={isLoggedIn} />} />
        <Route path="/tasks" element={<PrivateRoute element={<TaskList />} isAuthenticated={isLoggedIn} />} />
        {/* <Route path="/" element={<Login onLogin={handleLogin} />} /> */}
      </Routes>
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  return (
    <Router>
      <div className="App">
        <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </Router>
  );
};

export default App;
