import React from 'react';
import { useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiTool, 
  FiTrash2, 
  FiCpu, 
  FiActivity 
} from "react-icons/fi";
import "./EquipmentDetails.css";

export default function EquipmentDetails() {
  const navigate = useNavigate();

  const equipment = {
    id: "EQ-001",
    name: "CNC Machine",
    serial: "SN1234",
    status: "Active",
    team: "Mechanical",
    technician: "Ravi Sharma",
    model: "X-2000 Pro",
    installDate: "12 Jan, 2024"
  };

  const maintenance = [
    { id: 101, title: "Motor Repair", status: "Open", priority: "High", date: "Oct 24, 2025" },
    { id: 102, title: "Lubrication", status: "Done", priority: "Low", date: "Sep 15, 2025" },
  ];

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
            Managed by {equipment.team} Team
          </p>
        </div>

        <div className="header-actions">
            {/* Secondary Action */}
          <button className="btn btn-danger">
            <FiTrash2 /> Scrap Asset
          </button>
          
          {/* Primary Action */}
          <button className="btn btn-primary" onClick={() => navigate("/maintenance/new")}>
            <FiTool /> Create Maintenance
          </button>
        </div>
      </div>

      {/* 2. MAIN DETAILS GRID */}
      <div className="details-layout">
        {/* Left: Image Placeholder */}
        <div className="equipment-image-placeholder">
          <div style={{ textAlign: "center" }}>
            <FiCpu size={48} style={{ opacity: 0.3 }} />
            <p style={{ fontSize: "14px", marginTop: "10px" }}>No image uploaded</p>
          </div>
        </div>

        {/* Right: Info Card */}
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
            <InfoItem label="Technician" value={equipment.technician} />
            <InfoItem label="Team" value={equipment.team} />
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* 3. MAINTENANCE HISTORY TABLE */}
      <h3 className="section-title">Maintenance History</h3>
      
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
              </tr>
            </thead>
            <tbody>
              {maintenance.map((m) => (
                <tr key={m.id} className="table-row">
                  <td style={{ fontWeight: 600, color: "#64748b" }}>#{m.id}</td>
                  <td style={{ fontWeight: 500 }}>{m.title}</td>
                  <td style={{ color: "#64748b" }}>{m.date}</td>
                  <td><StatusTextBadge status={m.status} /></td>
                  <td><PriorityBadge value={m.priority} /></td>
                </tr>
              ))}
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
  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "14px",
        background: active ? "#dcfce7" : "#fee2e2",
        color: active ? "#166534" : "#991b1b",
        border: `1px solid ${active ? "#bbf7d0" : "#fecaca"}`,
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
    return (
        <span style={{ 
            color: isDone ? "#166534" : "#334155", 
            background: isDone ? "#f0fdf4" : "#f1f5f9",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "500"
        }}>
            {status}
        </span>
    )
}

function PriorityBadge({ value }) {
    const map = {
      High: { bg: "#fee2e2", text: "#991b1b" },
      Medium: { bg: "#fef3c7", text: "#92400e" },
      Low: { bg: "#dcfce7", text: "#166534" },
    };
    const style = map[value] || map.Low;
  
    return (
      <span style={{ color: style.text, fontWeight: 600, fontSize: "13px" }}>
        {value}
      </span>
    );
  }