import { obs } from "@/lib/obs";
import { stores } from "@/store";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

export const RecordButton = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const isRecording = stores.recording.useStore((s) => s.stash.isRecording);
  const appendLog = stores.connect.useStore((s) => s.action.appendLog);

  useEffect(() => {
    appendLog(`Recording ${isRecording ? "started" : "stopped"}`);
  }, [isRecording, appendLog]);

  async function toggleRecording() {
    try {
      if (isRecording) {
        await obs.call("StopRecord");
      } else {
        await obs.call("StartRecord");
      }
    } catch (error) {
      appendLog(`Toggle failed: ${error}`);
    }
  }

  return (
    <TouchableOpacity
      className={`
        py-12 px-12 rounded-xl items-center justify-center my-1 
        ${isRecording ? "bg-red-700" : "bg-green-700"} 
        ${isPhone ? "h-72" : "h-80"}
      `}
      onPress={() => toggleRecording()}
    >
      <Text
        className={`text-white ${isPhone ? "text-6xl" : "text-8xl"} font-bold`}
      >
        {isRecording ? "Stop" : "Start"}
      </Text>
    </TouchableOpacity>
  );
};
