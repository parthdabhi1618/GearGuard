# 🛡️ GearGuard – Modern Equipment Maintenance Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-7.0.0-green)

**A full-stack MERN application for streamlined equipment maintenance tracking and management**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation) • [Database Schema](#-database-schema)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
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
- **React 19.2.0** – Modern UI library with latest features
- **Vite 7.2.4** – Lightning-fast build tool and dev server
- **React Router v7.11** – Declarative client-side routing
- **Axios 1.13.2** – Promise-based HTTP client
- **Framer Motion 12.23** – Production-ready animation library
- **React Icons 5.5** – Feather Icons implementation
- **FullCalendar 6.1.20** – Interactive calendar component
- **@dnd-kit** – Modern drag-and-drop toolkit
  - `@dnd-kit/core` 6.3.1
  - `@dnd-kit/sortable` 10.0.0
  - `@dnd-kit/utilities` 3.2.2
- **CSS3** – Custom styling with modern features

### Backend
- **Node.js v18+** – JavaScript runtime environment
- **Express.js 5.2.1** – Minimalist web framework
- **MongoDB 7.0.0** – NoSQL document database
- **Mongoose 9.0.2** – Elegant MongoDB object modeling
- **JWT (jsonwebtoken 9.0.3)** – Secure token-based authentication
- **bcryptjs 3.0.3** – Password hashing
- **CORS 2.8.5** – Cross-origin resource sharing
- **dotenv 17.2.3** – Environment variable management

### Development Tools
- **ESLint 9.39.1** – Code quality and style enforcement
- **Nodemon 3.1.11** – Auto-restart development server
- **Vite Plugin React SWC** – Fast refresh with SWC compiler
- **Git** – Version control

---

## 🏗️ Architecture

GearGuard follows a modern **client-server architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │   Pages    │  │ Components │  │  Routes & Protected   │ │
│  │            │  │            │  │       Routes           │ │
│  └────────────┘  └────────────┘  └────────────────────────┘ │
│                         │                                     │
│                         ▼                                     │
│              ┌─────────────────────┐                         │
│              │   Axios HTTP Client │                         │
│              └─────────────────────┘                         │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTP/REST API
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                 SERVER (Express.js)                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │   Routes   │─▶│Controllers │─▶│   Models (Mongoose)    │ │
│  │            │  │            │  │                        │ │
│  └────────────┘  └────────────┘  └────────────────────────┘ │
│         │                                   │                │
│         ▼                                   │                │
│  ┌────────────┐                            │                │
│  │ Middleware │                            │                │
│  │ (Auth/JWT) │                            │                │
│  └────────────┘                            │                │
└────────────────────────────────────────────┼────────────────┘
                                             │
                                             ▼
                                    ┌────────────────┐
                                    │    MongoDB     │
                                    │   (Database)   │
                                    └────────────────┘
```

### Key Design Patterns:
- **MVC Pattern**: Models, Controllers, and Views are separated
- **JWT Authentication**: Stateless authentication with bearer tokens
- **Protected Routes**: Client-side and server-side route protection
- **RESTful API**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Component-Based UI**: Reusable React components
- **Middleware Pipeline**: Request processing through middleware chain

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

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. User Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "technician"  // Options: technician, manager, admin
}

Response: 201 Created
{
  "message": "User registered successfully!",
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "technician",
  "token": "jwt_token_here"
}
```

#### 2. User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "message": "Login successful!",
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "technician",
  "token": "jwt_token_here"
}
```

### Dashboard Endpoints

#### 3. Get Dashboard Stats
```http
GET /api/dashboard/stats
Authorization: Bearer {token}

Response: 200 OK
{
  "totalEquipment": 45,
  "totalMaintenance": 128,
  "openRequests": 12,
  "completedRequests": 98,
  "inProgressRequests": 18,
  "criticalPriority": 3,
  "averageCompletionTime": 4.2
}
```

### Equipment Endpoints

#### 4. Get All Equipment
```http
GET /api/equipment
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "_id": "equipment_id",
    "name": "CNC Machine",
    "serialNumber": "CNC-2024-001",
    "status": "active",
    "department": "Production",
    "assignedTo": "John Doe",
    "purchaseDate": "2024-01-15T00:00:00.000Z",
    "warrantyExpiry": "2026-01-15T00:00:00.000Z",
    "location": "Building A - Floor 2",
    "team_id": "team_id",
    "default_technician_id": "user_id",
    "category": "Manufacturing",
    "manufacturer": "Haas Automation",
    "model": "VF-2SS",
    "specifications": "40 taper, 7500 RPM",
    "notes": "Requires monthly calibration",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### 5. Get Equipment by ID
