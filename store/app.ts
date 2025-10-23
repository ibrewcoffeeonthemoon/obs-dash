import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "@/store/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STATE = {};

export const STASH = {
  isPhone: false,
};

export type State = {
  state: typeof STATE;
  stash: typeof STASH;
};

export const state: () => State["state"] = () => STATE;
export const stash: () => State["stash"] = () => STASH;

export type Action = {
  action: {
    setIsPhone: (val: boolean) => void;
  };
};

type Store = State & Action;

export const useStore = create<Store>()(
  persist(
    immer((set) => ({
      state: state(),
      stash: stash(),
      action: {
        setIsPhone: (val) =>
          set((s) => {
            s.stash.isPhone = val;
          }),
      },
    })),
    {
      name: "store.app",
      partialize: (s) => ({ state: s.state }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useStoreSelectors = createSelectors(useStore);

export const store = useStoreSelectors.use;
