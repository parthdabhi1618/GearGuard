import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiShield, FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("auth", "true");
      setLoading(false);
      navigate("/");
    }, 800);
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
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="modern-input"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
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