import React from 'react';
import { NavLink } from "react-router-dom";
import { 
  FiHome, 
  FiTool, 
  FiPlusCircle, 
  FiColumns, 
  FiCalendar, 
  FiList, 
  FiUsers, 
  FiPieChart, 
  FiX 
} from "react-icons/fi"; 
import './Sidebar.css';

// Accept 'isOpen' and 'onClose' props for mobile handling
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

        {/* --- MAIN --- */}
        <p className="menu-label">Main</p>
        <Menu to="/" icon={<FiHome />} text="Dashboard" onClick={onClose} />
        <Menu to="/reports" icon={<FiPieChart />} text="Analytics" onClick={onClose} />

        {/* --- ASSETS & TEAMS --- */}
        <p className="menu-label">Resources</p>
        <Menu to="/equipment" icon={<FiTool />} text="Equipment" onClick={onClose} />
        <Menu to="/teams" icon={<FiUsers />} text="Teams" onClick={onClose} />

        {/* --- MAINTENANCE WORKFLOW --- */}
        <p className="menu-label">Workflows</p>
        <Menu to="/maintenance" icon={<FiList />} text="Maintenance List" onClick={onClose} />
        <Menu to="/kanban" icon={<FiColumns />} text="Kanban Board" onClick={onClose} />
        <Menu to="/calendar" icon={<FiCalendar />} text="Calendar" onClick={onClose} />

        {/* --- ACTIONS --- */}
        <div style={{ marginTop: 'auto' }}>
          <p className="menu-label">Actions</p>
          <Menu to="/maintenance/new" icon={<FiPlusCircle />} text="New Request" onClick={onClose} />
        </div>
      </div>
    </>
  );
}

// Menu Link Component
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