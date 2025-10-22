import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { createSelectors } from "@/store/utils";
import { stash, state, State } from "./state";
import { Action } from "./action";

type Store = State & Action;

export const useStore = create<Store>()(
  persist(
    immer((set) => ({
      state: state(),
      stash: stash(),
      action: {
        setIpAddress: (val) =>
          set((s) => {
            s.state.ipAddress = val;
          }),
        setPort: (val) =>
          set((s) => {
            s.state.port = val;
          }),
        setPassword: (val) =>
          set((s) => {
            s.state.password = val;
          }),
        setShowPassword: (val) =>
          set((s) => {
            s.stash.showPassword = val;
          }),
        setLog: (val) =>
          set((s) => {
            s.stash.log = val;
          }),
        appendLog: (val) =>
          set((s) => {
            const timestamp = new Date().toLocaleTimeString();
            s.stash.log = `${s.stash.log}${s.stash.log ? "\n" : ""}[${timestamp}] ${val}`;
          }),
        clearLog: () =>
          set((s) => {
            s.stash.log = "";
          }),
      },
    })),
    {
      name: "store.connect",
      partialize: (s) => ({ state: s.state }),
    },
  ),
);

export const useStoreSelectors = createSelectors(useStore);

export const store = useStoreSelectors.use;
