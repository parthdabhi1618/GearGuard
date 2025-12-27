import { useEffect } from "react";
import { motion } from "framer-motion" ;
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function MaintenanceCalendar() {
  const events = [
    {
      title: "AC Preventive Service",
      date: "2025-12-10",
      priority: "Medium",
    },
    {
      title: "Generator Inspection",
      date: "2025-12-15",
      priority: "High",
    },
    {
      title: "Server Maintenance",
      date: "2025-12-27",
      priority: "Low",
    },
  ];

  function handleDateClick(info) {
    alert(`Create preventive maintenance on ${info.dateStr}`);
  }

  function renderEventContent(eventInfo) {
    const color = priorityColor(eventInfo.event.extendedProps.priority);

    return (
      <div
        style={{
          background: color.bg,
          color: color.text,
          padding: "4px 6px",
          borderRadius: "6px",
          fontSize: "12px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {eventInfo.event.title}
      </div>
    );
  }

  // ✅ SAFE STYLE INJECTION
  useEffect(() => {
    if (document.getElementById("calendar-styles")) return;

    const style = document.createElement("style");
    style.id = "calendar-styles";
    style.innerHTML = `
      @media (max-width: 768px) {
        .fc-toolbar-title {
          font-size: 16px !important;
        }
        .fc-daygrid-day-number {
          font-size: 12px;
        }
      }

      .fc-daygrid-day:hover {
        background-color: #eef2ff;
        cursor: pointer;
      }

      .fc-button {
        border-radius: 8px !important;
        padding: 6px 10px !important;
      }

      .fc-button-primary {
        background-color: #2563eb !important;
        border: none !important;
      }

      .fc-button-primary:not(:disabled):hover {
        background-color: #1d4ed8 !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "30px" }}
    >
      {/* HEADER */}
      <h1>Maintenance Calendar</h1>
      <p style={{ color: "#64748b", marginBottom: "20px" }}>
        Preventive maintenance scheduling
      </p>

      {/* CALENDAR CARD */}
      <div style={card}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={events}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          dayMaxEventRows={3}
          fixedWeekCount={false}
        />
      </div>
    </motion.div>
  );
}

/* ---------- HELPERS ---------- */

function priorityColor(priority) {
  if (priority === "High") {
    return { bg: "#fee2e2", text: "#991b1b" };
  }
  if (priority === "Medium") {
    return { bg: "#fef3c7", text: "#92400e" };
  }
  return { bg: "#dcfce7", text: "#166534" };
}

/* ---------- STYLES ---------- */

const card = {
  background: "#ffffff",
  padding: "16px",
  borderRadius: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};
