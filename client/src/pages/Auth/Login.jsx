import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    localStorage.setItem("auth", "true");
    navigate("/");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={container}
    >
      <form style={card} onSubmit={handleLogin}>
        <h2>Login to GearGuard</h2>
        <p style={sub}>Maintenance Management System</p>

        <input
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button style={btn}>Login</button>

        <p style={footer}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </motion.div>
  );
}

/* styles */
const container = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f1f5f9",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "14px",
  width: "320px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
};

const sub = { color: "#64748b", marginBottom: "20px" };

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const footer = { marginTop: "15px", fontSize: "14px" };
