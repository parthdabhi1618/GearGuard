import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiUser, 
  FiTool, 
  FiAlertCircle 
} from "react-icons/fi";
import "./MaintenanceList.css";

export default function MaintenanceList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Mock Data (Replace with API call later)
  const requests = [
    { 
      id: "MR-101", 
      subject: "Motor overheating", 
      equipment: "CNC Machine", 
      eqId: "EQ-001",
      technician: "Ravi Sharma", 
      status: "Open", 
      priority: "High",
      date: "2025-12-10"
    },
    { 
      id: "MR-102", 
      subject: "Monthly Service", 
      equipment: "Air Conditioner", 
      eqId: "EQ-002",
      technician: "Amit Verma", 
      status: "Done", 
      priority: "Low",
      date: "2025-12-08"
    },
    { 
      id: "MR-103", 
      subject: "Server Fan Noise", 
      equipment: "Server Rack", 
      eqId: "EQ-003",
      technician: "Suresh Patel", 
      status: "In Progress", 
      priority: "Medium",
      date: "2025-12-12"
    },
    { 
        id: "MR-104", 
        subject: "Hydraulic Leak", 
        equipment: "Hydraulic Press", 
        eqId: "EQ-004",
        technician: "Ravi Sharma", 
        status: "Open", 
        priority: "Critical",
        date: "2025-12-15"
      },
  ];

  // Filter Logic
  const filteredData = requests.filter((item) => {
    const matchesSearch = item.subject.toLowerCase().includes(search.toLowerCase()) || 
                          item.equipment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="maintenance-list-container">
      
      {/* 1. Header */}
      <div className="list-header">
        <div className="list-title">
          <h1>Maintenance Requests</h1>
          <p>View and manage all corrective and preventive tasks</p>
        </div>
        <button onClick={() => navigate("/maintenance/new")} className="btn-new">
          <FiPlus size={18} /> New Request
        </button>
      </div>

      {/* 2. Toolbar */}
      <div className="list-toolbar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by subject or equipment..." 
            className="toolbar-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="toolbar-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* 3. Table */}
      <div className="table-container">
        <div style={{ overflowX: 'auto' }}>
            <table className="maintenance-table">
            <thead>
                <tr>
                <th>Subject</th>
                <th>Equipment</th>
                <th>Technician</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.length === 0 ? (
                <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                    No maintenance requests found.
                    </td>
                </tr>
                ) : (
                filteredData.map((req) => (
                    <tr key={req.id} onClick={() => navigate(`/maintenance/${req.id}`)}>
                    <td className="col-subject">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiAlertCircle size={16} color="#64748b" />
                        {req.subject}
                        </div>
                    </td>
                    <td className="col-equip">
                        {req.equipment} <span style={{ fontSize: '11px', color: '#94a3b8' }}>({req.eqId})</span>
                    </td>
                    <td>
                        <div className="tech-info">
                        <FiUser size={14} color="#64748b" /> {req.technician}
                        </div>
                    </td>
                    <td><PriorityBadge value={req.priority} /></td>
                    <td><StatusBadge value={req.status} /></td>
                    <td style={{ color: "#64748b" }}>{req.date}</td>
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

/* --- Internal Helpers (Badges) --- */

function PriorityBadge({ value }) {
  const map = {
    Critical: { bg: "#7f1d1d", text: "#fee2e2" }, // Dark Red
    High: { bg: "#fee2e2", text: "#991b1b" },     // Red
    Medium: { bg: "#fef3c7", text: "#92400e" },   // Orange
    Low: { bg: "#dcfce7", text: "#166534" },      // Green
  };
  const style = map[value] || map.Low;

  return (
    <span style={{
      background: style.bg,
      color: style.text,
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "600",
      display: "inline-block"
    }}>
      {value}
    </span>
  );
}

function StatusBadge({ value }) {
  const isDone = value === "Done";
  return (
    <span style={{
      background: isDone ? "#f0fdf4" : "#f1f5f9",
      color: isDone ? "#166534" : "#475569",
      border: `1px solid ${isDone ? "#bbf7d0" : "#e2e8f0"}`,
      padding: "4px 10px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: "600"
    }}>
      {value}
    </span>
  );
}