```http
GET /api/equipment/:id
Authorization: Bearer {token}

Response: 200 OK
{ ...equipment details... }
```

#### 6. Create Equipment
```http
POST /api/equipment
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "CNC Machine",
  "serialNumber": "CNC-2024-001",
  "status": "active",
  "department": "Production",
  "assignedTo": "John Doe",
  "purchaseDate": "2024-01-15",
  "warrantyExpiry": "2026-01-15",
  "location": "Building A - Floor 2",
  "team_id": "team_id",
  "default_technician_id": "user_id",
  "category": "Manufacturing",
  "manufacturer": "Haas Automation",
  "model": "VF-2SS",
  "specifications": "40 taper, 7500 RPM",
  "notes": "Requires monthly calibration"
}

Response: 201 Created
{ ...created equipment... }
```

#### 7. Update Equipment
```http
PUT /api/equipment/:id
Authorization: Bearer {token}
Content-Type: application/json

{ ...fields to update... }

Response: 200 OK
{ ...updated equipment... }
```

#### 8. Delete Equipment
```http
DELETE /api/equipment/:id
Authorization: Bearer {token}

Response: 200 OK
{ "message": "Equipment deleted successfully" }
```

### Maintenance Request Endpoints

#### 9. Get All Maintenance Requests
```http
GET /api/maintenance
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "_id": "maintenance_id",
    "name": "Monthly Inspection",
    "description": "Routine monthly inspection of CNC machine",
    "equipment": "CNC-2024-001",
    "priority": "1",  // 0=Low, 1=Medium, 2=High, 3=Critical
    "state": "in_progress",  // draft, assigned, in_progress, completed, cancelled
    "scheduled_date": "2024-12-28T09:00:00.000Z",
    "createdBy": "user_id",
    "createdAt": "2024-12-20T10:30:00.000Z",
    "updatedAt": "2024-12-27T14:20:00.000Z"
  }
]
```

#### 10. Get Maintenance Request by ID
```http
GET /api/maintenance/:id
Authorization: Bearer {token}

Response: 200 OK
{ ...maintenance details... }
```

#### 11. Create Maintenance Request
```http
POST /api/maintenance
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Monthly Inspection",
  "description": "Routine monthly inspection",
  "equipment": "CNC-2024-001",
  "priority": "1",
  "state": "draft",
  "scheduled_date": "2024-12-28T09:00:00.000Z"
}

Response: 201 Created
{ ...created maintenance request... }
```

#### 12. Update Maintenance Request
```http
PUT /api/maintenance/:id
Authorization: Bearer {token}
Content-Type: application/json

{ "state": "completed" }

Response: 200 OK
{ ...updated maintenance request... }
```

#### 13. Delete Maintenance Request
```http
DELETE /api/maintenance/:id
Authorization: Bearer {token}

Response: 200 OK
{ "message": "Maintenance request deleted successfully" }
```

### Team Endpoints

#### 14. Get All Teams
```http
GET /api/teams
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "_id": "team_id",
    "name": "Electrical Team",
    "technician_ids": ["user_id_1", "user_id_2"],
    "description": "Handles all electrical maintenance",
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-01-10T08:00:00.000Z"
  }
]
```

#### 15. Get All Technicians
```http
GET /api/teams/technicians
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "technician",
    "teams": ["team_id_1", "team_id_2"]
  }
]
```

#### 16. Create Team
```http
POST /api/teams
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Electrical Team",
  "technician_ids": ["user_id_1", "user_id_2"],
  "description": "Handles all electrical maintenance"
}

Response: 201 Created
{ ...created team... }
```

