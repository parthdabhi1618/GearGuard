import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { FiHome, FiTool, FiPlusCircle, FiColumns, FiCalendar, FiX, FiChevronDown, FiBarChart3, FiSettings, FiBell, FiUsers } from "react-icons/fi"; 
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const handleNavClick = () => {
    onClose();
  };

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
        <Menu to="/" icon={<FiHome />} text="Dashboard" onClick={handleNavClick} />

        <p className="menu-label">Workspace</p>
        <Menu to="/equipment" icon={<FiTool />} text="Equipment" onClick={handleNavClick} />
        
        {/* Maintenance Submenu */}
        <div className="menu-item">
          <button 
            className="menu-toggle"
            onClick={() => toggleMenu('maintenance')}
          >
            <span className="menu-content">
              <FiPlusCircle className="nav-icon" />
              <span className="link-text">Maintenance</span>
            </span>
            <FiChevronDown 
              className={`chevron ${expandedMenu === 'maintenance' ? 'expanded' : ''}`}
              size={18}
            />
          </button>
          {expandedMenu === 'maintenance' && (
            <div className="submenu">
              <SubMenu to="/maintenance" text="List" onClick={handleNavClick} />
              <SubMenu to="/maintenance/new" text="New Request" onClick={handleNavClick} />
              <SubMenu to="/teams" text="Teams" onClick={handleNavClick} />
            </div>
          )}
        </div>

        <Menu to="/kanban" icon={<FiColumns />} text="Kanban Board" onClick={handleNavClick} />
        <Menu to="/calendar" icon={<FiCalendar />} text="Calendar" onClick={handleNavClick} />

        <p className="menu-label">Analytics & Admin</p>
        <Menu to="/reports" icon={<FiBarChart3 />} text="Reports" onClick={handleNavClick} />
        <Menu to="/settings" icon={<FiSettings />} text="Settings" onClick={handleNavClick} />
        <Menu to="/notifications" icon={<FiBell />} text="Notifications" onClick={handleNavClick} />

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
          <p className="menu-label">Actions</p>
          <Menu to="/maintenance/new" icon={<FiPlusCircle />} text="New Maintenance" onClick={handleNavClick} />
        </div>
      </div>
    </>
  );
}

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

function SubMenu({ to, text, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => isActive ? "submenu-link active" : "submenu-link"}
    >
      {text}
    </NavLink>
  );
}