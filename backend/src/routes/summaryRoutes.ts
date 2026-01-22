import { Router } from 'express';
import * as summaryController from '../controllers/summaryController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All summary routes require authentication
router.use(authenticateToken);

// Summary routes
router.get('/', summaryController.getFinancialSummary);

export default router;
