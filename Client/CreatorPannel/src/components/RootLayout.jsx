import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout; 