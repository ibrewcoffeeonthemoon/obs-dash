import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  useKeepAwake,
  activateKeepAwake,
  deactivateKeepAwake,
} from "expo-keep-awake";
import { Switch } from "react-native";

export const KeepAwakeButton = () => {
  return (
    <ThemedView style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      {/* <Switch value={isWakeLockEnabled} onValueChange={setIsWakeLockEnabled} /> */}
      <Switch />
      <ThemedText>Keep screen awake during recording</ThemedText>
    </ThemedView>
  );
};
