import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowRight, FiShield, FiEye, FiEyeOff } from "react-icons/fi";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();
    
    if(formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
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
            <p>
              Create your account to start tracking equipment, 
              managing teams, and predicting downtime before it happens.
            </p>
          </div>
          
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            Trusted by 500+ Industry Leaders
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="signup-form-section">
          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Get started with your free admin account</p>
          </div>

          <form onSubmit={handleSignup}>
            
            {/* Name Input */}
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="modern-input"
                  required
                  onChange={handleChange}
                />
                <FiUser className="input-icon" />
              </div>
            </div>

            {/* Email Input */}
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  className="modern-input"
                  required
                  onChange={handleChange}
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
                  name="password"
                  placeholder="Create a password"
                  className="modern-input"
                  required
                  onChange={handleChange}
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

            {/* Confirm Password Input */}
            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repeat password"
                  className="modern-input"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle-btn"
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button className="signup-btn" disabled={loading}>
              {loading ? "Creating Account..." : (
                <>
                  Create Account <FiArrowRight />
                </>
              )}
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