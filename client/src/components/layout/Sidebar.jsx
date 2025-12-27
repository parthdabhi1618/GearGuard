import React from 'react';
import { NavLink } from "react-router-dom";
import { FiHome, FiTool, FiPlusCircle, FiColumns, FiCalendar, FiX } from "react-icons/fi"; // Added FiX for close button
import './Sidebar.css';

// Accept 'isOpen' and 'onClose' props
export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      />

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        
        {/* Mobile Header with Close Button */}
        <div className="sidebar-mobile-header">
          <span className="brand-name-mobile">GearGuard</span>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <p className="menu-label">Menu</p>
        <Menu to="/" icon={<FiHome />} text="Dashboard" onClick={onClose} />

        <p className="menu-label">Workspace</p>
        <Menu to="/equipment" icon={<FiTool />} text="Equipment" onClick={onClose} />
        <Menu to="/kanban" icon={<FiColumns />} text="Kanban Board" onClick={onClose} />
        <Menu to="/calendar" icon={<FiCalendar />} text="Calendar" onClick={onClose} />

        <div style={{ marginTop: 'auto' }}>
          <p className="menu-label">Actions</p>
          <Menu to="/maintenance/new" icon={<FiPlusCircle />} text="New Maintenance" onClick={onClose} />
        </div>
      </div>
    </>
  );
}

// Updated Menu to handle closing sidebar when a link is clicked
function Menu({ to, icon, text, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
    >
      <span className="nav-icon">{icon}</span>
      <span className="link-text">{text}</span>
    </NavLink>
  );
}