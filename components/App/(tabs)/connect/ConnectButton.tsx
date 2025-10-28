import { Text, TouchableOpacity, View } from "react-native";
import { useStore } from "@/store/connect";
import { obs } from "@/lib/obs";
import { OBSWebSocketError } from "obs-websocket-js";
import { stores } from "@/store";
import { byUnderscoreTop } from "@/lib/sorting";
import { useRef } from "react";

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
  const setProfiles = stores.recording.useStore((s) => s.action.setProfiles);
  const setSceneName = stores.recording.useStore((s) => s.action.setSceneName);
  const setScenes = stores.recording.useStore((s) => s.action.setScenes);
  const pingIntervalRef = useRef(0);

  const PING_INTERVAL = 5000;
  const pingRequest = async () => {
    try {
      await obs.call("GetVersion");
      setIsConnected(true);
    } catch (error) {
      console.log("Ping request failed:", error);
      setIsConnected(false);
      clearInterval(pingIntervalRef.current);
    }
  };

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
      pingIntervalRef.current = setInterval(pingRequest, PING_INTERVAL);

      // get and listen to recording state
      const { outputActive } = await obs.call("GetRecordStatus");
      setIsRecording(outputActive);
      obs.on("RecordStateChanged", ({ outputActive }) => {
        setIsRecording(outputActive);
      });

      // get and listen to scene name and scenes state
      const { currentProgramSceneName, scenes } =
        await obs.call("GetSceneList");
      setSceneName(currentProgramSceneName);
      setScenes(
        scenes
          .map((data) => (data as { sceneName: string }).sceneName)
          .sort(byUnderscoreTop),
      );
      obs.on("CurrentProgramSceneChanged", ({ sceneName }) => {
        setSceneName(sceneName);
      });
      obs.on("SceneListChanged", ({ scenes }) => {
        setScenes(
          scenes
            .map((data) => (data as { sceneName: string }).sceneName)
            .sort(byUnderscoreTop),
        );
      });

      // get and listen to profile name and profiles state
      const { currentProfileName, profiles } = await obs.call("GetProfileList");
      setProfileName(currentProfileName);
      setProfiles(profiles.sort(byUnderscoreTop));
      obs.on("CurrentProfileChanged", ({ profileName }) => {
        setProfileName(profileName);
      });
      obs.on("ProfileListChanged", ({ profiles }) => {
        // BUG: profile rename creates duplicates, deletion doesn't fire
        setProfiles(profiles.sort(byUnderscoreTop));
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
    } finally {
      clearInterval(pingIntervalRef.current);
    }
  };

  return (
    <View>
      {!isConnected ? (
        <TouchableOpacity
          className="py-4 px-5 rounded-md items-center bg-green-700"
          onPress={connectOBS}
        >
          <Text className="text-white text-xl font-extrabold">Connect</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="py-4 px-5 rounded-md items-center bg-red-700"
          onPress={disconnectOBS}
        >
          <Text className="text-white text-xl font-extrabold">Disconnect</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
