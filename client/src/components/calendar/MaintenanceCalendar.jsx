import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { motion } from "framer-motion";
import "./MaintenanceCalendar.css"; // Import the custom styles

export default function MaintenanceCalendar() {
  // Added 'priority' to events for color coding
  const events = [
    {
      title: "AC Preventive Service",
      date: "2025-01-05",
      extendedProps: { priority: "Medium" },
    },
    {
      title: "Generator Inspection",
      date: "2025-01-12",
      extendedProps: { priority: "High" },
    },
    {
      title: "Server Maintenance",
      date: "2025-01-20",
      extendedProps: { priority: "Low" },
    },
    {
      title: "Conveyor Belt Check",
      date: "2025-01-22",
      extendedProps: { priority: "High" },
    },
  ];

  function handleDateClick(info) {
    // In a real app, you would open a modal here
    const confirm = window.confirm(`Schedule new maintenance on ${info.dateStr}?`);
    if(confirm) console.log("Open Modal");
  }

  // Custom styling for the event pills
  function renderEventContent(eventInfo) {
    const priority = eventInfo.event.extendedProps.priority || "Low";
    const colors = getPriorityColor(priority);

    return (
      <div
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          borderLeft: `3px solid ${colors.border}`,
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "11px",
          fontWeight: "600",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
          cursor: "pointer",
          display: "flex", 
          alignItems: "center",
          gap: "4px"
        }}
      >
        {eventInfo.event.title}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="calendar-page-container"
    >
      <div className="calendar-header">
        <h1>Maintenance Calendar</h1>
        <p>Preventive maintenance scheduling</p>
      </div>

      {/* Priority Legend */}
      <div className="priority-legend">
        <LegendItem label="High Priority" color="#ef4444" />
        <LegendItem label="Medium Priority" color="#f59e0b" />
        <LegendItem label="Low Priority" color="#22c55e" />
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventContent={renderEventContent} // Use custom renderer
          height="auto"
          headerToolbar={{
            left: 'title',
            center: '',
            right: 'today prev,next'
          }}
          dayMaxEventRows={3}
        />
      </div>
    </motion.div>
  );
}

/* --- Internal Helper Components --- */

function LegendItem({ label, color }) {
  return (
    <div className="legend-item">
      <span className="legend-dot" style={{ background: color }}></span>
      {label}
    </div>
  );
}

function getPriorityColor(priority) {
  switch (priority) {
    case "High":
      return { bg: "#fee2e2", text: "#991b1b", border: "#ef4444" }; // Red
    case "Medium":
      return { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" }; // Amber
    case "Low":
    default:
      return { bg: "#dcfce7", text: "#166534", border: "#22c55e" }; // Green
  }
}