import { useStore as connect } from "./connect";
import { useStore as recording } from "./recording";

export const stores = {
  connect: {
    useStore: connect,
  },
  recording: {
    useStore: recording,
  },
};
