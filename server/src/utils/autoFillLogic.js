import mongoose from 'mongoose';

// 🎯 YOUR VALIDATION LOGIC
export const validateTechnicianTeam = async (technicianId, teamId) => {
  if (!technicianId || !teamId) return true;
  
  const Team = mongoose.model('Team');
  const team = await Team.findById(teamId).populate('technician_ids');
  const technicians = team.technician_ids.map(t => t._id.toString());
  
  if (!technicians.includes(technicianId.toString())) {
    throw new Error('Technician must belong to selected team');
  }
  return true;
};

// 🎯 YOUR NAME GENERATION
export const generateRequestName = async () => {
  const MaintenanceRequest = mongoose.model('MaintenanceRequest');
  const count = await MaintenanceRequest.countDocuments();
  return `REQ-${String(count + 1).padStart(4, '0')}`;
};

// 🎯 YOUR OVERDUE CHECKER
export const computeOverdueStatus = (scheduledDate, state) => {
  const now = new Date();
  return scheduledDate && 
         new Date(scheduledDate) <= now && 
         !['completed', 'cancelled'].includes(state);
};
