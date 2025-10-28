let pingInterval = 0;

export const startPing = (fn: () => void, timeout: number) => {
  stopPing();

  pingInterval = setInterval(fn, timeout);
};

export const stopPing = () => {
  clearInterval(pingInterval);
};
