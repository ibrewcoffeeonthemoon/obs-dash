import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";
import { stores } from "@/store";
import { useStore } from "@/store/recording";

export const ProfileName = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const profileName = useStore((s) => s.stash.profileName);

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
    </ThemedView>
  );
};
