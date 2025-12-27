import "./Dashboard.css";
import StatCard from "../../components/common/StatCard";


export default function Dashboard() {
  const stats = {
    criticalEquipment: 5,
    technicianUtilization: "85%",
    openRequests: 12,
  };

  return (
    <div className="dashboard">
      {/* Navigation */}
      <div className="dashboard-nav">
        <span>Maintenance</span>
        <span>Dashboard</span>
        <span>Maintenance Calendar</span>
        <span>Equipment</span>
        <span>Reporting</span>
        <span>Teams</span>
      </div>

      {/* Search */}
      <input
        className="dashboard-search"
        placeholder="Search..."
      />

      {/* Stat Cards */}
      <div className="dashboard-stats">
        <StatCard
          title="Critical Equipment"
          value="5 Units"
          color="#ef4444"
        />
        <StatCard
          title="Technician Load"
          value="85%"
          color="#3b82f6"
        />
        <StatCard
          title="Open Requests"
          value="12 Pending"
          color="#22c55e"
        />
      </div>

      {/* Table */}
      <div className="dashboard-table">
        <div className="dashboard-table-header">
          <div>Subject</div>
          <div>Employee</div>
          <div>Technician</div>
          <div>Category</div>
          <div>Stage</div>
          <div>Company</div>
        </div>

        <div className="dashboard-table-row muted">
          <div>Test activity</div>
          <div>Michael Admin</div>
          <div>Alice Foster</div>
          <div>Computer</div>
          <div>New Request</div>
          <div>My Company</div>
        </div>
      </div>
    </div>
  );
}
