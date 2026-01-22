import { Request, Response, NextFunction } from 'express';
import * as transactionService from '../services/transactionService';
import { TransactionType } from '../models/Transaction';
import { TransactionFilters } from '../interfaces/transaction.interface';

export const getFinancialSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Parse query parameters for filtering
    const type = req.query.type as TransactionType | undefined;
    const category = req.query.category as string | undefined;
    let startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    let endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;

    // Handle month/year filtering
    if (month && year) {
      // Create date in UTC
      // Note: Javascript Date months are 0-11
      startDate = new Date(Date.UTC(year, month - 1, 1));
      endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
    }

    // Validate type
    if (type && type !== 'expense' && type !== 'income') {
      res.status(400).json({
        success: false,
        message: 'Type must be either "expense" or "income"'
      });
      return;
    }

    // Validate dates
    if (startDate && isNaN(startDate.getTime())) {
      res.status(400).json({
        success: false,
        message: 'startDate must be a valid date'
      });
      return;
    }

    if (endDate && isNaN(endDate.getTime())) {
      res.status(400).json({
        success: false,
        message: 'endDate must be a valid date'
      });
      return;
    }

    // Build filters
    const filters: TransactionFilters = {};
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    // Get financial summary
    const summary = await transactionService.getFinancialSummary(userId, filters);

    res.status(200).json({
      success: true,
      data: {
        totalIncome: summary.totalIncome,
        totalExpense: summary.totalExpense,
        balance: summary.balance
      }
    });
  } catch (error) {
    next(error);
  }
};
