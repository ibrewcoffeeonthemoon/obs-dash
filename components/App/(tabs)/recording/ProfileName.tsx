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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => selectPreviousProfile()}>
        <ThemedText>
          <Ionicons name="chevron-back-circle-outline" size={30} />
        </ThemedText>
      </TouchableOpacity>
      <ThemedText
        type={isPhone ? "subtitle" : "title"}
        style={{
          fontFamily: Fonts.rounded,
          flex: 1,
          textAlign: "center",
        }}
      >
        {profileName}
      </ThemedText>
      <TouchableOpacity onPress={() => selectNextProfile()}>
        <ThemedText>
          <Ionicons name="chevron-forward-circle-outline" size={30} />
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
