import { create } from 'zustand';
import mainFetch from '../utils/customFetch';
import { Navigate, redirect } from 'react-router-dom';
import { io } from 'socket.io-client';
const BASE_URL = 'http://localhost:8080';
export const useAuth = create((set, get) => ({
  user: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  socket: null,
  isUpdatingProfile: false,
  onlineUsers: [],

  signIn: async (data) => {
    console.log('sign in started');
    try {
      await mainFetch.post('/auth/login', data);
      get().connectSocket();
    } catch (error) {
      console.log(error);
    }
  },
  checkAuth: async () => {
    try {
      const response = await mainFetch.get('/users');
      set({ user: response.data.user });
      const { user } = get();
      console.log('signed in user', user);
      get().connectSocket();
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
      get().disconnectSocket();
      set({ user: null });
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

  connectSocket: () => {
    const { user } = get();
    if (!user) return;

    const socket = io(BASE_URL, {
      query: {
        userId: user._id,
      },
    });

    socket.connect();
    set({ socket: socket });
    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
