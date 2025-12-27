import mongoose from 'mongoose';

const maintenanceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'New' },
  equipment_id: { type: String },
  equipmentName: { type: String },
  team_id: { type: String },
  technician_id: { type: String },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  
  state: {
    type: String,
    enum: ['draft', 'assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'draft'
  },
  priority: {
    type: String,
    enum: ['0', '1', '2', '3'],
    default: '1'
  },
  scheduled_date: { type: Date },
  actual_duration: { type: Number, default: 0 },
  description: { type: String },
  is_overdue: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
