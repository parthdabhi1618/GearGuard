# GearGuard Backend (MERN Stack)

This is the backend implementation for **GearGuard**, specifically focusing on the **Models & Business Data** (Parth's responsibility), translated from the Odoo blueprint to a MERN stack (MongoDB, Express, Node.js).

## 🚀 Getting Started

Since you are new to the MERN stack, follow these steps carefully.

### 1. Prerequisites
You need to have **Node.js** and **MongoDB** installed.
- Download Node.js: https://nodejs.org/
- Download MongoDB Community Server: https://www.mongodb.com/try/download/community
  - *Make sure MongoDB is running locally on port 27017.*

### 2. Installation
Open your terminal in this folder (`gearguard-mern`) and install the dependencies (I have already done this, but good to know):
```bash
npm install
```

### 3. Running the Server
To start the backend server:
```bash
npm run dev
```
You should see:
```
Server running on port 5000
MongoDB Connected: ...
```

## 📂 Project Structure
- `src/models/`: Defines the database schemas (Parth's core task).
  - `Equipment.js`: The master asset model.
  - `Team.js`: Maintenance teams.
  - `User.js`: Employees and Technicians.
- `src/controllers/`: Logic for handling data (CRUD).
- `src/routes/`: API endpoints.
- `src/config/`: Database connection setup.

## 🔗 API Endpoints (How to interact)
You can use a tool like **Postman** or **Insomnia** (or even your browser for GET requests) to test these.

**Equipment:**
- `GET http://localhost:5000/api/equipment` - List all equipment.
- `POST http://localhost:5000/api/equipment` - Create new equipment (send JSON body).
- `PUT http://localhost:5000/api/equipment/:id/scrap` - Mark equipment as scrapped.

**Teams:**
- `GET http://localhost:5000/api/teams` - List teams.
- `POST http://localhost:5000/api/teams` - Create a team.

## ✅ Parth's Deliverables Implemented
1. **Equipment Model**: Created in `models/Equipment.js` with fields for Name, Serial Number, Department, etc.
2. **Relationships**: Linked Equipment to Teams and Employees using MongoDB References (`ObjectId`).
3. **Constraints**:
   - Unique Serial Number (`unique: true`).
   - One Maintenance Team per Equipment.
   - Default Technician.
   - Scrap Logic (`isScrapped` flag).
