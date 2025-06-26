import axios from 'axios';
import { GenerateProjectRequest, GenerateProjectResponse } from '@/types';

const API_BASE_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response received:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  generateProject: async (data: GenerateProjectRequest): Promise<GenerateProjectResponse> => {
    try {
      const response = await apiClient.post<GenerateProjectResponse>('/generate-project', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to generate project');
      }
      throw new Error('An unexpected error occurred');
    }
  },

  // Health check endpoint
  healthCheck: async (): Promise<{ status: string }> => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Backend service is not available');
    }
  },
};