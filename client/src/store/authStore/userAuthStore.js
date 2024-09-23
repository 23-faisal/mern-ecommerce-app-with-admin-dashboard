import { create } from "zustand";

// Create the Zustand store
const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("user"), // Check if the user exists in localStorage
  user: JSON.parse(localStorage.getItem("user")) || null, // Load user from localStorage if exists

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
    set({ isAuthenticated: true, user });
  },

  logout: () => {
    localStorage.removeItem("user"); // Remove user from localStorage on logout
    localStorage.removeItem("token"); // Also remove token if stored
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
