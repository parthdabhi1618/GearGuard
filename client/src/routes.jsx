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
import KanbanBoard from "./pages/Kanban/KanbanBoard.jsx";
import MaintenanceCalendar from "./pages/Calendar/MaintenanceCalendar.jsx";

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

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
