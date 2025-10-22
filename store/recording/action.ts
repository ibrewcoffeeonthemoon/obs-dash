export type Action = {
  action: {
    setIsRecording: (val: boolean) => void;
    setRecordingTime: (val: string) => void;
  };
};
