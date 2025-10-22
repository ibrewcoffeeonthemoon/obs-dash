import { ThemedView } from "@/components/themed-view";
import { StyleSheet, TouchableOpacity } from "react-native";
import { styles as otherStyles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { useStore } from "@/store/connect";
import { obs } from "@/lib/obs";

export const ConnectButton = () => {
  const ipAddress = useStore((s) => s.state.ipAddress);
  const port = useStore((s) => s.state.port);
  const password = useStore((s) => s.state.password);
  const isConnected = useStore((s) => s.stash.isConnected);
  const setIsConnected = useStore((s) => s.action.setIsConnected);
  const appendLog = useStore((s) => s.action.appendLog);

  const connectOBS = async () => {
    try {
      appendLog("Connecting...");
      await obs.connect(`ws://${ipAddress}:${port}`, password);
      appendLog("Connected to OBS");
      setIsConnected(true);
    } catch (error) {
      appendLog("Failed to connect to OBS");
      setIsConnected(false);
    }
  };
  const disconnectOBS = async () => {
    appendLog("Disconnecting...");
    await obs.disconnect();
    appendLog("Disconnected to OBS");
    setIsConnected(false);
  };

  return (
    <ThemedView style={styles.stepContainer}>
      {!isConnected ? (
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "green" }}
          onPress={connectOBS}
        >
          <ThemedText style={styles.buttonText}>Connect</ThemedText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "red" }}
          onPress={disconnectOBS}
        >
          <ThemedText style={styles.buttonText}>Disconnect</ThemedText>
        </TouchableOpacity>
      )}
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