### Response Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer {your_jwt_token}
```

---

## 🗄️ Database Schema

### Collections Overview
GearGuard uses MongoDB with 4 main collections:

```
gearguard (database)
├── users
├── teams
├── equipment
└── maintenancerequests
```

### 1. User Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['technician', 'manager', 'admin'], default: 'technician'),
  teams: [ObjectId] (ref: 'Team'),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email_1` (unique)

**Relations:**
- Many-to-Many with Teams (user can belong to multiple teams)

---

### 2. Team Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  technician_ids: [ObjectId] (ref: 'User'),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Relations:**
- Many-to-Many with Users (team can have multiple technicians)
- One-to-Many with Equipment (team is assigned to multiple equipment)

---

### 3. Equipment Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  serialNumber: String (required, unique),
  status: String (enum: ['active', 'scrapped'], default: 'active'),
  
  // Tracking
  department: String (required),
  assignedTo: String,  // Employee name
  
  // Purchase & Warranty
  purchaseDate: Date (required),
  warrantyExpiry: Date,
  
  // Location
  location: String (required),
  
  // Team & Technician Assignment
  team_id: ObjectId (ref: 'Team', required),
  default_technician_id: ObjectId (ref: 'User', required),
  
  // Additional Details
  category: String,
  manufacturer: String,
  model: String,
  specifications: String,
  notes: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `serialNumber_1` (unique)

**Relations:**
- Many-to-One with Team (equipment belongs to one team)
- Many-to-One with User (equipment has one default technician)
- One-to-Many with MaintenanceRequest (equipment has multiple maintenance requests)

---

### 4. MaintenanceRequest Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  equipment: String (required),  // Serial number of equipment
  priority: String (enum: ['0', '1', '2', '3'], default: '1'),
  // Priority Mapping: 0=Low, 1=Medium, 2=High, 3=Critical
  
  state: String (enum: ['draft', 'assigned', 'in_progress', 'completed', 'cancelled'], default: 'draft'),
  scheduled_date: Date,
  createdBy: ObjectId (ref: 'User'),
  
  createdAt: Date,
  updatedAt: Date
}
```

**Relations:**
- Many-to-One with User (created by user)
- Many-to-One with Equipment (via equipment serial number)

---

### Entity Relationship Diagram

```
┌─────────────────┐
│      User       │
│  - _id          │
│  - name         │
│  - email        │
│  - password     │
│  - role         │
│  - teams[]      │────────┐
└─────────────────┘        │
        │                  │
        │                  │ Many-to-Many
        │                  │
        │                  │
        │           ┌──────▼──────┐
        │           │     Team    │
        │           │  - _id      │
        │           │  - name     │
        │           │  - tech[]   │
        │           │  - desc     │
        │           └──────┬──────┘
        │                  │
        │                  │ One-to-Many
        │                  │
        │           ┌──────▼──────────────┐
        │           │    Equipment        │
        │           │  - _id              │
        │           │  - name             │
        │           │  - serialNumber     │
        │           │  - status           │
        │           │  - team_id          │
        │           │  - technician_id    │
        │           │  - purchaseDate     │
        │           │  - location         │
        │           └──────┬──────────────┘
        │                  │
        │                  │ One-to-Many
        │                  │ (via serialNumber)
        │                  │
        │           ┌──────▼────────────────┐
        └──────────▶│ MaintenanceRequest    │
       createdBy    │  - _id                │
                    │  - name               │
                    │  - equipment (serial) │
                    │  - priority           │
                    │  - state              │
                    │  - scheduled_date     │
                    │  - createdBy          │
                    └───────────────────────┘
