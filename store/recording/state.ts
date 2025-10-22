export const STATE = {};

export const STASH = {
  isRecording: false,
  recordingTime: "--:--",
};

export type State = {
  state: typeof STATE;
  stash: typeof STASH;
};

export const state: () => State["state"] = () => STATE;
export const stash: () => State["stash"] = () => STASH;
