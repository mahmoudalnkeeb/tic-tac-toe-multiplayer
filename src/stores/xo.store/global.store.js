import { create } from "zustand";

export const useGlobalStore = create((set, get) => ({
  isAboutModelActive: false,

  toggleAboutModel: (value) => {
    set({ isAboutModelActive: value ? value : !get().isAboutModelActive });
  },
}));
