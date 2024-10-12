import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAddressStore = create(
  persist(
    (set) => ({
      address: [],

      // add address

      addAddress: async (userId, addressData) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
            {
              userId,
              ...addressData,
            }
          );
          set((state) => ({
            address: [...state.address, response.data.data],
          }));
        } catch (error) {
          console.error(error.message);
        }
      },

      // fetch all address

      fetchAddress: async (userId) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
          );

          if (response?.data?.data) {
            set({ address: [...response?.data?.data] });
          }
        } catch (error) {
          console.error(error.message);
        }
      },

      // update address
      updateAddress: async (userId, addressId, addressData) => {
        try {
          const response = await axios.put(
            `${
              import.meta.env.VITE_API_URL
            }/api/shop/address/update/${userId}/${addressId}`,
            {
              addressData,
            }
          );
          if (response?.data?.data) {
            set((state) => ({
              address: state.address.map((addr) =>
                addr._id === addressId
                  ? { ...addr, ...response.data.data }
                  : addr
              ),
            }));
          }
        } catch (error) {
          console.error(error.message);
        }
      },

      // delete address

      deleteAddress: async (userId, addressId) => {
        try {
          const response = await axios.delete(
            `${
              import.meta.env.VITE_API_URL
            }/api/shop/address/delete/${userId}/${addressId}`
          );
          if (response?.data?.data) {
            set((state) => ({
              address: state.address.filter((addr) => addr._id !== addressId),
            }));
          }
        } catch (error) {
          console.error(error.message);
        }
      },

      // reset address store
      resetAddressStore: () => {
        localStorage.removeItem("address-storage");
        set({ address: [] });
      },
    }),
    {
      name: "address-storage", // unique name for localStorage
    }
  )
);

export default useAddressStore;
