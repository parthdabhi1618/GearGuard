import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  parseISO 
} from "date-fns";
import { FiChevronLeft, FiChevronRight, FiPlus, FiFilter } from "react-icons/fi";
import "./Calendar.css"; 

export default function Calendar() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Real Data from API
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // Fetch all maintenance requests
      const response = await axios.get("http://localhost:5000/api/maintenance", config);
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  // 2. Helper to get Priority Color
  const getPriorityClass = (priority) => {
    if (priority === '3' || priority === 'Critical') return 'event-critical';
    if (priority === '2' || priority === 'High') return 'event-high';
    if (priority === '1' || priority === 'Medium') return 'event-medium';
    return 'event-low';
  };

  // 3. Render Header Controls
  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <div className="header-left">
          <h1>Maintenance Calendar</h1>
          <p>View and manage scheduled jobs</p>
        </div>
        
        <div className="header-actions">
           <div className="legend">
              <span className="legend-item"><span className="dot critical"></span>Critical</span>
              <span className="legend-item"><span className="dot high"></span>High</span>
              <span className="legend-item"><span className="dot medium"></span>Medium</span>
              <span className="legend-item"><span className="dot low"></span>Low</span>
           </div>

          <div className="date-controls">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="nav-btn">
              <FiChevronLeft />
            </button>
            <span className="current-date-label">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="nav-btn">
              <FiChevronRight />
            </button>
          </div>

          <button className="primary-btn" onClick={() => navigate("/maintenance/new")}>
            <FiPlus /> New Task
          </button>
        </div>
      </div>
    );
  };

  // 4. Render Days of Week (Sun, Mon...)
  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col-header" key={i}>
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="days-row">{days}</div>;
  };

  // 5. Render The Actual Grid Cells
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        
        // Filter tasks for this specific day
        const dayTasks = tasks.filter(task => {
          if (!task.scheduled_date) return false;
          // Handle string or date object
          const taskDate = new Date(task.scheduled_date);
          return isSameDay(taskDate, cloneDay);
        });

        days.push(
          <div
            className={`col-cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, new Date())
                ? "today"
                : ""
            }`}
            key={day}
          >
            <span className="day-number">{formattedDate}</span>
            <div className="events-stack">
              {dayTasks.map(task => (
                <div 
                  key={task._id} 
                  className={`event-pill ${getPriorityClass(task.priority)}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    // navigate(`/maintenance/${task._id}`); // View details if needed
                  }}
                  title={task.name}
                >
                  {task.name}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <div className="calendar-page">
      {renderHeader()}
      <div className="calendar-grid">
        {renderDays()}
        {loading ? (
          <div className="calendar-loading">Loading schedule...</div>
        ) : (
          renderCells()
        )}
      </div>
    </div>
  );
}