import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiShield, FiLogOut, FiUser, FiChevronDown, FiSettings } from "react-icons/fi";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Guest", role: "Visitor", email: "" });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 1. Load User Data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // Also try to get email if you saved it, otherwise default
    const storedEmail = localStorage.getItem("email") || "admin@gearguard.com"; 
    
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ ...parsed, email: storedEmail });
    }
  }, []);

  // 2. Handle Click Outside to Close Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Logout Logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Helper to get initials
  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : "U";

  return (
    <header className="app-header">
      {/* LEFT: Logo */}
      <div className="header-brand" onClick={() => navigate("/dashboard")}>
        <FiShield size={24} className="brand-icon" />
        <span className="brand-name">GearGuard</span>
      </div>

      {/* RIGHT: Profile Section */}
      <div className="header-profile-container" ref={dropdownRef}>
        
        {/* Clickable Trigger */}
        <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
          <div className="profile-info">
            <span className="profile-name">{user.name}</span>
            <span className="profile-status">
              <span className="status-dot"></span> Online
            </span>
          </div>
          
          <div className="profile-avatar">
            {getInitials(user.name)}
          </div>
          
          <FiChevronDown className={`chevron ${isOpen ? "open" : ""}`} />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-header">
              <div className="dropdown-avatar-large">{getInitials(user.name)}</div>
              <div className="dropdown-user-details">
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </div>
            </div>
            
            <div className="dropdown-body">
              <div className="dropdown-item">
                <FiUser /> My Profile
              </div>
              <div className="dropdown-item">
                <FiSettings /> Settings
              </div>
            </div>

            <div className="dropdown-footer">
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}