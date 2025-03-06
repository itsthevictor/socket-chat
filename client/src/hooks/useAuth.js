import { create } from 'zustand';
import mainFetch from '../utils/customFetch';
import { Navigate, redirect } from 'react-router-dom';
import { io } from 'socket.io-client';
const BASE_URL = 'http://localhost:8080';
export const useAuth = create((set) => ({
  user: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const response = await mainFetch.get('/users');

      set({ user: response.data.user });
    } catch (error) {
      console.log('fetch current user error in hook', error);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      await mainFetch.get('/auth/logout');
      Navigate('/login');
    } catch (error) {
      console.log('log out error in hook', error);
      set({ user: null });
    }
  },
  updateProfile: async (data) => {
    try {
      const res = await mainFetch.put('/users/update-user', data);
      set({ user: res.data.user });
    } catch (error) {
      console.log('error');
    }
  },
  isUpdatingProfile: false,
  onlineUsers: [],

  connectSocket: () => {
    const socket = io(BASE_URL);
    socket.connect();
  },
  disconnectSocket: () => {},
}));
