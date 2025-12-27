import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiPlus, FiEye, FiFilter, FiAlertCircle } from "react-icons/fi";
import "./EquipmentList.css";

export default function EquipmentList() {
  const navigate = useNavigate();

  // State for Data & UI
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // 1. Fetch Data from Backend
  useEffect(() => {
    fetchEquipment();
  }, []);

  async function fetchEquipment() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.get("http://localhost:5000/api/equipment", config);
      setEquipment(response.data);
    } catch (error) {
      console.error("Error loading equipment:", error);
    } finally {
      setLoading(false);
    }
  }

  // 2. Filter & Search Logic
  const filtered = equipment.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase()); // Searching by Name or Code

    // Backend status is lowercase, so we normalize
    const matchFilter = filter === "All" || e.status === filter.toLowerCase();

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

        <button 
          className="primary-btn"
          onClick={() => navigate("/equipment/add")} // This route needs to exist in App.js
        >
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
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="modern-input"
          />
        </div>

        {/* Filter Buttons */}
        <div className="filter-group">
          {["All", "Operational", "Maintenance", "Down"].map((f) => (
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
                <th>Code / ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="empty-state">Loading equipment data...</td>
                </tr>
              ) : equipment.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No equipment found. Add your first asset.
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No equipment matches your search.
                  </td>
                </tr>
              ) : (
                filtered.map((eq) => (
                  <tr
                    key={eq._id}
                    className="table-row"
                    onClick={() => navigate(`/equipment/${eq._id}`)} // View Details
                  >
                    <td style={{ fontWeight: 600, color: "#3b82f6" }}>{eq.code}</td>
                    <td style={{ fontWeight: 500, color: "#0f172a" }}>{eq.name}</td>
                    <td style={{ color: "#64748b" }}>{eq.location}</td>
                    <td style={{ color: "#64748b" }}>{eq.department || "-"}</td>
                    <td>
                      <StatusBadge status={eq.status} />
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        className="action-btn"
                        onClick={() => navigate(`/equipment/${eq._id}`)}
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
  // Normalize status to handle different casing from backend
  const s = status ? status.toLowerCase() : "unknown";

  const styles = {
    operational: { bg: "#dcfce7", color: "#166534", dot: "#22c55e", label: "Active" },
    maintenance: { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b", label: "Maintenance" },
    down: { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444", label: "Down" },
    scrapped: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8", label: "Scrapped" },
    unknown: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8", label: "Unknown" }
  };

  const style = styles[s] || styles.unknown;

  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        textTransform: "capitalize"
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: style.dot }}></span>
      {style.label}
    </span>
  );
}