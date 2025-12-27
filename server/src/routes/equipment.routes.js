import express from 'express';
import { getEquipment, createEquipment } from '../controllers/equipment.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/', authMiddleware, getEquipment);
router.post('/', authMiddleware, createEquipment);

export default router;
