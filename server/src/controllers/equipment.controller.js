import Equipment from '../models/Equipment.model.js';

export const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find()
      .populate('team_id', 'name')
      .populate('default_technician_id', 'name email');
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate('team_id', 'name description')
      .populate('default_technician_id', 'name email role');
    
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    
    // Populate before sending response
    await equipment.populate('team_id', 'name');
    await equipment.populate('default_technician_id', 'name email');
    
    res.status(201).json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('team_id', 'name')
      .populate('default_technician_id', 'name email');
    
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    
    res.json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
