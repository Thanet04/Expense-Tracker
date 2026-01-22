import { Router } from 'express';
import authRoutes from './authRoutes';
import transactionRoutes from './transactionRoutes';
import dashboardRoutes from './dashboardRoutes';
import summaryRoutes from './summaryRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/transactions', transactionRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/summary', summaryRoutes);

export default router;
