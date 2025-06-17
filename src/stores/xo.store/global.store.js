import { create } from "zustand";

export const useGlobalStore = create((set, get) => ({
  isAboutModelActive: true,

  toggleAboutModel: (value) => {
    set({ isAboutModelActive: value ? value : !get().isAboutModelActive });
  },
}));
