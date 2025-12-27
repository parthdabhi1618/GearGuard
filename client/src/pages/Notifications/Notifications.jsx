import { useState } from "react";
import { FiBell, FiX, FiCheck, FiClock } from "react-icons/fi";
import "./Notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "maintenance",
      title: "Maintenance Request Updated",
      message: "Motor Repair - Conveyor Belt has been assigned to John Doe",
      timestamp: "2025-01-27 10:30 AM",
      read: false,
      icon: "🔧",
    },
    {
      id: 2,
      type: "alert",
      title: "Overdue Maintenance",
      message: "Server Rack maintenance is 2 days overdue",
      timestamp: "2025-01-27 09:15 AM",
      read: false,
      icon: "⚠️",
    },
    {
      id: 3,
      type: "equipment",
      title: "Equipment Added",
      message: "New CNC Machine (SN-C2024) has been added to Production",
      timestamp: "2025-01-27 08:00 AM",
      read: true,
      icon: "⚙️",
    },
    {
      id: 4,
      type: "report",
      title: "Weekly Report Generated",
      message: "Your weekly maintenance report is ready for download",
      timestamp: "2025-01-26 05:00 PM",
      read: true,
      icon: "📊",
    },
    {
      id: 5,
      type: "maintenance",
      title: "Task Completed",
      message: "AC Service - Server Room marked as completed",
      timestamp: "2025-01-26 03:45 PM",
      read: true,
      icon: "✓",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAsUnread = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1>Notifications & Alerts</h1>
        <p style={styles.subtitle}>Stay updated with maintenance activities</p>
      </div>

      {/* FILTERS & ACTIONS */}
      <div style={styles.toolbar}>
        <div style={styles.filterGroup}>
          {["all", "unread", "read"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? "#e0e7ff" : "#fff",
                color: filter === f ? "#1d4ed8" : "#334155",
                borderColor: filter === f ? "#3b82f6" : "#cbd5e1",
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "unread" && ` (${unreadCount})`}
            </button>
          ))}
        </div>

        {unreadCount > 0 && (
          <button style={styles.markAllBtn} onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>

      {/* NOTIFICATIONS LIST */}
      <div style={styles.notificationsList}>
        {filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <FiBell size={48} style={{ color: "#cbd5e1", marginBottom: "15px" }} />
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          filtered.map((notification) => (
            <div
              key={notification.id}
              style={{
                ...styles.notificationItem,
                background: notification.read ? "#fff" : "#f0f9ff",
                borderLeft: notification.read ? "4px solid #e5e7eb" : "4px solid #3b82f6",
              }}
            >
              <div style={styles.notificationIcon}>{notification.icon}</div>

              <div style={styles.notificationContent}>
                <div style={styles.notificationHeader}>
                  <h3 style={styles.notificationTitle}>{notification.title}</h3>
                  {!notification.read && (
                    <span style={styles.unreadBadge}>New</span>
                  )}
                </div>
                <p style={styles.notificationMessage}>{notification.message}</p>
                <div style={styles.notificationTime}>
                  <FiClock size={14} />
                  {notification.timestamp}
                </div>
              </div>

              <div style={styles.notificationActions}>
                {!notification.read ? (
                  <button
                    style={styles.actionBtn}
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <FiCheck size={18} />
                  </button>
                ) : (
                  <button
                    style={styles.actionBtn}
                    onClick={() => markAsUnread(notification.id)}
                    title="Mark as unread"
                  >
                    <FiBell size={18} />
                  </button>
                )}
                <button
                  style={{ ...styles.actionBtn, color: "#ef4444" }}
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "30px",
  },
  subtitle: {
    color: "#64748b",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  },
  filterGroup: {
    display: "flex",
    gap: "8px",
  },
  filterBtn: {
    padding: "8px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  markAllBtn: {
    padding: "8px 14px",
    border: "1px solid #3b82f6",
    borderRadius: "6px",
    background: "#eff6ff",
    color: "#3b82f6",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
  },
  notificationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  notificationItem: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    background: "#fff",
    borderRadius: "10px",
    borderLeft: "4px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    transition: "all 0.2s",
  },
  notificationIcon: {
    fontSize: "24px",
    lineHeight: "1",
    flexShrink: 0,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "6px",
  },
  notificationTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0",
  },
  unreadBadge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "4px",
    background: "#3b82f6",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "600",
  },
  notificationMessage: {
    fontSize: "13px",
    color: "#64748b",
    margin: "0 0 8px 0",
    lineHeight: "1.4",
  },
  notificationTime: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#94a3b8",
  },
  notificationActions: {
    display: "flex",
    gap: "8px",
    flexShrink: 0,
  },
  actionBtn: {
    background: "transparent",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#64748b",
  },
};
