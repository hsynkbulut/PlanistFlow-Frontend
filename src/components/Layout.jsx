import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';

const Layout = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="container-fluid">
          <p>
            &copy; {currentYear} PlanistFlow | Tüm Hakları Saklıdır | 
            <a href="/terms" className="ml-1">Kullanım Koşulları</a> | 
            <a href="/privacy" className="ml-1">Gizlilik Politikası</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 