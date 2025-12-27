import { useState } from "react";
import { motion } from "framer-motion";

export default function MaintenanceForm() {
  const equipmentList = [
    { id: "EQ-001", name: "CNC Machine", team: "Mechanical", tech: "Ravi" },
    { id: "EQ-002", name: "Air Conditioner", team: "Electrical", tech: "Amit" },
    { id: "EQ-003", name: "Server Rack", team: "IT", tech: "Suresh" },
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
    setForm({
      ...form,
      equipment: selected.id,
      team: selected.team,
      technician: selected.tech,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Maintenance request created successfully ✅");
      setLoading(false);
    }, 1200);
  }

  const isDisabled = !form.title || !form.equipment || !form.type || !form.priority;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: "30px", maxWidth: "900px" }}
    >
      {/* HEADER */}
      <h1>Create Maintenance Request</h1>
      <p style={{ color: "#64748b", marginBottom: "25px" }}>
        Log corrective or preventive maintenance
      </p>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} style={card}>
        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Motor vibration issue"
          />

          <Select
            label="Equipment"
            onChange={handleEquipmentChange}
            options={equipmentList.map(eq => ({
              value: eq.id,
              label: `${eq.name} (${eq.id})`,
            }))}
          />

          <AutoFilled label="Team" value={form.team} />
          <AutoFilled label="Technician" value={form.technician} />
        </Section>

        {/* MAINTENANCE DETAILS */}
        <Section title="Maintenance Details">
          <div style={{ display: "flex", gap: "20px" }}>
            <Select
              label="Type"
              name="type"
              onChange={handleChange}
              options={[
                { value: "Corrective", label: "Corrective" },
                { value: "Preventive", label: "Preventive" },
              ]}
            />

            <Select
              label="Priority"
              name="priority"
              onChange={handleChange}
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
                { value: "Critical", label: "Critical" },
              ]}
            />
          </div>

          <Input
            label="Scheduled Date"
            type="date"
            name="date"
            onChange={handleChange}
          />
        </Section>

        {/* DESCRIPTION */}
        <Section title="Description">
          <Textarea
            label="Problem Description"
            name="description"
            onChange={handleChange}
            placeholder="Describe the issue in detail..."
          />
        </Section>

        {/* ACTION */}
        <div style={{ textAlign: "right" }}>
          <button
            type="submit"
            disabled={isDisabled || loading}
            style={{
              ...submitBtn,
              opacity: isDisabled ? 0.5 : 1,
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
      <h3 style={{ marginBottom: "15px" }}>{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div style={field}>
      <label style={labelStyle}>{label}</label>
      <input {...props} style={input} />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div style={field}>
      <label style={labelStyle}>{label}</label>
      <select {...props} style={input}>
        <option value="">Select</option>
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
      <textarea {...props} style={{ ...input, height: "90px" }} />
    </div>
  );
}

function AutoFilled({ label, value }) {
  return (
    <div style={field}>
      <label style={labelStyle}>{label}</label>
      <input
        value={value}
        disabled
        style={{
          ...input,
          background: "#f1f5f9",
          border: "1px dashed #94a3b8",
        }}
      />
    </div>
  );
}

/* ---------- STYLES ---------- */

const card = {
  background: "#ffffff",
  padding: "30px",
  borderRadius: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const field = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "16px",
};

const labelStyle = {
  fontSize: "14px",
  marginBottom: "6px",
  color: "#475569",
};

const input = {
  padding: "11px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none",
};

const submitBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "12px 20px",
  border: "none",
  borderRadius: "10px",
  fontSize: "15px",
  cursor: "pointer",
  transition: "0.2s",
};
