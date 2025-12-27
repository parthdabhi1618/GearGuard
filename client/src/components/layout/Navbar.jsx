export default function Navbar() {
  return (
    <div
      style={{
        height: "60px",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        justifyContent: "space-between",
      }}
    >
      <h3>GearGuard</h3>
      <span style={{ fontSize: "14px" }}>Admin</span>
    </div>
  );
}
