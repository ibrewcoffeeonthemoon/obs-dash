export const STATE = {
  isWakeLockEnabled: false,
};

export const STASH = {
  isRecording: false,
  recordingTime: "00:00",
};

export type State = {
  state: typeof STATE;
  stash: typeof STASH;
};

export const state: () => State["state"] = () => STATE;
export const stash: () => State["stash"] = () => STASH;
