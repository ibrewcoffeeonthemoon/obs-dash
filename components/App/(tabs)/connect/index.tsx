import { ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useRef, useState } from "react";
import { OBSWebSocket } from "obs-websocket-js";
import { ThemedTextInput } from "@/components/themed-textinput";
import { styles } from "./styles";
import { Banner } from "./Banner";
import { Title } from "./Title";

const obs = new OBSWebSocket();

export default function Connect() {
  const [ipAddress, setIpAddress] = useState("192.168.1.99");
  const [port, setPort] = useState("4455");
  const [password, setPassword] = useState("M7B4kY415rGdnslb");
  const [showPassword, setShowPassword] = useState(false);
  const [log, setLog] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [log]);

  const appendToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog(
      (prevLog) => `${prevLog}${prevLog ? "\n" : ""}[${timestamp}] ${message}`,
    );
  };

  const clearLog = () => setLog("");

  const connectOBS = async () => {
    try {
      appendToLog("Connecting...");
      await obs.connect(`ws://${ipAddress}:${port}`, password);
      appendToLog("Connected to OBS");
    } catch (error) {
      appendToLog("Failed to connect to OBS");
    }
  };
  const disconnectOBS = async () => {
    appendToLog("Disconnecting...");
    await obs.disconnect();
    appendToLog("Disconnected to OBS");
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
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">IP Address</ThemedText>
          <ThemedTextInput
            style={styles.input}
            value={ipAddress}
            onChangeText={setIpAddress}
            placeholder="Enter IP Address"
            selectTextOnFocus
          />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Port</ThemedText>
          <ThemedTextInput
            style={styles.input}
            value={port}
            onChangeText={setPort}
            placeholder="Enter Port"
            keyboardType="numeric"
            selectTextOnFocus
          />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText type="subtitle">Password</ThemedText>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <ThemedText>{showPassword ? "hide" : "show"}</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          <ThemedTextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            selectTextOnFocus
          />
        </ThemedView>

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
