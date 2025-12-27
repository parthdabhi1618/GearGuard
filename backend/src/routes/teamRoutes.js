const express = require('express');
const router = express.Router();
const { getTeams, createTeam } = require('../controllers/teamController');

router.route('/')
  .get(getTeams)
  .post(createTeam);

module.exports = router;
