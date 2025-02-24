import { create } from "zustand";
import mainFetch from "../utils/customFetch";
import { Navigate, redirect } from "react-router-dom";
export const useAuth = create((set) => ({
  user: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const response = await mainFetch.get("/users");
      console.log("got user", response);

      set({ user: response.data.user });
    } catch (error) {
      console.log("fetch current user error in hook", error);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      await mainFetch.get("/auth/logout");
      Navigate("/login");
    } catch (error) {
      console.log("log out error in hook", error);
      set({ user: null });
    }
  },
}));
