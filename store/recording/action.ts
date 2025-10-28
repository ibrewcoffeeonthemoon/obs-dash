export type Action = {
  action: {
    setProfileName: (val: string) => void;
    setProfiles: (val: string[]) => void;
    setSceneName: (val: string) => void;
    setScenes: (val: string[]) => void;
    setIsRecording: (val: boolean) => void;
    setRecordingTime: (val: string) => void;
    setIsWakeLockEnabled: (val: boolean) => void;
  };
};
