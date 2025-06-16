import { create } from "zustand";

export const useGlobalStore = create((set, get) => ({
  isAboutModelActive: false,
}));
