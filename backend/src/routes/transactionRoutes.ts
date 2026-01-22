import { Router } from 'express';
import * as transactionController from '../controllers/transactionController';
import { validateCreateTransaction, validateUpdateTransaction } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All transaction routes require authentication
router.use(authenticateToken);

// Transaction routes
router.post('/', validateCreateTransaction, transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransaction);
router.put('/:id', validateUpdateTransaction, transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

export default router;
