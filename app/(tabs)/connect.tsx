import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { OBSWebSocket } from "obs-websocket-js";

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
});

export default function Connect() {
  const [response, setResponse] = useState("---");

  const connectOBS = async () => {
    try {
      setResponse("Connecting...");
      await obs.connect("ws://192.168.1.99:4455", "M7B4kY415rGdnslb");
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
        <ThemedText>[input field][192.168.1.99]</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Port</ThemedText>
        <ThemedText>[input field][4455]</ThemedText>
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
