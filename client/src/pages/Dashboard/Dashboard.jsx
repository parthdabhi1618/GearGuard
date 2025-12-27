import { useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard";

export default function Dashboard() {
  const navigate = useNavigate();

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
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontWeight: 700 }}>Dashboard</h1>
          <p style={{ color: "#64748b" }}>Overview of maintenance activities</p>
        </div>

        <button
          onClick={() => navigate("/maintenance/new")}
          style={primaryBtn}
        >
          + Create Maintenance
        </button>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <StatCard title="Total Equipment" value={stats.equipment} color="#3b82f6" to="/equipment" />
        <StatCard title="Open Requests" value={stats.open} color="#f59e0b" to="/kanban" />
        <StatCard title="Overdue" value={stats.overdue} color="#ef4444" to="/kanban" />
        <StatCard title="Scrapped" value={stats.scrapped} color="#64748b" to="/equipment" />
      </div>

      {/* RECENT MAINTENANCE */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Recent Maintenance</h3>
        <span
          onClick={() => navigate("/kanban")}
          style={{ color: "#2563eb", cursor: "pointer", fontSize: "14px" }}
        >
          View all →
        </span>
      </div>

      <table style={table}>
        <thead style={{ background: "#f8fafc" }}>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Title</th>
            <th style={th}>Status</th>
            <th style={th}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {recent.length === 0 ? (
            <tr>
              <td colSpan="4" style={empty}>
                No maintenance requests yet
              </td>
            </tr>
          ) : (
            recent.map((r) => (
              <tr key={r.id}>
                <td style={td}>{r.id}</td>
                <td style={td}>{r.title}</td>
                <td style={td}>{r.status}</td>
                <td style={td}>
                  <PriorityBadge value={r.priority} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function PriorityBadge({ value }) {
  const map = {
    High: ["#fee2e2", "#991b1b"],
    Medium: ["#fef3c7", "#92400e"],
    Low: ["#dcfce7", "#166534"],
  };

  const [bg, color] = map[value];

  return (
    <span
      style={{
        background: bg,
        color,
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
      }}
    >
      {value}
    </span>
  );
}

/* ---------- STYLES ---------- */

const primaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const table = {
  width: "100%",
  background: "#ffffff",
  marginTop: "10px",
  borderRadius: "10px",
  borderCollapse: "collapse",
  overflow: "hidden",
};

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

const empty = {
  textAlign: "center",
  padding: "20px",
  color: "#64748b",
};
