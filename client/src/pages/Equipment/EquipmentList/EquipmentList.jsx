import { useState } from "react";

export default function EquipmentList() {
  const [search, setSearch] = useState("");

  const equipmentData = [
    { id: "EQ-001", name: "CNC Machine", serial: "SN1234", status: "Active" },
    { id: "EQ-002", name: "Air Conditioner", serial: "SN5678", status: "Active" },
    { id: "EQ-003", name: "Server Rack", serial: "SN9101", status: "Scrapped" },
  ];

  const filtered = equipmentData.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1>Equipment</h1>
          <p style={{ color: "#64748b" }}>
            Manage all assets and machines
          </p>
        </div>

        <button style={addBtn}>+ Add Equipment</button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search equipment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchInput}
      />

      {/* Table */}
      <table style={table}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            <th style={th}>ID</th>
            <th style={th}>Name</th>
            <th style={th}>Serial No</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((eq) => (
            <tr key={eq.id}>
              <td style={td}>{eq.id}</td>
              <td style={td}>{eq.name}</td>
              <td style={td}>{eq.serial}</td>
              <td style={td}>
                <StatusBadge status={eq.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Components ---------- */

function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        background: isActive ? "#dcfce7" : "#fee2e2",
        color: isActive ? "#166534" : "#991b1b",
      }}
    >
      {status}
    </span>
  );
}

/* ---------- Styles ---------- */

const addBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const searchInput = {
  padding: "10px",
  width: "280px",
  borderRadius: "6px",
  border: "1px solid #cbd5f5",
  marginBottom: "20px",
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
