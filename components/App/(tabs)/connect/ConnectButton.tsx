import { ThemedView } from "@/components/themed-view";
import { StyleSheet, TouchableOpacity } from "react-native";
import { styles as otherStyles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { useStore } from "@/store/connect";
import { obs } from "@/lib/obs";
import { OBSWebSocketError } from "obs-websocket-js";
import { stores } from "@/store";

export const ConnectButton = () => {
  const ipAddress = useStore((s) => s.state.ipAddress);
  const port = useStore((s) => s.state.port);
  const password = useStore((s) => s.state.password);
  const isConnected = useStore((s) => s.stash.isConnected);
  const setIsConnected = useStore((s) => s.action.setIsConnected);
  const appendLog = useStore((s) => s.action.appendLog);
  const setIsRecording = stores.recording.useStore(
    (s) => s.action.setIsRecording,
  );

  const connectOBS = async () => {
    try {
      // connect
      const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
        `ws://${ipAddress}:${port}`,
        password,
        { rpcVersion: 1 },
      );
      appendLog(
        `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`,
      );
      setIsConnected(true);

      // get and listen to recording state
      const { outputActive } = await obs.call("GetRecordStatus");
      setIsRecording(outputActive);
      obs.on("RecordStateChanged", ({ outputActive }) => {
        setIsRecording(outputActive);
      });
    } catch (error) {
      if (error instanceof OBSWebSocketError) {
        appendLog(`Failed to connect, ${error.code}, ${error.message}`);
        setIsConnected(false);
      } else {
        console.log(error);
      }
    }
  };

  const disconnectOBS = async () => {
    try {
      await obs.disconnect();
      appendLog("Disconnected from OBS");
      setIsConnected(false);
    } catch (error) {
      if (error instanceof OBSWebSocketError) {
        appendLog(`Error during disconnect, ${error.code}, ${error.message}`);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <ThemedView>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  ...otherStyles,
});
