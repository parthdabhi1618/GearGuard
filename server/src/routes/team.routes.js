import express from 'express';
import { getTeams, createTeam } from '../controllers/team.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/', authMiddleware, getTeams);
router.post('/', authMiddleware, createTeam);

export default router;