```

---

## 📁 Project Structure

```
GearGuard/
├── client/                      # Frontend React application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Images, fonts, icons
│   │   ├── components/          # Reusable React components
│   │   │   ├── common/          # Shared components
│   │   │   │   ├── StatCard.jsx           # Dashboard stat cards
│   │   │   │   └── StatCard.css
│   │   │   ├── layout/          # Layout components
│   │   │   │   ├── Navbar.jsx             # Top navigation bar
│   │   │   │   ├── Navbar.css
│   │   │   │   ├── Sidebar.jsx            # Side navigation
│   │   │   │   └── Sidebar.css
│   │   │   ├── calendar/
│   │   │   │   ├── MaintenanceCalendar.jsx  # Calendar component
│   │   │   │   └── MaintenanceCalendar.css
│   │   │   └── ProtectedRoute.jsx         # Route authentication wrapper
│   │   ├── pages/               # Page-level components
│   │   │   ├── Auth/            # Authentication pages
│   │   │   │   ├── Login.jsx              # User login
│   │   │   │   ├── Login.css
│   │   │   │   ├── Signup.jsx             # User registration
│   │   │   │   └── Signup.css
│   │   │   ├── Dashboard/       # Main dashboard
│   │   │   │   ├── Dashboard.jsx          # Analytics & overview
│   │   │   │   └── Dashboard.css
│   │   │   ├── Equipment/       # Equipment management
│   │   │   │   ├── EquipmentList/
│   │   │   │   │   ├── EquipmentList.jsx  # Equipment table/grid
│   │   │   │   │   └── EquipmentList.css
│   │   │   │   ├── EquipmentDetails/
│   │   │   │   │   ├── EquipmentDetails.jsx  # Single equipment view
│   │   │   │   │   └── EquipmentDetails.css
│   │   │   │   └── EquipmentForm/
│   │   │   │       ├── EquipmentForm.jsx     # Add/Edit equipment
│   │   │   │       └── EquipmentForm.css
│   │   │   ├── Maintenance/     # Maintenance requests
│   │   │   │   ├── MaintenanceList.jsx       # Request list view
│   │   │   │   ├── MaintenanceList.css
│   │   │   │   ├── MaintenanceForm.jsx       # Create/Edit request
│   │   │   │   ├── MaintenanceForm.css
│   │   │   │   ├── MaintenanceDetails.jsx    # Single request view
│   │   │   │   └── MaintenanceDetails.css
│   │   │   ├── Kanban/          # Kanban board
│   │   │   │   ├── KanbanBoard.jsx           # Drag-drop workflow
│   │   │   │   └── Kanban.css
│   │   │   ├── Calendar/        # Calendar view
│   │   │   │   ├── MaintenanceCalendar.jsx   # Scheduling calendar
│   │   │   │   └── MaintenanceCalendar.css
│   │   │   ├── Teams/           # Team management
│   │   │   │   ├── TeamList.jsx              # All teams view
│   │   │   │   ├── TeamForm.jsx              # Create/Edit team
│   │   │   │   ├── TeamDetails.jsx           # Single team view
│   │   │   │   └── Teams.css
│   │   │   └── Reports/         # Analytics & reports
│   │   │       ├── Reports.jsx               # Charts & KPIs
│   │   │       └── Reports.css
│   │   ├── styles/              # Global styles
│   │   │   └── global.css                    # App-wide CSS
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css              # App-level styles
│   │   ├── routes.jsx           # Route definitions
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Root styles
│   ├── index.html               # HTML template
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   └── eslint.config.js         # ESLint rules
│
├── server/                      # Backend Express application
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   └── db.js                         # MongoDB connection
│   │   ├── controllers/         # Business logic
│   │   │   ├── dashboard.controller.js       # Dashboard stats
│   │   │   ├── equipment.controller.js       # Equipment CRUD
│   │   │   ├── maintenance.controller.js     # Maintenance CRUD
│   │   │   └── team.controller.js            # Team management
│   │   ├── models/              # Mongoose schemas
│   │   │   ├── User.model.js                 # User schema
│   │   │   ├── Team.model.js                 # Team schema
│   │   │   ├── Equipment.model.js            # Equipment schema
│   │   │   └── MaintenanceRequest.model.js   # Request schema
│   │   ├── routes/              # API route definitions
│   │   │   ├── auth.routes.js                # Auth endpoints
│   │   │   ├── dashboard.routes.js           # Dashboard endpoints
│   │   │   ├── equipment.routes.js           # Equipment endpoints
│   │   │   ├── maintenance.routes.js         # Maintenance endpoints
│   │   │   └── team.routes.js                # Team endpoints
│   │   ├── middlewares/         # Express middlewares
│   │   │   └── auth.middleware.js            # JWT verification
│   │   ├── utils/               # Helper utilities
│   │   │   └── autoFillLogic.js              # Auto-population logic
│   │   ├── app.js               # Express app setup
│   │   └── server.js            # Server entry point
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables (not in Git)
│
├── backend/                     # Legacy backend (deprecated)
│   └── ...                      # Old implementation
│
├── docs/                        # Documentation
│   ├── API.md                   # API documentation (placeholder)
│   ├── DATABASE_SCHEMA.md       # Schema docs (placeholder)
│   └── WORKFLOW.md              # Development workflow
│
└── README.md                    # This file
```

### Key Directories Explained

**Client Structure:**
- `components/common`: Reusable UI components across pages
- `components/layout`: Navigation and layout wrappers
- `pages`: Full-page components mapped to routes
- `styles`: Global CSS and theme variables

**Server Structure:**
- `controllers`: Handle business logic and database operations
- `models`: Define MongoDB schemas with Mongoose
- `routes`: Map HTTP endpoints to controllers
- `middlewares`: Request processing (auth, validation, etc.)
- `utils`: Shared helper functions and utilities

---

## 🔐 Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/gearguard
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/gearguard?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=30d

# CORS (optional)
CLIENT_URL=http://localhost:5173
```

