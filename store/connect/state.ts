export const STATE = {
  ipAddress: "192.168.1.99",
  port: "4455",
  password: "admin",
};

export const STASH = {
  showPassword: false,
  log: "",
};

export type State = {
  state: typeof STATE;
  stash: typeof STASH;
};

export const state: () => State["state"] = () => STATE;
export const stash: () => State["stash"] = () => STASH;
