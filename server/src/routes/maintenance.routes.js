import express from 'express';
import { 
  getRequests, 
  createRequest, 
  updateRequest, 
  changeState 
} from '../controllers/maintenance.controller.js';

const router = express.Router();

// 🎯 YOUR ROUTES
router.get('/', getRequests);
router.post('/', createRequest);
router.put('/:id', updateRequest);
router.patch('/:id/state', changeState);

export default router;
