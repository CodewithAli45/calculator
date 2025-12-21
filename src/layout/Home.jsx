// src/layout/HomeLayout.jsx
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../styles/layout.css';

export default function Home() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes('scientific')) return 'Scientific Calculator';
    return 'Basic Calculator';
  };

  return (
    <div className="app-container">
      <Header title={getTitle()} onMenuClick={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      
      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
