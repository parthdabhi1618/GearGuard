import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiUsers } from "react-icons/fi";
import "./MaintenanceTeams.css";

export default function MaintenanceTeams() {
  const [teams, setTeams] = useState([
    {
      id: "T-001",
      name: "Production Team",
      description: "Handles machinery and production equipment maintenance",
      members: 4,
      status: "Active",
      technicians: ["John Doe", "Jane Smith", "Mike Johnson"],
    },
    {
      id: "T-002",
      name: "Infrastructure Team",
      description: "Manages IT infrastructure and server maintenance",
      members: 3,
      status: "Active",
      technicians: ["Sarah Williams", "Robert Brown", "Lisa Anderson"],
    },
    {
      id: "T-003",
      name: "Facilities Team",
      description: "Handles HVAC, electrical, and facility maintenance",
      members: 5,
      status: "Active",
      technicians: ["Tom Wilson", "Emily Davis", "James Miller", "Jessica Taylor", "David Martinez"],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTeam = () => {
    if (formData.name.trim()) {
      setTeams((prev) => {
        const maxNumericId = prev.reduce((max, team) => {
          const match = typeof team.id === "string" ? team.id.match(/^T-(\d+)$/) : null;
          const numericPart = match ? parseInt(match[1], 10) : 0;
          return numericPart > max ? numericPart : max;
        }, 0);
        const nextIdNumber = maxNumericId + 1;
        const nextId = `T-${String(nextIdNumber).padStart(3, "0")}`;

        return [
          ...prev,
          {
            id: nextId,
            name: formData.name,
            description: formData.description,
            members: 0,
            status: "Active",
            technicians: [],
          },
        ];
      });
      setFormData({ name: "", description: "" });
      setIsModalOpen(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1>Maintenance Teams</h1>
          <p style={styles.subtitle}>Manage maintenance teams and assign technicians</p>
        </div>
        <button style={styles.primaryBtn} onClick={() => setIsModalOpen(true)}>
          <FiPlus size={18} /> New Team
        </button>
      </div>

      {/* TEAMS GRID */}
      <div style={styles.grid}>
        {teams.map((team) => (
          <div key={team.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.teamName}>{team.name}</h3>
                <p style={styles.teamId}>{team.id}</p>
              </div>
              <span
                style={{
                  ...styles.statusBadge,
                  background: team.status === "Active" ? "#dcfce7" : "#fee2e2",
                  color: team.status === "Active" ? "#166534" : "#991b1b",
                }}
              >
                {team.status}
              </span>
            </div>

            <p style={styles.description}>{team.description}</p>

            <div style={styles.cardFooter}>
              <div style={styles.membersInfo}>
                <FiUsers size={18} style={{ color: "#3b82f6" }} />
                <span>{team.members} members</span>
              </div>
              <div style={styles.actions}>
                <button style={styles.actionBtn} title="Edit">
                  <FiEdit2 size={16} />
                </button>
                <button style={{ ...styles.actionBtn, color: "#ef4444" }} title="Delete">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>

            {/* Technicians List */}
            {team.technicians.length > 0 && (
              <div style={styles.techniciansList}>
                <p style={styles.techLabel}>Technicians ({team.technicians.length})</p>
                <div style={styles.techList}>
                  {team.technicians.map((tech, idx) => (
                    <span key={idx} style={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Create New Team</h2>
            <div style={styles.formGroup}>
              <label>Team Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Production Team"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Team description..."
                style={{ ...styles.input, minHeight: "100px", resize: "vertical" }}
              />
            </div>
            <div style={styles.modalActions}>
              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData({ name: "", description: "" });
                }}
              >
                Cancel
              </button>
              <button style={styles.submitBtn} onClick={handleAddTeam}>
                Create Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  subtitle: {
    color: "#64748b",
    marginTop: "5px",
  },
  primaryBtn: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.2s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
    paddingBottom: "15px",
    borderBottom: "1px solid #e5e7eb",
  },
  teamName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0",
  },
  teamId: {
    fontSize: "12px",
    color: "#94a3b8",
    margin: "5px 0 0 0",
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
  },
  description: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "15px",
    lineHeight: "1.5",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "15px",
    borderTop: "1px solid #e5e7eb",
  },
  membersInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#3b82f6",
    fontSize: "14px",
    fontWeight: "500",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  actionBtn: {
    background: "transparent",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
  },
  techniciansList: {
    marginTop: "15px",
    paddingTop: "15px",
    borderTop: "1px solid #e5e7eb",
  },
  techLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "10px",
    margin: "0",
  },
  techList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  techBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "16px",
    background: "#e0e7ff",
    color: "#3730a3",
    fontSize: "12px",
    fontWeight: "500",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  modalActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "25px",
  },
  cancelBtn: {
    padding: "10px 20px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    background: "#fff",
    color: "#374151",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
  submitBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
};
