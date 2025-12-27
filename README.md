# 🛡️ GearGuard – Modern Equipment Maintenance Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**A full-stack MERN application for streamlined equipment maintenance tracking and management**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Team](#-team)

---

## 🎯 Overview

GearGuard is a comprehensive maintenance management system designed to help organizations track equipment, manage maintenance teams, schedule preventive maintenance, and monitor operational efficiency through real-time analytics.

## ❗ Problem Statement

Equipment maintenance in many organizations faces critical challenges:

- **Poor visibility** of asset health and maintenance history
- **Reactive maintenance** leading to unexpected equipment failures and downtime
- **Unclear responsibility** and accountability between teams and technicians
- **Lack of structured workflow** for maintenance request tracking
- **No centralized system** for preventive maintenance scheduling
- **Limited analytics** on maintenance costs and equipment uptime

These issues result in increased operational costs, extended downtime, and reduced equipment lifespan.

## ✅ Solution

**GearGuard** provides an integrated platform that connects:

- 🖥️ **Equipment Management** – Centralized asset tracking and monitoring
- 👥 **Team Coordination** – Organized technician and team management
- 📋 **Maintenance Workflow** – Structured request lifecycle from creation to completion
- 📊 **Analytics & Reporting** – Data-driven insights for informed decision-making
- 📅 **Preventive Scheduling** – Proactive maintenance planning to minimize downtime

---

## ✨ Features

### 🔐 Authentication & Authorization
- Modern, responsive login and signup pages
- Password visibility toggle for better UX
- Protected routes with authentication middleware
- Session management with localStorage

### 📊 Dashboard
- Real-time maintenance statistics and KPIs
- Equipment status overview
- Upcoming maintenance alerts
- Visual data representation with charts
- Auto-refresh for live updates

### 🔧 Equipment Management
- Comprehensive equipment database
- Add, edit, view, and delete equipment
- Track equipment details (name, category, location, status)
- Equipment health monitoring
- Maintenance history per equipment

### 👥 Team Management
- Create and manage maintenance teams
- Assign technicians to specific teams
- Role-based team organization
- Team member profiles
- Contact information management

### 📝 Maintenance Request System
- Create maintenance requests with detailed information
- Request types: Corrective & Preventive maintenance
- Priority levels (Low, Medium, High, Critical)
- Auto-populated fields based on equipment
- Request status tracking
- Maintenance history and notes

### 📋 Interactive Kanban Board
- Drag-and-drop interface for request management
- Visual workflow: **Open → In Progress → Completed → On Hold**
- Priority-based color coding
- Real-time updates
- Technician assignment visibility
- Quick status changes

### 📅 Maintenance Calendar
- Visual preventive maintenance scheduling
- Calendar view with FullCalendar integration
- Drag-and-drop rescheduling
- Maintenance event creation
- Timeline view for better planning

### 📈 Reports & Analytics
- Maintenance cost tracking
- Equipment uptime monitoring
- Completion rate analytics
- Visual charts and graphs
- KPI cards with trend indicators
- Time-based filtering (week, month, quarter, year)

### 🎨 Modern UI/UX
- Clean, professional interface
- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Collapsible sidebar navigation
- Dark-themed branding sections
- Stat cards with visual indicators
- React Icons for consistent iconography

---

## 🛠️ Tech Stack

### Frontend
- **React 19** – UI library
- **Vite** – Build tool and dev server
- **React Router v7** – Client-side routing
- **Axios** – HTTP client for API calls
- **Framer Motion** – Animation library
- **React Icons (Feather Icons)** – Icon system
- **FullCalendar** – Calendar component
- **@dnd-kit** – Drag-and-drop functionality
- **CSS3** – Custom styling

### Backend
- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **CORS** – Cross-origin resource sharing
- **dotenv** – Environment variable management

### Development Tools
- **ESLint** – Code linting
- **Nodemon** – Auto-restart server
- **Git** – Version control

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gearguard.git
   cd gearguard
   ```

2. **Install dependencies**

   **Backend:**
   ```bash
   cd server
   npm install
   ```

   **Frontend:**
   ```bash
   cd ../client
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/gearguard
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gearguard
   ```

4. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on `http://localhost:5000`

   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

5. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

---

## 📁 Project Structure

```
GearGuard/
├── client/                      # Frontend React application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Images, fonts, etc.
│   │   ├── components/          # Reusable components
│   │   │   ├── common/          # Shared components (StatCard, etc.)
│   │   │   ├── layout/          # Layout components (Navbar, Sidebar)
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Auth/            # Login & Signup
│   │   │   ├── Dashboard/       # Dashboard page
│   │   │   ├── Equipment/       # Equipment management
│   │   │   ├── Kanban/          # Kanban board
│   │   │   ├── Maintenance/     # Maintenance requests
│   │   │   ├── Calendar/        # Calendar view
│   │   │   ├── Teams/           # Team management
│   │   │   └── Reports/         # Analytics & reports
│   │   ├── styles/              # Global styles
│   │   ├── App.jsx              # Main app component
│   │   ├── routes.jsx           # Route definitions
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Backend Express application
│   ├── src/
│   │   ├── config/              # Database configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API routes
│   │   ├── utils/               # Helper functions
│   │   ├── app.js               # Express app setup
│   │   └── server.js            # Server entry point
│   └── package.json
│
├── docs/                        # Documentation files
│   ├── API.md
│   ├── DATABASE_SCHEMA.md
│   └── WORKFLOW.md
│
└── README.md                    # Project documentation
```

---

## 👥 Team

### Development Team

| Role | Name | Responsibilities |
|------|------|------------------|
| **Backend Developer** | Parth | API development, database design, server configuration |
| **Frontend Developer** | Harsh | UI/UX implementation, component architecture, routing |
| **Full Stack & Logic** | Meet | Business logic, automation, integration |
| **Documentation & DevOps** | Rohan | Documentation, GitHub management, deployment |

---

## 🔮 Upcoming Features

- [ ] Complete backend-frontend integration
- [ ] JWT-based authentication
- [ ] Email notifications for maintenance due dates
- [ ] File upload for maintenance reports
- [ ] Advanced filtering and search
- [ ] Export reports to PDF/Excel
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Real-time notifications with WebSockets

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

For questions or support, please contact the development team.

---

<div align="center">

**Built with ❤️ by the GearGuard Team**

⭐ Star this repository if you find it helpful!

</div>
