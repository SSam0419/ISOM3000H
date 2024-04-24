import { create } from "zustand";

interface UserState {
  address: string | null;
  setAddress: (address: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  address: null,
  setAddress: (adress) => {
    set((state) => ({ address: adress }));
  },
}));
