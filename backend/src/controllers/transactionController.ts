import { Request, Response, NextFunction } from 'express';
import * as transactionService from '../services/transactionService';
import { AppError } from '../middleware/error';
import { formatTime } from '../utils/dateUtils';
import { TransactionType } from '../models/Transaction';
import { TransactionFilters } from '../interfaces/transaction.interface';

export const createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const { type, category, title, amount, date } = req.body;

    const transaction = await transactionService.createTransaction({
      userId,
      type,
      category,
      title,
      amount,
      date: date ? new Date(date) : undefined
    });

    const formattedTransaction = {
      id: transaction._id.toString(),
      type: transaction.type,
      category: transaction.category,
      title: transaction.title,
      amount: transaction.amount,
      date: transaction.date.toISOString(),
      time: formatTime(transaction.date)
    };

    // Get monthly stats for the year of the transaction
    const transactionYear = transaction.date.getFullYear();
    const dashboardStats = await transactionService.getDashboardStats(userId, 5, transactionYear);

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: {
        transaction: formattedTransaction,
        monthlyStats: dashboardStats.monthlyStats
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      const appError: AppError = error;
      appError.statusCode = 400;
      next(appError);
    } else {
      next(error);
    }
  }
};

export const getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Parse query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const type = req.query.type as TransactionType | undefined;
    const category = req.query.category as string | undefined;
    let startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    let endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;

    // Handle month/year filtering
    if (month && year) {
      // Create date in UTC
      startDate = new Date(Date.UTC(year, month - 1, 1));
      endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
    }

    // Validate pagination
    if (page < 1) {
      res.status(400).json({
        success: false,
        message: 'Page must be greater than 0'
      });
      return;
    }

    if (limit < 1 || limit > 100) {
      res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 100'
      });
      return;
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

    // Get transactions
    const result = await transactionService.getTransactionsByUserId(
      userId,
      filters,
      { page, limit }
    );

    // Format transactions for response
    const formattedTransactions = result.transactions.map((transaction) => ({
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
        transactions: formattedTransactions,
        pagination: result.pagination
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const { id } = req.params;
    const transactionId = Array.isArray(id) ? id[0] : id;
    const transaction = await transactionService.getTransactionById(transactionId, userId);

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Transaction retrieved successfully',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const { id } = req.params;
    const transactionId = Array.isArray(id) ? id[0] : id;
    const { type, category, title, amount, date } = req.body;

    const updateData: any = {};
    if (type !== undefined) updateData.type = type;
    if (category !== undefined) updateData.category = category;
    if (title !== undefined) updateData.title = title;
    if (amount !== undefined) updateData.amount = amount;
    if (date !== undefined) updateData.date = new Date(date);

    const transaction = await transactionService.updateTransaction(transactionId, userId, updateData);

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
      return;
    }

    const formattedTransaction = {
      id: transaction._id.toString(),
      type: transaction.type,
      category: transaction.category,
      title: transaction.title,
      amount: transaction.amount,
      date: transaction.date.toISOString(),
      time: formatTime(transaction.date)
    };

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: formattedTransaction
    });
  } catch (error) {
    if (error instanceof Error) {
      const appError: AppError = error;
      appError.statusCode = 400;
      next(appError);
    } else {
      next(error);
    }
  }
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const { id } = req.params;
    const transactionId = Array.isArray(id) ? id[0] : id;
    const deleted = await transactionService.deleteTransaction(transactionId, userId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};