### Environment Variables Description

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | 5000 | No |
| `NODE_ENV` | Environment mode | development | No |
| `MONGO_URI` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |
| `JWT_EXPIRE` | JWT expiration time | 30d | No |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:5173 | No |

**Security Notes:**
- Never commit `.env` file to version control
- Use strong, random values for `JWT_SECRET` in production
- Use MongoDB Atlas or secure MongoDB instance in production
- Enable MongoDB authentication and use strong passwords

---

## 🚦 Development Workflow

### Running the Application

#### 1. Start MongoDB
Ensure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB Compass/Atlas
```

#### 2. Start Backend Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

#### 3. Start Frontend Client
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

#### 4. Access the Application
Open `http://localhost:5173` in your browser

### Building for Production

#### Backend
```bash
cd server
npm start
```

#### Frontend
```bash
cd client
npm run build
npm run preview
```

The build output will be in `client/dist/`

### Code Quality

#### Lint Frontend Code
```bash
cd client
npm run lint
```

#### Fix Linting Issues
```bash
cd client
npm run lint -- --fix
```

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] User can sign up with valid credentials
- [ ] User cannot sign up with duplicate email
- [ ] User can log in with correct credentials
- [ ] User cannot access protected routes without token
- [ ] Token persists in localStorage after refresh

**Dashboard:**
- [ ] Dashboard displays correct statistics
- [ ] Charts render properly
- [ ] Auto-refresh updates data

**Equipment Management:**
- [ ] Can create new equipment
- [ ] Can view equipment list
- [ ] Can view equipment details
- [ ] Can edit equipment
- [ ] Can delete equipment
- [ ] Serial numbers are unique

**Maintenance Requests:**
- [ ] Can create maintenance request
- [ ] Can view request list
- [ ] Can update request status
- [ ] Can delete request
- [ ] Priority levels work correctly

**Kanban Board:**
- [ ] Can drag and drop cards between columns
- [ ] State updates on drop
- [ ] Visual feedback during drag

**Teams:**
- [ ] Can create teams
- [ ] Can assign technicians to teams
- [ ] Teams display correctly in equipment forms

**Calendar:**
- [ ] Events display correctly
- [ ] Can create events
- [ ] Can drag to reschedule

---

## 👥 Team

### Development Team

| Role | Name | Responsibilities |
|------|------|------------------|
| **Backend Developer** | Parth | API development, database design, MongoDB integration, authentication |
| **Frontend Developer** | Harsh | UI/UX implementation, React components, routing, responsive design |
| **Full Stack & Logic** | Meet | Business logic, automation, full-stack integration, data flow |
| **Documentation & DevOps** | Rohan | Documentation, GitHub management, deployment, testing |

---

## 🔮 Roadmap & Future Features

### Phase 1: Core Completion ✅
- [x] User authentication with JWT
- [x] Equipment CRUD operations
- [x] Maintenance request management
- [x] Team management
- [x] Dashboard with statistics
- [x] Kanban board with drag-drop
- [x] Calendar view for scheduling
- [x] Reports and analytics

