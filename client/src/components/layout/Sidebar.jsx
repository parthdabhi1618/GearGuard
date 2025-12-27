import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiTool,
  FiPlusCircle,
  FiColumns,
  FiCalendar,
} from "react-icons/fi";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "230px",
        background: "#ffffff",
        height: "calc(100vh - 60px)",
        padding: "20px",
        borderRight: "1px solid #e2e8f0",
      }}
    >
      <Menu to="/" icon={<FiHome />} text="Dashboard" />
      <Menu to="/equipment" icon={<FiTool />} text="Equipment" />
      <Menu to="/maintenance/new" icon={<FiPlusCircle />} text="New Maintenance" />
      <Menu to="/kanban" icon={<FiColumns />} text="Kanban Board" />
      <Menu to="/calendar" icon={<FiCalendar />} text="Calendar" />
    </div>
  );
}

function Menu({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        marginBottom: "8px",
        borderRadius: "8px",
        fontSize: "14px",
        background: isActive ? "#e0e7ff" : "transparent",
        color: isActive ? "#1d4ed8" : "#334155",
        transition: "0.2s",
      })}
    >
      {icon}
      {text}
    </NavLink>
  );
}
