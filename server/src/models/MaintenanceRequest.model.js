import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  equipment: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['0', '1', '2', '3'], 
    default: '1' 
  },
  state: { 
    type: String, 
    enum: ['draft', 'assigned', 'in_progress', 'completed', 'cancelled'], 
    default: 'draft' 
  },
  scheduled_date: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// 🛠️ SAFETY CHECK: Only create model if it doesn't exist
const MaintenanceRequest = mongoose.models.MaintenanceRequest || mongoose.model("MaintenanceRequest", maintenanceRequestSchema);

export default MaintenanceRequest;