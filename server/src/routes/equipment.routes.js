import express from 'express';
import { 
  getEquipment, 
  getEquipmentById, 
  createEquipment, 
  updateEquipment, 
  deleteEquipment 
} from '../controllers/equipment.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/', authMiddleware, getEquipment);
router.get('/:id', authMiddleware, getEquipmentById);
router.post('/', authMiddleware, createEquipment);
router.put('/:id', authMiddleware, updateEquipment);
router.delete('/:id', authMiddleware, deleteEquipment);

export default router;
