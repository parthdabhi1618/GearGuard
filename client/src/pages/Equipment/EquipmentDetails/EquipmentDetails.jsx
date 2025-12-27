import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiTool, 
  FiTrash2, 
  FiCpu, 
  FiActivity,
  FiAlertCircle,
  FiEdit
} from "react-icons/fi";
import "./EquipmentDetails.css";

export default function EquipmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [equipment, setEquipment] = useState({
    id: "EQ-001",
    name: "CNC Machine",
    serial: "SN1234",
    status: "Active",
    team: "Mechanical",
    teamId: "T-001",
    technician: "Ravi Sharma",
    technicianId: "TECH-001",
    model: "X-2000 Pro",
    installDate: "12 Jan, 2024",
    category: "Manufacturing",
    department: "Production"
  });

  const [maintenanceRequests, setMaintenanceRequests] = useState([
    { id: 101, title: "Motor Repair", status: "Open", priority: "High", date: "Oct 24, 2025" },
    { id: 102, title: "Lubrication", status: "Done", priority: "Low", date: "Sep 15, 2025" },
    { id: 103, title: "Belt Replacement", status: "In Progress", priority: "Medium", date: "Nov 1, 2025" },
  ]);

  // Calculate open requests count for smart button
  const openRequestsCount = maintenanceRequests.filter(r => 
    r.status !== "Done" && r.status !== "Scrapped"
  ).length;

  const handleScrapEquipment = () => {
    const confirmScrap = window.confirm(
      `Are you sure you want to scrap ${equipment.name}? This will mark the equipment as no longer usable.`
    );
    
    if (confirmScrap) {
      // Update equipment status
      setEquipment(prev => ({ ...prev, status: "Scrapped" }));
      
      // In a real app, this would make an API call:
      // await axios.put(`/api/equipment/${id}/scrap`);
      
      alert(`${equipment.name} has been marked as Scrapped. All related maintenance requests should be reviewed.`);
    }
  };

  const handleViewAllMaintenance = () => {
    // Navigate to filtered kanban view showing only this equipment's requests
    navigate(`/kanban?equipment=${equipment.id}`);
  };

  return (
    <div className="details-container">
      {/* 1. TOP NAVIGATION & ACTIONS */}
      <button onClick={() => navigate(-1)} className="back-btn">
        <FiArrowLeft /> Back to List
      </button>

      <div className="details-header">
        <div className="equipment-title">
          <h1>
            {equipment.name} 
            <StatusBadge status={equipment.status} />
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Managed by {equipment.team} Team • Assigned to {equipment.technician}
          </p>
        </div>

        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(`/equipment/${id}/edit`)}
          >
            <FiEdit /> Edit
          </button>
          
          <button 
            className="btn btn-danger"
            onClick={handleScrapEquipment}
            disabled={equipment.status === "Scrapped"}
          >
            <FiTrash2 /> {equipment.status === "Scrapped" ? "Already Scrapped" : "Scrap Asset"}
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={() => navigate("/maintenance/new", { 
              state: { 
                equipmentId: equipment.id,
                equipmentName: equipment.name,
                teamId: equipment.teamId,
                teamName: equipment.team,
                technicianId: equipment.technicianId,
                technicianName: equipment.technician
              }
            })}
          >
            <FiTool /> Create Maintenance
          </button>
        </div>
      </div>

      {/* SMART BUTTON - Maintenance Count */}
      <div className="smart-buttons-section">
        <button 
          className="smart-button"
          onClick={handleViewAllMaintenance}
        >
          <div className="smart-button-content">
            <FiTool className="smart-button-icon" />
            <div className="smart-button-text">
              <span className="smart-button-label">Maintenance Requests</span>
              <span className="smart-button-sublabel">View all related requests</span>
            </div>
          </div>
          <div className="smart-button-badge">
            <span className="badge-count">{openRequestsCount}</span>
            <span className="badge-label">Open</span>
          </div>
        </button>
      </div>

      {/* Warning if scrapped */}
      {equipment.status === "Scrapped" && (
        <div className="scrap-warning">
          <FiAlertCircle />
          <div>
            <strong>Equipment Scrapped</strong>
            <p>This equipment has been marked as scrapped and is no longer in active use.</p>
          </div>
        </div>
      )}

      {/* 2. MAIN DETAILS GRID */}
      <div className="details-layout">
        <div className="equipment-image-placeholder">
          <div style={{ textAlign: "center" }}>
            <FiCpu size={48} style={{ opacity: 0.3 }} />
            <p style={{ fontSize: "14px", marginTop: "10px" }}>No image uploaded</p>
          </div>
        </div>

        <div className="info-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <FiActivity color="#2563eb" size={20} />
            <h3 style={{ margin: 0, fontSize: '18px' }}>Specifications</h3>
          </div>
          
          <div className="info-grid">
            <InfoItem label="Equipment ID" value={equipment.id} />
            <InfoItem label="Serial Number" value={equipment.serial} />
            <InfoItem label="Model" value={equipment.model} />
            <InfoItem label="Installation Date" value={equipment.installDate} />
            <InfoItem label="Category" value={equipment.category} />
            <InfoItem label="Department" value={equipment.department} />
            <InfoItem label="Technician" value={equipment.technician} />
            <InfoItem label="Team" value={equipment.team} />
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* 3. MAINTENANCE HISTORY TABLE */}
      <div className="section-header-with-action">
        <h3 className="section-title">Maintenance History</h3>
        <span className="record-count">{maintenanceRequests.length} records</span>
      </div>
      
      <div className="table-wrapper">
        <div className="responsive-table">
          <table className="equipment-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRequests.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                    No maintenance history found
                  </td>
                </tr>
              ) : (
                maintenanceRequests.map((m) => (
                  <tr key={m.id} className="table-row">
                    <td style={{ fontWeight: 600, color: "#64748b" }}>#{m.id}</td>
                    <td style={{ fontWeight: 500 }}>{m.title}</td>
                    <td style={{ color: "#64748b" }}>{m.date}</td>
                    <td><StatusTextBadge status={m.status} /></td>
                    <td><PriorityBadge value={m.priority} /></td>
                    <td>
                      <button 
                        className="action-btn"
                        onClick={() => navigate(`/maintenance/${m.id}`)}
                      >
                        View Details
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

/* ---------- INTERNAL HELPERS ---------- */

function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const active = status === "Active";
  const scrapped = status === "Scrapped";
  
  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "14px",
        background: active ? "#dcfce7" : scrapped ? "#f1f5f9" : "#fee2e2",
        color: active ? "#166534" : scrapped ? "#64748b" : "#991b1b",
        border: `1px solid ${active ? "#bbf7d0" : scrapped ? "#cbd5e1" : "#fecaca"}`,
        verticalAlign: "middle",
        fontWeight: "600"
      }}
    >
      {status}
    </span>
  );
}

function StatusTextBadge({ status }) {
  const isDone = status === "Done";
  const isInProgress = status === "In Progress";
  const isScrapped = status === "Scrapped";
  
  let bg = "#f1f5f9";
  let color = "#334155";
  
  if (isDone) {
    bg = "#f0fdf4";
    color = "#166534";
  } else if (isInProgress) {
    bg = "#fef3c7";
    color = "#92400e";
  } else if (isScrapped) {
    bg = "#f1f5f9";
    color = "#64748b";
  }
  
  return (
    <span style={{ 
      color: color, 
      background: bg,
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: "500"
    }}>
      {status}
    </span>
  );
}

function PriorityBadge({ value }) {
  const map = {
    High: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
    Medium: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
    Low: { bg: "#dcfce7", text: "#166534", dot: "#22c55e" },
  };
  const style = map[value] || map.Low;

  return (
    <span style={{ 
      background: style.bg,
      color: style.text,
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px"
    }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: style.dot }}></span>
      {value}
    </span>
  );
}