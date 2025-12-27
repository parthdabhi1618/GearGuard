const Team = require('../models/Team');

// @desc    Get all teams
// @route   GET /api/teams
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('technicians');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new team
// @route   POST /api/teams
exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
