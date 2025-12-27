import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  function handleSignup(e) {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={container}
    >
      <form style={card} onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          placeholder="Full Name"
          required
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input placeholder="Email" type="email" required style={input} />
        <input placeholder="Password" type="password" required style={input} />

        <button style={btn}>Sign Up</button>

        <p style={footer}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </motion.div>
  );
}

/* reuse same styles as Login */
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
