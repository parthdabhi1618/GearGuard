import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EquipmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    status: "active",
    department: "",
    assignedTo: "",
    purchaseDate: "",
    warrantyExpiry: "",
    location: "",
    team_id: "",
    default_technician_id: "",
    category: "",
    manufacturer: "",
    model: "",
    specifications: "",
    notes: "",
  });

  useEffect(() => {
    fetchTeamsAndTechnicians();
    if (isEditMode) {
      fetchEquipment();
    }
  }, [id]);

  const fetchTeamsAndTechnicians = async () => {
    try {
      const [teamsRes, techRes] = await Promise.all([
        axios.get("http://localhost:5000/api/teams"),
        axios.get("http://localhost:5000/api/teams/technicians"),
      ]);
      setTeams(teamsRes.data);
      setTechnicians(techRes.data);
    } catch (error) {
      console.error("Error fetching teams/technicians:", error);
    }
  };

  const fetchEquipment = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/equipment/${id}`);
      const data = res.data;
      setFormData({
        ...data,
        purchaseDate: data.purchaseDate ? data.purchaseDate.split("T")[0] : "",
        warrantyExpiry: data.warrantyExpiry ? data.warrantyExpiry.split("T")[0] : "",
        team_id: data.team_id?._id || "",
        default_technician_id: data.default_technician_id?._id || "",
      });
    } catch (error) {
      console.error("Error fetching equipment:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/equipment/${id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/equipment", formData);
      }
      navigate("/equipment");
    } catch (error) {
      console.error("Error saving equipment:", error);
      alert(error.response?.data?.error || "Error saving equipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={header}>
        <button onClick={() => navigate("/equipment")} style={backBtn}>
          ← Back
        </button>
        <h1>{isEditMode ? "Edit Equipment" : "Add New Equipment"}</h1>
      </div>

      <form onSubmit={handleSubmit} style={form}>
        {/* Basic Information */}
        <section style={section}>
          <h2 style={sectionTitle}>Basic Information</h2>
          <div style={grid}>
            <div style={field}>
              <label style={label}>
                Equipment Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={input}
                placeholder="e.g., CNC Machine"
              />
            </div>

            <div style={field}>
              <label style={label}>
                Serial Number <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
                style={input}
                placeholder="e.g., SN123456"
              />
            </div>

            <div style={field}>
              <label style={label}>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={input}
                placeholder="e.g., Machinery, IT Equipment"
              />
            </div>

            <div style={field}>
              <label style={label}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={input}
              >
                <option value="active">Active</option>
                <option value="scrapped">Scrapped</option>
              </select>
            </div>

            <div style={field}>
              <label style={label}>Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                style={input}
                placeholder="e.g., Siemens"
              />
            </div>

            <div style={field}>
              <label style={label}>Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                style={input}
                placeholder="e.g., X-2000"
              />
            </div>
          </div>
        </section>

        {/* Tracking Information */}
        <section style={section}>
          <h2 style={sectionTitle}>Tracking Information</h2>
          <div style={grid}>
            <div style={field}>
              <label style={label}>
                Department <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                style={input}
                placeholder="e.g., Production, IT, HR"
              />
            </div>

            <div style={field}>
              <label style={label}>Assigned To (Employee)</label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                style={input}
                placeholder="e.g., John Doe"
              />
            </div>

            <div style={field}>
              <label style={label}>
                Location <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                style={input}
                placeholder="e.g., Building A, Floor 2, Room 205"
              />
            </div>
          </div>
        </section>

        {/* Purchase & Warranty */}
        <section style={section}>
          <h2 style={sectionTitle}>Purchase & Warranty Information</h2>
          <div style={grid}>
            <div style={field}>
              <label style={label}>
                Purchase Date <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                required
                style={input}
              />
            </div>

            <div style={field}>
              <label style={label}>Warranty Expiry</label>
              <input
                type="date"
                name="warrantyExpiry"
                value={formData.warrantyExpiry}
                onChange={handleChange}
                style={input}
              />
            </div>
          </div>
        </section>

        {/* Team Assignment */}
        <section style={section}>
          <h2 style={sectionTitle}>Team & Technician Assignment</h2>
          <div style={grid}>
            <div style={field}>
              <label style={label}>
                Maintenance Team <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                name="team_id"
                value={formData.team_id}
                onChange={handleChange}
                required
                style={input}
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={field}>
              <label style={label}>
                Default Technician <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                name="default_technician_id"
                value={formData.default_technician_id}
                onChange={handleChange}
                required
                style={input}
              >
                <option value="">Select a technician</option>
                {technicians.map((tech) => (
                  <option key={tech._id} value={tech._id}>
                    {tech.name} ({tech.email})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Additional Details */}
        <section style={section}>
          <h2 style={sectionTitle}>Additional Details</h2>
          <div style={field}>
            <label style={label}>Specifications</label>
            <textarea
              name="specifications"
              value={formData.specifications}
              onChange={handleChange}
              style={{ ...input, minHeight: "80px", resize: "vertical" }}
              placeholder="Technical specifications..."
            />
          </div>

          <div style={field}>
            <label style={label}>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              style={{ ...input, minHeight: "80px", resize: "vertical" }}
              placeholder="Additional notes..."
            />
          </div>
        </section>

        {/* Submit Buttons */}
        <div style={actions}>
          <button
            type="button"
            onClick={() => navigate("/equipment")}
            style={cancelBtn}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} style={submitBtn}>
            {loading ? "Saving..." : isEditMode ? "Update Equipment" : "Add Equipment"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Styles
const container = {
  padding: "30px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const header = {
  marginBottom: "30px",
};

const backBtn = {
  background: "none",
  border: "none",
  color: "#3b82f6",
  fontSize: "14px",
  cursor: "pointer",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const form = {
  background: "#fff",
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const section = {
  marginBottom: "40px",
  paddingBottom: "30px",
  borderBottom: "1px solid #e5e7eb",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const field = {
  display: "flex",
  flexDirection: "column",
};

const label = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
  marginBottom: "8px",
};

const input = {
  padding: "10px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "15px",
  marginTop: "30px",
};

const cancelBtn = {
  padding: "10px 24px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  background: "#fff",
  color: "#374151",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
};

const submitBtn = {
  padding: "10px 24px",
  border: "none",
  borderRadius: "6px",
  background: "#3b82f6",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
};
