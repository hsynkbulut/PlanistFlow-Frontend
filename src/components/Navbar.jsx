import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Avatar } from './ui';
import { FiMenu, FiX, FiHome, FiBarChart2, FiHelpCircle, FiUser, FiLogOut, FiClipboard, FiCheckSquare } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!userMenuOpen) return;
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard" className="navbar-logo">
            <div className="logo-icon">
              <FiCheckSquare className="logo-icon-inner" />
            </div>
            <span>PlanistFlow</span>
          </Link>
          
          <button 
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        
        <div className={`navbar-menu ${menuOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link 
              to="/dashboard" 
              className={`navbar-item ${isActive('/dashboard') ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              <FiClipboard className="navbar-icon" />
              <span>Görevler</span>
            </Link>
            
            <Link 
              to="/statistics" 
              className={`navbar-item ${isActive('/statistics') ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              <FiBarChart2 className="navbar-icon" />
              <span>İstatistikler</span>
            </Link>
            
            <Link 
              to="/help" 
              className={`navbar-item ${isActive('/help') ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              <FiHelpCircle className="navbar-icon" />
              <span>Yardım</span>
            </Link>
          </div>
          
          <div className="navbar-end">
            {user && (
              <div className="navbar-user-container" ref={userMenuRef}>
                <div className="navbar-user" onClick={() => setUserMenuOpen(v => !v)} tabIndex={0} style={{userSelect:'none'}}>
                  <Avatar 
                    name={user.name || user.username}
                    size="sm"
                    className="navbar-avatar"
                  />
                  <span className="navbar-username">{user.username}</span>
                </div>
                {userMenuOpen && (
                  <div className="navbar-user-menu">
                    <Link 
                      to="/profile" 
                      className="navbar-user-item"
                      onClick={() => { setUserMenuOpen(false); closeMenu(); }}
                    >
                      <FiUser className="navbar-icon" />
                      <span>Profil</span>
                    </Link>
                    <button 
                      className="navbar-user-item navbar-logout"
                      onClick={() => {
                        setUserMenuOpen(false);
                        closeMenu();
                        handleLogout();
                      }}
                    >
                      <FiLogOut className="navbar-icon" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 