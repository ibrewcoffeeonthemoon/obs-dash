import { ThemedView } from "@/components/themed-view";
import { stores } from "@/store";
import { useStore } from "@/store/recording";
import { obs } from "@/lib/obs";
import { Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ProfileName = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const profileName = useStore((s) => s.stash.profileName);

  const selectPreviousProfile = async () => {
    const { currentProfileName, profiles } = await obs.call("GetProfileList");
    const idx = profiles.indexOf(currentProfileName);
    if (idx > 0) {
      const newProfileName = profiles[idx - 1];
      await obs.call("SetCurrentProfile", { profileName: newProfileName });
    }
  };

  const selectNextProfile = async () => {
    const { currentProfileName, profiles } = await obs.call("GetProfileList");
    const idx = profiles.indexOf(currentProfileName);
    if (idx < profiles.length - 1) {
      const newProfileName = profiles[idx + 1];
      await obs.call("SetCurrentProfile", { profileName: newProfileName });
    }
  };

  return (
    <ThemedView
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => selectPreviousProfile()}
        style={({ pressed }) => [
          {
            width: "100%",
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: pressed
              ? "rgba(100, 100, 100, 0.08)"
              : "transparent",
          },
        ]}
      >
        <Ionicons
          name="chevron-up"
          size={30}
          style={{ alignSelf: "center", color: "#666666" }}
        />
      </Pressable>

      <Text
        className={`text-white text-center ${isPhone ? "text-2xl" : "text-4xl"} font-bold`}
      >
        {profileName}
      </Text>

      <Pressable
        onPress={() => selectNextProfile()}
        style={({ pressed }) => [
          {
            width: "100%",
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: pressed
              ? "rgba(100, 100, 100, 0.08)"
              : "transparent",
          },
        ]}
      >
        <Ionicons
          name="chevron-down"
          size={30}
          style={{ alignSelf: "center", color: "#666666" }}
        />
      </Pressable>
    </ThemedView>
  );
};
