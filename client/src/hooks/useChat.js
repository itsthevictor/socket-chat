import { create } from 'zustand';
import mainFetch from '../utils/customFetch';
import { useAuth } from './useAuth';

export const useChat = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  usersLoading: false,
  messagesLoading: false,

  getUsers: async () => {
    set({ usersLoading: true });
    try {
      const response = await mainFetch.get('/messages');
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
      const response = await mainFetch.get(`/messages/${userId}`);
      set({ messages: response.data.messages });
    } catch (error) {
      console.log('messages error', error);
    } finally {
      set({ messagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    try {
      const response = await mainFetch.post(
        `/messages/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, response.data.message] });
    } catch (error) {
      console.log(error);
    }
  },

  listenToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuth.getState().socket;

    socket.on('newMessage', (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },

  stopListeningToMessages: () => {
    const socket = useAuth.getState().socket;
    socket.off('newMessage');
  },
}));
