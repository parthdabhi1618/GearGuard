import Team from '../models/Team.model.js';

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('technician_ids');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
