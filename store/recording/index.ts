import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "@/store/utils";
import { stash, state, State } from "./state";
import { Action } from "./action";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store = State & Action;

export const useStore = create<Store>()(
  persist(
    immer((set) => ({
      state: state(),
      stash: stash(),
      action: {
        setProfileName: (val) =>
          set((s) => {
            s.stash.profileName = val;
          }),
        setIsRecording: (val) =>
          set((s) => {
            s.stash.isRecording = val;
          }),
        setRecordingTime: (val) =>
          set((s) => {
            s.stash.recordingTime = val;
          }),
        setIsWakeLockEnabled: (val) =>
          set((s) => {
            s.state.isWakeLockEnabled = val;
          }),
      },
    })),
    {
      name: "store.recording",
      partialize: (s) => ({ state: s.state }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useStoreSelectors = createSelectors(useStore);

export const store = useStoreSelectors.use;
