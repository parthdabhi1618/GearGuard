import express from 'express';
import { 
  getRequests, 
  createRequest, 
  updateRequest, 
  changeState 
} from '../controllers/maintenance.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 🎯 YOUR ROUTES
router.get('/', authMiddleware, getRequests);
router.post('/', authMiddleware, createRequest);
router.put('/:id', authMiddleware, updateRequest);
router.patch('/:id/state', authMiddleware, changeState);

export default router;
