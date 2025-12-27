import { useState } from "react";
import { FiSave, FiRotateCcw, FiBell, FiLock, FiUser } from "react-icons/fi";
import "./Settings.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    companyName: "GearGuard Inc.",
    email: "admin@gearguard.com",
    phone: "+1 (555) 123-4567",
    address: "123 Industrial Avenue, Tech City",
    timezone: "UTC-5",
    language: "English",
    maintenanceAlerts: true,
    equipmentAlerts: true,
    weeklyReports: true,
    overdueNotifications: true,
    twoFactorAuth: false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
    setHasChanges(false);
  };

  const handleReset = () => {
    setHasChanges(false);
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1>Settings</h1>
        <p style={styles.subtitle}>Manage system settings and preferences</p>
      </div>

      <div style={styles.content}>
        {/* TABS */}
        <div style={styles.tabs}>
          {[
            { id: "general", label: "General", icon: <FiUser size={18} /> },
            { id: "notifications", label: "Notifications", icon: <FiBell size={18} /> },
            { id: "security", label: "Security", icon: <FiLock size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tab,
                borderBottom: activeTab === tab.id ? "3px solid #3b82f6" : "3px solid transparent",
                color: activeTab === tab.id ? "#3b82f6" : "#64748b",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div style={styles.tabContent}>
          {activeTab === "general" && (
            <div>
              <h2 style={styles.sectionTitle}>General Settings</h2>

              <div style={styles.formGroup}>
                <label style={styles.label}>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Address</label>
                <textarea
                  name="address"
                  value={settings.address}
                  onChange={handleInputChange}
                  style={{ ...styles.input, minHeight: "100px", resize: "vertical" }}
                />
              </div>

              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Timezone</label>
                  <select name="timezone" value={settings.timezone} onChange={handleInputChange} style={styles.input}>
                    <option value="UTC-8">UTC-8 (Pacific)</option>
                    <option value="UTC-5">UTC-5 (Eastern)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC+1">UTC+1 (CET)</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Language</label>
                  <select name="language" value={settings.language} onChange={handleInputChange} style={styles.input}>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 style={styles.sectionTitle}>Notification Preferences</h2>

              <div style={styles.settingItem}>
                <div>
                  <h3 style={styles.settingTitle}>Maintenance Alerts</h3>
                  <p style={styles.settingDesc}>Get notified about maintenance requests and updates</p>
                </div>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    name="maintenanceAlerts"
                    checked={settings.maintenanceAlerts}
                    onChange={handleInputChange}
                  />
                  <span style={styles.toggleSlider}></span>
                </label>
              </div>

              <div style={styles.settingItem}>
                <div>
                  <h3 style={styles.settingTitle}>Equipment Alerts</h3>
                  <p style={styles.settingDesc}>Get notified about equipment status changes</p>
                </div>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    name="equipmentAlerts"
                    checked={settings.equipmentAlerts}
                    onChange={handleInputChange}
                  />
                  <span style={styles.toggleSlider}></span>
                </label>
              </div>

              <div style={styles.settingItem}>
                <div>
                  <h3 style={styles.settingTitle}>Weekly Reports</h3>
                  <p style={styles.settingDesc}>Receive weekly summary reports</p>
                </div>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    name="weeklyReports"
                    checked={settings.weeklyReports}
                    onChange={handleInputChange}
                  />
                  <span style={styles.toggleSlider}></span>
                </label>
              </div>

              <div style={styles.settingItem}>
                <div>
                  <h3 style={styles.settingTitle}>Overdue Notifications</h3>
                  <p style={styles.settingDesc}>Get alerts for overdue maintenance tasks</p>
                </div>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    name="overdueNotifications"
                    checked={settings.overdueNotifications}
                    onChange={handleInputChange}
                  />
                  <span style={styles.toggleSlider}></span>
                </label>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 style={styles.sectionTitle}>Security Settings</h2>

              <div style={styles.settingItem}>
                <div>
                  <h3 style={styles.settingTitle}>Two-Factor Authentication</h3>
                  <p style={styles.settingDesc}>Enable 2FA for enhanced account security</p>
                </div>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={handleInputChange}
                  />
                  <span style={styles.toggleSlider}></span>
                </label>
              </div>

              <div style={styles.securitySection}>
                <h3 style={styles.settingTitle}>Change Password</h3>
                <p style={styles.settingDesc}>Update your password regularly for security</p>
                <button style={styles.changePasswordBtn}>Change Password</button>
              </div>

              <div style={styles.securitySection}>
                <h3 style={styles.settingTitle}>Active Sessions</h3>
                <p style={styles.settingDesc}>Manage your active sessions across devices</p>
                <table style={styles.sessionsTable}>
                  <thead>
                    <tr style={styles.thead}>
                      <th style={styles.th}>Device</th>
                      <th style={styles.th}>Location</th>
                      <th style={styles.th}>Last Active</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={styles.tr}>
                      <td style={styles.td}>Windows PC</td>
                      <td style={styles.td}>New York, USA</td>
                      <td style={styles.td}>Now</td>
                      <td style={styles.td}>
                        <button style={styles.logoutBtn}>Logout</button>
                      </td>
                    </tr>
                    <tr style={styles.tr}>
                      <td style={styles.td}>iPhone</td>
                      <td style={styles.td}>New York, USA</td>
                      <td style={styles.td}>2 hours ago</td>
                      <td style={styles.td}>
                        <button style={styles.logoutBtn}>Logout</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        {hasChanges && (
          <div style={styles.actions}>
            <button style={styles.resetBtn} onClick={handleReset}>
              <FiRotateCcw size={18} /> Discard Changes
            </button>
            <button style={styles.saveBtn} onClick={handleSave}>
              <FiSave size={18} /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "40px",
  },
  subtitle: {
    color: "#64748b",
    marginTop: "5px",
  },
  content: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid #e5e7eb",
    background: "#f8fafc",
    padding: "0 30px",
  },
  tab: {
    background: "none",
    border: "none",
    padding: "16px 24px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
  },
  tabContent: {
    padding: "30px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "25px",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "8px",
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  settingItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  settingTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0",
  },
  settingDesc: {
    fontSize: "13px",
    color: "#64748b",
    margin: "5px 0 0 0",
  },
  toggle: {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "24px",
  },
  toggleSlider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#cbd5e1",
    transition: "0.3s",
    borderRadius: "24px",
  },
  securitySection: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #e5e7eb",
  },
  changePasswordBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
  sessionsTable: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse",
  },
  thead: {
    background: "#f8fafc",
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    borderBottom: "2px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#334155",
  },
  logoutBtn: {
    padding: "6px 12px",
    background: "#fee2e2",
    color: "#991b1b",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    padding: "20px 30px",
    background: "#f8fafc",
    borderTop: "1px solid #e5e7eb",
  },
  saveBtn: {
    padding: "10px 20px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  resetBtn: {
    padding: "10px 20px",
    background: "#fff",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};
