import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiUsers, FiSearch } from "react-icons/fi";
import "./Teams.css";

export default function TeamList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Mock Data mimicking your screenshot
  const teams = [
    { 
      id: "T-01", 
      name: "Internal Maintenance", 
      members: ["Anas Makari", "John Doe"], 
      company: "My Company (San Francisco)" 
    },
    { 
      id: "T-02", 
      name: "Metrology", 
      members: ["Marc Demo"], 
      company: "My Company (San Francisco)" 
    },
    { 
      id: "T-03", 
      name: "Subcontractor", 
      members: ["Maggie Davidson", "Sarah Smith", "Ravi S."], 
      company: "My Company (San Francisco)" 
    },
  ];

  return (
    <div className="teams-container">
      {/* Header */}
      <div className="teams-header">
        <div className="teams-title">
          <h1>Maintenance Teams</h1>
          <p>Manage technical groups and assignments</p>
        </div>
        <button onClick={() => navigate("/teams/new")} className="btn-primary">
          <FiPlus size={18} /> New Team
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <div style={{ position: "relative", width: "300px" }}>
            <FiSearch style={{ position: "absolute", left: "10px", top: "12px", color: "#94a3b8" }} />
            <input 
                type="text" 
                placeholder="Search teams..." 
                className="form-input" 
                style={{ paddingLeft: "35px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      </div>

      {/* Table */}
      <div className="teams-table-card">
        <table className="teams-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Team Members</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id} onClick={() => navigate(`/teams/${team.id}`)}>
                <td style={{ fontWeight: "600", color: "#0f172a" }}>
                    {team.name}
                </td>
                <td>
                  <div className="member-avatars">
                    {team.members.slice(0, 3).map((m, idx) => (
                        <div key={idx} className="avatar-circle" title={m}>
                            {m.charAt(0)}
                        </div>
                    ))}
                    {team.members.length > 3 && (
                        <div className="avatar-circle">+{team.members.length - 3}</div>
                    )}
                    <span style={{ marginLeft: "10px", color: "#64748b" }}>
                        {team.members.join(", ")}
                    </span>
                  </div>
                </td>
                <td style={{ color: "#64748b" }}>{team.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}