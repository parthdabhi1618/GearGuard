import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiShield, FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import "./Login.css"; // Ensure this file exists

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // API Call
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password
      });

      if (response.data.token) {
        // Save Token
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify({
          name: response.data.name,
          role: response.data.role,
          email: response.data.email
        }));

        // Redirect
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed. Check server.";
      setError(errorMsg);
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* LEFT BRANDING */}
        <div className="login-branding">
          <div className="brand-header">
            <FiShield size={28} color="#3b82f6" />
            <span>GearGuard</span>
          </div>
          <div className="brand-quote">
            <h2>Welcome Back!</h2>
            <p>Sign in to manage your equipment maintenance.</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="login-form-section">
          <div className="form-header-text">
            <h2>Log In</h2>
            <p>Access your admin dashboard</p>
          </div>

          {error && (
            <div style={{ backgroundColor: "#fee2e2", color: "#ef4444", padding: "10px", borderRadius: "8px", marginBottom: "15px", display: "flex", gap: "10px", alignItems: "center" }}>
              <FiAlertCircle /> {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Email</label>
              <div className="input-wrapper">
                <input type="email" required className="modern-input" placeholder="name@company.com" 
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                <FiMail className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <input type="password" required className="modern-input" placeholder="••••••••" 
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                <FiLock className="input-icon" />
              </div>
            </div>

            <button className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : <>Sign In <FiArrowRight /></>}
            </button>

            <div className="signup-footer">
              Don't have an account? <Link to="/signup">Create account</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}