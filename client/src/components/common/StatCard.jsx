export default function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        width: "230px",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ fontSize: "14px", color: "#64748b" }}>{title}</p>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );
}
