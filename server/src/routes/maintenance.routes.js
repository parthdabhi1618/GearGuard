import express from "express";
// ✅ Make sure it points to MaintenanceRequest.model.js
import MaintenanceRequest from "../models/MaintenanceRequest.model.js";
import protect from "../middlewares/auth.middleware.js"; // Guard the route

const router = express.Router();

// @route   GET /api/maintenance
// @desc    Get all maintenance requests
// @access  Private (Needs Token)
router.get("/", protect, async (req, res) => {
  try {
    // Fetch all requests from DB, sort by newest first
    const requests = await MaintenanceRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching maintenance requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/// @route   POST /api/maintenance
// @desc    Create a new request
router.post("/", protect, async (req, res) => {
  try {
    // 1. Destructure the exact names your Frontend sends
    const { 
      name, 
      equipment_id, // Your form sends 'equipment_id'
      priority, 
      description,
      scheduled_date, 
      state 
    } = req.body;
    
    const newRequest = new MaintenanceRequest({
      name,
      equipment: equipment_id, // Map 'equipment_id' to our DB field 'equipment'
      priority,
      description,
      scheduled_date,
      state: state || 'draft',
      createdBy: req.user.id
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error creating maintenance request:", error);
    res.status(500).json({ message: "Error creating request" });
  }
});

export default router;