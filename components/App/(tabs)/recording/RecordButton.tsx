import { ThemedText } from "@/components/themed-text";
import { obs } from "@/lib/obs";
import { StyleSheet, TouchableOpacity } from "react-native";

export const RecordButton = () => {
  // Toggle recording (start if stopped, stop if recording)
  async function toggleRecording() {
    try {
      // First, check current status
      const status = await obs.call("GetRecordStatus");
      const isRecording = status.outputActive;

      if (isRecording) {
        await obs.call("StopRecord");
        console.log("Recording stopped");
      } else {
        await obs.call("StartRecord");
        console.log("Recording started");
      }
    } catch (error) {
      console.error("Toggle failed:", error);
    }
  }

  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: "green" }}
      onPress={() => toggleRecording()}
    >
      <ThemedText style={styles.buttonText}>Start</ThemedText>
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
