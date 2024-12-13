import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from './main_pages/Loading';
import Onboard from './main_pages/Onboard';
import Start from './main_pages/Login';
import Home from './main_pages/Home';
import Chats from './main_pages/Chat';
import Profile from './main_pages/Profile';
import Create from './main_pages/Create';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // After 7 seconds, hide the loading screen
    }, 7000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Onboard />} />
          <Route path="/start" element={<Start />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
