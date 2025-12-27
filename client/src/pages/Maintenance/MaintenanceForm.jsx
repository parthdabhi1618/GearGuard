import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function MaintenanceForm() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get pre-filled data from navigation state (from Equipment Details)
  const preFilledData = location.state || {};

  const equipmentList = [
    { 
      id: "EQ-001", 
      name: "CNC Machine", 
      category: "Manufacturing",
      team: "Mechanical", 
      teamId: "T-001",
      tech: "Ravi",
      techId: "TECH-001"
    },
    { 
      id: "EQ-002", 
      name: "Air Conditioner",
      category: "HVAC", 
      team: "Electrical", 
      teamId: "T-002",
      tech: "Amit",
      techId: "TECH-002"
    },
    { 
      id: "EQ-003", 
      name: "Server Rack",
      category: "IT Equipment", 
      team: "IT", 
      teamId: "T-003",
      tech: "Suresh",
      techId: "TECH-003"
    },
  ];

  const [form, setForm] = useState({
    title: "",
    equipment: preFilledData.equipmentId || "",
    equipmentName: preFilledData.equipmentName || "",
    category: "",
    team: preFilledData.teamName || "",
    teamId: preFilledData.teamId || "",
    technician: preFilledData.technicianName || "",
    technicianId: preFilledData.technicianId || "",
    type: "",
    priority: "",
    date: "",
    duration: "",
    description: "",
    stage: "New" // Default stage
  });

  const [loading, setLoading] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);

  // Auto-fill on mount if data was passed
  useEffect(() => {
    if (preFilledData.equipmentId) {
      const equipment = equipmentList.find(eq => eq.id === preFilledData.equipmentId);
      if (equipment) {
        setForm(prev => ({
          ...prev,
          category: equipment.category
        }));
        setAutoFilled(true);
      }
    }
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEquipmentChange(e) {
    const selectedId = e.target.value;
    const selected = equipmentList.find(eq => eq.id === selectedId);
    
    if (selected) {
      // AUTO-FILL LOGIC: Populate category, team, and technician
      setForm({
        ...form,
        equipment: selected.id,
        equipmentName: selected.name,
        category: selected.category,
        team: selected.team,
        teamId: selected.teamId,
        technician: selected.tech,
        technicianId: selected.techId,
      });
      setAutoFilled(true);
      
      // Show notification
      setTimeout(() => setAutoFilled(false), 3000);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Maintenance Request Created:", form);
      alert("✅ Maintenance request created successfully!");
      
      // In real app: await axios.post('/api/maintenance', form);
      
      setLoading(false);
      navigate("/kanban");
    }, 1200);
  }

  const isDisabled = !form.title || !form.equipment || !form.type || !form.priority;
  const isPreventive = form.type === "Preventive";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: "0 0 8px 0" }}>
          Create Maintenance Request
        </h1>
        <p style={{ color: "#64748b", margin: 0 }}>
          Log corrective or preventive maintenance work
        </p>
      </div>

      {/* Auto-fill Success Notification */}
      {autoFilled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            background: "#dcfce7",
            border: "1px solid #86efac",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <FiCheckCircle color="#166534" size={20} />
          <span style={{ color: "#166534", fontSize: "14px", fontWeight: "500" }}>
            Equipment details auto-filled! Team and Technician have been assigned.
          </span>
        </motion.div>
      )}

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} style={card}>
        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input
            label="Request Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Motor vibration issue"
            required
          />

          <Select
            label="Equipment"
            value={form.equipment}
            onChange={handleEquipmentChange}
            options={equipmentList.map(eq => ({
              value: eq.id,
              label: `${eq.name} (${eq.id})`,
            }))}
            required
          />

          <AutoFilled label="Equipment Category" value={form.category} />
          <AutoFilled label="Maintenance Team" value={form.team} />
          <AutoFilled label="Assigned Technician" value={form.technician} />
        </Section>

        {/* MAINTENANCE DETAILS */}
        <Section title="Maintenance Details">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Select
              label="Request Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              options={[
                { value: "Corrective", label: "Corrective (Breakdown)" },
                { value: "Preventive", label: "Preventive (Routine)" },
              ]}
              required
            />

            <Select
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
                { value: "Critical", label: "Critical" },
              ]}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Input
              label={isPreventive ? "Scheduled Date (Required for Preventive)" : "Scheduled Date"}
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required={isPreventive}
            />

            <Input
              label="Estimated Duration (hours)"
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g., 2"
              min="0"
              step="0.5"
            />
          </div>

          {/* Info message for preventive maintenance */}
          {isPreventive && (
            <div style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "8px",
              padding: "12px 16px",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <FiAlertCircle color="#2563eb" size={18} />
              <span style={{ color: "#1e40af", fontSize: "13px" }}>
                This request will appear on the Calendar View for the scheduled date.
              </span>
            </div>
          )}
        </Section>

        {/* DESCRIPTION */}
        <Section title="Problem Description">
          <Textarea
            label="Describe the issue or maintenance work"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Provide detailed information about the maintenance required..."
          />
        </Section>

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "30px" }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              ...cancelBtn,
              opacity: loading ? 0.5 : 1
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isDisabled || loading}
            style={{
              ...submitBtn,
              opacity: isDisabled || loading ? 0.5 : 1,
            }}
          >
            {loading ? "Creating..." : "Create Request"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h3 style={{ 
        marginBottom: "15px", 
        fontSize: "16px",
        fontWeight: "700",
        color: "#0f172a",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Input({ label, required, ...props }) {
  return (
    <div style={field}>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>}
      </label>
      <input {...props} style={input} />
    </div>
  );
}

function Select({ label, options, required, ...props }) {
  return (
    <div style={field}>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>}
      </label>
      <select {...props} style={input}>
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
    <div style={field}>
      <label style={labelStyle}>{label}</label>
      <textarea {...props} style={{ ...input, height: "100px", resize: "vertical" }} />
    </div>
  );
}

function AutoFilled({ label, value }) {
  return (
    <div style={field}>
      <label style={labelStyle}>
        {label}
        <span style={{ 
          marginLeft: "8px", 
          fontSize: "11px", 
          color: "#2563eb",
          fontWeight: "600",
          background: "#eff6ff",
          padding: "2px 8px",
          borderRadius: "4px"
        }}>
          AUTO-FILLED
        </span>
      </label>
      <input
        value={value || "Select equipment first"}
        disabled
        style={{
          ...input,
          background: value ? "#f0fdf4" : "#f1f5f9",
          border: value ? "1px solid #86efac" : "1px dashed #94a3b8",
          color: value ? "#166534" : "#64748b",
          fontWeight: value ? "500" : "normal"
        }}
      />
    </div>
  );
}

/* ---------- STYLES ---------- */

const card = {
  background: "#ffffff",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
  border: "1px solid #f1f5f9"
};

const field = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "18px",
};

const labelStyle = {
  fontSize: "14px",
  marginBottom: "8px",
  color: "#475569",
  fontWeight: "600",
  display: "flex",
  alignItems: "center"
};

const input = {
  padding: "11px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s",
  fontFamily: "inherit"
};

const submitBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "12px 24px",
  border: "none",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.2s",
};

const cancelBtn = {
  background: "#ffffff",
  color: "#475569",
  padding: "12px 24px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.2s",
};