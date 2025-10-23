import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";
import { stores } from "@/store";
import { useStore } from "@/store/recording";
import { obs } from "@/lib/obs";
import { TouchableOpacity } from "react-native";
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
      <TouchableOpacity
        onPress={() => selectPreviousProfile()}
        style={{ width: "100%" }}
      >
        <ThemedText
          type={isPhone ? "subtitle" : "title"}
          style={{ textAlign: "center" }}
        >
          <Ionicons name="chevron-up" size={30} />
        </ThemedText>
      </TouchableOpacity>
      <ThemedText
        type={isPhone ? "subtitle" : "title"}
        style={{
          fontFamily: Fonts.rounded,
          textAlign: "center",
        }}
      >
        {profileName}
      </ThemedText>
      <TouchableOpacity
        onPress={() => selectNextProfile()}
        style={{ width: "100%" }}
      >
        <ThemedText
          type={isPhone ? "subtitle" : "title"}
          style={{ textAlign: "center" }}
        >
          <Ionicons name="chevron-down" size={30} />
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
