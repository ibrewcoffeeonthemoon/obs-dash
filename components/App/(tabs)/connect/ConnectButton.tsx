import { ThemedView } from "@/components/themed-view";
import { StyleSheet, TouchableOpacity } from "react-native";
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
  const setProfileName = stores.recording.useStore(
    (s) => s.action.setProfileName,
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

      // get and listen to profile name state
      const { currentProfileName } = await obs.call("GetProfileList");
      setProfileName(currentProfileName);
      obs.on("CurrentProfileChanged", ({ profileName }) => {
        setProfileName(profileName);
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
          className="py-4 px-5 rounded-md items-center bg-green-700"
          onPress={connectOBS}
        >
          <ThemedText style={styles.buttonText}>Connect</ThemedText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="py-4 px-5 rounded-md items-center bg-red-700"
          onPress={disconnectOBS}
        >
          <ThemedText style={styles.buttonText}>Disconnect</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
