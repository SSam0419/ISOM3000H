import { create } from "zustand";

interface UserState {
  address: string | null;
  setAddress: (address: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  address: null,
  setAddress: (adress: string | null) => {
    set((state) => ({ address: adress }));
  },
}));
