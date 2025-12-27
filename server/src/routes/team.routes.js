import express from 'express';
import { getTeams, getTechnicians, createTeam } from '../controllers/team.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/', authMiddleware, getTeams);
router.get('/technicians', authMiddleware, getTechnicians);
router.post('/', authMiddleware, createTeam);

export default router;
