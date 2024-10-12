import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand store with persistence for cart
const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // Add to cart
      addToCart: async (userId, productId, quantity) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/cart`,
            {
              userId,
              productId,
              quantity,
            }
          );

          if (response?.data?.data) {
            set({ cart: response?.data?.data });
          }
        } catch (error) {
          console.error("Error adding to cart:", error.message);
        }
      },

      // Fetch cart data
      fetchCartData: async (userId) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
          );

          if (response?.data?.success) {
            const cartData = response?.data?.data;
            set({ cart: cartData });
            return cartData;
          } else {
            console.error(response?.data?.message);
            throw new Error(response?.data?.message);
          }
        } catch (error) {
          console.error("Error fetching cart:", error.message);
          throw error;
        }
      },

      // Increase quantity
      increaseQuantity: async (userId, productId) => {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
            { userId, productId, action: "increase" }
          );

          if (response?.data?.success) {
            set({ cart: response?.data?.data });
          }
        } catch (error) {
          console.error("Error increasing quantity:", error.message);
        }
      },

      // decrease quantity

      decreaseQuantity: async (userId, productId) => {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
            { userId, productId, action: "decrease" }
          );

          if (response?.data?.success) {
            set({ cart: response?.data?.data });
          }
        } catch (error) {
          console.error("Error decreasing quantity:", error.message);
        }
      },

      // Remove item from cart
      removeItem: async (userId, productId) => {
        try {
          const response = await axios.delete(
            `${
              import.meta.env.VITE_API_URL
            }/api/shop/cart/${userId}/${productId}`
          );

          if (response?.data?.success) {
            const updatedCart = response?.data?.data; // Assuming this returns the updated cart
            console.log("Updated cart:", updatedCart); // Log updated cart
            set({ cart: updatedCart });
          } else {
            console.error("Failed to remove item:", response?.data?.message);
          }
        } catch (error) {
          console.error("Error removing item:", error.message);
        }
      },

      // reset cart store

      resetCartStore: () => {
        localStorage.removeItem("cart-storage");
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage", // unique name for localStorage
    }
  )
);

export default useCartStore;
