export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#ffffff",
        height: "calc(100vh - 60px)",
        padding: "20px",
        borderRight: "1px solid #e2e8f0",
      }}
    >
      <MenuItem text="Dashboard" active />
      <MenuItem text="Equipment" />
      <MenuItem text="Maintenance" />
      <MenuItem text="Teams" />
      <MenuItem text="Calendar" />
      <MenuItem text="Reports" />
    </div>
  );
}

function MenuItem({ text, active }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        marginBottom: "8px",
        borderRadius: "6px",
        background: active ? "#e0e7ff" : "transparent",
        color: active ? "#1d4ed8" : "#334155",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      {text}
    </div>
  );
}
