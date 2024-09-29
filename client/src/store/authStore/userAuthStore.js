import { create } from "zustand";


const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("user"),
  user: JSON.parse(localStorage.getItem("user")) || null,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ isAuthenticated: true, user });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
