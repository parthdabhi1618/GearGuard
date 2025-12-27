import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import EquipmentList from "./pages/Equipment/EquipmentList/EquipmentList.jsx";
import EquipmentDetails from "./pages/Equipment/EquipmentDetails/EquipmentDetails.jsx";
import MaintenanceForm from "./pages/Maintenance/MaintenanceForm.jsx";
import KanbanBoard from "./pages/Kanban/KanbanBoard.jsx";
import MaintenanceCalendar from "./pages/Calendar/MaintenanceCalendar.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/equipment" element={<EquipmentList />} />
      <Route path="/equipment/:id" element={<EquipmentDetails />} />
      <Route path="/maintenance/new" element={<MaintenanceForm />} />
      <Route path="/kanban" element={<KanbanBoard />} />
      <Route path="/calendar" element={<MaintenanceCalendar />} />
    </Routes>
  );
}
