import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useStore } from "@/store/recording";
import { useIsFocused } from "@react-navigation/native";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useEffect } from "react";
import { Switch } from "react-native";

export const KeepAwakeButton = () => {
  const isFocused = useIsFocused();
  const isRecording = useStore((s) => s.stash.isRecording);
  const isWakeLockEnabled = useStore((s) => s.state.isWakeLockEnabled);
  const setIsWakeLockEnabled = useStore((s) => s.action.setIsWakeLockEnabled);

  useEffect(() => {
    if (isFocused && isRecording && isWakeLockEnabled) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [isFocused, isRecording, isWakeLockEnabled]);

  return (
    <ThemedView style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Switch value={isWakeLockEnabled} onValueChange={setIsWakeLockEnabled} />
      <ThemedText>Keep screen awake during recording</ThemedText>
    </ThemedView>
  );
};
