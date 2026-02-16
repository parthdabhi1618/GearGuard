import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { 
  FiArrowLeft, 
  FiSave, 
  FiBox, 
  FiMapPin, 
  FiCpu, 
  FiDollarSign,
  FiInfo 
} from "react-icons/fi";
import "./EquipmentForm.css";

export default function EquipmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    code: "", // Mapped to Serial Number
    location: "",
    department: "",
    status: "operational",
    manufacturer: "",
    model: "",
    purchaseDate: "",
  });

  // If Edit Mode, fetch data (Optional: Needs backend route GET /api/equipment/:id)
  useEffect(() => {
    if (isEditMode) {
      // fetchEquipment(); // Uncomment when Edit route is ready
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      if (isEditMode) {
        // Update logic here
      } else {
        // Create Logic
        await axios.post("http://localhost:5000/api/equipment", formData);
      }
      
      alert("Equipment Saved Successfully!");
      navigate("/equipment");
    } catch (error) {
      console.error("Error saving equipment:", error);
      alert(error.response?.data?.message || "Error saving equipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-container">
      {/* Header */}
      <div className="form-header">
        <button onClick={() => navigate("/equipment")} className="back-link">
          <FiArrowLeft /> Back to List
        </button>
        <h1>{isEditMode ? "Edit Equipment" : "Add New Equipment"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        
        {/* SECTION 1: GENERAL INFO */}
        <div className="form-section">
          <div className="section-title">
            <FiBox color="#3b82f6" /> General Information
          </div>
          <div className="form-grid">
            <Input 
              label="Equipment Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="e.g. CNC Machine 01"
            />
            <Input 
              label="Equipment ID / Serial Code" 
              name="code" 
              value={formData.code} 
              onChange={handleChange} 
              required 
              placeholder="e.g. EQ-105"
            />
             <Select 
              label="Status" 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              options={[
                { value: "operational", label: "Operational" },
                { value: "maintenance", label: "Under Maintenance" },
                { value: "down", label: "Down / Broken" },
                { value: "scrapped", label: "Scrapped" }
              ]}
            />
          </div>
        </div>

        {/* SECTION 2: LOCATION */}
        <div className="form-section">
          <div className="section-title">
            <FiMapPin color="#3b82f6" /> Location & Tracking
          </div>
          <div className="form-grid">
            <Input 
              label="Department" 
              name="department" 
              value={formData.department} 
              onChange={handleChange} 
              required 
              placeholder="e.g. Production"
            />
            <Input 
              label="Location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              placeholder="e.g. Floor 2, Zone A"
            />
          </div>
        </div>

        {/* SECTION 3: DETAILS (Optional for now) */}
        <div className="form-section">
          <div className="section-title">
            <FiCpu color="#3b82f6" /> Technical Details
          </div>
          <div className="form-grid">
            <Input 
              label="Manufacturer" 
              name="manufacturer" 
              value={formData.manufacturer} 
              onChange={handleChange} 
              placeholder="e.g. Siemens"
            />
            <Input 
              label="Model" 
              name="model" 
              value={formData.model} 
              onChange={handleChange} 
              placeholder="e.g. X500-Pro"
            />
            <Input 
              type="date"
              label="Purchase Date" 
              name="purchaseDate" 
              value={formData.purchaseDate} 
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