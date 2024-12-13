import React from 'react';
import LinkUpLogo from '../assets/linkup_logo.jpeg';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={LinkUpLogo} />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
