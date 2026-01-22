import { Request, Response, NextFunction } from 'express';
import * as transactionService from '../services/transactionService';
import { formatTime } from '../utils/dateUtils';

export const getDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Get limit for recent transactions (default: 5)
    const limit = parseInt(req.query.limit as string) || 5;
    
    // Get year for monthly stats (default: current year)
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;

    // Validate limit
    if (limit < 1 || limit > 50) {
      res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 50'
      });
      return;
    }

    // Validate year
    if (year !== undefined) {
      if (isNaN(year) || year < 1900 || year > 2100) {
        res.status(400).json({
          success: false,
          message: 'Year must be a valid number between 1900 and 2100'
        });
        return;
      }
    }

    // Get dashboard stats
    const stats = await transactionService.getDashboardStats(userId, limit, year);

    // Format recent transactions
    const recentTransactions = stats.recentTransactions.map((transaction) => ({
      id: transaction._id.toString(),
      type: transaction.type,
      category: transaction.category,
      title: transaction.title,
      amount: transaction.amount,
      date: transaction.date.toISOString(),
      time: formatTime(transaction.date)
    }));

    res.status(200).json({
      success: true,
      data: {
        totalBalance: stats.totalBalance,
        totalIncome: stats.totalIncome,
        totalExpense: stats.totalExpense,
        recentTransactions,
        monthlyStats: stats.monthlyStats,
        year: year || new Date().getFullYear()
      }
    });
  } catch (error) {
    next(error);
  }
};
