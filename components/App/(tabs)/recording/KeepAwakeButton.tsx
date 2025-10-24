import { useStore } from "@/store/recording";
import { useIsFocused } from "@react-navigation/native";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useEffect } from "react";
import { Switch, Text, View } from "react-native";

export const KeepAwakeButton = () => {
  const isFocused = useIsFocused();
  const isWakeLockEnabled = useStore((s) => s.state.isWakeLockEnabled);
  const setIsWakeLockEnabled = useStore((s) => s.action.setIsWakeLockEnabled);

  useEffect(() => {
    if (isFocused && isWakeLockEnabled) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [isFocused, isWakeLockEnabled]);

  return (
    <View className="flex flex-row items-center gap-4">
      <Switch value={isWakeLockEnabled} onValueChange={setIsWakeLockEnabled} />
      <Text className="text-white">Keep screen awake</Text>
    </View>
  );
};
