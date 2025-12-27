import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiUsers, FiBriefcase } from "react-icons/fi";
import "./Teams.css";

export default function TeamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="teams-container">
      <button onClick={() => navigate("/teams")} className="btn-primary" style={{ background: "transparent", color: "#64748b", paddingLeft: 0, marginBottom: "20px" }}>
        <FiArrowLeft /> Back
      </button>

      <div className="team-form-card">
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px", paddingBottom: "20px", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ width: "60px", height: "60px", background: "#dbeafe", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                <FiUsers size={28} />
            </div>
            <div>
                <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Internal Maintenance</h1>
                <span style={{ color: "#64748b" }}>ID: {id}</span>
            </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
                <h3 style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase" }}>Company</h3>
                <p style={{ fontWeight: "500", marginTop: "5px" }}>My Company (San Francisco)</p>
            </div>
            <div>
                <h3 style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase" }}>Members</h3>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                    {["Anas Makari", "John Doe"].map(m => (
                        <span key={m} style={{ background: "#f1f5f9", padding: "6px 12px", borderRadius: "20px", fontSize: "13px" }}>
                            {m}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}