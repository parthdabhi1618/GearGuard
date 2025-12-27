import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function MaintenanceCalendar() {
  const events = [
    {
      title: "AC Preventive Service",
      date: "2025-01-05",
    },
    {
      title: "Generator Inspection",
      date: "2025-01-12",
    },
    {
      title: "Server Maintenance",
      date: "2025-01-20",
    },
  ];

  function handleDateClick(info) {
    alert(`Create preventive maintenance on ${info.dateStr}`);
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Maintenance Calendar</h1>
      <p style={{ color: "#64748b" }}>
        Preventive maintenance scheduling
      </p>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="auto"
        />
      </div>
    </div>
  );
}
