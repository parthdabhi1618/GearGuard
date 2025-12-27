import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiPlus, FiEye, FiFilter } from "react-icons/fi";
import "./EquipmentList.css";

export default function EquipmentList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const equipmentData = [
    { id: "EQ-001", name: "CNC Machine", serial: "SN1234", status: "Active" },
    { id: "EQ-002", name: "Air Conditioner", serial: "SN5678", status: "Active" },
    { id: "EQ-003", name: "Server Rack", serial: "SN9101", status: "Scrapped" },
    { id: "EQ-004", name: "Hydraulic Press", serial: "SN2299", status: "Active" },
  ];

  const filtered = equipmentData.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || e.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="equipment-container">
      {/* HEADER */}
      <div className="page-header">
        <div className="page-title">
          <h1>Equipment</h1>
          <p>Manage all assets and machines</p>
        </div>

        <button className="primary-btn">
          <FiPlus size={18} /> Add Equipment
        </button>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        {/* Search */}
        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="modern-input"
          />
        </div>

        {/* Filter Buttons */}
        <div className="filter-group">
          {["All", "Active", "Scrapped"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <div className="responsive-table">
          <table className="equipment-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Serial No</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipmentData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No equipment found. Add your first asset.
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No equipment matches your search.
                  </td>
                </tr>
              ) : (
                filtered.map((eq) => (
                  <tr
                    key={eq.id}
                    className="table-row"
                    onClick={() => navigate(`/equipment/${eq.id}`)}
                  >
                    <td style={{ fontWeight: 600, color: "#64748b" }}>{eq.id}</td>
                    <td style={{ fontWeight: 500, color: "#0f172a" }}>{eq.name}</td>
                    <td>{eq.serial}</td>
                    <td>
                      <StatusBadge status={eq.status} />
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        className="action-btn"
                        onClick={() => navigate(`/equipment/${eq.id}`)}
                      >
                        <FiEye /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- INTERNAL COMPONENTS ---------- */

function StatusBadge({ status }) {
  const isActive = status === "Active";
  const isScrapped = status === "Scrapped";
  
  let bg = "#f1f5f9";
  let color = "#475569";
  let dot = "#94a3b8";

  if (isActive) {
    bg = "#dcfce7";
    color = "#166534";
    dot = "#22c55e";
  } else if (isScrapped) {
    bg = "#f1f5f9";
    color = "#475569";
    dot = "#94a3b8";
  }

  return (
    <span
      style={{
        background: bg,
        color: color,
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px"
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: dot }}></span>
      {status}
    </span>
  );
}