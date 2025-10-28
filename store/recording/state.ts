export const STATE = {
  isWakeLockEnabled: true,
};

export const STASH = {
  profileName: "--",
  profiles: [] as string[],
  isRecording: false,
  recordingTime: "00:00",
};

export type State = {
  state: typeof STATE;
  stash: typeof STASH;
};

export const state: () => State["state"] = () => STATE;
export const stash: () => State["stash"] = () => STASH;
