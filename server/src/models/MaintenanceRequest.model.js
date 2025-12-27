import mongoose from 'mongoose';

const maintenanceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'New' },
  equipment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  technician_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
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

// 🎯 YOUR AUTO-FILL LOGIC
maintenanceRequestSchema.pre('save', async function(next) {
  if (this.isModified('equipment_id') && this.equipment_id) {
    try {
      const Equipment = mongoose.model('Equipment');
      const equipment = await Equipment.findById(this.equipment_id);
      if (equipment) {
        this.team_id = equipment.team_id;
        this.category_id = equipment.category_id;
        this.technician_id = equipment.default_technician_id;
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// 🎯 YOUR OVERDUE LOGIC
maintenanceRequestSchema.post(['find', 'findOne'], function(docs) {
  const now = new Date();
  if (Array.isArray(docs)) {
    docs.forEach(doc => {
      doc.is_overdue = doc.scheduled_date && 
                      new Date(doc.scheduled_date) <= now && 
                      !['completed', 'cancelled'].includes(doc.state);
    });
  } else if (docs) {
    docs.is_overdue = docs.scheduled_date && 
                     new Date(docs.scheduled_date) <= now && 
                     !['completed', 'cancelled'].includes(docs.state);
  }
});

// 🎯 YOUR DURATION VALIDATION
maintenanceRequestSchema.pre('save', function(next) {
  if (this.state === 'completed' && this.actual_duration <= 0) {
    return next(new Error('Duration must be positive for completed requests'));
  }
  next();
});

export default mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
