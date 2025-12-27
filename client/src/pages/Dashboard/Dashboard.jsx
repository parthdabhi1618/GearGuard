import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiTool, FiAlertCircle, FiClock, FiTrash2, FiArrowRight, FiPlus } from "react-icons/fi";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    equipment: 0,
    open: 0,
    overdue: 0,
    scrapped: 0,
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
    
    // Refresh data every 30 seconds to keep it updated
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/maintenance');
      const requests = response.data;
      
      // Calculate statistics
      const open = requests.filter(r => r.state === 'draft' || r.state === 'assigned').length;
      const inProgress = requests.filter(r => r.state === 'in_progress').length;
      const scrapped = requests.filter(r => r.state === 'cancelled').length;
      
      // Count overdue requests (scheduled_date is in the past and not completed)
      const now = new Date();
      const overdue = requests.filter(r => {
        return r.scheduled_date && 
               new Date(r.scheduled_date) < now && 
               !['completed', 'cancelled'].includes(r.state);
      }).length;
      
      setStats({
        equipment: 18, // This would come from /api/equipment endpoint
        open: open + inProgress,
        overdue: overdue,
        scrapped: scrapped,
      });
      
      // Get the 3 most recent requests
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
      console.error("Error fetching dashboard data:", error);
      // Use default empty stats if API fails
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Overview of maintenance activities</p>
        </div>

        <button
          onClick={() => navigate("/maintenance/new")}
          className="primary-btn"
        >
          <FiPlus size={18} /> Create Maintenance
        </button>
      </div>

      {/* STATS GRID - Improved spacing and alignment */}
      <div className="stats-grid">
        <ModernStatCard 
          title="Total Equipment" 
          value={stats.equipment} 
          color="#3b82f6" 
          icon={<FiTool size={22} />}
          onClick={() => navigate("/equipment")}
        />
        <ModernStatCard 
          title="Open Requests" 
          value={stats.open} 
          color="#f59e0b" 
          icon={<FiAlertCircle size={22} />}
          onClick={() => navigate("/kanban")}
        />
        <ModernStatCard 
          title="Overdue" 
          value={stats.overdue} 
          color="#ef4444" 
          icon={<FiClock size={22} />}
          onClick={() => navigate("/kanban")}
        />
        <ModernStatCard 
          title="Scrapped" 
          value={stats.scrapped} 
          color="#64748b" 
          icon={<FiTrash2 size={22} />}
          onClick={() => navigate("/equipment")}
        />
      </div>

      {/* RECENT MAINTENANCE */}
      <div className="section-header">
        <h3>Recent Maintenance</h3>
        <span
          onClick={() => navigate("/kanban")}
          className="view-all-link"
        >
          View all <FiArrowRight size={16} />
        </span>
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
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                    No maintenance requests yet
                  </td>
                </tr>
              ) : (
                recent.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: "600", color: "#64748b" }}>#{r.id}</td>
                    <td style={{ fontWeight: "500" }}>{r.title}</td>
                    <td>
                      <StatusBadge status={r.status} />
                    </td>
                    <td>
                      <PriorityBadge value={r.priority} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- INTERNAL COMPONENTS ---------- */

// Enhanced Stat Card with consistent icon sizing and spacing
function ModernStatCard({ title, value, color, icon, onClick }) {
  return (
    <div className="stat-card" onClick={onClick}>
      <div className="stat-header">
        <div className="stat-text-container">
          <p className="stat-title">{title}</p>
          <h2 className="stat-value">{value}</h2>
        </div>
        {/* Icon with consistent sizing */}
        <div className="stat-icon-bg" style={{ backgroundColor: color }}>
          <span className="stat-icon-wrapper">
            {icon}
          </span>
        </div>
      </div>
      <div className="stat-footer">
        Tap to view details
      </div>
    </div>
  );
}

function PriorityBadge({ value }) {
  const map = {
    High: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
    Medium: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
    Low: { bg: "#dcfce7", text: "#166534", dot: "#22c55e" },
  };

  const style = map[value] || map.Low;

  return (
    <span
      style={{
        background: style.bg,
        color: style.text,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px"
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: style.dot }}></span>
      {value}
    </span>
  );
}

function StatusBadge({ status }) {
  const isDone = status === "Done";
  return (
    <span style={{ 
      color: isDone ? "#166534" : "#334155", 
      background: isDone ? "#f0fdf4" : "#f1f5f9",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "13px",
      fontWeight: "500"
    }}>
      {status}
    </span>
  );
}