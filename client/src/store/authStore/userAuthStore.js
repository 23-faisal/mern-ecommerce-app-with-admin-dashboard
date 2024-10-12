import { create } from "zustand";
import useAddressStore from "../addressStore/useAddressStore";
import useCartStore from "../cartStore/useCartStore";

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
    // Access the reset functions inside the logout function
    const { resetAddressStore } = useAddressStore.getState();
    const { resetCartStore } = useCartStore.getState();

    
    resetCartStore();
    resetAddressStore();
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
