
import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer'; // Assuming you have a Footer component

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet /> {/* This will render the specific public page */}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;

