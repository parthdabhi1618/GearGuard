import { useState } from "react";
import { FiDownload, FiFilter, FiTrendingUp } from "react-icons/fi";
import "./Reports.css";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("equipment");
  const [dateRange, setDateRange] = useState({ start: "2025-01-01", end: "2025-01-31" });

  const reportOptions = [
    { value: "equipment", label: "Equipment Inventory Report" },
    { value: "maintenance", label: "Maintenance Activity Report" },
    { value: "downtime", label: "Equipment Downtime Report" },
    { value: "technician", label: "Technician Performance Report" },
    { value: "costs", label: "Maintenance Cost Report" },
  ];

  const equipmentStats = {
    total: 45,
    active: 42,
    scrapped: 3,
    byDepartment: [
      { dept: "Production", count: 18 },
      { dept: "IT", count: 12 },
      { dept: "Facilities", count: 10 },
      { dept: "HR", count: 5 },
    ],
  };

  const maintenanceStats = {
    totalRequests: 124,
    completed: 98,
    inProgress: 18,
    overdue: 8,
    byStatus: [
      { status: "Completed", count: 98, percentage: 79 },
      { status: "In Progress", count: 18, percentage: 15 },
      { status: "Overdue", count: 8, percentage: 6 },
    ],
  };

  const downtimeStats = {
    avgDowntime: "4.5 hours",
    totalDowntime: "98 hours",
    mostAffected: "CNC Machine",
    topReasons: [
      { reason: "Mechanical Failure", hours: 32 },
      { reason: "Electrical Issues", hours: 28 },
      { reason: "Maintenance", hours: 18 },
      { reason: "Parts Replacement", hours: 20 },
    ],
  };

  const technicianStats = {
    avgTasksPerDay: 3.2,
    avgCompletionTime: "2.1 days",
    topPerformers: [
      { name: "John Doe", completed: 28, rating: 4.8 },
      { name: "Jane Smith", completed: 25, rating: 4.7 },
      { name: "Sarah Williams", completed: 22, rating: 4.6 },
    ],
  };

  const costStats = {
    totalSpent: "$42,500",
    averageCost: "$342",
    topSpends: [
      { item: "Parts & Materials", cost: "$18,500" },
      { item: "Labor", cost: "$16,200" },
      { item: "Contractors", cost: "$7,800" },
    ],
  };

  const handleExport = () => {
    alert(`Exporting ${reportOptions.find(r => r.value === selectedReport)?.label}...`);
  };

  const renderReport = () => {
    switch (selectedReport) {
      case "equipment":
        return <EquipmentReport data={equipmentStats} />;
      case "maintenance":
        return <MaintenanceReport data={maintenanceStats} />;
      case "downtime":
        return <DowntimeReport data={downtimeStats} />;
      case "technician":
        return <TechnicianReport data={technicianStats} />;
      case "costs":
        return <CostReport data={costStats} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1>Reports & Analytics</h1>
          <p style={styles.subtitle}>Generate and analyze maintenance reports</p>
        </div>
        <button style={styles.exportBtn} onClick={handleExport}>
          <FiDownload size={18} /> Export Report
        </button>
      </div>

      {/* FILTERS */}
      <div style={styles.filterSection}>
        <div style={styles.reportSelector}>
          <label>Select Report:</label>
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            style={styles.select}
          >
            {reportOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.dateRange}>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              style={styles.input}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              style={styles.input}
            />
          </div>
        </div>
      </div>

      {/* REPORT CONTENT */}
      <div style={styles.reportContent}>{renderReport()}</div>
    </div>
  );
}

