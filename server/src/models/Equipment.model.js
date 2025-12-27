import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true }, // Serial Number/ID
  location: { type: String, required: true },
  department: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['operational', 'maintenance', 'down', 'scrapped'], 
    default: 'operational' 
  },
  
  // --- NEW FIELDS ADDED ---
  manufacturer: { type: String },
  model: { type: String },
  category: { type: String },
  purchaseDate: { type: Date },
  warrantyExpiry: { type: Date },
  specifications: { type: String },
  notes: { type: String },
  image: { type: String },
  
  // Relations (Optional for now, but good to have ready)
  team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, 
  default_technician_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model("Equipment", equipmentSchema);