import { useState } from "react";

export default function MaintenanceForm() {
  const equipmentList = [
    { id: "EQ-001", name: "CNC Machine", team: "Mechanical", technician: "Ravi" },
    { id: "EQ-002", name: "Air Conditioner", team: "Electrical", technician: "Amit" },
    { id: "EQ-003", name: "Server Rack", team: "IT", technician: "Suresh" },
  ];

  const [form, setForm] = useState({
    title: "",
    equipment: "",
    team: "",
    technician: "",
    type: "Corrective",
    priority: "Medium",
    date: "",
    description: "",
  });

  function handleEquipmentChange(e) {
    const selected = equipmentList.find(eq => eq.id === e.target.value);
    setForm({
      ...form,
      equipment: selected.id,
      team: selected.team,
      technician: selected.technician,
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Maintenance Request Created (UI only)");
    console.log(form);
  }

  return (
    <div style={{ padding: "30px", maxWidth: "800px" }}>
      <h1>Create Maintenance Request</h1>
      <p style={{ color: "#64748b" }}>
        Log corrective or preventive maintenance
      </p>

      <form onSubmit={handleSubmit} style={formBox}>
        <Input label="Title" name="title" onChange={handleChange} />

        <Select
          label="Equipment"
          onChange={handleEquipmentChange}
          options={equipmentList.map(eq => ({
            value: eq.id,
            label: `${eq.name} (${eq.id})`,
          }))}
        />

        <Input label="Team" value={form.team} disabled />
        <Input label="Technician" value={form.technician} disabled />

        <div style={row}>
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

        <Input label="Scheduled Date" type="date" name="date" onChange={handleChange} />

        <Textarea label="Description" name="description" onChange={handleChange} />

        <button style={submitBtn}>Create Request</button>
      </form>
    </div>
  );
}

/* ---------- Reusable Inputs ---------- */

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
        <option>Select</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
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

/* ---------- Styles ---------- */

const formBox = {
  background: "#ffffff",
  padding: "30px",
  borderRadius: "12px",
  marginTop: "20px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const row = {
  display: "flex",
  gap: "20px",
};

const field = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "16px",
  flex: 1,
};

const labelStyle = {
  fontSize: "14px",
  marginBottom: "6px",
  color: "#475569",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
};

const submitBtn = {
  marginTop: "20px",
  background: "#2563eb",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer",
};
