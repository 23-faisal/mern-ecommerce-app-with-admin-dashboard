import { create } from "zustand";

export const adminProductStore = create((set) => ({
  productList: [],
}));
