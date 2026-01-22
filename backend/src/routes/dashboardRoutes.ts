import { Router } from 'express';
import * as dashboardController from '../controllers/dashboardController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All dashboard routes require authentication
router.use(authenticateToken);

// Dashboard routes
router.get('/', dashboardController.getDashboard);

export default router;
