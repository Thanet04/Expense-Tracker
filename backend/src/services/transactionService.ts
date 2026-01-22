import mongoose from 'mongoose';
import Transaction, { ITransaction } from '../models/Transaction';
import {
  CreateTransactionData,
  UpdateTransactionData,
  TransactionFilters,
  PaginationOptions,
  PaginatedTransactionsResult,
  DashboardStats,
  FinancialSummary
} from '../interfaces/transaction.interface';

export const createTransaction = async (data: CreateTransactionData): Promise<ITransaction> => {
  const { userId, type, category, title, amount, date } = data;

  const transaction = new Transaction({
    userId,
    type,
    category,
    title,
    amount,
    date: date || new Date()
  });

  await transaction.save();
  return transaction;
};

export const getTransactionsByUserId = async (
  userId: string,
  filters?: TransactionFilters,
  pagination?: PaginationOptions
): Promise<PaginatedTransactionsResult> => {
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 50;
  const skip = (page - 1) * limit;

  // Build query
  const query: any = { userId };

  if (filters?.type) {
    query.type = filters.type;
  }

  if (filters?.category) {
    query.category = filters.category;
  }

  if (filters?.startDate || filters?.endDate) {
    query.date = {};
    if (filters.startDate) {
      query.date.$gte = filters.startDate;
    }
    if (filters.endDate) {
      // Set end date to end of day
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      query.date.$lte = endDate;
    }
  }

  // Get total count for pagination
  const total = await Transaction.countDocuments(query);

  // Get transactions with pagination
  const transactions = await Transaction.find(query)
    .sort({ date: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  const totalPages = Math.ceil(total / limit);

  return {
    transactions,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };
};

export const getTransactionById = async (transactionId: string, userId: string): Promise<ITransaction | null> => {
  return await Transaction.findOne({ _id: transactionId, userId }).exec();
};

export const updateTransaction = async (
  transactionId: string,
  userId: string,
  data: UpdateTransactionData
): Promise<ITransaction | null> => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: transactionId, userId },
    { $set: data },
    { new: true, runValidators: true }
  ).exec();

  return transaction;
};

export const deleteTransaction = async (transactionId: string, userId: string): Promise<boolean> => {
  const result = await Transaction.deleteOne({ _id: transactionId, userId }).exec();
  return result.deletedCount > 0;
};

// Dashboard Statistics
export const getDashboardStats = async (
  userId: string,
  limit: number = 5,
  year?: number
): Promise<DashboardStats> => {
  // Calculate monthly stats for the specified year (default: current year)
  const targetYear = year || new Date().getFullYear();
  const startOfYear = new Date(targetYear, 0, 1);
  const endOfYear = new Date(targetYear, 11, 31, 23, 59, 59, 999);

  // Convert userId to ObjectId for aggregation
  const userIdObjectId = new mongoose.Types.ObjectId(userId);

  // Get transactions for the specified year only
  const yearTransactions = await Transaction.find({
    userId,
    date: { $gte: startOfYear, $lte: endOfYear }
  }).exec();

  // Calculate totals for the specified year only
  let totalIncome = 0;
  let totalExpense = 0;

  yearTransactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  const totalBalance = totalIncome - totalExpense;

  // Get recent transactions for the specified year only
  const recentTransactions = await Transaction.find({
    userId,
    date: { $gte: startOfYear, $lte: endOfYear }
  })
    .sort({ date: -1, createdAt: -1 })
    .limit(limit)
    .exec();

  const monthlyAgg = await Transaction.aggregate([
    {
      $match: {
        userId: userIdObjectId,
        date: { $gte: startOfYear, $lte: endOfYear }
      }
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          type: "$type"
        },
        total: { $sum: "$amount" }
      }
    }
  ]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyStats = monthNames.map((name, index) => {
    const monthIndex = index + 1; // 1-based
    const incomeData = monthlyAgg.find(item => item._id.month === monthIndex && item._id.type === 'income');
    const expenseData = monthlyAgg.find(item => item._id.month === monthIndex && item._id.type === 'expense');

    return {
      name,
      income: incomeData ? incomeData.total : 0,
      expense: expenseData ? expenseData.total : 0
    };
  });

  return {
    totalBalance,
    totalIncome,
    totalExpense,
    recentTransactions,
    monthlyStats
  };
};

// Financial Summary

export const getFinancialSummary = async (
  userId: string,
  filters?: TransactionFilters
): Promise<FinancialSummary> => {
  // Build query
  const query: any = { userId };

  if (filters?.type) {
    query.type = filters.type;
  }

  if (filters?.category) {
    query.category = filters.category;
  }

  if (filters?.startDate || filters?.endDate) {
    query.date = {};
    if (filters.startDate) {
      query.date.$gte = filters.startDate;
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      query.date.$lte = endDate;
    }
  }

  // Get transactions matching the filters
  const transactions = await Transaction.find(query).exec();

  // Calculate totals
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance
  };
};