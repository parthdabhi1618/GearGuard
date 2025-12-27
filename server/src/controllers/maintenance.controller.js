import MaintenanceRequest from '../models/MaintenanceRequest.model.js';
import { validateTechnicianTeam, generateRequestName } from '../utils/autoFillLogic.js';

export const getRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate('equipment_id team_id technician_id category_id')
      .sort({ scheduled_date: -1, priority: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    // 🎯 YOUR AUTO NAME GENERATION
    if (req.body.name === 'New') {
      req.body.name = await generateRequestName();
    }
    const request = new MaintenanceRequest(req.body);
    await request.save();
    const populated = await MaintenanceRequest.findById(request._id)
      .populate('equipment_id team_id technician_id category_id');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 🎯 YOUR ASSIGNMENT VALIDATION
    if (req.body.technician_id && req.body.team_id) {
      await validateTechnicianTeam(req.body.technician_id, req.body.team_id);
    }
    
    const request = await MaintenanceRequest.findByIdAndUpdate(
      id, req.body, { new: true, runValidators: true }
    ).populate('equipment_id team_id technician_id category_id');
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const changeState = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const request = await MaintenanceRequest.findById(id);
    request.state = state;
    await request.save();
    const populated = await MaintenanceRequest.findById(request._id)
      .populate('equipment_id team_id technician_id category_id');
    res.json(populated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
