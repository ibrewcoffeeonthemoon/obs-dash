import { ThemedText } from "@/components/themed-text";
import { obs } from "@/lib/obs";
import { stores } from "@/store";
import { StyleSheet, TouchableOpacity } from "react-native";

export const RecordButton = () => {
  const isRecording = stores.recording.useStore((s) => s.stash.isRecording);
  const setIsRecording = stores.recording.useStore(
    (s) => s.action.setIsRecording,
  );

  async function toggleRecording() {
    try {
      const { outputActive } = await obs.call("GetRecordStatus");

      if (outputActive) {
        await obs.call("StopRecord");
        setIsRecording(false);
        console.log("Recording stopped");
      } else {
        await obs.call("StartRecord");
        setIsRecording(true);
        console.log("Recording started");
      }
    } catch (error) {
      console.error("Toggle failed:", error);
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
