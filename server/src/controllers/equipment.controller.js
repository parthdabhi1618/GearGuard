import Equipment from '../models/Equipment.model.js';

export const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find().populate('team_id default_technician_id');
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
