export type Action = {
  action: {
    setProfileName: (val: string) => void;
    setIsRecording: (val: boolean) => void;
    setRecordingTime: (val: string) => void;
    setIsWakeLockEnabled: (val: boolean) => void;
  };
};
