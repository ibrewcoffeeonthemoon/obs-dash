export type Action = {
  action: {
    setIpAddress: (val: string) => void;
    setPort: (val: string) => void;
    setPassword: (val: string) => void;
    setShowPassword: (val: boolean) => void;
    setIsConnected: (val: boolean) => void;
    setLog: (val: string) => void;
    appendLog: (val: string) => void;
    clearLog: () => void;
  };
};
