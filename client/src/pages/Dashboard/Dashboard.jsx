import "./Dashboard.css";
import StatCard from "../../components/common/StatCard";


export default function Dashboard() {
  const stats = {
    equipment: 18,
    open: 6,
    overdue: 2,
    scrapped: 1,
  };

  const recent = [
    { id: 1, title: "Motor Repair", status: "Open", priority: "High" },
    { id: 2, title: "AC Service", status: "Done", priority: "Low" },
    { id: 3, title: "Server Check", status: "In Progress", priority: "Medium" },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>
      <p style={{ color: "#64748b" }}>
        Overview of maintenance activities
      </p>

      {/* Stats */}
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

      {/* Table */}
      <h3 style={{ marginTop: "40px" }}>Recent Maintenance</h3>
      <table
        style={{
          width: "100%",
          background: "#fff",
          marginTop: "10px",
          borderRadius: "10px",
          borderCollapse: "collapse",
          overflow: "hidden",
        }}
      >
        <thead style={{ background: "#f8fafc" }}>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Title</th>
            <th style={th}>Status</th>
            <th style={th}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((r) => (
            <tr key={r.id}>
              <td style={td}>{r.id}</td>
              <td style={td}>{r.title}</td>
              <td style={td}>{r.status}</td>
              <td style={td}>{r.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "12px",
  fontSize: "14px",
  color: "#475569",
};

const td = {
  padding: "12px",
  fontSize: "14px",
  borderTop: "1px solid #e2e8f0",
};
