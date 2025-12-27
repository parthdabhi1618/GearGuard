import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EquipmentList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const equipmentData = [
    { id: "EQ-001", name: "CNC Machine", serial: "SN1234", status: "Active" },
    { id: "EQ-002", name: "Air Conditioner", serial: "SN5678", status: "Active" },
    { id: "EQ-003", name: "Server Rack", serial: "SN9101", status: "Scrapped" },
  ];

  const filtered = equipmentData.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || e.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div style={{ padding: "30px" }}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <h1>Equipment</h1>
          <p style={{ color: "#64748b" }}>Manage all assets and machines</p>
        </div>

        <button style={primaryBtn} onClick={() => navigate("/equipment/add")}>
          + Add Equipment
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div style={toolbar}>
        <input
          type="text"
          placeholder="Search equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        <div style={filterGroup}>
          {["All", "Active", "Scrapped"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...filterBtn,
                background: filter === f ? "#e0e7ff" : "#fff",
                color: filter === f ? "#1d4ed8" : "#334155",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <table style={table}>
        <thead style={{ background: "#f8fafc" }}>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Name</th>
            <th style={th}>Serial No</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipmentData.length === 0 ? (
            <tr>
              <td colSpan="5" style={empty}>
                No equipment found. Add your first asset.
              </td>
            </tr>
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan="5" style={empty}>
                No equipment matches your search.
              </td>
            </tr>
          ) : (
            filtered.map((eq) => (
              <tr
                key={eq.id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/equipment/${eq.id}`)}
              >
                <td style={td}>{eq.id}</td>
                <td style={td}>{eq.name}</td>
                <td style={td}>{eq.serial}</td>
                <td style={td}>
                  <StatusBadge status={eq.status} />
                </td>
                <td style={td} onClick={(e) => e.stopPropagation()}>
                  <button
                    style={linkBtn}
                    onClick={() => navigate(`/equipment/${eq.id}`)}
                  >
                    View
                  </button>
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

function StatusBadge({ status }) {
  const active = status === "Active";
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        background: active ? "#dcfce7" : "#fee2e2",
        color: active ? "#166534" : "#991b1b",
      }}
    >
      {status}
    </span>
  );
}

/* ---------- STYLES ---------- */

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const toolbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0",
};

const searchInput = {
  padding: "10px",
  width: "280px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
};

const filterGroup = {
  display: "flex",
  gap: "8px",
};

const filterBtn = {
  border: "1px solid #cbd5e1",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "13px",
  cursor: "pointer",
};

const primaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const linkBtn = {
  background: "transparent",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  fontSize: "13px",
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

const empty = {
  textAlign: "center",
  padding: "24px",
  color: "#64748b",
};
