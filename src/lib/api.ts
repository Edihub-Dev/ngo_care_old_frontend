import { authFetch } from './auth';

// API Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

// API Client class for better error handling
export class ApiClient {
  private static instance: ApiClient;

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Generic request method with error handling
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await authFetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message
      };
    } catch (error) {
      console.error('API Request Error:', error);
      
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
          code: 'NETWORK_ERROR'
        }
      };
    }
  }

  // GET request
  async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'GET' });
  }

  // POST request
  async post<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = ApiClient.getInstance();

// Specific API methods
export const authApi = {
  sendOTP: (mobile: string) => apiClient.post('/api/auth/send-otp', { mobile }),
  verifyOTP: (mobile: string, otp: string) => apiClient.post('/api/auth/verify-otp', { mobile, otp }),
  register: (userData: Record<string, unknown>) => apiClient.post('/api/auth/register', userData),
  login: (email: string, password: string) => apiClient.post('/api/auth/login', { email, password }),
};

export const userApi = {
  getStats: () => apiClient.get('/api/users/stats'),
  updateProfile: (data: Record<string, unknown>) => apiClient.put('/api/users/profile', data),
};

export const adminApi = {
  getDashboard: () => apiClient.get('/api/admin/dashboard'),
  getUsers: () => apiClient.get('/api/admin/users'),
  getRequests: () => apiClient.get('/api/admin/requests'),
  updateRequestStatus: (id: string, status: string) => 
    apiClient.put(`/api/admin/requests/${id}`, { status }),
};

export const emergencyApi = {
  triggerSOS: (location: { lat: number; lng: number }, description?: string) =>
    apiClient.post('/api/emergency/sos', { location, description }),
};
