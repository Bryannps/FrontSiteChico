import { apiClient, type ApiResponse } from './apiClient';

// Types for Expenses/Income
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionData {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface UpdateTransactionData {
  amount?: number;
  description?: string;
  category?: string;
  date?: string;
}

export interface TransactionFilters {
  type?: 'income' | 'expense';
  category?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
}

export interface CreateCategoryData {
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
}

// Transaction Service
export class TransactionService {
  // Get all transactions with filters
  static async getTransactions(filters?: TransactionFilters): Promise<ApiResponse<{
    transactions: Transaction[];
    total: number;
    page: number;
    totalPages: number;
  }>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? `/transactions?${queryString}` : '/transactions';
    
    return apiClient.get(endpoint);
  }

  // Get single transaction
  static async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
    return apiClient.get(`/transactions/${id}`);
  }

  // Create new transaction
  static async createTransaction(data: CreateTransactionData): Promise<ApiResponse<Transaction>> {
    return apiClient.post('/transactions', data);
  }

  // Update transaction
  static async updateTransaction(id: string, data: UpdateTransactionData): Promise<ApiResponse<Transaction>> {
    return apiClient.put(`/transactions/${id}`, data);
  }

  // Delete transaction
  static async deleteTransaction(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete(`/transactions/${id}`);
  }

  // Get transaction summary
  static async getSummary(startDate?: string, endDate?: string): Promise<ApiResponse<{
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    transactionCount: number;
    topCategories: Array<{
      category: string;
      amount: number;
      count: number;
    }>;
  }>> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/transactions/summary?${queryString}` : '/transactions/summary';
    
    return apiClient.get(endpoint);
  }

  // Export transactions to Excel/CSV
  static async exportTransactions(format: 'excel' | 'csv', filters?: TransactionFilters): Promise<Blob> {
    const params = new URLSearchParams();
    params.append('format', format);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const url = `${apiClient['baseURL']}/transactions/export?${queryString}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao exportar dados');
    }
    
    return response.blob();
  }
}

// Category Service
export class CategoryService {
  // Get all categories
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get('/categories');
  }

  // Create new category
  static async createCategory(data: CreateCategoryData): Promise<ApiResponse<Category>> {
    return apiClient.post('/categories', data);
  }

  // Update category
  static async updateCategory(id: string, data: Partial<CreateCategoryData>): Promise<ApiResponse<Category>> {
    return apiClient.put(`/categories/${id}`, data);
  }

  // Delete category
  static async deleteCategory(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete(`/categories/${id}`);
  }
}

// Reports Service
export class ReportsService {
  // Get monthly report
  static async getMonthlyReport(year: number, month: number): Promise<ApiResponse<{
    income: number;
    expenses: number;
    balance: number;
    categoryBreakdown: Array<{
      category: string;
      amount: number;
      percentage: number;
    }>;
    dailyData: Array<{
      date: string;
      income: number;
      expenses: number;
    }>;
  }>> {
    return apiClient.get(`/reports/monthly?year=${year}&month=${month}`);
  }

  // Get yearly report
  static async getYearlyReport(year: number): Promise<ApiResponse<{
    totalIncome: number;
    totalExpenses: number;
    totalBalance: number;
    monthlyData: Array<{
      month: string;
      income: number;
      expenses: number;
      balance: number;
    }>;
    topCategories: Array<{
      category: string;
      amount: number;
    }>;
  }>> {
    return apiClient.get(`/reports/yearly?year=${year}`);
  }

  // Generate custom report
  static async getCustomReport(startDate: string, endDate: string): Promise<ApiResponse<{
    period: {
      start: string;
      end: string;
    };
    summary: {
      income: number;
      expenses: number;
      balance: number;
      transactions: number;
    };
    trends: Array<{
      date: string;
      income: number;
      expenses: number;
    }>;
    categories: Array<{
      name: string;
      amount: number;
      count: number;
    }>;
  }>> {
    return apiClient.get(`/reports/custom?startDate=${startDate}&endDate=${endDate}`);
  }
}