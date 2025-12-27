import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiTool, FiAlertCircle, FiClock, FiTrash2, FiArrowRight, FiPlus } from "react-icons/fi";

// 1. Import your new ProfileDropdown instead of Header
import ProfileDropdown from "../../components/ProfileDropdown"; 
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Data State
  const [stats, setStats] = useState({ equipment: 0, open: 0, overdue: 0, scrapped: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // User State (Just for the "Welcome" text)
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!token) {
      navigate("/login"); 
      return;
    }

    if (storedUser) setUser(JSON.parse(storedUser));

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchDashboardData() {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/maintenance');
      const requests = response.data;
      
      const open = requests.filter(r => r.state === 'draft' || r.state === 'assigned').length;
      const inProgress = requests.filter(r => r.state === 'in_progress').length;
      const scrapped = requests.filter(r => r.state === 'cancelled').length;
      const now = new Date();
      const overdue = requests.filter(r => r.scheduled_date && new Date(r.scheduled_date) < now && !['completed', 'cancelled'].includes(r.state)).length;
      
      setStats({ equipment: 18, open: open + inProgress, overdue, scrapped });
      
      const recentRequests = requests
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
        .map(r => ({
          id: r._id,
          title: r.name,
          status: r.state === 'draft' ? 'Open' : r.state === 'in_progress' ? 'In Progress' : r.state === 'completed' ? 'Done' : 'Cancelled',
          priority: r.priority === '0' ? 'Low' : r.priority === '1' ? 'Medium' : r.priority === '2' ? 'High' : 'Critical'
        }));
      
      setRecent(recentRequests);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-layout">
      {/* NO <Header /> HERE - We put it inside the container */}

      <div className="dashboard-container">
        
        {/* --- REORGANIZED HEADER SECTION --- */}
        <div className="dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          
          {/* LEFT: Title */}
          <div className="dashboard-title">
            <h1 style={{ margin: 0, fontSize: "24px" }}>Dashboard</h1>
            <p style={{ margin: "5px 0 0 0", color: "#64748b" }}>
              Welcome back, <span style={{ color: "#3b82f6", fontWeight: "600" }}>{user.name || "Admin"}</span>
            </p>
          </div>

          {/* RIGHT: Actions & Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            
            {/* Create Button */}
            <button
              onClick={() => navigate("/maintenance/new")}
              className="primary-btn"
              style={{ height: "42px" }}
            >
              <FiPlus size={18} /> Create Request
            </button>

            {/* Profile Dropdown (Sits nicely next to button) */}
            <ProfileDropdown />
            
          </div>
        </div>
        {/* ---------------------------------- */}

        {/* STATS GRID */}
        <div className="stats-grid">
          <ModernStatCard title="Total Equipment" value={stats.equipment} color="#3b82f6" icon={<FiTool size={22} />} onClick={() => navigate("/equipment")} />
          <ModernStatCard title="Open Requests" value={stats.open} color="#f59e0b" icon={<FiAlertCircle size={22} />} onClick={() => navigate("/kanban")} />
          <ModernStatCard title="Overdue" value={stats.overdue} color="#ef4444" icon={<FiClock size={22} />} onClick={() => navigate("/kanban")} />
          <ModernStatCard title="Scrapped" value={stats.scrapped} color="#64748b" icon={<FiTrash2 size={22} />} onClick={() => navigate("/equipment")} />
        </div>

        {/* RECENT MAINTENANCE */}
        <div className="section-header">
          <h3>Recent Maintenance</h3>
          <span onClick={() => navigate("/kanban")} className="view-all-link">View all <FiArrowRight size={16} /></span>
        </div>

        <div className="table-wrapper">
          <div className="responsive-table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {recent.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>{loading ? "Loading..." : "No requests yet"}</td></tr>
                ) : (
                  recent.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: "600", color: "#64748b" }}>#{r.id.substring(r.id.length - 6)}</td>
                      <td style={{ fontWeight: "500" }}>{r.title}</td>
                      <td><StatusBadge status={r.status} /></td>
                      <td><PriorityBadge value={r.priority} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ... Internal Components (ModernStatCard, StatusBadge, PriorityBadge) remain exactly the same as before ...
function ModernStatCard({ title, value, color, icon, onClick }) {
  return (
    <div className="stat-card" onClick={onClick}>
      <div className="stat-header">
        <div className="stat-text-container">
          <p className="stat-title">{title}</p>
          <h2 className="stat-value">{value}</h2>
        </div>
        <div className="stat-icon-bg" style={{ backgroundColor: color }}>
          <span className="stat-icon-wrapper">{icon}</span>
        </div>
      </div>
      <div className="stat-footer">Tap to view details</div>
    </div>
  );
}

function PriorityBadge({ value }) {
  const map = {
    High: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
    Medium: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
    Low: { bg: "#dcfce7", text: "#166534", dot: "#22c55e" },
    Critical: { bg: "#7f1d1d", text: "#ffffff", dot: "#ffffff" }
  };
  const style = map[value] || map.Low;
  return (
    <span style={{ background: style.bg, color: style.text, padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: style.dot }}></span>{value}
    </span>
  );
}

function StatusBadge({ status }) {
  const isDone = status === "Done";
  return (
    <span style={{ color: isDone ? "#166534" : "#334155", background: isDone ? "#f0fdf4" : "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "13px", fontWeight: "500" }}>
      {status}
    </span>
  );
}