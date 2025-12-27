import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["active", "scrapped"],
      default: "active",
    },
    // Tracking fields
    department: { type: String, required: true },
    assignedTo: { 
      type: String, // Employee name
      default: null 
    },
    // Purchase & Warranty
    purchaseDate: { type: Date, required: true },
    warrantyExpiry: { type: Date },
    // Location
    location: { type: String, required: true },
    // Team & Technician Assignment
    team_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Team',
      required: true 
    },
    default_technician_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    // Additional details
    category: { type: String },
    manufacturer: { type: String },
    model: { type: String },
    specifications: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
