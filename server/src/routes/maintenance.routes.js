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

// @route   POST /api/maintenance
// @desc    Create a new request (For testing)
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { name, equipment, priority, description } = req.body;
    
    const newRequest = new MaintenanceRequest({
      name,
      equipment,
      priority,
      description,
      createdBy: req.user.id
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Error creating request" });
  }
});

export default router;