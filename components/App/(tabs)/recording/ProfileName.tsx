import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";
import { useEffect, useState } from "react";
import { obs } from "@/lib/obs";
import { stores } from "@/store";

export const ProfileName = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const [profileName, setProfileName] = useState("--");

  useEffect(() => {
    // get existing profile
    (async () => {
      const { currentProfileName } = await obs.call("GetProfileList");
      setProfileName(currentProfileName);
    })();

    // monitor future profile change
    obs.on("CurrentProfileChanged", (data) => {
      setProfileName(data.profileName);
      console.log("changing profile");
    });
  }, []);

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
