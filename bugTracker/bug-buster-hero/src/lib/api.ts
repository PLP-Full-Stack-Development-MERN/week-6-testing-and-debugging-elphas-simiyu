
import axios from 'axios';
import { Bug, BugFormData } from './types';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bugService = {
  // Get all bugs
  getAllBugs: async (): Promise<Bug[]> => {
    const response = await api.get('/bugs');
    return response.data;
  },
  
  // Get a bug by ID
  getBugById: async (id: string): Promise<Bug> => {
    const response = await api.get(`/bugs/${id}`);
    return response.data;
  },
  
  // Create a new bug
  createBug: async (bugData: BugFormData): Promise<Bug> => {
    const response = await api.post('/bugs', bugData);
    return response.data;
  },
  
  // Update a bug
  updateBug: async (id: string, bugData: Partial<BugFormData>): Promise<Bug> => {
    const response = await api.put(`/bugs/${id}`, bugData);
    return response.data;
  },
  
  // Delete a bug
  deleteBug: async (id: string): Promise<void> => {
    await api.delete(`/bugs/${id}`);
  },
  
  // Update bug status
  updateBugStatus: async (id: string, status: Bug['status']): Promise<Bug> => {
    const response = await api.patch(`/bugs/${id}/status`, { status });
    return response.data;
  }
};
