import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { OBSWebSocket } from "obs-websocket-js";
import { ThemedTextInput } from "@/components/themed-textinput";

const obs = new OBSWebSocket();

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
});

export default function Connect() {
  const [ipAddress, setIpAddress] = useState("192.168.1.99");
  const [port, setPort] = useState("4455");
  const [password, setPassword] = useState("M7B4kY415rGdnslb");
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState("---");

  const connectOBS = async () => {
    try {
      setResponse("Connecting...");
      await obs.connect(`ws://${ipAddress}:${port}`, password);
      setResponse("Connected to OBS");
    } catch (error) {
      setResponse("Failed to connect to OBS");
    }
  };
  const disconnectOBS = async () => {
    await obs.disconnect();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Connect To OBS Websocket</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">IP Address</ThemedText>
        <ThemedTextInput
          style={styles.input}
          value={ipAddress}
          onChangeText={setIpAddress}
          placeholder="Enter IP Address"
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
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Password</ThemedText>
        <ThemedTextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <ThemedText>
            {showPassword ? "Hide password" : "Show password"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText>{response}</ThemedText>
        <TouchableOpacity onPress={connectOBS}>
          <ThemedText>Connect OBS</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={disconnectOBS}>
          <ThemedText>Disconnect OBS</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}
