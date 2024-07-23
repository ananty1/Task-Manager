// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, signupUser,googleLoginUser } from './utils/api';
import { removeToken, saveToken, getToken } from './utils/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AddTaskForm from './components/AddTaskForm';


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

  const handleGoogleLogin = async (token) => {
    try {
      const response = await googleLoginUser(token);
      saveToken(response.token);
      setIsLoggedIn(true);
      toast.success('Logged in successfully!');
      navigate('/tasks');
    } catch (error) {
      toast.error('Google login failed: ' + error.message);
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
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/tasks" element={<PrivateRoute element={<TaskList />} isAuthenticated={isLoggedIn} />} />
        <Route path="/create-task" element={<PrivateRoute element={<AddTaskForm />} isAuthenticated={isLoggedIn} />} />
        <Route path="/" element={<Login onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />} />

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
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID_PROVIDER}` || ''}>
    <Router>
      <div className="App">
        <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
