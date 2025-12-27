import { useNavigate } from "react-router-dom";
import "./StatCard.css"; // Ensure this import path is correct

export default function StatCard({ title, value, color, to, icon }) {
  const navigate = useNavigate();
  const isClickable = Boolean(to);

  return (
    <div
      className={`stat-card ${isClickable ? "clickable" : ""}`}
      onClick={() => isClickable && navigate(to)}
      // We pass the color to CSS via a variable or inline style for the specific dynamic elements
      style={{ color: color }} 
    >
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <h2 className="stat-value">{value}</h2>
      </div>

      {/* Render Icon only if provided */}
      {icon && (
        <div 
          className="stat-icon-box"
          style={{ 
            backgroundColor: `${color}20`, // Adds 20% opacity to the hex color
            color: color 
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
}