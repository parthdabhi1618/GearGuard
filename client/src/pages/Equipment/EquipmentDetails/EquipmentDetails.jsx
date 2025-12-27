export default function EquipmentDetails() {
  const equipment = {
    id: "EQ-001",
    name: "CNC Machine",
    serial: "SN1234",
    status: "Active",
    team: "Mechanical",
    technician: "Ravi",
  };

  const maintenance = [
    { id: 1, title: "Motor Repair", status: "Open", priority: "High" },
    { id: 2, title: "Lubrication", status: "Done", priority: "Low" },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1>Equipment Details</h1>
      <p style={{ color: "#64748b" }}>
        Complete information of selected equipment
      </p>

      {/* Equipment Info */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{equipment.name}</h2>
          <StatusBadge status={equipment.status} />
        </div>

        <Info label="Equipment ID" value={equipment.id} />
        <Info label="Serial Number" value={equipment.serial} />
        <Info label="Maintenance Team" value={equipment.team} />
        <Info label="Default Technician" value={equipment.technician} />

        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
          <button style={primaryBtn}>Create Maintenance</button>
          <button style={dangerBtn}>Mark as Scrap</button>
        </div>
      </div>

      {/* Maintenance List */}
      <h3 style={{ marginTop: "40px" }}>Maintenance History</h3>
      <table style={table}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            <th style={th}>ID</th>
            <th style={th}>Title</th>
            <th style={th}>Status</th>
            <th style={th}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {maintenance.map((m) => (
            <tr key={m.id}>
              <td style={td}>{m.id}</td>
              <td style={td}>{m.title}</td>
              <td style={td}>{m.status}</td>
              <td style={td}>{m.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Components ---------- */

function Info({ label, value }) {
  return (
    <p style={{ margin: "6px 0" }}>
      <strong>{label}:</strong> {value}
    </p>
  );
}

function StatusBadge({ status }) {
  const active = status === "Active";
  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        background: active ? "#dcfce7" : "#fee2e2",
        color: active ? "#166534" : "#991b1b",
      }}
    >
      {status}
    </span>
  );
}

/* ---------- Styles ---------- */

const card = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  marginTop: "20px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const primaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const dangerBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const table = {
  width: "100%",
  background: "#ffffff",
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
