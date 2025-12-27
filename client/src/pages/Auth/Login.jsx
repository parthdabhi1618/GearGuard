import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiShield, FiAlertCircle } from "react-icons/fi"; // Added Alert Icon
import axios from "axios"; // Import Axios
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // 🚀 REAL BACKEND CONNECTION
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password
      });

      // If successful, the backend sends a token and user info
      if (response.data.token) {
        // 1. Save Token & User Info to LocalStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify({
          name: response.data.name,
          role: response.data.role
        }));

        // 2. Redirect to Dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle Errors (Wrong password, user not found, etc.)
      const errorMsg = err.response?.data?.message || "Login failed. Please check your details.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* LEFT SIDE: BRANDING */}
        <div className="login-branding">
          <div className="brand-header">
            <FiShield size={28} color="#3b82f6" />
            <span>GearGuard</span>
          </div>
          
          <div className="brand-quote">
            <h2>Manage your equipment with precision.</h2>
            <p>
              The advanced maintenance system for tracking assets, 
              scheduling repairs, and ensuring uptime.
            </p>
          </div>
          
          <div style={{ fontSize: "12px", opacity: 0.6 }}>
            © 2025 GearGuard Systems
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="login-form-section">
          <div className="form-header-text">
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          {/* 🔴 Error Message Display */}
          {error && (
            <div style={{ 
              backgroundColor: "#fee2e2", 
              color: "#ef4444", 
              padding: "10px", 
              borderRadius: "8px", 
              fontSize: "14px", 
              marginBottom: "15px", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }}>
              <FiAlertCircle /> {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            
            {/* Email Input */}
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="modern-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FiMail className="input-icon" />
              </div>
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="modern-input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FiLock className="input-icon" />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="form-actions">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#2563eb' }} /> 
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : (
                <>
                  Sign In <FiArrowRight />
                </>
              )}
            </button>

            <div className="signup-footer">
              Don’t have an account? <Link to="/signup">Create account</Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}