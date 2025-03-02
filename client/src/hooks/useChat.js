import { create } from 'zustand';
import mainFetch from '../utils/customFetch';

export const useChat = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  usersLoading: false,
  messagesLoading: false,

  getUsers: async () => {
    set({ usersLoading: true });
    try {
      const response = await mainFetch.get('/message');
      set({ users: response.data.users });
    } catch (error) {
      console.log(error);
    } finally {
      set({ usersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ messagesLoading: true });
    try {
      const response = await mainFetch.get(`/message${userId}`);
      set({ messages: response.data.messages });
    } catch (error) {
      console.log('messages error', error);
    } finally {
      set({ messagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
