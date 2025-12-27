import express from "express";
import Equipment from "../models/Equipment.model.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// @route   GET /api/equipment
// @desc    Get all equipment
router.get("/", protect, async (req, res) => {
  try {
    const equipment = await Equipment.find().sort({ createdAt: -1 });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   POST /api/equipment
// @desc    Add new equipment
router.post("/", protect, async (req, res) => {
  try {
    // 1. Destructure ALL fields you want to allow
    const { 
      name, 
      code, 
      location, 
      department, 
      status, 
      manufacturer, 
      model, 
      category, 
      purchaseDate, 
      warrantyExpiry, 
      specifications, 
      notes
    } = req.body;
    
    // 2. Check duplicates
    const existing = await Equipment.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Equipment ID/Code already exists" });
    }

    // 3. Create the object with ALL fields
    const newEquipment = new Equipment({
      name, 
      code, 
      location, 
      department, 
      status,
      manufacturer,
      model,
      category,
      purchaseDate,
      warrantyExpiry,
      specifications,
      notes
    });

    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    console.error("Error adding equipment:", error);
    res.status(500).json({ message: "Error adding equipment" });
  }
});

// @route   GET /api/equipment/:id
// @desc    Get single equipment by ID (For Edit Page)
router.get("/:id", protect, async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /api/equipment/:id
// @desc    Update equipment
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body, // This automatically updates any field sent in the body
      { new: true } // Return the updated document
    );
    res.json(updatedEquipment);
  } catch (error) {
    res.status(500).json({ message: "Error updating equipment" });
  }
});

export default router;