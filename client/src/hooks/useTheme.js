import { create } from 'zustand';

export const useTheme = create((set) => ({
  theme: localStorage.getItem('chat-theme') || 'coffee',
  setTheme: (theme) => {
    localStorage.setItem('chat-theme', theme);
    document.body.setAttribute('data-theme', theme);
    set({ theme });
  },
}));
