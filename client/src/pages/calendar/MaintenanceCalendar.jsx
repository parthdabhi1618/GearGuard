import React from "react";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./MaintenanceCalendar.css"; // Import the CSS

export default function MaintenanceCalendar() {
  const events = [
    {
      title: "AC Preventive Service",
      date: "2025-12-10",
      extendedProps: { priority: "Medium" }, // Correct way to store extra data
    },
    {
      title: "Generator Inspection",
      date: "2025-12-15",
      extendedProps: { priority: "High" },
    },
    {
      title: "Server Maintenance",
      date: "2025-12-27",
      extendedProps: { priority: "Low" },
    },
    {
      title: "Conveyor Belt Check",
      date: "2025-12-28",
      extendedProps: { priority: "High" },
    },
  ];

  function handleDateClick(info) {
    // In a real app, open a modal here
    const confirm = window.confirm(`Schedule new maintenance on ${info.dateStr}?`);
    if (confirm) {
      console.log("Open Create Modal");
    }
  }

  // Custom Event Rendering (The Pills)
  function renderEventContent(eventInfo) {
    const priority = eventInfo.event.extendedProps.priority;
    const style = getPriorityStyle(priority);

    return (
      <div
        style={{
          background: style.bg,
          color: style.text,
          borderLeft: `3px solid ${style.border}`,
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "11px",
          fontWeight: "600",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px"
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
      className="calendar-container"
    >
      {/* HEADER */}
      <div className="calendar-header">
        <h1>Maintenance Calendar</h1>
        <p>Preventive maintenance scheduling & overview</p>
      </div>

      {/* LEGEND */}
      <div className="legend-container">
        <LegendItem color="#ef4444" label="High Priority" />
        <LegendItem color="#f59e0b" label="Medium Priority" />
        <LegendItem color="#22c55e" label="Low Priority" />
      </div>

      {/* CALENDAR CARD */}
      <div className="calendar-card">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto" // Adapts height based on rows
          contentHeight="auto"
          events={events}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          headerToolbar={{
            left: "title",
            center: "",
            right: "today prev,next",
          }}
          dayMaxEventRows={3} // Show "+more" if too many events
          fixedWeekCount={false} // Don't show empty rows for next month
        />
      </div>
    </motion.div>
  );
}

/* ---------- HELPERS & SUB-COMPONENTS ---------- */

function LegendItem({ color, label }) {
  return (
    <div className="legend-item">
      <span className="legend-dot" style={{ background: color }}></span>
      {label}
    </div>
  );
}

function getPriorityStyle(priority) {
  switch (priority) {
    case "High":
      return { bg: "#fee2e2", text: "#991b1b", border: "#ef4444" };
    case "Medium":
      return { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" };
    case "Low":
    default:
      return { bg: "#dcfce7", text: "#166534", border: "#22c55e" };
  }
}