import { create } from "zustand";
import mainFetch from "../utils/customFetch";
export const useAuth = create((set) => ({
  user: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const response = await mainFetch.get("/users/current-user");
      set({ user: response.data.user });
    } catch (error) {
      console.log("fetch current user error in hook", error);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
