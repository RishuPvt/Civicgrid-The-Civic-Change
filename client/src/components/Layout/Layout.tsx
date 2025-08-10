
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation.tsx';

function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      
      <Navigation />

      {/* Main content container with a responsive left margin */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 pt-20 md:pt-8">
          
          <Outlet />

        </main>
      </div>
    </div>
  );
}

export default AppLayout;
