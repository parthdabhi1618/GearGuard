import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiSettings, FiChevronDown } from "react-icons/fi";
import "./ProfileDropdown.css"; // We will create this CSS next

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Admin", role: "Manager" });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load user data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>
      {/* TRIGGER BUTTON */}
      <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <div className="avatar-circle">
          {getInitials(user.name)}
        </div>
        <div className="user-info-text">
          <span className="user-name">{user.name}</span>
          <span className="user-role">{user.role}</span>
        </div>
        <FiChevronDown className={`chevron-icon ${isOpen ? "open" : ""}`} />
      </div>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="dropdown-menu">
          <div className="menu-header">
            <div className="menu-avatar">{getInitials(user.name)}</div>
            <div>
              <strong>{user.name}</strong>
              <p>{user.email || "user@gearguard.com"}</p>
            </div>
          </div>
          
          <div className="menu-body">
            <div className="menu-item">
              <FiUser /> My Profile
            </div>
            <div className="menu-item">
              <FiSettings /> Settings
            </div>
          </div>

          <div className="menu-footer">
            <button onClick={handleLogout} className="logout-btn-small">
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}