import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowRight, FiShield, FiAlertCircle, FiBriefcase } from "react-icons/fi";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  
  // 1. Added 'role' to state (default is empty or technician)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "technician" // Default selection
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSignup(e) {
    e.preventDefault();
    
    if(formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
    }

    setLoading(true);
    setError("");

    try {
      // 2. Sending 'role' to the backend now
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name: formData.name, 
        email: formData.email,
        password: formData.password,
        role: formData.role 
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed. Try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        
        {/* LEFT SIDE: BRANDING */}
        <div className="signup-branding">
          <div className="brand-title">
            <FiShield size={28} /> GearGuard
          </div>
          <div className="brand-pitch">
            <h2>Join the future of maintenance.</h2>
            <p>Create your account to start tracking equipment, managing teams, and predicting downtime.</p>
          </div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>Trusted by 500+ Industry Leaders</div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="signup-form-section">
          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Get started with your free account</p>
          </div>

          {error && (
            <div style={{ backgroundColor: "#fee2e2", color: "#ef4444", padding: "10px", borderRadius: "10px", fontSize: "14px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiAlertCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
            
            {/* Name */}
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-wrapper">
                <input type="text" name="name" placeholder="John Doe" className="modern-input" required onChange={handleChange} />
                <FiUser className="input-icon" />
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-wrapper">
                <input type="email" name="email" placeholder="name@company.com" className="modern-input" required onChange={handleChange} />
                <FiMail className="input-icon" />
              </div>
            </div>

            {/* 3. NEW INPUT: Role Selection */}
            <div className="input-group">
              <label className="input-label">Select Role</label>
              <div className="input-wrapper">
                <select 
                  name="role" 
                  className="modern-input" 
                  value={formData.role} 
                  onChange={handleChange}
                  style={{ cursor: "pointer", appearance: "none" }} // 'appearance: none' hides default arrow to use ours if we wanted
                >
                  <option value="technician">Technician</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
                <FiBriefcase className="input-icon" />
                {/* Custom arrow indicator */}
                <div style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8", fontSize: "12px" }}>▼</div>
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <input type="password" name="password" placeholder="Create a password" className="modern-input" required onChange={handleChange} />
                <FiLock className="input-icon" />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <div className="input-wrapper">
                <input type="password" name="confirmPassword" placeholder="Repeat password" className="modern-input" required onChange={handleChange} />
                <FiLock className="input-icon" />
              </div>
            </div>

            <button className="signup-btn" disabled={loading}>
              {loading ? "Creating Account..." : (<>Create Account <FiArrowRight /></>)}
            </button>

            <div className="signup-footer">
              Already have an account? <Link to="/login">Log in</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}