import { useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiClock, 
  FiFileText, 
  FiActivity 
} from "react-icons/fi";
import "./MaintenanceDetails.css";

export default function MaintenanceDetails() {
  const navigate = useNavigate();

  const request = {
    id: "MR-101",
    title: "Motor Repair - Conveyor",
    equipment: "CNC Machine (EQ-001)",
    technician: "Ravi Sharma",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-12-10", // Set to past date to show Overdue logic
    description: "Motor makes loud grinding noise during startup sequence. Needs coil inspection and bearing replacement."
  };

  const timeline = [
    { text: "Request Created", date: "10 Dec 2025", active: true },
    { text: "Assigned to Ravi", date: "11 Dec 2025", active: true },
    { text: "Work Started", date: "12 Dec 2025", active: true },
    { text: "Parts Ordered", date: "13 Dec 2025", active: false },
    { text: "Completion", date: "-", active: false },
  ];

  const isOverdue = new Date(request.dueDate) < new Date();

  return (
    <div className="maintenance-container">
      
      {/* 1. Navigation */}
      <button onClick={() => navigate(-1)} className="back-nav">
        <FiArrowLeft /> Back to List
      </button>

      {/* 2. Header & Actions */}
      <div className="header-row">
        <div className="request-title">
          <h1>{request.title}</h1>
          <div className="request-meta">
            <span style={{ color: "#64748b", fontWeight: 500 }}>#{request.id}</span>
            <PriorityBadge value={request.priority} />
            <StatusBadge value={request.status} />
          </div>
        </div>

        <div className="action-group">
          <button className="btn btn-danger">Scrap Request</button>
          <button className="btn btn-primary">
            <FiCheckCircle /> Mark Done
          </button>
        </div>
      </div>

      {/* 3. Main Layout Grid */}
      <div className="details-grid">
        
        {/* Left Column: Details */}
        <div className="detail-column">
          
          {isOverdue && (
            <div className="overdue-alert">
              <FiAlertTriangle />
              <span>This request is overdue by 2 days.</span>
            </div>
          )}

          <div className="detail-card">
            <div className="card-title">
              <FiFileText color="#2563eb" /> Request Details
            </div>
            
            <div className="info-fields">
              <InfoItem label="Equipment" value={request.equipment} />
              <InfoItem label="Technician" value={request.technician} />
              <InfoItem label="Due Date" value={request.dueDate} />
              <InfoItem label="Department" value="Mechanical" />
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
               <div className="field-label">Description</div>
               <p style={{ color: "#334155", lineHeight: "1.6" }}>{request.description}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="timeline-column">
          <div className="detail-card">
            <div className="card-title">
              <FiActivity color="#2563eb" /> Activity Log
            </div>
            
            <div className="timeline-container">
              {timeline.map((t, i) => (
                <div key={i} className={`timeline-item ${t.active ? 'active' : ''}`}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-text">{t.text}</div>
                  <div className="timeline-date">{t.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------- HELPER COMPONENTS ---------- */

function InfoItem({ label, value }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <div className="field-value">{value}</div>
    </div>
  );
}

function PriorityBadge({ value }) {
  const map = {
    High: { bg: "#fee2e2", text: "#991b1b" },
    Medium: { bg: "#fef3c7", text: "#92400e" },
    Low: { bg: "#dcfce7", text: "#166534" },
  };
  const style = map[value];
  return (
    <span style={{ 
      background: style.bg, color: style.text, 
      padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" 
    }}>
      {value}
    </span>
  );
}

function StatusBadge({ value }) {
    return (
        <span style={{ 
            background: "#f1f5f9", color: "#475569", 
            padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600",
            border: "1px solid #e2e8f0"
        }}>
          {value}
        </span>
    )
}