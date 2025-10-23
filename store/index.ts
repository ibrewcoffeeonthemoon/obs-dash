import { useStore as app } from "./app";
import { useStore as connect } from "./connect";
import { useStore as recording } from "./recording";

export const stores = {
  app: {
    useStore: app,
  },
  connect: {
    useStore: connect,
  },
  recording: {
    useStore: recording,
  },
};
