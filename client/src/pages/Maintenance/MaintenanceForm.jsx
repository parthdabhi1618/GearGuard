import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiSave, 
  FiInfo, 
  FiTool, 
  FiFileText 
} from "react-icons/fi"; 
import "./MaintenanceForm.css";

export default function MaintenanceForm() {
  const navigate = useNavigate();
  
  const equipmentList = [
    { id: "EQ-001", name: "CNC Machine", team: "Mechanical", tech: "Ravi Sharma" },
    { id: "EQ-002", name: "Air Conditioner", team: "Electrical", tech: "Amit Verma" },
    { id: "EQ-003", name: "Server Rack", team: "IT", tech: "Suresh Patel" },
    { id: "EQ-004", name: "Hydraulic Press", team: "Mechanical", tech: "Ravi Sharma" },
  ];

  const [form, setForm] = useState({
    title: "",
    equipment: "",
    team: "",
    technician: "",
    type: "",
    priority: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEquipmentChange(e) {
    const selected = equipmentList.find(eq => eq.id === e.target.value);
    if (selected) {
      setForm({
        ...form,
        equipment: selected.id,
        team: selected.team,
        technician: selected.tech,
      });
    } else {
      setForm({ ...form, equipment: "", team: "", technician: "" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Maintenance request created successfully ✅");
      setLoading(false);
      navigate("/kanban"); // Redirect after success
    }, 1200);
  }

  const isDisabled = !form.title || !form.equipment || !form.type || !form.priority;

  return (
    <div className="form-page-container">
      
      {/* HEADER with Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
            background: 'none', 
            border: 'none', 
            color: '#64748b', 
            cursor: 'pointer', 
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '14px'
        }}
      >
        <FiArrowLeft /> Cancel
      </button>

      <div className="form-header">
        <h1>Create Request</h1>
        <p>Log a new maintenance task for equipment</p>
      </div>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} className="form-card">
        
        {/* SECTION 1: BASIC INFO */}
        <div className="form-section">
          <div className="section-title">
            <FiInfo color="#2563eb" /> Basic Information
          </div>
          
          <div className="form-row">
            <Input
              label="Request Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Motor overheating..."
              autoFocus
            />
            
            <Select
              label="Select Equipment"
              onChange={handleEquipmentChange}
              value={form.equipment}
              options={equipmentList.map(eq => ({
                value: eq.id,
                label: `${eq.name} (${eq.id})`,
              }))}
            />
          </div>

          <div className="form-row">
             <Input label="Assigned Team" value={form.team} disabled placeholder="Auto-filled" />
             <Input label="Technician" value={form.technician} disabled placeholder="Auto-filled" />
          </div>
        </div>

        {/* SECTION 2: DETAILS */}
        <div className="form-section">
          <div className="section-title">
            <FiTool color="#2563eb" /> Task Details
          </div>

          <div className="form-row three-col">
            <Select
              label="Maintenance Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              options={[
                { value: "Corrective", label: "Corrective (Fix)" },
                { value: "Preventive", label: "Preventive (Check)" },
                { value: "Upgrade", label: "Upgrade" },
              ]}
            />

            <Select
              label="Priority Level"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
                { value: "Critical", label: "Critical" },
              ]}
            />

            <Input
              label="Scheduled Date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* SECTION 3: DESCRIPTION */}
        <div className="form-section">
          <div className="section-title">
            <FiFileText color="#2563eb" /> Description
          </div>
          <Textarea
            label="Detailed Problem Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue, noise, or error code observed..."
          />
        </div>

        {/* FOOTER ACTIONS */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={isDisabled || loading}
            className="submit-btn"
          >
            {loading ? (
              "Saving..."
            ) : (
              <> <FiSave /> Create Request </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

/* ---------- REUSABLE INPUT COMPONENTS ---------- */

function Input({ label, disabled, ...props }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        {...props}
        disabled={disabled}
        className="modern-input"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <select {...props} className="modern-select">
        <option value="">-- Select --</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <textarea
        {...props}
        className="modern-textarea"
        style={{ height: "100px", resize: "vertical" }}
      />
    </div>
  );
}