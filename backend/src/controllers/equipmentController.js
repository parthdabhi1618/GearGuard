const Equipment = require('../models/Equipment');

// @desc    Get all equipment
// @route   GET /api/equipment
exports.getEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find().populate('maintenanceTeam assignedEmployee defaultTechnician');
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new equipment
// @route   POST /api/equipment
exports.createEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update equipment (e.g., assign team, scrap)
// @route   PUT /api/equipment/:id
exports.updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Scrap equipment
// @route   PUT /api/equipment/:id/scrap
exports.scrapEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id, 
      { status: 'scrapped', isScrapped: true, isActive: false },
      { new: true }
    );
    res.json(equipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
