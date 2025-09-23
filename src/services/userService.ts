import { apiClient, type ApiResponse } from './apiClient';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'premium';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Auth Service
export class AuthService {
  // Login user
  static async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Set token in client after successful login
    if (response.data.token) {
      apiClient.setToken(response.data.token);
    }
    
    return response;
  }

  // Register new user
  static async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    
    // Set token in client after successful registration
    if (response.data.token) {
      apiClient.setToken(response.data.token);
    }
    
    return response;
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Even if logout fails on server, clear local token
      console.warn('Logout request failed, but clearing local session');
    } finally {
      apiClient.removeToken();
    }
  }

  // Refresh auth token
  static async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await apiClient.post<{ token: string }>('/auth/refresh');
    
    if (response.data.token) {
      apiClient.setToken(response.data.token);
    }
    
    return response;
  }

  // Verify current token
  static async verifyToken(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me');
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { email });
  }

  // Reset password
  static async resetPassword(token: string, password: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/reset-password', { token, password });
  }
}

// User Service
export class UserService {
  // Get current user profile
  static async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/users/profile');
  }

  // Update user profile
  static async updateProfile(userData: UpdateUserData): Promise<ApiResponse<User>> {
    return apiClient.put<User>('/users/profile', userData);
  }

  // Change password
  static async changePassword(passwordData: ChangePasswordData): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/users/change-password', passwordData);
  }

  // Upload avatar
  static async uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    // For file uploads, we need to override the default JSON headers
    const response = await fetch(`${apiClient['baseURL']}/users/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw {
        message: 'Erro ao fazer upload da imagem',
        status: response.status,
      };
    }

    const data = await response.json();
    return { data, status: response.status };
  }

  // Delete user account
  static async deleteAccount(): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.delete<{ message: string }>('/users/profile');
    apiClient.removeToken(); // Clear token after account deletion
    return response;
  }

  // Get user statistics
  static async getStats(): Promise<ApiResponse<{
    totalExpenses: number;
    totalIncome: number;
    balance: number;
    transactionCount: number;
  }>> {
    return apiClient.get('/users/stats');
  }
}

// Example usage hook for React components
export const useApiError = () => {
  const handleApiError = (error: any) => {
    if (error.status === 401) {
      // Unauthorized - redirect to login
      apiClient.removeToken();
      window.location.href = '/login';
    } else if (error.status === 403) {
      // Forbidden
      console.error('Acesso negado');
    } else if (error.status === 500) {
      // Server error
      console.error('Erro interno do servidor');
    } else {
      // Generic error
      console.error(error.message || 'Erro desconhecido');
    }
  };

  return { handleApiError };
};