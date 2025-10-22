import { ThemedText } from "@/components/themed-text";
import { obs } from "@/lib/obs";
import { stores } from "@/store";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export const RecordButton = () => {
  const isRecording = stores.recording.useStore((s) => s.stash.isRecording);
  const setIsRecording = stores.recording.useStore(
    (s) => s.action.setIsRecording,
  );
  const appendLog = stores.connect.useStore((s) => s.action.appendLog);

  useEffect(() => {
    const fetchRecordingStatus = async () => {
      const { outputActive } = await obs.call("GetRecordStatus");
      setIsRecording(outputActive);
    };
    fetchRecordingStatus();
  }, []);

  async function toggleRecording() {
    try {
      const { outputActive } = await obs.call("GetRecordStatus");

      if (outputActive) {
        await obs.call("StopRecord");
        setIsRecording(false);
        appendLog("Recording stopped");
      } else {
        await obs.call("StartRecord");
        setIsRecording(true);
        appendLog("Recording started");
      }
    } catch (error) {
      appendLog(`Toggle failed: ${error}`);
    }
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: isRecording ? "red" : "green",
      }}
      onPress={() => toggleRecording()}
    >
      <ThemedText style={styles.buttonText}>
        {isRecording ? "Stop" : "Start"}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    height: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 60,
    lineHeight: 80,
    fontWeight: "bold",
  },
});
