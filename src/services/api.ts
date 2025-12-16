// API service layer for Red Drop
// This file contains all API endpoints and service functions

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('reddrop_token');
};

// Helper function for API requests
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (data: {
    email: string;
    password: string;
    name: string;
    role: string;
    bloodType?: string;
    phone?: string;
  }) => {
    return apiRequest<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  refreshToken: async () => {
    return apiRequest<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  },
};

// User APIs
export const userAPI = {
  getProfile: async (userId?: string) => {
    const endpoint = userId ? `/users/${userId}` : '/users/me';
    return apiRequest(endpoint);
  },

  updateProfile: async (data: Partial<any>) => {
    return apiRequest('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  updateAvailability: async (isAvailable: boolean) => {
    return apiRequest('/users/me/availability', {
      method: 'PATCH',
      body: JSON.stringify({ isAvailable }),
    });
  },
};

// Search APIs
export const searchAPI = {
  searchDonors: async (filters: {
    bloodType?: string;
    maxDistance?: number;
    availability?: boolean;
    latitude?: number;
    longitude?: number;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
    return apiRequest(`/search/donors?${queryParams.toString()}`);
  },

  searchBloodBanks: async (filters: {
    bloodType?: string;
    maxDistance?: number;
    latitude?: number;
    longitude?: number;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
    return apiRequest(`/search/blood-banks?${queryParams.toString()}`);
  },

  searchReceivers: async (filters: {
    bloodType?: string;
    maxDistance?: number;
    latitude?: number;
    longitude?: number;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
    return apiRequest(`/search/receivers?${queryParams.toString()}`);
  },
};

// Emergency Request APIs
export const emergencyAPI = {
  createRequest: async (data: {
    bloodType: string;
    units: number;
    urgency: 'high' | 'emergency';
    location: {
      latitude: number;
      longitude: number;
      address: string;
    };
    patientName?: string;
    hospitalName?: string;
    medicalCondition?: string;
  }) => {
    return apiRequest('/emergency/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getRequests: async (status?: string) => {
    const endpoint = status
      ? `/emergency/requests?status=${status}`
      : '/emergency/requests';
    return apiRequest(endpoint);
  },

  getRequest: async (requestId: string) => {
    return apiRequest(`/emergency/requests/${requestId}`);
  },

  respondToRequest: async (requestId: string, action: 'accept' | 'decline') => {
    return apiRequest(`/emergency/requests/${requestId}/respond`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  },

  cancelRequest: async (requestId: string) => {
    return apiRequest(`/emergency/requests/${requestId}`, {
      method: 'DELETE',
    });
  },
};

// Blood Bank Inventory APIs
export const inventoryAPI = {
  getInventory: async (bankId?: string) => {
    const endpoint = bankId ? `/inventory/${bankId}` : '/inventory';
    return apiRequest(endpoint);
  },

  updateInventory: async (data: {
    bloodType: string;
    units: number;
    expiryDate?: string;
  }) => {
    return apiRequest('/inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateStock: async (bloodType: string, units: number) => {
    return apiRequest(`/inventory/${bloodType}`, {
      method: 'PATCH',
      body: JSON.stringify({ units }),
    });
  },
};

// Message/Chat APIs
export const messageAPI = {
  getConversations: async () => {
    return apiRequest('/messages/conversations');
  },

  getMessages: async (conversationId: string) => {
    return apiRequest(`/messages/conversations/${conversationId}`);
  },

  sendMessage: async (conversationId: string, content: string) => {
    return apiRequest(`/messages/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  },

  createConversation: async (userId: string) => {
    return apiRequest('/messages/conversations', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },
};

// Notification APIs
export const notificationAPI = {
  getNotifications: async () => {
    return apiRequest('/notifications');
  },

  markAsRead: async (notificationId: string) => {
    return apiRequest(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  },

  markAllAsRead: async () => {
    return apiRequest('/notifications/read-all', {
      method: 'PATCH',
    });
  },
};

// Analytics APIs (for admins and blood banks)
export const analyticsAPI = {
  getDashboardStats: async () => {
    return apiRequest('/analytics/dashboard');
  },

  getDonationTrends: async (period: 'week' | 'month' | 'year' = 'month') => {
    return apiRequest(`/analytics/donations?period=${period}`);
  },

  getInventoryStats: async () => {
    return apiRequest('/analytics/inventory');
  },

  getUserActivity: async (period: 'week' | 'month' | 'year' = 'month') => {
    return apiRequest(`/analytics/activity?period=${period}`);
  },
};

// Location APIs
export const locationAPI = {
  updateLocation: async (location: {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  }) => {
    return apiRequest('/users/me/location', {
      method: 'PATCH',
      body: JSON.stringify(location),
    });
  },

  getNearbyUsers: async (latitude: number, longitude: number, radius: number) => {
    return apiRequest(
      `/location/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
    );
  },
};



