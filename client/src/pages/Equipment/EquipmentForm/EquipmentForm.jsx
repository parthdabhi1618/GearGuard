import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { 
  FiArrowLeft, 
  FiSave, 
  FiBox, 
  FiMapPin, 
  FiCpu, 
  FiDollarSign 
} from "react-icons/fi";
import "./EquipmentForm.css";

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
    <div className="form-page-container">
      {/* Header */}
      <div className="form-header">
        <button onClick={() => navigate("/equipment")} className="back-link">
          <FiArrowLeft /> Back to Equipment List
        </button>
        <h1>{isEditMode ? "Edit Equipment Details" : "Add New Equipment"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        
        {/* SECTION 1: GENERAL INFO */}
        <div className="form-section">
          <div className="section-title">
            <FiBox color="#2563eb" /> General Information
          </div>
          <div className="form-grid">
            <Input 
              label="Equipment Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="e.g. CNC Machine"
            />
            <Input 
              label="Serial Number" 
              name="serialNumber" 
              value={formData.serialNumber} 
              onChange={handleChange} 
              required 
              placeholder="e.g. SN-2024-X"
            />
            <Input 
              label="Category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              placeholder="e.g. Heavy Machinery"
            />
            <Select 
              label="Status" 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              options={[
                { value: "active", label: "Active" },
                { value: "scrapped", label: "Scrapped" },
                { value: "maintenance", label: "Under Maintenance" }
              ]}
            />
          </div>
        </div>

        {/* SECTION 2: TECHNICAL DETAILS */}
        <div className="form-section">
          <div className="section-title">
            <FiCpu color="#2563eb" /> Technical Details
          </div>
          <div className="form-grid">
            <Input 
              label="Manufacturer" 
              name="manufacturer" 
              value={formData.manufacturer} 
              onChange={handleChange} 
            />
            <Input 
              label="Model" 
              name="model" 
              value={formData.model} 
              onChange={handleChange} 
            />
            
            <div className="input-group">
              <label className="input-label">Maintenance Team <span className="required-star">*</span></label>
              <select 
                name="team_id" 
                value={formData.team_id} 
                onChange={handleChange} 
                className="modern-select"
                required
              >
                <option value="">Select Team</option>
                {teams.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Default Technician <span className="required-star">*</span></label>
              <select 
                name="default_technician_id" 
                value={formData.default_technician_id} 
                onChange={handleChange} 
                className="modern-select"
                required
              >
                <option value="">Select Technician</option>
                {technicians.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: LOCATION & TRACKING */}
        <div className="form-section">
          <div className="section-title">
            <FiMapPin color="#2563eb" /> Location & Tracking
          </div>
          <div className="form-grid">
            <Input 
              label="Department" 
              name="department" 
              value={formData.department} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              placeholder="e.g. Building A, Floor 2"
            />
            <Input 
              label="Assigned Employee" 
              name="assignedTo" 
              value={formData.assignedTo} 
              onChange={handleChange} 
            />
          </div>
        </div>

        {/* SECTION 4: PURCHASE INFO */}
        <div className="form-section">
          <div className="section-title">
            <FiDollarSign color="#2563eb" /> Purchase & Warranty
          </div>
          <div className="form-grid">
            <Input 
              type="date" 
              label="Purchase Date" 
              name="purchaseDate" 
              value={formData.purchaseDate} 
              onChange={handleChange} 
              required 
            />
            <Input 
              type="date" 
              label="Warranty Expiry" 
              name="warrantyExpiry" 
              value={formData.warrantyExpiry} 
              onChange={handleChange} 
            />
          </div>
        </div>

        {/* SECTION 5: NOTES */}
        <div className="form-section">
          <div className="form-grid">
             <TextArea 
               label="Specifications" 
               name="specifications" 
               value={formData.specifications} 
               onChange={handleChange} 
               placeholder="Detailed specs..."
             />
             <TextArea 
               label="Additional Notes" 
               name="notes" 
               value={formData.notes} 
               onChange={handleChange} 
             />
          </div>
        </div>

        {/* FOOTER */}
        <div className="form-actions">
          <button type="button" onClick={() => navigate("/equipment")} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-submit">
            <FiSave /> {loading ? "Saving..." : "Save Equipment"}
          </button>
        </div>

      </form>
    </div>
  );
}

/* ---------- HELPER COMPONENTS ---------- */

function Input({ label, required, ...props }) {
  return (
    <div className="input-group">
      <label className="input-label">
        {label} {required && <span className="required-star">*</span>}
      </label>
      <input className="modern-input" required={required} {...props} />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <select className="modern-select" {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ label, ...props }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <textarea className="modern-textarea" {...props} />
    </div>
  );
}