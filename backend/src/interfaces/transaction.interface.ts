import { ITransaction, TransactionType } from '../models/Transaction';

export interface CreateTransactionData {
  userId: string;
  type: TransactionType;
  category: string;
  title: string;
  amount: number;
  date?: Date;
}

export interface UpdateTransactionData {
  type?: TransactionType;
  category?: string;
  title?: string;
  amount?: number;
  date?: Date;
}

export interface TransactionResponse {
  success: boolean;
  message: string;
  data: ITransaction;
}

export interface TransactionFilters {
  type?: TransactionType;
  category?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedTransactionsResult {
  transactions: ITransaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MonthlyStat {
  name: string;
  income: number;
  expense: number;
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  recentTransactions: ITransaction[];
  monthlyStats: MonthlyStat[];
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
