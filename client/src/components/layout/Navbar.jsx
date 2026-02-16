import React from 'react';
import './Navbar.css';

// Accept the 'onMenuClick' prop to trigger the sidebar
export default function Navbar({ onMenuClick }) {
  return (
    <nav className="navbar">
      <div className="logo-container">
        {/* HAMBURGER BUTTON (Mobile Only) */}
        <button className="hamburger-btn" onClick={onMenuClick}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Existing Logo */}
        <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <h3 className="brand-name">Campus Service Desk</h3>
      </div>

      <div className="profile-pill">
        <div className="profile-info">
          <span className="profile-role">Admin</span>
          <span className="profile-status">Online</span>
        </div>
        <div className="avatar-container">A</div>
      </div>
    </nav>
  );
}