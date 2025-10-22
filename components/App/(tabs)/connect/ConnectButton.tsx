import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import { styles as otherStyles } from "./styles";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useStore } from "@/store/connect";
import { OBSWebSocket } from "obs-websocket-js";

const obs = new OBSWebSocket();

export const ConnectButton = () => {
  const ipAddress = useStore((s) => s.state.ipAddress);
  const port = useStore((s) => s.state.port);
  const password = useStore((s) => s.state.password);
  const appendLog = useStore((s) => s.action.appendLog);

  const connectOBS = async () => {
    try {
      appendLog("Connecting...");
      await obs.connect(`ws://${ipAddress}:${port}`, password);
      appendLog("Connected to OBS");
    } catch (error) {
      appendLog("Failed to connect to OBS");
    }
  };
  const disconnectOBS = async () => {
    appendLog("Disconnecting...");
    await obs.disconnect();
    appendLog("Disconnected to OBS");
  };

  return (
    <ThemedView style={styles.stepContainer}>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: "green" }}
        onPress={connectOBS}
      >
        <ThemedText style={styles.buttonText}>Connect OBS</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: "red" }}
        onPress={disconnectOBS}
      >
        <ThemedText style={styles.buttonText}>Disconnect OBS</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  ...otherStyles,
});
