import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { FiEdit2, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
=======
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiUser, 
  FiTool, 
  FiAlertCircle 
} from "react-icons/fi";
>>>>>>> ff749a0486352e5548648775af7d25790daa5656
import "./MaintenanceList.css";

export default function MaintenanceList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
<<<<<<< HEAD
  const [filterStatus, setFilterStatus] = useState("All");

  const maintenanceData = [
    {
      id: "MR-001",
      title: "Motor Repair - Conveyor Belt",
      equipment: "Conveyor Belt",
      status: "Open",
      priority: "High",
      assignedTo: "John Doe",
      dueDate: "2025-01-10",
    },
    {
      id: "MR-002",
      title: "AC Service - Server Room",
      equipment: "Air Conditioner",
      status: "In Progress",
      priority: "Medium",
      assignedTo: "Jane Smith",
      dueDate: "2025-01-05",
    },
    {
      id: "MR-003",
      title: "Hydraulic Pump Check",
      equipment: "Hydraulic Pump",
      status: "Done",
      priority: "Low",
      assignedTo: "Mike Johnson",
      dueDate: "2025-01-02",
    },
    {
      id: "MR-004",
      title: "CNC Machine Calibration",
      equipment: "CNC Machine",
      status: "Open",
      priority: "High",
      assignedTo: "Sarah Williams",
      dueDate: "2025-01-08",
    },
    {
      id: "MR-005",
      title: "Server Rack Maintenance",
      equipment: "Server Rack",
      status: "Overdue",
      priority: "Critical",
      assignedTo: "Robert Brown",
      dueDate: "2024-12-25",
    },
  ];

  const filtered = maintenanceData.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      m.equipment.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filterStatus === "All" || m.status === filterStatus;

    return matchSearch && matchFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "#ef4444";
      case "In Progress":
        return "#f59e0b";
      case "Done":
        return "#10b981";
      case "Overdue":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "#dc2626";
      case "High":
        return "#ea580c";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1>Maintenance Requests</h1>
          <p style={styles.subtitle}>Track and manage all maintenance activities</p>
        </div>
        <button style={styles.primaryBtn} onClick={() => navigate("/maintenance/new")}>
=======
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
>>>>>>> ff749a0486352e5548648775af7d25790daa5656
          <FiPlus size={18} /> New Request
        </button>
      </div>

<<<<<<< HEAD
      {/* FILTERS */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <FiSearch size={18} style={{ color: "#9ca3af" }} />
          <input
            type="text"
            placeholder="Search by ID, title, or equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          {["All", "Open", "In Progress", "Done", "Overdue"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                ...styles.filterBtn,
                background: filterStatus === status ? "#e0e7ff" : "#fff",
                color: filterStatus === status ? "#1d4ed8" : "#334155",
                borderColor: filterStatus === status ? "#3b82f6" : "#cbd5e1",
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>Request ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Equipment</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Priority</th>
            <th style={styles.th}>Assigned To</th>
            <th style={styles.th}>Due Date</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="8" style={styles.empty}>
                No maintenance requests found
              </td>
            </tr>
          ) : (
            filtered.map((m) => (
              <tr key={m.id} style={styles.tr}>
                <td style={styles.td}>
                  <strong>{m.id}</strong>
                </td>
                <td style={styles.td}>{m.title}</td>
                <td style={styles.td}>{m.equipment}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background: getStatusColor(m.status) + "20",
                      color: getStatusColor(m.status),
                      borderColor: getStatusColor(m.status),
                    }}
                  >
                    {m.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background: getPriorityColor(m.priority) + "20",
                      color: getPriorityColor(m.priority),
                      borderColor: getPriorityColor(m.priority),
                    }}
                  >
                    {m.priority}
                  </span>
                </td>
                <td style={styles.td}>{m.assignedTo}</td>
                <td style={styles.td}>{m.dueDate}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      style={styles.actionBtn}
                      onClick={() => navigate(`/maintenance/${m.id}`)}
                      title="View details"
                    >
                      <FiSearch size={16} />
                    </button>
                    <button
                      style={styles.actionBtn}
                      onClick={() => navigate(`/maintenance/${m.id}`)}
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      style={{ ...styles.actionBtn, color: "#ef4444" }}
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
=======
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
>>>>>>> ff749a0486352e5548648775af7d25790daa5656
    </div>
  );
}

<<<<<<< HEAD
const styles = {
  container: {
    padding: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  subtitle: {
    color: "#64748b",
    marginTop: "5px",
  },
  primaryBtn: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  filterBar: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    background: "#fff",
    flex: "1",
    minWidth: "300px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    flex: 1,
  },
  filterGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "8px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  table: {
    width: "100%",
    background: "#fff",
    borderRadius: "10px",
    borderCollapse: "collapse",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  thead: {
    background: "#f8fafc",
  },
  th: {
    textAlign: "left",
    padding: "14px 16px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    borderBottom: "2px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
    transition: "background 0.2s",
  },
  td: {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#334155",
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    border: "1px solid",
  },
  empty: {
    textAlign: "center",
    padding: "40px",
    color: "#64748b",
    fontSize: "14px",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  actionBtn: {
    background: "transparent",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
  },
};
=======
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
>>>>>>> ff749a0486352e5548648775af7d25790daa5656
