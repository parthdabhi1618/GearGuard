import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import "./Teams.css";

export default function TeamForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "My Company (San Francisco)",
    members: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        navigate("/teams");
    }, 1000);
  };

  return (
    <div className="teams-container">
      <button onClick={() => navigate("/teams")} className="btn-primary" style={{ background: "transparent", color: "#64748b", paddingLeft: 0, marginBottom: "10px" }}>
        <FiArrowLeft /> Back to Teams
      </button>
      
      <div className="teams-title" style={{ marginBottom: "20px", textAlign: "center" }}>
        <h1>Create New Team</h1>
      </div>

      <form className="team-form-card" onSubmit={handleSubmit}>
        <div className="form-group">
            <label className="form-label">Team Name</label>
            <input 
                className="form-input" 
                placeholder="e.g. Electrical Maintenance" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
            />
        </div>

        <div className="form-group">
            <label className="form-label">Company</label>
            <input 
                className="form-input" 
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
            />
        </div>

        <div className="form-group">
            <label className="form-label">Assign Members (Technicians)</label>
            <select className="form-select" multiple style={{ height: "100px" }}>
                <option>Ravi Sharma</option>
                <option>Amit Verma</option>
                <option>Suresh Patel</option>
                <option>John Doe</option>
            </select>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "5px" }}>Hold Ctrl to select multiple</p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn-primary" disabled={loading}>
                <FiSave /> {loading ? "Saving..." : "Save Team"}
            </button>
        </div>
      </form>
    </div>
  );
}