function EquipmentReport({ data }) {
  return (
    <div>
      <h2 style={styles.reportTitle}>Equipment Inventory Report</h2>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Equipment</div>
          <div style={styles.statValue}>{data.total}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Active</div>
          <div style={styles.statValue}>{data.active}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Scrapped</div>
          <div style={styles.statValue}>{data.scrapped}</div>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Equipment by Department</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Count</th>
              <th style={styles.th}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.byDepartment.map((d) => (
              <tr key={d.dept} style={styles.tr}>
                <td style={styles.td}>{d.dept}</td>
                <td style={styles.td}>{d.count}</td>
                <td style={styles.td}>{((d.count / data.total) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MaintenanceReport({ data }) {
  return (
    <div>
      <h2 style={styles.reportTitle}>Maintenance Activity Report</h2>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Requests</div>
          <div style={styles.statValue}>{data.totalRequests}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Completed</div>
          <div style={{ ...styles.statValue, color: "#10b981" }}>
            {data.completed}
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>In Progress</div>
          <div style={{ ...styles.statValue, color: "#f59e0b" }}>
            {data.inProgress}
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Overdue</div>
          <div style={{ ...styles.statValue, color: "#ef4444" }}>
            {data.overdue}
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Status Breakdown</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Count</th>
              <th style={styles.th}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.byStatus.map((s) => (
              <tr key={s.status} style={styles.tr}>
                <td style={styles.td}>{s.status}</td>
                <td style={styles.td}>{s.count}</td>
                <td style={styles.td}>{s.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DowntimeReport({ data }) {
  return (
    <div>
      <h2 style={styles.reportTitle}>Equipment Downtime Report</h2>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Avg Downtime</div>
          <div style={styles.statValue}>{data.avgDowntime}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Downtime</div>
          <div style={styles.statValue}>{data.totalDowntime}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Most Affected</div>
          <div style={{ ...styles.statValue, fontSize: "16px" }}>
            {data.mostAffected}
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Downtime by Reason</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Reason</th>
              <th style={styles.th}>Hours</th>
              <th style={styles.th}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.topReasons.map((r) => (
              <tr key={r.reason} style={styles.tr}>
                <td style={styles.td}>{r.reason}</td>
                <td style={styles.td}>{r.hours} hours</td>
                <td style={styles.td}>
                  {((r.hours / data.topReasons.reduce((a, b) => a + b.hours, 0)) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TechnicianReport({ data }) {
  return (
    <div>
      <h2 style={styles.reportTitle}>Technician Performance Report</h2>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Avg Tasks/Day</div>
          <div style={styles.statValue}>{data.avgTasksPerDay}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Avg Completion Time</div>
          <div style={styles.statValue}>{data.avgCompletionTime}</div>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Top Performers</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Technician</th>
              <th style={styles.th}>Completed Tasks</th>
              <th style={styles.th}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.topPerformers.map((t) => (
              <tr key={t.name} style={styles.tr}>
                <td style={styles.td}>{t.name}</td>
                <td style={styles.td}>{t.completed}</td>
                <td style={styles.td}>
                  <span style={{ color: "#f59e0b", fontWeight: "600" }}>★ {t.rating}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CostReport({ data }) {
  return (
    <div>
      <h2 style={styles.reportTitle}>Maintenance Cost Report</h2>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Spent</div>
          <div style={styles.statValue}>{data.totalSpent}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Average Cost</div>
          <div style={styles.statValue}>{data.averageCost}</div>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Cost Breakdown</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.topSpends.map((s) => (
              <tr key={s.item} style={styles.tr}>
                <td style={styles.td}>{s.item}</td>
                <td style={{ ...styles.td, fontWeight: "600", color: "#1e293b" }}>
                  {s.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    marginBottom: "30px",
  },
  subtitle: {
    color: "#64748b",
    marginTop: "5px",
  },
  exportBtn: {
    background: "#10b981",
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
  filterSection: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "30px",
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  reportSelector: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  dateRange: {
    display: "flex",
    gap: "20px",
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    minWidth: "300px",
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  reportContent: {
    background: "#fff",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  reportTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "25px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "#f8fafc",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #e2e8f0",
  },
  statLabel: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "500",
    marginBottom: "10px",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
  },
  section: {
    marginTop: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  thead: {
    background: "#f8fafc",
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    borderBottom: "2px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#334155",
  },
};
