import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MaintenanceDetails() {
  const navigate = useNavigate();

  const request = {
    id: "MR-101",
    title: "Motor Repair",
    equipment: "CNC Machine (EQ-001)",
    technician: "Ravi",
    priority: "High",
    status: "In Progress",
    dueDate: "2025-12-12",
  };

  const timeline = [
    { text: "Request created", date: "10 Dec 2025" },
    { text: "Assigned to Ravi", date: "11 Dec 2025" },
    { text: "Marked In Progress", date: "12 Dec 2025" },
  ];

  const isOverdue = new Date(request.dueDate) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "30px", maxWidth: "900px" }}
    >
      <button onClick={() => navigate(-1)} style={backBtn}>
        ← Back
      </button>

      <h1>{request.title}</h1>

      {isOverdue && <OverdueBadge />}

      <div style={card}>
        <Info label="Equipment" value={request.equipment} />
        <Info label="Technician" value={request.technician} />
        <Info label="Priority" value={request.priority} />
        <Info label="Status" value={request.status} />
        <Info label="Due Date" value={request.dueDate} />
      </div>

      <h3 style={{ marginTop: "30px" }}>Activity Timeline</h3>

      <div style={timelineBox}>
        {timeline.map((t, i) => (
          <div key={i} style={timelineItem}>
            <div style={dot}></div>
            <div>
              <strong>{t.text}</strong>
              <p style={{ fontSize: "12px", color: "#64748b" }}>{t.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
        <button style={primaryBtn}>Mark as Done</button>
        <button style={dangerBtn}>Scrap Request</button>
      </div>
    </motion.div>
  );
}

/* ---------- COMPONENTS ---------- */

function Info({ label, value }) {
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
}

function OverdueBadge() {
  return (
    <span style={overdue}>
      ⏰ Overdue
    </span>
  );
}

/* ---------- STYLES ---------- */

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const timelineBox = {
  marginTop: "15px",
  paddingLeft: "10px",
};

const timelineItem = {
  display: "flex",
  gap: "12px",
  marginBottom: "16px",
};

const dot = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  background: "#2563eb",
  marginTop: "6px",
};

const overdue = {
  display: "inline-block",
  background: "#fee2e2",
  color: "#991b1b",
  padding: "6px 12px",
  borderRadius: "20px",
  marginBottom: "10px",
};

const primaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
};

const dangerBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
};

const backBtn = {
  marginBottom: "15px",
  background: "transparent",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
};
