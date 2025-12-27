const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true, // PDF Constraint: Unique serial number
  },
  department: {
    type: String, // Keeping it simple as a string for now
    required: true,
  },
  assignedEmployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  maintenanceTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true, // PDF Constraint: Each equipment has ONE maintenance team
  },
  defaultTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // PDF Constraint: Default technician from equipment (to be used in logic later)
  },
  status: {
    type: String,
    enum: ['active', 'maintenance', 'scrapped'],
    default: 'active',
  },
  isScrapped: {
    type: Boolean,
    default: false,
  },
  // "Active / scrap flag"
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);
