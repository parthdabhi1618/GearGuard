import { useState } from "react";
import { FiTrendingUp, FiTrendingDown, FiActivity, FiDollarSign } from "react-icons/fi";
import "./Reports.css";

export default function Reports() {
  const [timeRange, setTimeRange] = useState("This Month");

  // Mock Data
  const kpiData = [
    { label: "Total Maintenance Costs", value: "$12,450", trend: "+8.2%", icon: <FiDollarSign />, good: false },
    { label: "Completion Rate", value: "94%", trend: "+2.1%", icon: <FiActivity />, good: true },
    { label: "Open Requests", value: "8", trend: "-3", icon: <FiTrendingDown />, good: true }, // Negative open requests is good
    { label: "Avg. Repair Time", value: "4.2 hrs", trend: "-12%", icon: <FiTrendingUp />, good: true },
  ];

  // Bar Chart Data (Height is percentage relative to max value)
  const barData = [
    { label: "Mon", value: 12, height: "40%", color: "#3b82f6" },
    { label: "Tue", value: 18, height: "60%", color: "#3b82f6" },
    { label: "Wed", value: 8, height: "25%", color: "#3b82f6" },
    { label: "Thu", value: 24, height: "80%", color: "#3b82f6" },
    { label: "Fri", value: 30, height: "100%", color: "#2563eb" }, // Peak
    { label: "Sat", value: 15, height: "50%", color: "#93c5fd" },
    { label: "Sun", value: 5, height: "15%", color: "#93c5fd" },
  ];

  // Uptime Data
  const uptimeData = [
    { name: "CNC Machine 01", percent: 98, color: "#166534" },
    { name: "Hydraulic Press", percent: 85, color: "#eab308" },
    { name: "Server Rack A", percent: 99.9, color: "#166534" },
    { name: "Conveyor Belt", percent: 92, color: "#166534" },
    { name: "Assembly Robot", percent: 74, color: "#dc2626" }, // Low uptime
  ];

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <div className="reports-title">
          <h1>Analytics & Reports</h1>
          <p>Key performance indicators and operational insights.</p>
        </div>
        <select 
          className="date-filter" 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>Last Quarter</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => (
          <div key={index} className="kpi-card">
            <div>
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.value}</div>
            </div>
            <div className={`kpi-trend ${kpi.good ? "trend-up" : "trend-down"}`}>
              {kpi.trend.startsWith("+") ? <FiTrendingUp /> : <FiTrendingDown />}
              <span>{kpi.trend} from last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Grid */}
      <div className="analytics-grid">
        
        {/* Custom Bar Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Maintenance Request Volume</h3>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Daily Breakdown</span>
          </div>
          
          <div className="bar-chart-container">
            {barData.map((bar, i) => (
              <div key={i} className="bar-group">
                <div 
                  className="bar" 
                  style={{ height: bar.height, background: bar.color }}
                  data-value={bar.value}
                ></div>
                <span className="bar-label">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Uptime List */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Equipment Uptime</h3>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Target: 95%</span>
          </div>

          <div className="uptime-list">
            {uptimeData.map((item, i) => (
              <div key={i} className="uptime-item">
                <div className="uptime-info">
                  <span>{item.name}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${item.percent}%`, background: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}