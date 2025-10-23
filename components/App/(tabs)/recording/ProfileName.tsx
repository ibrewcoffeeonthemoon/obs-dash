import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";
import { stores } from "@/store";
import { useStore } from "@/store/recording";
import { obs } from "@/lib/obs";
import { TouchableOpacity } from "react-native";

export const ProfileName = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const profileName = useStore((s) => s.stash.profileName);

  const selectPreviousProfile = async () => {
    const { currentProfileName, profiles } = await obs.call("GetProfileList");
    const idx = profiles.indexOf(currentProfileName);
    const newIdx = idx === 0 ? profiles.length - 1 : idx - 1;
    const newProfileName = profiles[newIdx];
    await obs.call("SetCurrentProfile", { profileName: newProfileName });
  };

  const selectNextProfile = async () => {
    const { currentProfileName, profiles } = await obs.call("GetProfileList");
    const idx = profiles.indexOf(currentProfileName);
    const newIdx = idx === profiles.length - 1 ? 0 : idx + 1;
    const newProfileName = profiles[newIdx];
    await obs.call("SetCurrentProfile", { profileName: newProfileName });
  };

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText
        type={isPhone ? "subtitle" : "title"}
        style={{
          fontFamily: Fonts.rounded,
        }}
      >
        {profileName}
      </ThemedText>
      <TouchableOpacity onPress={() => selectPreviousProfile()}>
        <ThemedText>Prev</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectNextProfile()}>
        <ThemedText>Next</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