### Phase 2: Enhanced Features 🚧
- [ ] Complete backend-frontend integration
- [ ] Role-based access control (RBAC)
- [ ] Email notifications for maintenance due dates
- [ ] File upload for equipment documentation
- [ ] Maintenance history tracking per equipment
- [ ] Advanced filtering and search
- [ ] Bulk operations (import/export CSV)
- [ ] Equipment QR code generation

### Phase 3: Advanced Features 🔮
- [ ] Real-time notifications with WebSockets
- [ ] Mobile responsive optimization
- [ ] Progressive Web App (PWA)
- [ ] Export reports to PDF/Excel
- [ ] Predictive maintenance using ML
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Audit logs and activity tracking

### Phase 4: Enterprise Features 🚀
- [ ] Multi-tenant architecture
- [ ] Integration with IoT sensors
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] API rate limiting and throttling
- [ ] Automated backup and recovery
- [ ] Performance monitoring
- [ ] Load balancing and scaling

---

## 📊 Project Statistics

- **Total Files**: 50+
- **Lines of Code**: ~8,000+
- **Components**: 25+
- **API Endpoints**: 16
- **Database Collections**: 4
- **Development Time**: 4+ weeks
- **Contributors**: 4

---

## 🐛 Known Issues

1. **Authentication Token Expiry**: Currently set to 30 days; consider implementing refresh tokens
2. **File Upload**: Not yet implemented for equipment documentation
3. **Real-time Updates**: Dashboard doesn't update automatically without refresh
4. **Mobile Optimization**: Some pages need better mobile responsiveness
5. **Error Handling**: Need more comprehensive error messages

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Error
```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running
```bash
mongod
```

#### 2. Port Already in Use
```bash
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process using the port or change PORT in .env
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

#### 3. JWT Token Invalid
```bash
Error: jwt malformed
```
**Solution**: Clear localStorage and log in again
```javascript
localStorage.clear();
```

#### 4. CORS Error
```bash
Access to fetch blocked by CORS policy
```
**Solution**: Ensure server CORS is configured properly in server.js
```javascript
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

#### 5. Module Not Found
```bash
Error: Cannot find module 'express'
```
**Solution**: Install dependencies
```bash
npm install
```

---

## 📚 Additional Resources

### Documentation
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Mongoose Docs](https://mongoosejs.com/docs/)

### Tutorials Used
- MERN Stack Authentication
- React Router v6+ Guide
- Drag and Drop with @dnd-kit
- FullCalendar React Integration

---

## 📝 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 GearGuard Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/gearguard.git
   cd gearguard
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add comments where necessary

4. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for code review

### Coding Standards

- Use ESLint configuration provided
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation when needed

### Reporting Bugs

Please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, etc.)

---

## 📧 Contact & Support

### Development Team
- **Email**: support@gearguard.dev (placeholder)
- **GitHub**: [GearGuard Repository](https://github.com/yourusername/gearguard)

### Getting Help
- Check [existing issues](https://github.com/yourusername/gearguard/issues)
- Review documentation above
- Contact team members

---

## 🙏 Acknowledgments

Special thanks to:
- MongoDB team for excellent documentation
- React community for amazing libraries
- Express.js contributors
- All open-source package maintainers
- Our college faculty for guidance

---

## 📅 Version History

### v1.0.0 (Current) - December 2024
- ✅ Initial release
- ✅ Complete MERN stack implementation
- ✅ Authentication system
- ✅ Equipment management
- ✅ Maintenance requests
- ✅ Team management
- ✅ Dashboard analytics
- ✅ Kanban board
- ✅ Calendar view
- ✅ Reports section

### v0.9.0 - Development Phase
- Backend API implementation
- Frontend UI development
- Database schema design

### v0.5.0 - Planning Phase
- Project architecture
- Technology stack selection
- Feature specifications

---

<div align="center">

**Built with ❤️ by the GearGuard Team**

⭐ **Star this repository if you find it helpful!** ⭐

![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat&logo=react)
![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-339933?style=flat&logo=node.js)
![Made with MongoDB](https://img.shields.io/badge/Made%20with-MongoDB-47A248?style=flat&logo=mongodb)

---

**[⬆ Back to Top](#️-gearguard--modern-equipment-maintenance-management-system)**

</div>
