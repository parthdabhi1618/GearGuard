import { useNavigate } from "react-router-dom";

export default function StatCard({ title, value, color, to }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => to && navigate(to)}
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        width: "230px",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        cursor: to ? "pointer" : "default",
        transition: "0.2s",
      }}
    >
      <p style={{ fontSize: "14px", color: "#64748b" }}>{title}</p>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );
}
