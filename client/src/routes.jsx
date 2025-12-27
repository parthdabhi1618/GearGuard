import { Routes, Route, Navigate } from "react-router-dom";

/* -------- AUTH -------- */
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

/* -------- MAIN PAGES -------- */
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import EquipmentList from "./pages/Equipment/EquipmentList/EquipmentList.jsx";
import EquipmentDetails from "./pages/Equipment/EquipmentDetails/EquipmentDetails.jsx";
import EquipmentForm from "./pages/Equipment/EquipmentForm/EquipmentForm.jsx";
import MaintenanceForm from "./pages/Maintenance/MaintenanceForm.jsx";
import MaintenanceDetails from "./pages/Maintenance/MaintenanceDetails.jsx";
import MaintenanceList from "./pages/Maintenance/MaintenanceList.jsx";
import MaintenanceTeams from "./pages/MaintenanceTeams/MaintenanceTeams.jsx";
import KanbanBoard from "./pages/Kanban/KanbanBoard.jsx";
import MaintenanceCalendar from "./pages/Calendar/MaintenanceCalendar.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ---------- PROTECTED ROUTES ---------- */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/equipment"
        element={
          <ProtectedRoute>
            <EquipmentList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/equipment/add"
        element={
          <ProtectedRoute>
            <EquipmentForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/equipment/:id"
        element={
          <ProtectedRoute>
            <EquipmentDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/equipment/:id/edit"
        element={
          <ProtectedRoute>
            <EquipmentForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance"
        element={
          <ProtectedRoute>
            <MaintenanceList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance/new"
        element={
          <ProtectedRoute>
            <MaintenanceForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance/:id"
        element={
          <ProtectedRoute>
            <MaintenanceDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teams"
        element={
          <ProtectedRoute>
            <MaintenanceTeams />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kanban"
        element={
          <ProtectedRoute>
            <KanbanBoard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <MaintenanceCalendar />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
