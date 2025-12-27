export default function Navbar() {
  return (
    <div
      style={{
        height: "60px",
        background: "#0f172a",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <h3>GearGuard</h3>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          A
        </div>
        <span style={{ fontSize: "14px" }}>Admin</span>
      </div>
    </div>
  );
}
