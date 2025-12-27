import StatCard from "../../components/common/StatCard";

export default function Dashboard() {
  // TEMP static data (replace with backend later)
  const stats = {
    equipment: 12,
    open: 5,
    overdue: 2,
    scrapped: 1,
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>GearGuard Dashboard</h1>
      <p style={{ color: "#64748b" }}>
        The Ultimate Maintenance Tracker
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <StatCard title="Total Equipment" value={stats.equipment} color="#3b82f6" />
        <StatCard title="Open Requests" value={stats.open} color="#f59e0b" />
        <StatCard title="Overdue" value={stats.overdue} color="#ef4444" />
        <StatCard title="Scrapped" value={stats.scrapped} color="#64748b" />
      </div>
    </div>
  );
}
