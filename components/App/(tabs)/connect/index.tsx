import { ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useRef } from "react";
import { OBSWebSocket } from "obs-websocket-js";
import { ThemedTextInput } from "@/components/themed-textinput";
import { styles } from "./styles";
import { Banner } from "./Banner";
import { Title } from "./Title";
import { useStore } from "@/store/connect";
import { IpAddressInput } from "./IpAddressInput";
import { PortInput } from "./PortInput";
import { PasswordInput } from "./PasswordInput";

const obs = new OBSWebSocket();

export default function Connect() {
  const ipAddress = useStore((s) => s.state.ipAddress);
  const setIpAddress = useStore((s) => s.action.setIpAddress);

  const port = useStore((s) => s.state.port);
  const setPort = useStore((s) => s.action.setPort);

  const password = useStore((s) => s.state.password);
  const setPassword = useStore((s) => s.action.setPassword);

  const showPassword = useStore((s) => s.stash.showPassword);
  const setShowPassword = useStore((s) => s.action.setShowPassword);

  const log = useStore((s) => s.stash.log);
  const appendLog = useStore((s) => s.action.appendLog);
  const clearLog = useStore((s) => s.action.clearLog);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [log]);

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
    <>
      <Banner />
      <ThemedView
        style={{
          flex: 1,
          padding: 32,
          gap: 16,
        }}
      >
        <Title />
        <IpAddressInput />
        <PortInput />
        <PasswordInput />

        <ThemedView style={styles.stepContainer}>
          <TouchableOpacity onPress={connectOBS}>
            <ThemedText>Connect OBS</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={disconnectOBS}>
            <ThemedText>Disconnect OBS</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ScrollView ref={scrollViewRef} style={{ overflow: "scroll" }}>
          <ThemedTextInput
            value={log}
            multiline
            editable={false}
            scrollEnabled
          />
        </ScrollView>
        <TouchableOpacity onPress={clearLog}>
          <ThemedText>Clear</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}
